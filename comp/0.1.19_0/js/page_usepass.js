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
var extensionHelper = new ExtensionHelper("extensionHelper");
var keyboardHandler = new KeyboardHandler();

passpackHandler.Init();
keyboardHandler.Init();
extensionHelper.Init();

extensionHelper.UpdateIcon();
extensionHelper.UpdateFeatures();

chrome.browserAction.onClicked.addListener(function(tab) {
    if (tab.url.indexOf("passpack.com") == -1) {
        extensionHelper.Login(tab.id);
    }
    else
    {
        extensionHelper.FetchPasspackKey(tab.id);
    }
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.get(tabId, function(tab) {
        extensionHelper.CheckTab(tab);
    });
});
chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
    chrome.tabs.get(tabId, function(tab) {
        extensionHelper.CheckTab(tab);
    });
});
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.command == "processkey") {
        extensionHelper.ProcessKey(request.ctrl, request.alt, request.shift, request.code);
    }
});

// Google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-22616883-4']);
_gaq.push(['_trackPageview']);
(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
