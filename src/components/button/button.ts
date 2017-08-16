import { Component, Output, OnInit, EventEmitter, Injectable } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Events } from 'ionic-angular';

import { buttonTranslate } from '../../animations/buttonTranslate';

@Component({
      selector: 'twine-button',
      inputs: [],
      templateUrl: 'button.html',
      animations: [buttonTranslate(150, "3vh", "100vh", "88vh")]
})
@Injectable()
export class ButtonComponent implements OnInit {
      @Output() event = new EventEmitter();
      toggle:string = 'start';
      twineValid:boolean;

      constructor(public events:Events) {
            events.subscribe('showButton:click', ()=>{
                  this.toBottom();
            });
            events.subscribe('hideButton:click', ()=>{
                  this.hide();
            });
            events.subscribe('topButton:click', ()=>{
                  this.toToolbar();
            });
      }

      ngOnInit():void {
            console.log("~ ButtonComponent Loaded ~");
      }

      getToggle():string {
            return this.toggle;
      }

      toTop(callback:any = undefined):void {
            this.toggle = 'start';
      }

      toToolbar():void {
            this.toggle = 'start';
      }

      hide():void {
            this.toggle = 'middle';
      }

      toBottom():void {
            this.events.publish('twineButton:open');
            this.toggle = 'end';
      }
}
