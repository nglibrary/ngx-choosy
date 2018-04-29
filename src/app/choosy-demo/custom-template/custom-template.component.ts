import { Component, OnInit } from '@angular/core';
import { ChoosyDemoBaseComponent } from '../base';
import { users } from '../_data/users';

@Component({
  selector: 'doc-custom-template',
  templateUrl: './custom-template.component.html',
  styles: []
})
export class CustomTemplateComponent extends ChoosyDemoBaseComponent implements OnInit {
  options = users;
  ngOnInit() {}
}
