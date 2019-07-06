// Proxy settings for on and off
let onSettings = {
    proxyType: "manual",
    socks: "localhost:1080",
    socksVersion: 5,
    proxyDNS: true
};

let offSettings = {
    proxyType: "none",
};

// default is on
let currentSettings = onSettings;
browser.browserAction.setIcon({path: "icons/on_32.png"});
browser.browserAction.setTitle({title: "proxy on"});

// toggle between on and off settings
function toggleSettings() {

    if (currentSettings.proxyType === "none") {

        currentSettings = onSettings;
        browser.proxy.settings.set({value : onSettings});
        browser.browserAction.setIcon({path: "icons/on_32.png"});
        browser.browserAction.setTitle({title: "proxy on"});

    } else {
        currentSettings = offSettings;
        browser.proxy.settings.set({value : offSettings});
        browser.browserAction.setIcon({path: "icons/off_32.png"});
        browser.browserAction.setTitle({title: "proxy off"});
    }
}

// On click, call toggleSettings
browser.browserAction.onClicked.addListener(toggleSettings);
