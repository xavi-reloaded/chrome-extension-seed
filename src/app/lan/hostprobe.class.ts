import {LanUtils} from "./lan.utils";

export class HostProbe {

    private WS_BLOCKED_PORTS = [1,7,9,11,13,15,17,19,20,21,22,23,25,37,42,43,53,
    77,79,87,95,101,102,103,104,109,110,111,113,115,
    117,119,123,135,139,143,179,389,465,512,513,514,
    515,526,530,531,532,540,556,563,587,601,636,993,
    995,2049,4045,6000];

    private WS_BLOCKED_PORTS_OBJ = {};
    private WS_CHECK_INTERVAL = 10;
    private TIMEOUT = 1000;


    constructor(private address: string) {
        if (!address) throw "HostProbe needs an address param.";
        this.address=address;
        LanUtils.each(this.WS_BLOCKED_PORTS, function(v, k) {
            this.WS_BLOCKED_PORTS_OBJ[''+k] = true;
        }.bind(this));

    }


    public fire(callback) {
        // skip blocked ports
        let matches = this.address.match(/\:(\d+)$/) || ['', '80'];
        let port = parseInt(matches[1], 10);
        // feature detect and run
        if ('WebSocket' in window && !this._illegalWebSocketPort(port)) {
            this._sendWebSocketRequest(callback);
        } else {
            this._sendImgRequest(callback);
        }
    }

    public _illegalWebSocketPort(port) {
        return this.WS_BLOCKED_PORTS_OBJ[''+port] || false;
    };

    public _sendWebSocketRequest(callback) {
        // create the websocket and remember when we started
        var startTime = new Date();
        try {
            var socket = new WebSocket('ws://'+this.address);
        } catch (sec_exception) {
            if (callback) callback('error', 0);
            return;
        }
        // called at a fast interval
        var check_socket = function() {
            let delta = +new Date() - +startTime;
            // check if the port has timed out
            if (delta > this.TIMEOUT) {
                try { socket.close(); } catch(e) {}
                if (callback) callback('timeout', delta);
                return;
            } else if (socket.readyState !== 0) {
                if (callback) callback('up', delta);
                return;
            }
            setTimeout(check_socket, this.WS_CHECK_INTERVAL);
        };
        // wait a sec, then start the checks
        setTimeout(check_socket, this.WS_CHECK_INTERVAL);
    };

    public _sendImgRequest(callback) {
        // create the image object and attempt to load from #src
        var clearme = null; // for holding a timeout ref
        var startTime = new Date();
        var img = new Image();
        var delta = function() { return (+new Date()) - +startTime; };

        let completed = function() {
            if (img) {
                img = null;
                clearTimeout(clearme);
                if (callback) callback('up', delta());
                return;
            }
        };

        let checkTimeout = function() {
            if (img) {
                img = null;
                if (callback) callback('timeout', delta());
            }
        };

        // if the request takes to long, report 'timeout' state
        clearme = setTimeout(checkTimeout, this.TIMEOUT);
        // trigger the request
        img.onload = img.onerror = completed; // TODO: ensure this works in IE.
        img.src = window.location.protocol + '//' + this.address;
    };

}