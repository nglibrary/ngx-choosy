import { Component, OnInit } from '@angular/core';
import { ChoosyDemoBaseComponent } from '../base';
import { userCountries } from '../_data/user-country';

@Component({
  selector: 'doc-group',
  templateUrl: './group.component.html',
  styles: []
})
export class GroupComponent extends ChoosyDemoBaseComponent implements OnInit {
  options = userCountries;
  ngOnInit() {}
}
