import { Component, OnInit } from '@angular/core';
import { ChoosyDemoBaseComponent } from '../base';
import { languages } from '../_data/plain-languages';

@Component({
  selector: 'doc-multiselect',
  templateUrl: './multiselect.component.html',
  styles: []
})
export class MultiselectComponent extends ChoosyDemoBaseComponent implements OnInit {
  options = languages;
  ngOnInit() {}
}
