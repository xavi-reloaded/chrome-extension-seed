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

Settings = {
	// Passpack accounts
	get PasspackAccounts() {
		if (localStorage["passpackkey"]) {
			try {
				return JSON.parse(localStorage["passpackkey"] + "");
			} catch (error) {
				return {A: []};
			}
		} else {
			return {A: []};
		}
	},
	set PasspackAccounts(value) {
		localStorage["passpackkey"] = JSON.stringify(value);
	},

	// AutoConfigure settings
	get AutoConfigure() {
		return localStorage["autoconfig"] == "1";
	},
	set AutoConfigure(value) {
		localStorage["autoconfig"] = (value ? "1" : "0");
	},

	// Keyboard shortcut settings
	get KeyboardShortcut() {
		if (localStorage["keysettings"]) {
			try {
				return JSON.parse(localStorage["keysettings"] + "");
			} catch (error) {
				return {
					Ctrl: false,
					Alt: false,
					Shift: false,
					Key: 0
				};
			}
		} else {
			return {
				Ctrl: false,
				Alt: false,
				Shift: false,
				Key: 0
			};
		}
	},
	set KeyboardShortcut(value) {
		if (value) {
			localStorage["keysettings"] = JSON.stringify(value);
		} else {
			localStorage["keysettings"] = "undefined";
		}
	},
	get KeyboardActive() {
		return localStorage["keysettings"] !== "undefined";
	},

	// Versioning information
	get Version() {
		if (localStorage["version"]) {
			return localStorage["version"] + "";
		} else {
			return "0.0.0.0";
		}
	},
	set Version(value) {
		localStorage["version"] = value;
	},
	get PreviousVersion() {
		if (localStorage["previousversion"]) {
			return localStorage["previousversion"] + "";
		} else {
			return "0.0.0.0";
		}
	},
	set PreviousVersion(value) {
		localStorage["previousversion"] = value;
	},

	// Parse interval settings
	get Interval() {
		return 1000;
	},

	// Menu settings
	get LoginMenu() {
		if (localStorage["loginmenu"]) {
			try {
				return JSON.parse(localStorage["loginmenu"] + "");
			} catch (error) {
				return {A: []};
			}
		} else {
			return {A: []};
		}
	},
	set LoginMenu(value) {
		localStorage["loginmenu"] = JSON.stringify(value);
	},
}
