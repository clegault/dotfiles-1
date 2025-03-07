# dotfiles

This repository contains all of my configuration for MacOS and Linux, with a focus on terminal, editor, shell, programming environments etc. This repository can easily be forked to allow you to create and customise your own machine setup.

### **NOTE**
**Karabiner settings on MacOS do NOT work if it's settings are on a different volume and symlinked to your home dir.**

This repository also contains some handy [Shell Scripts and Aliases](#shell-scripts-and-aliases) that others might find helpful.

Some key features are:

- Support for setting up a clean machine with developer focused tooling
- The ability to choose what features you do or don't install
- Idempotent setup, which allows you to run the setup whenever you want to add or upgrade features
- Small, simple scripts to setup 'features', such as Ruby and `rbenv`, Python, Vim and so on
- Small, simple scripts which are sourced into your shell profile, providing things like auto-completion
- Management of dotfiles such as `~/.vimrc` and `~/.gitconfig`
- Optional management of private file, such as SSH keys, as long as you have access to an AWS S3 bucket

⚠️ **Warning**: I have tried wherever possible to ensure no _destructive_ change will happen when working with the scripts or commands in this project, without explicit user intervention (i.e. the user typing `yes` to make changes). The goal is that you can run the setup scripts without changing _anything_ unless you explicitly choose a feature. However, I cannot guarantee I haven't made an mistakes, so please exercise caution.

<!-- vim-markdown-toc GFM -->

- [Introduction](#introduction)
- [Quick Start](#quick-start)
- [MacOS - Manual Steps](#macos---manual-steps)
- [Features](#features)
- [Private Files](#private-files)
- [Developer Guide](#developer-guide)
- [Ubuntu Terminal Configuration](#ubuntu-terminal-configuration)
- [Shell Prompt Theme](#shell-prompt-theme)
- [Shell Scripts and Aliases](#shell-scripts-and-aliases)
- [Shell Commands](#shell-commands)
- [Cheat Sheet - TMux](#cheat-sheet---tmux)
- [Cheat Sheet - Vim](#cheat-sheet---vim)
- [Cheat Sheet - Shell](#cheat-sheet---shell)
- [Tooling Choices](#tooling-choices)
  - [Vim](#vim)
- [TODO](#todo)

<!-- vim-markdown-toc -->

## Introduction

The goal of this project is to provide a single command which will setup key features of the system. Each feature should be _orthogonal_ and not depend on other features.

The following is set up:

- `zsh` as the default shell
- `tmux` for terminal multiplexing, with my preferred theme and settings
- `vim` as the default editor, with my preferred theme and settings
- `~/.shell-private.d` as a folder excluded from version control, the contents of which are always loaded on shell startup (ideal for project specific secrets etc)
- `~/.shell` as a version controlled folder, the contents of which are always loaded on shell startup

## Quick Start

Run the commands below to upgrade the XCode tools, which provides Git. We then clone the `dotfiles` repository. Once this is done we can run `make setup`.

If you are on an M1 Mac, Rosetta will be installed automatically. You will run into errors for developer extensions if you haven't loosened security settings in the recovery screen before installing.

```sh
# MacOSX only - install command-line tools (so that we have git).
xcode-select --install

# Ubuntu only - install command line make tools.
apt install make curl -y
# Create a working environment, in my standard format.
```

## To install shell only utils on Mac or Ubuntu

```sh
bash  -c "$(curl -fsSL https://raw.githubusercontent.com/clegault/dotfiles/master/install.sh) -shell-only"
```

## To install everything automatically on Mac or Ubuntu

```sh
bash  -c "$(curl -fsSL https://raw.githubusercontent.com/clegault/dotfiles/master/install.sh) -auto"
```

## Interactive install

```sh
bash  -c "$(curl -fsSL https://raw.githubusercontent.com/clegault/dotfiles/master/install.sh)"
```

## Manual interactive install

```sh
mkdir ~/src
cd ~/src
git clone https://github.com/clegault/dotfiles.git
cd dotfiles
./setup.sh
```

To restore private files, check the [Private Files](#private-files) section.

## MacOS - Manual Steps

The following steps have not yet been automated:

1. Sign into 1password and setup plugins

---

These steps are work in progress.

0. Restore GPG keys from a backup.
1. Setup SSH keys for GitHub.
2. Restore the `~/.private/` folder from a secure backup, to bring back project specific secrets.
3. Restore the AWS CLI credentials to bring back project access.
4. Setup SSH keys for GitHub.

## Features

Each of the 'features' listed below typically has a `./setup.d/x-<feature-name>.sh` script to _install or upgrade_ the feature. Some also have a `./.shell.d/x-<feature-name>.sh` file which is sourced by interactive shells if commands need to be run on shell startup (such as enabled `pyenv` and similar features. The numbers are used to ensure that if there _are_ dependencies on features, we try and install in the right order.

## Private Files

Private files, such as GPG and SSH keys can be backed up or restored with the commands below:

```sh
bash private-files/private-files-backup.sh
bash private-files/private-files-restore.sh
```

**Package Manager**

- Installs or upgrades [Homebrew](https://brew.sh/) on OSX.
- Updates `apt` on Ubuntu.
- Installs and updates `snap` on Ubuntu.

**OSX Configuration**

Various preferences for OSX, such as showing the path bar on the Finder windows, smaller icons, etc.

**Git**

Sets up `gnupg` and the `git` user settings.

**Node**

Sets up `nvm` (Node Version Manager) and the current LTS version of node.

**Python**

Sets up `pyenv` (Python Environment Manager) and `python3`.

**Ruby**

Sets up `rvm` (Ruby Version Manager) and `ruby`.

**Golang**

Sets up `golang` and `$GOPATH`.

**Vim**

Sets up `vim` and vim config file. Plugins are installed with `PlugInstall`.

**TMux**

This installs `tmux` and the Tmux Plugin Manager.

**Shell**

This installs `zsh` and sets `zsh` as the default shell for the user. Sets the command prompt and sources the `.shell.sh` file.

Installs On My Zsh, which I use for themes and some conveniences, and copies over the zsh themes.

To enable features to be used in shells, the shell configuration file will source our special `shell.sh` file. This file then goes and sources the appropriate files from `~/.shell.d`.

**OSX Applications**

Many applications I used, such as WhatsApp, Visual Studio Code, T-Mux, Nerd Fonts for use in the terminal etc.

This also installs common CLI applications, such as `tree`, as well as GNU tools (`coretools`, `gsed` etc).

**Commandline Tools**

`ag` is setup and will use a global ignore file at `~/.ignore`. `vim-ack` also uses this file.

## Private Files

Backup or restore private files with:

```sh
DOTFILES_PRIVATE_PROFILE="dwmkerr" # Use whatever name makes sense for you!
DOTFILES_PRIVATE_S3_BUCKET="dwmkerr-dotfiles-private"

# Run AWS configure to create the named profile - you will be asked to provide
# an access key and secret.
aws configure --profile "${DOTFILES_PRIVATE_PROFILE}"

# Backup private files with:
bash private-files/private-files-backup.sh

# Restore private files with:
bash private-files/private-files-restore.sh
```

You will be asked before backing up or restoring any file as an additional safety check, as these files are by their nature highly sensitive.

## Ubuntu Terminal Configuration

Set the [OneDark Theme](https://github.com/denysdovhan/one-gnome-terminal) with:

```sh
bash -c "$(curl -fsSL https://raw.githubusercontent.com/denysdovhan/gnome-terminal-one/master/one-dark.sh)"
```

## Shell Scripts and Aliases

The following features are loaded as part of my configuration. Check the link to the source if you'd like to copy over an individual feature for your own use.

## Shell Commands

The following shell commands are setup:

| Command                             | Usage                                                               |
| ----------------------------------- | ------------------------------------------------------------------- |
| **Quick Aliases**                   | [`shell.d/aliases.sh`](./shell.d/aliases.sh)                        |
| [`serve`](./shell.d/aliases.sh)     | Serve the current folder over HTTP on port 3000.                    |
| [`vinilla`](./shell.d/aliases.sh)   | Open `vi` without loading the `vimrc` (i.e. vanilla configuration). |
| **Basic Functions**                 |                                                                     |
| [`eachdir`](./shell.d/functions.sh) | Run a command in each child directory.                              |
| [`D`](./shell.d/functions.sh)       | Get the date in ISO86091 format (e.g. `2021-04-24`).                |
| [`mkd`](./shell.d/functions.sh)     | Make a directory, using `-p` and `cd` into it.                      |
| [`revcut`](./shell.d/functions.sh)  | Cut, but in reverse (i.e. from the last to the first delimiter).    |
| **Git Functions**                   |                                                                     |
| [`ghclone`](./shell.d/git.sh)       | Clone from GitHub, e.g: `ghclone dwmkerr/effective-shell`.          |

## Cheat Sheet - TMux

| Command                 | Usage                                                 |
| ----------------------- | ----------------------------------------------------- |
| `man tmux`              | Get help on commands.                                 |
| `<leader> ?`            | Get help on commands.                                 |
| `Ctrl + h/j/k/l`        | Navigate splits (vim aware)                           |
| `Meta + h/l`            | Move through tabs.                                    |
| `Ctrl + Meta + h/j/k/l` | Move through tabs.                                    |
| `move-window -r`        | Re-order the tab numbers (useful if there are gaps).  |
| `<leader> / S`          | Show Sessions with window preview, hit `x` to delete. |
| `<leader> / $`          | Rename session.                                       |
| `new -s <name>`         | New session with name.                                |
| `<leader> / Ctrl+S`     | Save Tmux Session                                     |
| `<leader> / Ctrl+R`     | Restore Tmux Session                                  |
| `<leader> /`            | Last split                                            |
| `<leader> {`            | Swap pane left                                        |
| `<leader> }`            | Swap pane right                                       |

## Cheat Sheet - Vim

Here's a quick reference. My `<Leader>` is `\`, so I've written shortcuts as `\x` rather than `<Leader>x` for brevity. I still need to port the above to the structure below.

| Command                              | Usage                                                                   |
| ------------------------------------ | ----------------------------------------------------------------------- |
| **Custom Commands**                  |                                                                         |
| `<leader>r`                          | Open current file in NERDTree.                                          |
| `<leader>w`                          | Write buffer.                                                           |
| `<leader>\\`                         | Open buffer in new tab.                                                 |
| `<leader>d`                          | Open word under cursor in Dash.                                         |
| `<leader>t`                          | Show current buffer in NERDTree.                                        |
| `<leader>f`                          | Toggle focus mode.                                                      |
| **Other Commands**                   |                                                                         |
| `\[<Space>`                          | blank line above                                                        |
| `]<Space>`                           | blank line below                                                        |
| `sj`                                 | Splitjoin down (i.e. split a line downwards).                           |
| `sk`                                 | Splitjoin up (i.e. join a line upwards).                                |
| `:Tabularize /=`                     | Line up selection, using '='                                            |
| **Navigation**                       |                                                                         |
| `gx`                                 | Open link or address under cursor.                                      |
| `gd`                                 | where possible, will go to a local definition.                          |
| **Spelling**                         |                                                                         |
| `]s` and `[s`                        | Next/Previous spelling error.                                           |
| `z=` and `zg`                        | Check dictionary / add to dictionary.                                   |
| **Markdown**                         | Provided by `vim-markdown`                                              |
| `]]` and `[[`                        | Next and previous headers.                                              |
| `gx`                                 | Open link in standard editor.                                           |
| **Focus**                            | From `vim-goyo` and `vim-limelight`                                     |
| `:Goyo`                              | Enter focus mode.                                                       |
| `:Limelight 0.8` and `:Limelight!`   | Go into limelight, 80% ultra focus, and toggle limelight.               |
| `let g:limelight_paragraph_span = 1` | Span more paragraphs in limelight.                                      |
| **Markdown Tables**                  |                                                                         |
| `\tm`                                | Enter/Exit 'table mode', which will dynamically format markdown tables. |
| `ci｜`                               | Example of the `｜` motion for cells - i.e. 'change-in-cell'.           |

Note: including the vertical pipe `|` in the table above would cause rendering issues. So instead, the unicode character `｜` is used to illustrate the commands. Do not use the unicode character, use the normal ASCII 0x7C character.

Other useful stuff:

- By default vim doesn't treat `-` as part of a word (for motions, search, autocomplete, etc). Use `set iskeyword+=-` to change this. This is the changed in my `vimrc` but a useful one to remember.

## Cheat Sheet - Shell

These are just some common commands I often forget:

| Command      | Usage                                                                                     |
| ------------ | ----------------------------------------------------------------------------------------- |
| `tput cvvis` | Show the cursor. Useful if it disappears when a command hides it and fails to restore it. |

### Vim

_Why Vim Plug over Vundle?_

I was impressed enough with the comments on [this post](https://erikzaadi.com/2016/02/11/moving-from-vundle-to-vim-plug/) to make the switch, particularly as [coc](https://github.com/neoclide/coc.nvim) doesn't support Vundle, meaning I had to give Plug a try.

## TODO

- [ ] Autocomplete for docker/k8s is still not properly setup.
- [ ] osx - mas (mac app store CLI: brew)
- [ ] osx - set icon
- [ ] node is not sourcing properly
- [ ] fix: long urls in tmux work if they span lines - _unless_ they are in `vim`
