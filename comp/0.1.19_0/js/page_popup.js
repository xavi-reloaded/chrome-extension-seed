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

passpackHandler.Init();

function fill() {
    var listHTML = "";
    if (passpackHandler.NumberOfAccounts > 1) {
        for (i = 0; i < passpackHandler.PasspackAccounts.A.length; i++) {
            var currentAccount = passpackHandler.PasspackAccounts.A[i];
            listHTML += "<li><a href=\"#\" onClick=\"extensionHelper.ClickLink('" + currentAccount.Key + "', '" + currentAccount.Control + "'); window.close()\">" + currentAccount.UserName + "</a></li>";
        }
    }
    $("accounts").innerHTML = listHTML;
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
window.addEventListener("load", fill);