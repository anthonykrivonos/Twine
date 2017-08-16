import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'twine-placeholder',
  templateUrl: 'placeholder.html'
})
export class PlaceholderComponent implements OnInit {
      @Input('color') color:string;
      @Input('text') text:string;

      constructor() {}

      ngOnInit():void {
            console.log("Generated placeholder of color " + this.color + " and text: " + this.text);
      }
}
