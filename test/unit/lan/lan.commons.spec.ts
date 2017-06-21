import { LanCommons } from "../../../src/app/lan/lan.commons";


describe("Lan Commons", () => {

    describe("getDeviceIpFromUIID", () => {
        let sut;

        beforeEach(function() {
            sut = new LanCommons();
        });

        it("should return empty string when UIID is not informed", () => {
            expect(sut.getDeviceIpFromUIID()).toEqual("");
        });


        it("should return ip device when UIID corresponds to an available device", () => {

        });

        it("", () => {

        });

        it("", () => {

        });

        it("", () => {

        });

    })

});
