import { LanUtils } from "../../../src/app/lan/lan.utils";


describe("Lan Utils", () => {

        it("should return valid ip range", () => {
            let actual = LanUtils.getIpRange("192.168.0.1");
            expect(actual.length).toEqual(253);
            expect(actual[0]).toEqual('192.168.0.0');
        });


        it("should return ip device when UIID corresponds to an available device", () => {

        });


});
