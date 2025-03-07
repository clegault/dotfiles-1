# IMPORTANT:
#
# There is no shebang in this script. This will be sourced from the user's
# current shell. So we might be using bash, zsh, etc. If we use an explicit
# shebang, we can guarantee the shell which will interpret the script, but
# cannot conditionally set up the user's _current_ shell.
#
# See the section near the end where we are sourcing auto-complete settings for
# an example of why this matters. If we use a shebang in this script, we'll only
# ever source auto-completions for the shell in the shebang.

# If we are not running interactively do not continue loading this file.
case $- in
    *i*) ;;
      *) return;;
esac

# Set our preferred editor (both visual and line mode to be safe).
EDITOR=vi
VISUAL=vi

# Import everything from the .shell.d folder.
for file in $HOME/.shell.d/*; do
    [ -e "$file" ] || continue
    source "$file"
done

# If we have a .private folder, source everything in it. This is useful for
# automatically loading things like project specific secrets.
if [[ -d $HOME/.shell-private.d ]]; then
    for private in $HOME/.shell-private.d/*; do
        [ -e "$private" ] || continue
        source "$private"
    done
fi

# Set a shell option but don't fail if it doesn't exist!
safe_set() { shopt -s "$1" >/dev/null 2>&1 || true; }

# Set some options to make working with folders a little easier. Note that we
# send all output to '/dev/null' as startup files should not write to the
# terminal and older shells might not have these options.
safe_set autocd         # Enter a folder name to 'cd' to it.
safe_set cdspell        # Fix minor spelling issues with 'cd'.
safe_set dirspell       # Fix minor spelling issues for commands.
safe_set cdable_vars    # Allow 'cd varname' to switch directory.

# Uncomment the below if you want to be able to 'cd' into directories that are
# not just relative to the current location. For example, if the below was
# uncommented we could 'cd my_project' from anywhere if 'my_project' is in
# the 'repos' folder.
#CDPATH="~:~/src"

# Configure the history to make it large and support multi-line commands.
safe_set histappend                  # Don't overwrite the history file, append.
safe_set cmdhist                     # Multi-line commands are one entry only.
PROMPT_COMMAND='history -a'          # Before we prompt, save the history.
#HISTSIZE=10000                       # A large number of commands per session.
#HISTFILESIZE=100000                  # A huge number of commands in the file.
# HISTCONTROL="ignorespace:ignoredup" # Ignore starting with space or duplicates?
# export HISTIGNORE="ls:history"     # Any commands we want to not record?
# HISTTIMEFORMAT='%F %T '            # Do we want a timestamp for commands?

# Add support to the terminal for colours.
#   See: https://github.com/nathanbuchar/atom-one-dark-terminal
export CLICOLOR=1
#export LSCOLORS=ExFxBxDxCxegedabagacad

# We're an xterm 256bit colour terminal, just in case anyone asks...
export TERM="xterm-256color"
alias tmux="tmux -2"

if [[ $COLORTERM = gnome-* && $TERM = xterm ]]  && infocmp gnome-256color >/dev/null 2>&1; then export TERM=gnome-256color
elif infocmp xterm-256color >/dev/null 2>&1; then export TERM=xterm-256color
fi

# Set the language. This is required for some Python tools.
# Fix 'perl: warning: Setting locale failed.'
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

# Load auto-completions depending on our shell.
# if [ -n "$BASH_VERSION" ]; then
#     # Source auto-completions from the Mac and Linux locations.
#     # Note that this is based on Bash Completion 2, which requires Bash 4 or onwards.
#     export BASH_COMPLETION_COMPAT_DIR="/usr/local/etc/bash_completion.d"
#     [[ -r "/usr/local/etc/shell.d/bash_completion.sh" ]] && . "/usr/local/etc/shell.d/bash_completion.sh"
#     if [ -f /etc/bash_completion ]; then . /etc/bash_completion; fi
# elif [ -n "$ZSH_VERSION" ]; then
#     # Source zsh auto-completions.
#     # fpath=($HOME/.zsh/completion $fpath)
#     # autoload -Uz compinit && compinit -i
# fi
