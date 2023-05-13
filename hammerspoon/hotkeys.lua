-- Hyper Key  {{{
hs.loadSpoon("Hyper")
hs.loadSpoon("Helpers")
 
slack = "com.tinyspeck.slackmacgap"
discord = 'com.hnc.Discord'
chrome = "com.vivaldi.Vivaldi"
vscode = "com.microsoft.VSCode"
arc = "company.thebrowser.Browser"

hs.hotkey.bind({"cmd", "shift", "alt", "ctrl"}, "f", function()
    _mouseOrigin = hs.mouse.absolutePosition()
    local win = hs.window.focusedWindow()
    _clickPoint = win:zoomButtonRect()
    _clickPoint.x = _clickPoint.x + _clickPoint.w -5
    _clickPoint.y = _clickPoint.y + (_clickPoint.h / 2)
    hs.mouse.absolutePosition(_clickPoint)
    hs.eventtap.leftClick(_clickPoint)
    hs.mouse.absolutePosition(_mouseOrigin)
end)

hyper:app(slack)
    :action("open", {
        default = combo({"cmd"}, "k"),
    })
    :action('navigate', {
        up = combo({'cmd', 'shift'}, ']'),
        down = combo({'cmd', 'shift'}, '['),
        back = combo({'cmd'}, '['),
        forward = combo({'cmd'}, ']'),
    })
 
hyper:app('fallback')
    :action('copy', {
        default = combo({'cmd'}, 'c'),
    })
    :action('paste', {
        default = combo({'cmd'}, 'v'),
    })
    :action('insert', {
        default = combo({'cmd', 'shift', 'option', 'control'}, 'i'), -- Raycast clipboard
    })
    :action('execute', {
        default = combo({'shift', 'option', 'control'}, '.'),
    })
    -- Hyper-delete Locks the screen
    :action('lock', {
        default = combo({'cmd', 'shift', 'option', 'control'}, 'delete'),
    })
    :action('windowSize', {
        up = combo({'cmd', 'option', 'control'}, '8'),
        down = combo({'cmd', 'option', 'control'}, '2'),
        left = combo({'cmd', 'option', 'control'}, '4'),
        right = combo({'cmd', 'option', 'control'}, '6'),
        center = combo({'cmd', 'option', 'control'}, '5'),
    })
    :action('open', {
        Kitty = function() hs.application.launchOrFocus("Kitty") end,
        console = function() hs.toggleConsole() end,
        slack = function() hs.application.launchOrFocus("Slack") end,
        calendar = function() hs.application.launchOrFocus("Calendar") end,
        teams = function() hs.application.launchOrFocus("Microsoft Teams") end,
        arc = function() hs.application.launchOrFocus("Arc") end,
        discord = function() hs.application.launchOrFocus("Discord") end,
        messages = function() hs.application.launchOrFocus("Messages") end,
    })
    -- Hyper-f Make frontmost app fullscreen
    :action('fullscreen', {
        default = combo({'cmd', 'option', 'control', 'shift'}, 'f'),
    })  
    -- Hyper-\ Toggle dark mode
    :action('darkToggle', {
        default = function() toggleDarkMode() end,
    })
    -- Set screen brightness
    :action('changeBrightness', {
        -- Hyper-1 for brightness down
        up = function() changeBrightnessInDirection(-1) end,
        -- Hyper-2 for brightness up
        down = function() changeBrightnessInDirection(1) end,
    })
    -- Hyper-b toggle showing the grid for the screen
    :action('gridToggle', {
        default = function() hs.grid.toggleShow() end,
    })
    :action('emoji', {
        picker = function() startEmojiPicker() end,

    })


-- }}}

hyper:app(discord)
    :action('open', {
        default = combo({'cmd'}, 'k'),
    })

hyper:app(chrome)
    :action('navigate', {
        up = combo({'cmd', 'shift'}, ']'),
        down = combo({'cmd', 'shift'}, '['),
        back = combo({'cmd'}, '['),
        forward = combo({'cmd'}, ']'),
    })
    :action('copy', {
        default = copy(keys('yy')),
    })

hyper:app(arc)
    :action('open', {
        default = combo({'cmd'}, 'l'),
    })
    :action('navigate', {
        up = combo({'cmd', 'shift'}, ']'),
        down = combo({'cmd', 'shift'}, '['),
        back = combo({'cmd'}, '['),
        forward = combo({'cmd'}, ']'),
    })

hyper:app(vscode)
    :action('open', {
        default = combo({'cmd', 'shift'}, 'p'),
    })
    :action('copy', {
        default = copy(combo({'cmd', 'option', 'control'}, 'y')),
    })
    :action('execute', {
        default = combo({'cmd', 'shift'}, 'p'),
    })

-- }}}