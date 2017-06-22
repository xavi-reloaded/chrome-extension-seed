import { HostProbe } from "../../../src/app/lan/hostprobe.class";


describe("HostProbe", () => {

    describe("_sendImgRequest", () => {

        it(" should return state timeout when ip not available", (done) => {

            let sut = new HostProbe('192.168.255.255');
            sut._sendImgRequest(function(state, duration) {
                expect(state).toBe('timeout');
                done();
            });
        });

        it(" should return state up when ip available", (done) => {


            let sut = new HostProbe('192.168.0.1');
            sut._sendImgRequest(function(state, duration) {
                expect(state).not.toBe(null);
                done();
            });
        });
    })

});