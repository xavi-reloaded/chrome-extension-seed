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

KeyboardHandler = function() {
	this.Settings = {
		Ctrl: false,
		Alt: false,
		Shift: false,
		Key: 0
	};
	this.Active = false;
	this.TempSettings = {
		Ctrl: false,
		Alt: false,
		Shift: false,
		Key: 0
	};
	this.TempActive = false;
	this.IsInitialized = false;
};

KeyboardHandler.prototype.Init = function() {
	this.Settings = {
		Ctrl: false,
		Alt: false,
		Shift: false,
		Key: 0
	};
	this.Active = false;
	this.TempSettings = {
		Ctrl: false,
		Alt: false,
		Shift: false,
		Key: 0
	};
	this.TempActive = false;
	if (Settings.KeyboardActive) {
		this.TempSettings = this.Settings = Settings.KeyboardShortcut;
		this.TempActive = this.Active = true;
	}
	this.IsInitialized = true;
};
KeyboardHandler.prototype.Store = function() {
	if (this.IsInitialized) {
		if (this.Active) {
			Settings.KeyboardShortcut = this.Settings;
		} else {
			Settings.KeyboardShortcut = undefined;
		}
	} else {
		throw "KeyboardHandler not initialized";
	}
};

KeyboardHandler.prototype.Clear = function() {
	if (this.IsInitialized) {
		this.Settings = {
			Ctrl: false,
			Alt: false,
			Shift: false,
			Key: 0
		};
		this.Active = false;
		this.Store();
	} else {
		throw "KeyboardHandler not initialized";
	}
};
KeyboardHandler.prototype.LoadKey = function(ctrl, alt, shift, key) {
	if (this.IsInitialized) {
		if (key == 46 || (ctrl === false && alt === false && shift === false)) {
			this.TempSettings = {
				Ctrl: false,
				Alt: false,
				Shift: false,
				Key: 0
			};
			this.TempActive = false;
		} else {
			this.TempSettings = {
				Ctrl: ctrl,
				Alt: alt,
				Shift: shift,
				Key: key
			};
			this.TempActive = true;
		}
	} else {
		throw "KeyboardHandler not initialized";
	}
};
KeyboardHandler.prototype.LoadTemp = function() {
	if (this.IsInitialized) {
		this.Settings = this.TempSettings;
		this.Active = this.TempActive;
	} else {
		throw "KeyboardHandler not initialized";
	}
}

KeyboardHandler.prototype.ToString = function() {
	if (this.IsInitialized) {
		if (this.Active) {
			return (this.Settings.Ctrl ? "CTRL+" : "") + (this.Settings.Alt ? "ALT+" : "") + (this.Settings.Shift ? "SHIFT+" : "") + String.fromCharCode(this.Settings.Key);
		} else {
			return "";
		}
	} else {
		throw "KeyboardHandler not initialized";
	}
};
KeyboardHandler.prototype.TempToString = function() {
	if (this.IsInitialized) {
		if (this.TempActive) {
			return (this.TempSettings.Ctrl ? "CTRL+" : "") + (this.TempSettings.Alt ? "ALT+" : "") + (this.TempSettings.Shift ? "SHIFT+" : "") + String.fromCharCode(this.TempSettings.Key);
		} else {
			return "";
		}
	} else {
		throw "KeyboardHandler not initialized";
	}
};
