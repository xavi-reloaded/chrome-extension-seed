import { LanUtils } from "../../../src/app/lan/lan.utils";
import {LanObject} from "../../../src/app/lan/lan.object";


describe("Lan Utils", () => {

        it("should return valid ip range", () => {
            let actual = LanUtils.getIpRange("192.168.0.1");
            expect(actual.length).toEqual(253);
            expect(actual[0]).toEqual('192.168.0.0');
        });


        it("should return only ip with state 'up'", () => {
            let obj : Array<LanObject> = new Array;
            obj.push(new LanObject('192.168.0.1','timeout',''));
            obj.push(new LanObject('192.168.0.100','up',''));
            obj.push(new LanObject('192.168.0.12','timeout',''));
            let actual = LanUtils.getIpWithUpState(obj);

            expect(actual.length).toEqual(1);
            expect(actual[0].state).toEqual('up');
        });


});
