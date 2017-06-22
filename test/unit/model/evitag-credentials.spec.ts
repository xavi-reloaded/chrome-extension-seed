import { EvitagCredentials } from "../../../src/app/model/evitag-credentials.class";


describe("EvitagCredentials", () => {

    describe("after initialization", () => {

        let sut;

        beforeEach(function () {
            sut = new EvitagCredentials('dXNlcnx8fHBhc3M=');
        });

        it(" should return plain user", () => {
            expect(sut.pass).toEqual("pass");
        });

        it(" should return plain pass", () => {
            expect(sut.user).toEqual("user");
        });
    })

});