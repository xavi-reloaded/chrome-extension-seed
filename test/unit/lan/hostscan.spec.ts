import { HostScan } from "../../../src/app/lan/hostscan.class";
import {LanUtils} from "../../../src/app/lan/lan.utils";


describe("HostScan", () => {

    describe("start", () => {

        let sut;

        beforeEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;
            sut = new HostScan(['192.168.0.100']);
        });

        it("should finish without errors when called empty", () => {
            sut.start({});
            let actual = sut.getResults();
            expect(actual).not.toBe(null);
        });

        // check this to learn how to test an async function !!!
        it("results first element should contain state with 'up value '", (done) => {
            sut.start({
                stream: function(address, state, deltat) {
                    console.log("Host "+address+" is "+state);
                },
                complete: function(results) {
                    console.log("Complete!");
                    expect(results[0].state).toBe('up');
                    done();
                }
            });
        });


        // BUGGAKEN WAPO ! CUANDO LA IP NO ES ACCESIBLE SE CUELTA
        it(" should return state down when ip not available", (done) => {
            console.error("BUGGAKEN WAPO ! CUANDO LA IP NO ES ACCESIBLE SE CUELGA");
            console.error("SALTA EL TIMEOUT DE CHROME");
            console.error("Disconnected, because no message in 10000 ms. y te jodes como herodes");
            sut = new HostScan(['192.168.123.123']);
            sut.start({
                stream: function(address, state, deltat) {
                    console.log("Host "+address+" is "+state);
                    expect(state).toBe('timeout');
                    done();
                },
                complete: function(results) {
                    done();
                }
            });
        });

        // it("should work with a full range of ip's", (done) => {

            // var fullRange = LanUtils.getIpRange('192.168.0.100');
            // sut = new HostScan(fullRange.splice(0,110)); // looks like timeout of karma dies
            // sut.start({
            //     stream: function(address, state, deltat) {
            //         console.log("Host "+address+" is "+state);
            //     },
            //     complete: function(results) {
            //         console.log("Complete!");
            //         expect(results[0].state).toBe('up');
            //         done();
            //     }
            // });
        // });


    })

});