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

// set proxy on
function proxyOn() {
    browser.proxy.settings.set({value : onSettings});
    browser.browserAction.setIcon({path: "icons/on_32.png"});
    browser.browserAction.setTitle({title: "proxy on"});
    let settingState = browser.storage.local.set({
        proxyState : "on"
    });
    settingState.then(onSet, onSetError);
    state = "on";
}

// set proxy off
function proxyOff() {
    browser.proxy.settings.set({value : offSettings});
    browser.browserAction.setIcon({path: "icons/off_32.png"});
    browser.browserAction.setTitle({title: "proxy off"});
    let settingState = browser.storage.local.set({
        proxyState : "off"
    });
    settingState.then(onSet, onSetError);
    state = "off";
}

// toggle between on and off settings
function toggleSettings() {
    if (state === "off") {
        proxyOn();
    } else {
        proxyOff();
    }
}

// set desired state
function setSettings() {
    if (state === "off") {
        proxyOff();
    } else {
        proxyOn();
    }
}

// define callback functions for reading and writing local storage
function onGetError(error) {
    console.log(`Error: ${error}`);
    setSettings();
}

function onSetError(error) {
    console.log(`Error: ${error}`);
}

function onGot(item) {
    //console.log(item);
    if (item.proxyState) {
        state = item.proxyState;
    }
    setSettings();
}

function onSet(item) {
}

// On click, call toggleSettings
browser.browserAction.onClicked.addListener(toggleSettings);

// at startup retrieve last state or start with proxy off
state = "off";

let gettingState = browser.storage.local.get("proxyState");
gettingState.then(onGot, onGetError);

