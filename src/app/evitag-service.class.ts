import { EvitagService } from "./evitag-service.interface";
import {EvitagCredentials} from "./model/evitag-credentials.class";
import {IDevice, IApiService} from "./lan/lan.interface";

export class EvitagComponent implements EvitagService {

    constructor(
        private deviceService: IDevice,
        private apiService: IApiService,
    ) {}

    getDeviceIp(UUID:string): any {
        return this.deviceService.getDeviceIpFromUIID(UUID);
    }

    getLabels(UUID: string): any {
        return this.apiService.getLabels(UUID);
    }

    getCredentials(UUID:string): EvitagCredentials {
        return this.apiService.getCredentials(UUID);
    }

}
