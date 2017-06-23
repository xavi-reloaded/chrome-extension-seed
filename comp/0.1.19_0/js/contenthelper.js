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

ContentHelper = function() {
	this.CodeLoaded = false;
}

ContentHelper.prototype.ContentScriptTest = function () {
	alert(location.href);
}
ContentHelper.prototype.LoadPasspackCode = function() {
	if (!this.CodeLoaded) {
		this.InsertScript("\
			var D; var o; var s; var K; var _P; \
			function loadPasspack(passpackkey, control) { \
				D = document; \
				o = (new Date()).getTime(); \
				K = passpackkey; \
				if (typeof _P != 'object' || _P.k != K || !_P.o) { \
					_P = { \
						k: K, \
						h: D.getElementsByTagName('head')[0] || D.documentElement, \
						u: 'https://www.passpack.com/', \
						a: 0, \
						c: control \
					} \
				} \
				s = _P.s = D.createElement('script'); \
				s.src = _P.u + '?t=1&g=1&u=' + encodeURIComponent(location.href) + '&v=2.2&r=' + o + '&a=0&c=' + _P.c + ''; \
				_P.h.appendChild(s); \
				_P.a = _P.o = 0; \
				if (!_P.o) { \
					_P.o = o; \
				} \
			} \
			function loadPasspackOptions(passpackkey, control) { \
				D = document; \
				o = (new Date()).getTime(); \
				K = passpackkey; \
				if (typeof _P != 'object' || _P.k != K || !_P.o) { \
					_P = { \
						k: K, \
						h: D.getElementsByTagName('head')[0] || D.documentElement, \
						u: 'https://www.passpack.com/', \
						a: 0, \
						c: control \
					} \
				} \
				s = _P.s = D.createElement('script'); \
				s.src = _P.u + '?t=1&g=1&u=' + encodeURIComponent(location.href) + '&v=2.2&r=' + o + '&a=1&c=' + _P.c + ''; \
				_P.h.appendChild(s); \
			} \
		");
		this.CodeLoaded = true;
	}
}
ContentHelper.prototype.RunPasspackCode = function(passpackkey, control) {
	this.InsertScript("loadPasspack(\"" + passpackkey + "\", \"" + control + "\");");
}
ContentHelper.prototype.RunPasspackOptionsCode = function(passpackkey, control) {
	this.InsertScript("loadPasspackOptions(\"" + passpackkey + "\", \"" + control + "\");");
}
ContentHelper.prototype.InsertScript = function(script) {
	var head = $tag("head")[0] || document.documentElement;
	var scriptelement = document.createElement("script");
	scriptelement.type = "text/javascript";
	scriptelement.innerHTML = script;
	head.appendChild(scriptelement);
}
ContentHelper.prototype.Init = function() {
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		if (request.command == "getpasspackkey") {
			var parsedData = PasspackHandler.ParseData();
			sendResponse({result: parsedData});
		} else {
			sendResponse({result: undefined});
		}
	});
	window.addEventListener('keydown', this.SendKey, false);
}
ContentHelper.prototype.SendKey = function(e) {
	chrome.extension.sendRequest({
		command: "processkey", 
		ctrl: e.ctrlKey,
		alt: e.altKey,
		shift: e.shiftKey,
		code: e.keyCode
	});
}
