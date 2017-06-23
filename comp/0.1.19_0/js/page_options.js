//	Copyright 2013 - Kenneth Henderick
//	Website: http://www.ketronic.be
//
//	This file is part of UsePass.
//
//	UsePass is free software: you can redistribute it and/or modify
//	it under the terms of the GNU General Public License as published by
//	the Free Software Foundation, either version 3 of the License, or
//	(at your option) any later version.
//
//	UsePass is distributed in the hope that it will be useful,
//	but WITHOUT ANY WARRANTY; without even the implied warranty of
//	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//	GNU General Public License for more details.
//
//	You should have received a copy of the GNU General Public License
//	along with UsePass.  If not, see <http://www.gnu.org/licenses/>.

var passpackHandler = new PasspackHandler("passpackHandler");
var keyboardHandler = new KeyboardHandler();
var extensionHelper = new ExtensionHelper("extensionHelper");

passpackHandler.Init();
keyboardHandler.Init();
extensionHelper.Init();
extensionHelper.PasspackHandler = passpackHandler;

function autoLoadKeys() {
    loadKeys();
    setTimeout(autoLoadKeys, 1000);
}
function loadKeys() {
    passpackHandler.Init();
    extensionHelper.UpdateFeatures();
    $("passpackkey").innerHTML = passpackHandler.ToString("loadKeys();");
}
function loadSettings() {
    $("autoconfig").checked = Settings.AutoConfigure
    $("speedkeys").value = keyboardHandler.ToString();
    $("keyactive").innerHTML = keyboardHandler.Active ? "active" : "inactive";
}
function loadDebug(visible) {
    var rawHTML = "";
    rawHTML += (visible ? "<pre>" : "<!--") + "\n";
    rawHTML += "PasspackAccounts: " + localStorage.passpackkey + "\n";
    rawHTML += "AutoConfigure: " + localStorage.autoconfig + "\n";
    rawHTML += "KeyboardShortcut: " + localStorage.keysettings + "\n";
    rawHTML += "Version: " + localStorage.version + "\n";
    rawHTML += "PreviousVersion: " + localStorage.previousversion + "\n";
    rawHTML += "LoginMenu: " + localStorage.loginmenu + "\n";
    rawHTML += (visible ? "</pre> " : "-->") + "\n";
    $("raw").innerHTML = rawHTML;
}
function clearAllKeys() {
    passpackHandler.ClearAll();
    loadKeys();
    extensionHelper.UpdateFeatures();
    extensionHelper.UpdateIcon();
}
function keyListener(e) {
    keyboardHandler.LoadKey(e.ctrlKey, e.altKey, e.shiftKey, e.keyCode);
    $("speedkeys").value = keyboardHandler.TempToString();
    $("keyactive").innerHTML = keyboardHandler.Active ? "active" : "inactive";
}
function saveSettings() {
    Settings.AutoConfigure = $("autoconfig").checked;
    keyboardHandler.LoadTemp();
    keyboardHandler.Store();
    $("keyactive").innerHTML = keyboardHandler.Active ? "active" : "inactive";
}
function loadVersion() {
    $("currentversion").innerHTML = Settings.Version;
    if (Settings.Version != Settings.PreviousVersion) {
        $("newversionwarning").innerHTML = "<br /><b>You have installed a new version. Make sure to restart your browser for the changes to take effect.</b>";
    }
}

// Google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-22616883-4']);
_gaq.push(['_trackPageview']);
(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// Even handlers
window.addEventListener("load", function() {
    autoLoadKeys();
    loadSettings();
    loadVersion();
    loadDebug(false);
});
$("removeaccounts").addEventListener("click", clearAllKeys);
$("speedkeys").addEventListener("focus", function() {
    window.addEventListener('keydown', keyListener, false);
});
$("savesettings").addEventListener("click", saveSettings);
$("loadsettings").addEventListener("click", loadSettings);
$("debug").addEventListener("click", function() {
    loadDebug(this.checked);
});
