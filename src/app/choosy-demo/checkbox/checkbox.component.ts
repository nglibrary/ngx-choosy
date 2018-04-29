import { Component, OnInit } from '@angular/core';
import { ChoosyDemoBaseComponent } from '../base';
import { names } from '../_data/plain-names';

@Component({
  selector: 'doc-checkbox',
  templateUrl: './checkbox.component.html',
  styles: []
})
export class CheckboxComponent extends ChoosyDemoBaseComponent implements OnInit {
  options = names;

  ngOnInit() {}
}
