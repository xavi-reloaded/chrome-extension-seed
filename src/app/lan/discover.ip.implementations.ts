import {DiscoverIpService} from "./discover.ip.interface";

export class DiscoverByWebIpinfo implements DiscoverIpService {

    getlocalIp(): any {
        var def = $.Deferred();
        $.getJSON('http://ipinfo.io')
            .done(function(data){
                window.console.log(data);
                def.resolve({ ip:data.ip });
            });
        return def;
    }

}

export class DiscoverByRtc implements DiscoverIpService {

    private RTCPeerConnection: any;

    // you must do this on the calling:
    // var RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

    constructor(RTCPeerConnection: any) {
        this.RTCPeerConnection = RTCPeerConnection;
    }


    run(callback) {

        var RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
        var addrs = { "0.0.0.0": false };

        var rtc = new RTCPeerConnection({iceServers: []});
        rtc.createDataChannel('', {reliable:false});

        rtc.onicecandidate = function (evt) {
            if (evt.candidate) grepSDP("a="+evt.candidate.candidate);
        };

         rtc.createOffer(function (offerDesc) {
            grepSDP(offerDesc.sdp);
            rtc.setLocalDescription(offerDesc);
        }, function (e) { callback("mierder happened"); });

        function processIPs(newAddr) {
            if (newAddr in addrs) return;
            if (!newAddr.match(/^\d+\.\d+\.\d+\.\d+$/)) return;
            else addrs[newAddr] = true;

            callback(false, newAddr);
        }

        function grepSDP(sdp) {
            var parts, addr, type;
            var hosts = [];

            sdp.split('\r\n').forEach(function (line) {
                if (~line.indexOf("a=candidate")) {
                    parts = line.split(' ');
                    addr = parts[4];
                    type = parts[7];
                    if (type === 'host') processIPs(addr);
                } else if (~line.indexOf("c=")) {
                    parts = line.split(' ');
                    addr = parts[2];
                    processIPs(addr);
                }
            });
        }
}

    getlocalIp(): any {
        var def = $.Deferred();
        this.run(function(error,addr){
            if (error) {
                def.resolve({ error:error, ip:'' });
            } else {
                window.console.log('detected local '+ addr);
                def.resolve({ ip:addr });
            }
        });
        return def;
    }

}