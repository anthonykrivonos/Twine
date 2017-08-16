import { Injectable } from '@angular/core';

@Injectable()
export class Validator {

      validator(text:string, callback:any = null) {
            text = (text == null ? "" : text);
            text.trim();
            text.replace(/<(?:.|\n)*?>/gm, '');
            text.replace(/[|&;$%@"<>()+,]/g, "");
            if (callback) {callback(text, text.length);}
            return text;
      }

}
