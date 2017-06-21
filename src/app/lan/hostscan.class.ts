import {HostProbe} from "./hostprobe.class";

export class HostScan {

    public responses = [];
    public batchSize: number = 255;
    public batchDelay: number = 150;



    constructor(private addresses: Array<string>,private opts?) {
        if (!addresses) throw "HostProbe needs an address param.";
        this.addresses=addresses;
    }

    public start(opts) {
        var opts = opts || {};
        // run in batches
        var batchIdx = 0;
        var startTime = new Date();


        // sends the probes
        var sendProbe = function(i) {
            var addrIdx = batchIdx * this.batchSize + i;
            if (addrIdx >= this.addresses.length) return;
            var addr = this.addresses[addrIdx];

            var bidx = batchIdx; // local closure
            setTimeout(function() {
                var probe = new HostProbe(addr);
                probe.fire(function(state, duration) {
                    if (opts.stream) opts.stream(addr, state, duration);
                    this.responses.push({ address: addr, state: state, duration: duration });
                    if (this.responses.length >= this.addresses.length) {
                        if (opts.complete) {
                            opts.complete(this.responses, (+new Date())-+startTime);
                            opts.complete = null; // don't call this again :)
                        }
                    }
                }.bind(this));
            }.bind(this), bidx * this.batchDelay);
        }.bind(this);

        // run the loop
        while (batchIdx * this.batchSize < this.addresses.length) {
            for (var k = 0; k < this.batchSize; k++) {
                sendProbe(k);
            }
            batchIdx++;
        }
    };

    public getResults():any{
        return this.responses;
    }
}