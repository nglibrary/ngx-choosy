import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChoosyConfig } from '../../module/ngx-choosy/models';

@Component({
  selector: 'app-freestyle',
  templateUrl: './freestyle.component.html',
  styles: [
    `
    .illus{
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 100px;
      position:relative;
      padding: 1rem 3rem;
      margin: 0 10px;
    }
    .illus div{
      font-size: 13px;
      color: #63707e;
      font-weight: 500;
      margin-top: 10px;
    }
    .illus:hover{
      box-shadow: 0px 0px 0px 2px #00BCD4;
    }
    .illus.selected{
      box-shadow: 0px 0px 0px 2px #00BCD4;
      overflow: initial;
    }
    .illus.selected:after{
      font: normal normal normal 24px/1 "Material Design Icons";
      content: '\\F5E0';
      color:#00BCD4;
      position: absolute;
      right: -10px;
      top: -10px;
      z-index: 9999;
      background: #fff;
    }
    .icon{
      width: 50px;
      height: 50px;
      display: inline-block;
    }
  `
  ]
})
export class FreestyleComponent implements OnInit {
  data = [
    {
      name: 'icon-pisa',
      title: 'Pisa Tower'
    },
    {
      name: 'icon-eiffel',
      title: 'Eiffel Tower'
    },
    {
      name: 'icon-tajmahal',
      title: 'Taj Mahal'
    },
    {
      name: 'icon-building',
      title: 'Buildings'
    },
    {
      name: 'icon-gate',
      title: 'Golden gate'
    },
    {
      name: 'icon-burj',
      title: 'Burj Khalifa'
    },
    {
      name: 'icon-beach',
      title: 'Beach'
    }
  ];
  config: Partial<ChoosyConfig> = {
    search: {
      enable: false,
      keys: ['value.name']
    },
    displayValue: 'value.name',
    type: 'select',
    theme: 'freestyle'
  };
  events = [];
  constructor() {}

  ngOnInit() {}
  captureEvents(e) {
    this.events.unshift(e);
  }
  selected(e) {
    console.log('option selected', e);
  }
}
