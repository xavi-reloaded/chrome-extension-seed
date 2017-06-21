import {DiscoverIpService} from "./discover.ip.interface";

export class DiscoverIp {

    constructor(private discoverIp: DiscoverIpService) {}

    public getip(): string {
        return this.discoverIp.getlocalIp();
    }
}

