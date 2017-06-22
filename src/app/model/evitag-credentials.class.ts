import {LanUtils} from "../lan/lan.utils";


const SEPARATOR:string = "|||";

export class EvitagCredentials {
    public user: string;
    public pass: string;


    constructor(private UUID: string) {
        this.user = this.parseUser(UUID);
        this.pass = this.parsePass(UUID);
    }

    public parseUser(UUID: string) {
        let decrypt = LanUtils.decrypt(UUID);
        return decrypt.substr(0,decrypt.lastIndexOf(SEPARATOR));
    }

    public parsePass(UUID: string) {
        let decrypt = LanUtils.decrypt(UUID);
        return decrypt.substr(decrypt.lastIndexOf(SEPARATOR)+SEPARATOR.length,decrypt.length);
    }
}
