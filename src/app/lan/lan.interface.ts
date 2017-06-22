import {EvitagCredentials} from "../model/evitag-credentials.class";

export interface IDevice {
    getDeviceIpFromUIID(UIID:string): any;
}

export interface IApiService {
    getLabels(UUID: string): any;
    getCredentials(UUID: string): EvitagCredentials;
}

export interface DiscoverIpService {
    getlocalIp(): any;
}
