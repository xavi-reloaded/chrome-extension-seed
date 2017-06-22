import { EvitagComponent } from "../../src/app/evitag-service.class";
import {IDevice, IApiService} from "../../src/app/lan/lan.interface";
import {EvitagCredentials} from "../../src/app/model/evitag-credentials.class";

class DeviceServiceMock implements IDevice {
    getDeviceIpFromUIID(UIID: string): any {
        return undefined;
    }
}

class ApiServiceMock implements IApiService {
    getLabels(UUID: string): any {
        let res:Array<string> = new Array;
        res.push("label001");
        res.push("label002");
        return res;
    }
    getCredentials(UUID: string): EvitagCredentials {
        return new EvitagCredentials("dXNlcnx8fHBhc3M=");
    }
}
describe("EvitagComponent", () => {

    let sut;
    const FAKE_UUID="asfasdfasdfasdf";

    beforeEach(function () {
        let deviceServiceMock = new DeviceServiceMock();
        let apiServiceMock = new ApiServiceMock();
        sut = new EvitagComponent(deviceServiceMock,apiServiceMock);
    });

    it("getLabel should get correct labelList'", () => {
        expect(sut.getLabels(FAKE_UUID)[0]).toEqual("label001");
    });
    it("getCredentials should return well formed user", () => {
        let actual = sut.getCredentials(FAKE_UUID);
        expect(actual.user).toEqual("user");
    });
    it("getCredentials should return well formed password", () => {
        let actual = sut.getCredentials(FAKE_UUID);
        expect(actual.pass).toEqual("pass");
    });
});
