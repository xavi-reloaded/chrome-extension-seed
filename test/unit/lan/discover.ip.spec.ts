import {DiscoverByWebIpinfo, DiscoverByRtc} from "../../../src/app/lan/discover.ip.implementations";


describe("Discover IP", () => {

    describe("getlocalIp", () => {

        it("DiscoverByWebIpinfo should find WAN ip", (done) => {
            var actual;
            let sut = new DiscoverByWebIpinfo();
            sut.getlocalIp().done(function(data){
                actual = data.ip;
                expect(actual).toBe('109.111.96.243');
                done();
            });
        });

        it("DiscoverByRtc should find LAN ip", (done) => {
            var actual;
            var RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection
            let sut = new DiscoverByRtc(RTCPeerConnection);
            sut.getlocalIp().then(function(data){
                actual = data.ip;
                expect(actual).toBe('192.168.0.100');
                done();
            });
        });

    }).ip

});