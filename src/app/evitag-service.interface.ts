import {EvitagCredentials} from "./model/evitag-credentials.class";

export interface EvitagService {
    getDeviceIp(UIID:string): any;
    getCredentials(UIID:string): EvitagCredentials;
    getLabels(UIID:string): any;
}
