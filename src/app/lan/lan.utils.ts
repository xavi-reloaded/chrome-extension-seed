export class LanUtils {

    static each(obj, cb) {
        for (var i = 0; i < obj.length; i++) cb(obj[i], i);
    };

    // static each(obj: any, cb: (v, k) => any) {
    //     for (var i = 0; i < obj.length; i++) cb(obj[i], i);
    // }
}