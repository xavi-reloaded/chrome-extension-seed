import { LanCommons } from "../../../src/app/lan/lan.commons";


describe("Lan Commons", () => {

    describe("getDeviceIpFromUIID", () => {
        let sut;

        beforeEach(function() {
            sut = new LanCommons();
        });

        it("should return empty string when UIID is not informed", (done) => {
            sut.getDeviceIpFromUIID('SOMEUIID').then(function(data){
                expect(data).toEqual("");
                done();
            })

        });


    })

});
