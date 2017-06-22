import {DiscoverByRtc} from "./discover.ip.implementations";
import {LanUtils} from "./lan.utils";
import {HostScan} from "./hostscan.class";
import {LanObject} from "./lan.object";
import {IDevice} from "./lan.interface";

export class LanCommons implements IDevice {

    private RTCPeerConnection: any;

    // you must do this on the calling:
    // var RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

    constructor(RTCPeerConnection: any) {
        this.RTCPeerConnection = RTCPeerConnection;
    }

    public getDeviceIpFromUIID(UUID:string): any {

        let discoverIP = new DiscoverByRtc(this.RTCPeerConnection);

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
                        if (obj.address=='up') window.console.log(obj.address + obj.state);
                    }

                    let ipCandidates = LanUtils.getIpWithUpState(tmp);

                    window.console.info('FINISHED: ['+results.length+']'+ipCandidates.length);

                    ipCandidates.forEach(function(candidate){
                        let url = 'http://'+candidate.address+'/'+UUID;
                        window.console.info('try to get '+url);
                        let request = $.ajax({
                            dataType: "json",
                            url: url,
                            data: UUID,
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