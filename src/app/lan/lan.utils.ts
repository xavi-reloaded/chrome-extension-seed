export class LanUtils {

    static each(obj, cb) {
        for (var i = 0; i < obj.length; i++) cb(obj[i], i);
    };

    static getIpRange(addr:string):Array<string> {
        var part = addr.substr(0,addr.lastIndexOf('.')+1);
        let range = new Array();
        for (let x=0;x<254;x++) {
            let ip=part+x;
            if (ip==addr) continue;
            range.push(ip);
        }
        return range;
    }

}