import { Component, OnInit } from '@angular/core';
import { data } from '../data';
@Component({
  selector: 'app-x1-simple-array',
  templateUrl: './x1-simple-array.component.html',
  styleUrls: ['./x1-simple-array.component.css']
})
export class X1SimpleArrayComponent implements OnInit {
  choosy: any;
  choosy2: any;
  items = [];
  name = 'lokesh';
  constructor() {}

  ngOnInit() {
    this.items = data;
  }
  onChoosy(event) {
    this.choosy = event;
  }
  onChoosy2(event) {
    this.choosy2 = event;
  }
}
