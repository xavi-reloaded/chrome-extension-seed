import { HostScan } from "../../../src/app/lan/hostscan.class";


describe("HostScan", () => {

    describe("start", () => {
        let sut;

        beforeEach(function() {
            sut = new HostScan(['192.168.0.100']);
        });

        it("should finish without errors when called empty", () => {
            sut.start({});
            let actual = sut.getResults();
            expect(actual).not.toBe(null);
        });


        // chech this to learn how to test an async function !!!
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


    })

});