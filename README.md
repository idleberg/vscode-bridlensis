⚠️ **This package was once part of [vscode-nsis](https://github.com/idleberg/vscode-nsis), but has been outsourced to prepare its deprecation**

# BridleNSIS for Visual Studio Code

[![The MIT License](https://flat.badgen.net/badge/license/MIT/orange)](http://opensource.org/licenses/MIT)
[![GNU General Public License](https://flat.badgen.net/badge/license/GPL%20v2/orange)](http://www.gnu.org/licenses/gpl-2.0.html)
[![GitHub](https://flat.badgen.net/github/release/idleberg/vscode-bridlensis)](https://github.com/idleberg/vscode-bridlensis/releases)
[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/installs-short/idleberg.bridlensis.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=idleberg.bridlensis)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/vscode-bridlensis)](https://circleci.com/gh/idleberg/vscode-bridlensis)
[![David](https://flat.badgen.net/david/dep/idleberg/vscode-bridlensis)](https://david-dm.org/idleberg/vscode-bridlensis)
[![Gitter](https://flat.badgen.net/badge/chat/on%20gitter/ff69b4)](https://gitter.im/NSIS-Dev/vscode)

Language syntax, IntelliSense and build system for [BridleNSIS](https://github.com/henrikor2/bridlensis).

## Installation

### Extension Marketplace

Launch Quick Open, paste the following command, and press <kbd>Enter</kbd>

`ext install bridlensis`

### Packaged Extension

Download the package extension from the the [release page](https://github.com/idleberg/vscode-bridlensis/releases) and install it from the command-line:

```bash
$ code --install-extension bridlensis-*.vsix
```

Alternatively, you can download the packaged extension from the [Open VSX Registry](https://open-vsx.org/) or install it using the [`ovsx`](https://www.npmjs.com/package/ovsx) command-line tool:

```bash
$ ovsx get idleberg.bridlensis
```

### Clone Repository

Change to your Visual Studio Code extensions directory:

```powershell
# Windows Powershell
cd $Env:USERPROFILES\.vscode/extensions

# Windows Command Prompt
$ cd %USERPROFILE%\.vscode/extensions
```

```bash
# Linux & macOS
$ cd ~/.vscode/extensions/
```

Clone repository as `bridlensis`:

```bash
$ git clone https://github.com/idleberg/vscode-bridlensis bridlensis
```

## License

This work is dual-licensed under [The MIT License](https://opensource.org/licenses/MIT) and the [GNU General Public License, version 2.0](https://opensource.org/licenses/GPL-2.0)
