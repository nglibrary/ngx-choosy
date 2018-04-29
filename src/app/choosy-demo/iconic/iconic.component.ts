import { Component, OnInit } from '@angular/core';
import { ChoosyDemoBaseComponent } from '../base';
import { places } from '../_data/places';

@Component({
  selector: 'doc-iconic',
  templateUrl: './iconic.component.html',
  styles: []
})
export class IconicComponent extends ChoosyDemoBaseComponent implements OnInit {
  options = places;
  ngOnInit() {}
}
