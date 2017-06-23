//	Copyright 2011 - Kenneth Henderick
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

ExtensionHelper = function() {
	this.ShouldRun = false;
	this.TimeOut;
	this.IsRunning = false;
}

ExtensionHelper.prototype.FetchPasspackKey = function(tabId) {
	this.SetIcon("fetching", tabId);
	chrome.tabs.sendRequest(tabId, {command: "getpasspackkey"}, function(response) {
		if (response && response.result) {
			if (response.result.ID != "") {
				passpackHandler.AddUpdate(response.result);
			}
		}
	});
	this.UpdateFeatures();
	this.UpdateIcon(tabId);
}

ExtensionHelper.prototype.StartAutoFetchPasspackKey = function(tabId) {
	if (!this.IsRunning) {
		this.IsRunning = true;
		this.AutoFetchPasspackKey(tabId);
	}
}

ExtensionHelper.prototype.AutoFetchPasspackKey = function(tabId) {
	this.FetchPasspackKey(tabId);
	if (this.ShouldRun) {
		this.TimeOut = setTimeout("extensionHelper.AutoFetchPasspackKey(" + tabId + ")", Settings.Interval);
	}
}

ExtensionHelper.prototype.ProcessKey = function(ctrl, alt, shift, code) {
	keyboardHandler.Init();
	passpackHandler.Init();
	if (keyboardHandler.Active && passpackHandler.HasAccounts) {
		if (keyboardHandler.Settings.Ctrl == ctrl
			&& keyboardHandler.Settings.Alt == alt
			&& keyboardHandler.Settings.Shift == shift
			&& keyboardHandler.Settings.Key == code) {
			var objectarray = passpackHandler.PasspackAccounts.A;
			for (i = 0; i < objectarray.length; i++) {
				if (objectarray[i].IsDefault) {
					chrome.tabs.executeScript(null, {code: "contentHelper.LoadPasspackCode();"});
					chrome.tabs.executeScript(null, {code: "setTimeout(contentHelper.RunPasspackCode('" + objectarray[i].Key + "', '" + objectarray[i].Control + "'), 100);"});
				}
			}
		}
	}
}
ExtensionHelper.prototype.CheckTab = function(tab) {
	if (Settings.AutoConfigure) {
		if (tab.url.indexOf("passpack.com") != -1) {
			this.ShouldRun = true;
			this.TimeOut = setTimeout("extensionHelper.StartAutoFetchPasspackKey(" + tab.id + ")", 10);
		} else {
			this.ShouldRun = false;
			clearTimeout(this.TimeOut);
			this.IsRunning = false;
			this.UpdateIcon(tab.id);
		}
	} else {
		this.ShouldRun = false;
		clearTimeout(this.TimeOut);
		this.IsRunning = false;
		this.UpdateIcon(tab.id);
	}
}
ExtensionHelper.prototype.Login = function(tabId) {
	passpackHandler.Init();
	if (passpackHandler.HasAccounts) {
		var objectarray = passpackHandler.PasspackAccounts.A;
		if (objectarray.length == 1) {
			chrome.tabs.executeScript(tabId, {code: "contentHelper.LoadPasspackCode();"});
			chrome.tabs.executeScript(tabId, {code: "setTimeout(contentHelper.RunPasspackCode('" + objectarray[0].Key + "', '" + objectarray[0].Control + "'), 100);"});
		}
	}
}
ExtensionHelper.prototype.ClickLink = function(passpackkey, control) {
	chrome.tabs.executeScript(null, {code: "contentHelper.LoadPasspackCode();"});
	chrome.tabs.executeScript(null, {code: "setTimeout(contentHelper.RunPasspackCode('" + passpackkey + "', '" + control + "'), 100);"});
}
ExtensionHelper.prototype.OpenOptions = function(passpackkey, control) {
	chrome.tabs.executeScript(null, {code: "contentHelper.LoadPasspackCode();"});
	chrome.tabs.executeScript(null, {code: "setTimeout(contentHelper.RunPasspackOptionsCode('" + passpackkey + "', '" + control + "'), 100);"});
}

ExtensionHelper.prototype.ClickMenu = function(info, tab) {
	if (info && tab) {
		for (j = 0; j < Settings.LoginMenu.A.length; j++) {
			var item = Settings.LoginMenu.A[j];
			if (info.menuItemId == item.MenuID) {				
				var account = passpackHandler.Get(item.AccountID);
				if (item.TypeID == 1) {
					this.ClickLink(account.Key, account.Control);
				} else if (item.TypeID == 2) {
					this.OpenOptions(account.Key, account.Control);
				}
			}
		}
	}
}

ExtensionHelper.prototype.SetIcon = function(status, tabId) {
	if (tabId) {
		chrome.browserAction.setIcon({
			path: "icons/" + status + ".png",
			tabId: tabId
		});
	} else {
		chrome.browserAction.setIcon({
			path: "icons/" + status + ".png"
		});
	}
}
ExtensionHelper.prototype.UpdateIcon = function(tabId) {
	passpackHandler.Init();
	var keys = passpackHandler.NumberOfAccounts;
	if (keys > 1) {
		this.SetIcon("icon", tabId);
		chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
		chrome.browserAction.setBadgeText({text: "" + keys});
	} else if (keys == 1) {
		this.SetIcon("icon", tabId);
		chrome.browserAction.setBadgeBackgroundColor({color: [85, 167, 242, 255]});
		chrome.browserAction.setBadgeText({text: ""});
	} else {
		this.SetIcon("disabled", tabId);
		chrome.browserAction.setBadgeBackgroundColor({color: [85, 167, 242, 255]});
		chrome.browserAction.setBadgeText({text: "0"});
	}
}
ExtensionHelper.prototype.UpdateFeatures = function() {
	this.ConfigurePopupSettings();
	this.ConfigureMenus();
}
ExtensionHelper.prototype.ConfigurePopupSettings = function() {
	passpackHandler.Init();
	if (passpackHandler.NumberOfAccounts > 1) {
		chrome.browserAction.setPopup({popup: "popup.html"});
	} else {
		chrome.browserAction.setPopup({popup: ""});
	}
}
ExtensionHelper.prototype.ConfigureMenus = function() {
	passpackHandler.Init();
	chrome.contextMenus.removeAll();
	Settings.LoginMenu = {A: []};
	Settings.OptionsMenu = {A: []};
	if (passpackHandler.HasAccounts) {
		if (passpackHandler.NumberOfAccounts > 1) {
			var menuSettings = {A: []};
			var loginMenuId = chrome.contextMenus.create({
				title: "Login..."
			});
			var optionMenuId = chrome.contextMenus.create({
				title: "Options..."
			});
			for (i = 0; i < passpackHandler.NumberOfAccounts; i++) {
				var account = passpackHandler.PasspackAccounts.A[i];
				var menuId = chrome.contextMenus.create({
					title: account.UserName,
					parentId: loginMenuId,
					onclick: function(info, tab) { extensionHelper.ClickMenu(info, tab); }
				});
				var optionId = chrome.contextMenus.create({
					title: account.UserName,
					parentId: optionMenuId,
					onclick: function(info, tab) { extensionHelper.ClickMenu(info, tab); }
				});
				menuSettings.A[menuSettings.A.length] = {TypeID: 1, MenuID: menuId, AccountID: account.ID};
				menuSettings.A[menuSettings.A.length] = {TypeID: 2, MenuID: optionId, AccountID: account.ID};
			}
			Settings.LoginMenu = menuSettings;
		} else {
			var menuId = chrome.contextMenus.create({
				title: "Login",
				onclick: function(info, tab) { extensionHelper.ClickMenu(info, tab); }
			});
			var optionId = chrome.contextMenus.create({
				title: "Options",
				onclick: function(info, tab) { extensionHelper.ClickMenu(info, tab); }
			});
			Settings.LoginMenu = {
				A: [
					{TypeID: 1, MenuID: menuId, AccountID: passpackHandler.PasspackAccounts.A[0].ID},
					{TypeID: 2, MenuID: optionId, AccountID: passpackHandler.PasspackAccounts.A[0].ID}
				]
			};
		}
	}
}

ExtensionHelper.prototype.Init = function() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', chrome.extension.getURL('manifest.json'), false);
	xhr.send(null);
	var manifest = JSON.parse(xhr.responseText);

	var currentVersion = manifest.version;
	var previousVersion = Settings.Version
	
	Settings.PreviousVersion = previousVersion;
	Settings.Version = currentVersion;
	
	if (currentVersion != previousVersion) {
		// this is a new version, let's open the options screen.
		chrome.tabs.create({url: 'options.html'});
	}
}
