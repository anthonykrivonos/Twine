import { Pipe, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Pipe({
    name: 'time-ago',
    pure: false
})
export class TimeAgo extends AsyncPipe
{
    value:Date;
    timer:Observable<string>;

    constructor(ref:ChangeDetectorRef) { super(ref); }

    transform(obj:any, args?:any[]):any {
        if (obj instanceof Date) {
            this.value = obj;
            if(!this.timer) {
                this.timer = this.getObservable();
            }
            return this.transform(this.timer, args);
        }
        return this.transform(obj, args);
    }

    private getObservable()
    {
        return Observable.interval(1000).startWith(0).map(()=> {
            var result:string;

            let now = new Date().getTime();

            let delta = (now - this.value.getTime()) / 1000;

            if (delta < 10) {
                result = 'now';
            } else if (delta < 60) {
                result = Math.floor(delta) + ' seconds ago';
            } else if (delta < 3600) {
                result = Math.floor(delta / 60) + ' minutes ago';
            } else if (delta < 86400) {
                result = Math.floor(delta / 3600) + ' hours ago';
            } else {
                result = Math.floor(delta / 86400) + ' days ago';
            }
            return result;
        });
    };
}
