'use strict';

import {
  commands,
  window,
  workspace,
  WorkspaceConfiguration
} from 'vscode';

import * as open from 'open';
import { basename, dirname, extname, join } from 'path';
import { access } from 'fs';
import { platform } from 'os';
import { exec, spawn } from 'child_process';

function clearOutput(channel): void {
  const config: WorkspaceConfiguration = getConfig();

  channel.clear();
  if (config.alwaysShowOutput === true) {
    channel.show(true);
  }
}

function getConfig(): WorkspaceConfiguration {
  return workspace.getConfiguration('bridlensis');
}

function openURL(cmd: string): void {
  open(`https://idleberg.github.io/NSIS.docset/Contents/Resources/Documents/html/Reference/${cmd}.html?utm_source=vscode&utm_content=reference`);
}

function onSuccess(choice): void {
  let document = window.activeTextEditor.document;

  if (choice === 'Open') {
    let dirName = dirname(document.fileName);
    let extName = extname(document.fileName);
    let baseName = basename(document.fileName, extName);

    // because BridleNSIS is kinda buggy
    let outExt = 'b' + extName.substr(1);

    // if BridleNSIS wasn't buggy
    // let outExt;
    // if (extName == '.nsh') {
    //   outExt = '.bnsh';
    // } else {
    //   outExt = '.bnsi';
    // }

    let outName = baseName + outExt;
    let nsisFile = join(dirName, outName);

    workspace.openTextDocument(nsisFile)
    .then( (doc) => {
      window.showTextDocument(doc);
    });
  }
}

function validateConfig(setting: string): void {
  if (typeof setting === 'string') {
    window.showErrorMessage('The argument handling has been changed in a recent version of this extension. Please adjust your settings before trying again.', 'Open Settings')
    .then(choice => {
      if (choice === 'Open Settings') {
        commands.executeCommand('workbench.action.openSettings', '@ext:idleberg.nsis');
      }
    });

    process.exit();
  }
}

export {
  clearOutput,
  getConfig,
  openURL,
  onSuccess,
  validateConfig
};
