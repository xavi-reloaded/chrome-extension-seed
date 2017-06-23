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

PasspackHandler = function() {
	this.PasspackAccounts = {A: []};
	this.NumberOfAccounts = 0;
	this.HasAccounts = false;
	this.IsInitialized = false;
	this.IsIniting = false;
};

PasspackHandler.prototype.Init = function() {
	if (!this.IsIniting) {
		this.IsIniting = true;
		this.PasspackAccounts = Settings.PasspackAccounts;
		this.IsInitialized = true;
		this.EnsureDefault();
		this.UpdateStatistics();
		this.IsIniting = false;
	}
};
PasspackHandler.prototype.Store = function() {
	if (this.IsInitialized) {
		Settings.PasspackAccounts = this.PasspackAccounts;
	} else {
		throw "PasspackHandler not initialized";
	}
};

PasspackHandler.prototype.AddUpdate = function(account) {
	if (this.IsInitialized) {
		this.Init(); // make sure we have the latest settings in memory
		var isPresent = false;
		for (i = 0; i < this.PasspackAccounts.A.length; i++) {
			if (this.PasspackAccounts.A[i].ID == account.ID) {
				isPresent = true;
				this.PasspackAccounts.A[i] = account;
			}
		}
		if (!isPresent) {
			var currentLength = this.PasspackAccounts.A.length;
			this.PasspackAccounts.A[currentLength] = account;
			this.PasspackAccounts.A[currentLength].IsDefault = false;
		}
		this.EnsureDefault();
		this.UpdateStatistics();
		this.Store();
	} else {
		throw "PasspackHandler not initialized";
	}
};
PasspackHandler.prototype.Get = function(accountID) {
	if (this.IsInitialized) {
		this.Init();
		for (i = 0; i < this.PasspackAccounts.A.length; i++) {
			if (this.PasspackAccounts.A[i].ID == accountID) {
				return this.PasspackAccounts.A[i];
			}
		}
		return undefined;
	} else {
		throw "PasspackHandler not initialized";
	}
}
PasspackHandler.prototype.SetDefault = function(accountID) {
	if (this.IsInitialized) {
		this.Init();
		for (i = 0; i < this.PasspackAccounts.A.length; i++) {
			if (this.PasspackAccounts.A[i].ID == accountID) {
				this.PasspackAccounts.A[i].IsDefault = true;
			} else {
				this.PasspackAccounts.A[i].IsDefault = false;
			}
		}
		this.EnsureDefault();
		this.UpdateStatistics();
		this.Store();
	} else {
		throw "PasspackHandler not initialized";
	}
};
PasspackHandler.prototype.Remove = function(accountID) {
	if (this.IsInitialized) {
		this.Init();
		var counter = 0;
		var newPasspackAccounts = {A: []};
		for (i = 0; i < this.PasspackAccounts.A.length; i++) {
			if (this.PasspackAccounts.A[i].ID != accountID) {
				newPasspackAccounts.A[counter] = this.PasspackAccounts.A[i];
				counter++;
			}
		}
		this.PasspackAccounts = newPasspackAccounts;
		this.EnsureDefault();
		this.UpdateStatistics();
		this.Store();
	} else {
		throw "PasspackHandler not initialized";
	}
};
PasspackHandler.prototype.ClearAll = function() {
	if (this.IsInitialized) {
		this.PasspackAccounts = {A: []};
		this.Store();
		this.UpdateStatistics();
	} else {
		throw "PasspackHandler not initialized";
	}
}

PasspackHandler.prototype.EnsureDefault = function() {
	if (this.IsInitialized) {
		var hasDefault = false;
		for (i = 0; i < this.PasspackAccounts.A.length; i++) {
			if (hasDefault && this.PasspackAccounts.A[i].IsDefault) {
				this.PasspackAccounts.A[i].IsDefault = false;
			}
			else if (this.PasspackAccounts.A[i].IsDefault) {
				hasDefault = true;
			}
		}
		if (!hasDefault && this.PasspackAccounts.A.length > 0) {
			this.PasspackAccounts.A[0].IsDefault = true;
		}
	} else {
		throw "PasspackHandler not initialized";
	}
};
PasspackHandler.prototype.UpdateStatistics = function() {
	if (this.IsInitialized) {
		this.NumberOfAccounts = this.PasspackAccounts.A.length;
		this.HasAccounts = this.PasspackAccounts.A.length > 0;
	} else {
		throw "PasspackHandler not initialized";
	}
};

PasspackHandler.prototype.ToString = function(extraJS) {
	if (this.IsInitialized) {
		var returnString = "";
		if (this.PasspackAccounts.A.length > 0) {
			for (i = 0; i < this.PasspackAccounts.A.length; i++) {
				var account = this.PasspackAccounts.A[i];
				returnString += "<li>";
				returnString += account.UserName;
				returnString += " [<a href=\"#\" onClick=\"passpackHandler.Remove('" + account.ID + "'); " + extraJS + "\">remove</a>]";
				if (account.IsDefault) {
					returnString += " <i>default</i>";
				} else {
					returnString += " [<a href=\"#\" onClick=\"passpackHandler.SetDefault('" + account.ID + "'); " + extraJS + "\">set default</a>]";
				}
				returnString += "</li>";
			}
		} else {
			returnString = "<li><i>no accounts configured</i></li>";
		}
		return "<ul>" + returnString + "</ul>";
	} else {
		throw "PasspackHandler not initialized";
	}
}

PasspackHandler.ParseData = function() {
	if ($("datainterface")) {
		return {
			Key: $("autologinkey").innerHTML,
			UserName: $("currentuserid").innerHTML,
			ID: $("userclientcode").innerHTML,
			Control: $("controlcode").innerHTML,
			IsDefault: false
		};
	} else {
		return undefined;
	}
}
