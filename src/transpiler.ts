'use strict';

import { window, WorkspaceConfiguration } from 'vscode';

import { clearOutput, getConfig, onSuccess, validateConfig } from './util';
import { spawn } from 'child_process';

const bridleChannel = window.createOutputChannel('BridleNSIS');

/*
 *  Requires BridleNSIS
 *  https://github.com/henrikor2/bridlensis
 */
export const transpile = (): void => {
  clearOutput(bridleChannel);

  if (window.activeTextEditor['_documentData']['_languageId'] !== 'bridlensis') {
    bridleChannel.appendLine('This command is only available for BridleNSIS files');
    return;
  }

  const config: WorkspaceConfiguration = getConfig();
  const document = window.activeTextEditor.document;

  if (config.customArguments.length) {
    validateConfig(config.customArguments);
  }

  document.save().then( () => {
    const bridleJar = config.pathToJar;

    if (typeof bridleJar === 'undefined' || bridleJar === null) {
      return window.showErrorMessage('No valid `BridleNSIS.jar` was specified in your config');
    }

    const defaultArguments: Array<string> = ['-jar', bridleJar];
    const customArguments = config.customArguments;


    if (config.nsisHome.length > 0 && !customArguments.includes('-n')) {
      customArguments.push('-n');
      customArguments.push(config.nsisHome);
    }

    const compilerArguments = [ ...defaultArguments, ...customArguments, document.fileName ];

    // Let's build
    const bridleCmd = spawn('java', compilerArguments);

    let stdErr: string = '';
    let hasError: boolean = false;

    bridleCmd.stdout.on('data', (line: Array<any>) => {
      if (line.includes('Exit Code:')) {
        hasError = true;
      }
      bridleChannel.appendLine(line.toString());
    });

    bridleCmd.stderr.on('data', (line: Array<any>) => {
      stdErr += '\n' + line;
      bridleChannel.appendLine(line.toString());
    });

    bridleCmd.on('exit', (code) => {
      if (code === 0 && stdErr.length === 0 && hasError === false) {
        if (config.showNotifications) {
          window.showInformationMessage(`Transpiled successfully -- ${document.fileName}`, 'Open')
          .then(onSuccess);
        }
      } else {
        bridleChannel.show(true);
        if (config.showNotifications) window.showErrorMessage('Transpile failed, see output for details');
        if (stdErr.length > 0) console.error(stdErr);
      }
    });
  });
};
