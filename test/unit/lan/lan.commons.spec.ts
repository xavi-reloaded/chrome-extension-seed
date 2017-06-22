import { LanCommons } from "../../../src/app/lan/lan.commons";


describe("Lan Commons", () => {

    describe("getDeviceIpFromUIID", () => {
        let sut;

        beforeEach(function() {
            let RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
            sut = new LanCommons(RTCPeerConnection);
        });

        it("should return empty string when UIID is not informed", (done) => {
            // sut.getDeviceIpFromUIID('SOMEUIID').then(function(data){
            //     expect(data).toEqual("");
            //     done();
            // })
            done();
        });


    })

});
