import {
  commands,
  window,
  workspace
} from 'vscode';

import { basename, dirname, extname, join } from 'path';
import { getConfig } from 'vscode-get-config';

// eslint-disable-next-line
async function clearOutput(channel: any): Promise<void> {
  const { alwaysShowOutput } = await getConfig('bridlensis');

  channel.clear();
  if (alwaysShowOutput === true) {
    channel.show(true);
  }
}

function onSuccess(choice: string): void {
  const document = window.activeTextEditor.document;

  if (choice === 'Open') {
    const dirName = dirname(document.fileName);
    const extName = extname(document.fileName);
    const baseName = basename(document.fileName, extName);

    // because BridleNSIS is kinda buggy
    const outExt = 'b' + extName.substr(1);

    // if BridleNSIS wasn't buggy
    // let outExt;
    // if (extName == '.nsh') {
    //   outExt = '.bnsh';
    // } else {
    //   outExt = '.bnsi';
    // }

    const outName = baseName + outExt;
    const nsisFile = join(dirName, outName);

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
  onSuccess,
  validateConfig
};
