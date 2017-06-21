import { HostProbe } from "../../../src/app/lan/hostprobe.class";


describe("HostProbe", () => {

    describe("fire", () => {

        it(" should return state timeout when ip not available", (done) => {

            console.error("BUGGAKEN WAPO ! CUANDO LA IP NO ES ACCESIBLE SE CUELGA");
            console.error("SALTA EL TIMEOUT DE CHROME");
            console.error("Disconnected, because no message in 10000 ms. y te jodes como herodes");

            let sut = new HostProbe('192.168.123.123');
            sut.fire(function(state, duration) {
                expect(state).toBe('tiemout');
                done();
            });
        });


    })

});