import {DiscoverByWebIpinfo, DiscoverByRtc} from "../../../src/app/lan/discover.ip.implementations";


describe("Discover IP", () => {

    describe("getlocalIp", () => {

        it("DiscoverByWebIpinfo should find WAN ip", (done) => {
            var actual;
            let sut = new DiscoverByWebIpinfo();
            sut.getlocalIp().done(function(data){
                actual = data.ip;
                expect(actual).not.toBe(null);
                done();
            });
        });

        it("DiscoverByRtc should find LAN ip", (done) => {
            var actual;
            let RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
            let sut = new DiscoverByRtc(RTCPeerConnection);

            function isLocalIp(ip: string) {
                let net:number = +ip.substring(0,ip.indexOf('.'));
                switch (net) {
                    case 192: return true;
                    case 172: return true;
                    case 10: return true;
                }
                return false;
            }

            sut.getlocalIp().then(function(data){
                actual = data.ip;
                expect(true).toBe(isLocalIp(actual));
                done();
            });
        });

    })

});