import { window } from 'vscode';

import { clearOutput, onSuccess, validateConfig } from './util';
import { getConfig } from 'vscode-get-config';
import { spawn } from 'child_process';

const bridleChannel = window.createOutputChannel('BridleNSIS');

/*
 *  Requires BridleNSIS
 *  https://github.com/henrikor2/bridlensis
 */
async function transpile(): Promise<void> {
  await clearOutput(bridleChannel);

  // TODO Breaking change in VSCode 1.54, remove in future
  const languageID = window.activeTextEditor['_documentData']
    ? window.activeTextEditor['_documentData']['_languageId']
    : window.activeTextEditor['document']['languageId'];

  if (languageID !== 'bridlensis') {
    bridleChannel.appendLine('This command is only available for BridleNSIS files');
    return;
  }

  const { customArguments, nsisHome, pathToJar, showNotifications } = await getConfig('bridlensis');
  const document = window.activeTextEditor.document;

  if (customArguments.length) {
    validateConfig(customArguments);
  }

  document.save().then( () => {
    const bridleJar = pathToJar;

    if (typeof bridleJar === 'undefined' || bridleJar === null) {
      return window.showErrorMessage('No valid `BridleNSIS.jar` was specified in your config');
    }

    const defaultArguments: Array<string> = ['-jar', bridleJar];

    if (nsisHome.length > 0 && !customArguments.includes('-n')) {
      customArguments.push('-n');
      customArguments.push(nsisHome);
    }

    const compilerArguments = [ ...defaultArguments, ...customArguments, document.fileName ];

    // Let's build
    const bridleCmd = spawn('java', compilerArguments);

    let stdErr = '';
    let hasError = false;

    bridleCmd.stdout.on('data', (line: Array<unknown>) => {
      if (line.includes('Exit Code:')) {
        hasError = true;
      }
      bridleChannel.appendLine(line.toString());
    });

    bridleCmd.stderr.on('data', (line: Array<unknown>) => {
      stdErr += '\n' + line;
      bridleChannel.appendLine(line.toString());
    });

    bridleCmd.on('exit', (code) => {
      if (code === 0 && stdErr.length === 0 && hasError === false) {
        if (showNotifications) {
          window.showInformationMessage(`Transpiled successfully -- ${document.fileName}`, 'Open')
          .then(onSuccess);
        }
      } else {
        bridleChannel.show(true);
        if (showNotifications) window.showErrorMessage('Transpile failed, see output for details');
        if (stdErr.length > 0) console.error(stdErr);
      }
    });
  });
}

export { transpile };
