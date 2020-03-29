'use strict';

import * as vscode from 'vscode';

// Load package components
import { transpile } from './transpiler';

const activate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand('extension.bridlensis.transpile', (editor) => {
      return transpile();
    })
  );
};

export { activate };
