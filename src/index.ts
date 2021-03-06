'use strict';

import * as vscode from 'vscode';

// Load package components
import { transpile } from './transpiler';

async function activate(context: vscode.ExtensionContext): Promise<void> {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand('extension.bridlensis.transpile', () => {
      return transpile();
    })
  );
}

export { activate };
