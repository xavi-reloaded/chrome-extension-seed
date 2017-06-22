import {DiscoverIpService} from "./lan.interface";

export class DiscoverIp {

    constructor(private discoverIp: DiscoverIpService) {}

    public getip(): string {
        return this.discoverIp.getlocalIp();
    }
}

