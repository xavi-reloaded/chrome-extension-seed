import {DiscoverByRtc} from "./discover.ip.implementations";
import {LanUtils} from "./lan.utils";
import {HostScan} from "./hostscan.class";
import {LanObject} from "./lan.object";

export class LanCommons {

    constructor() {}

    public getDeviceIpFromUIID(UIID:string): any {

        let RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
        let discoverIP = new DiscoverByRtc(RTCPeerConnection);

        var def = $.Deferred();
        discoverIP.getlocalIp().then(function(data){
            let localIp = data.ip;
            let ipRange = LanUtils.getIpRange(localIp);
            let hostScan = new HostScan(ipRange);
            hostScan.start({
                complete: function(results) {
                    let tmp: Array<LanObject> = new Array;
                    for(let x=0;x<results.length;x++) {
                        let obj=results[x];
                        tmp.push(new LanObject(obj.address,obj.state,obj.duration));
                    }

                    var ipCandidates = LanUtils.getIpWithUpState(tmp);
                    window.console.info('FINISHED: RETRIEVING URL for '+results.length);
                    window.console.info('FINISHED: RETRIEVING URL for '+ipCandidates.length);
                    ipCandidates.forEach(function(candidate){
                        let url = 'http://'+candidate.address+'/'+UIID;
                        window.console.info('try to get '+url);
                        let request = $.ajax({
                            dataType: "json",
                            url: url,
                            data: UIID,
                            success: function( ) { def.resolve({ ip:candidate.address }); },
                            timeout: 500
                        }).fail( function( xhr, status ) {
                            if( status == "timeout" ) {
                                window.console.info('not found '+url);
                            }
                        });

                    });
                }
            });
        });
        return def;
    }
}