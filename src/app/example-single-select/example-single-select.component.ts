import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-single-select',
  templateUrl: './example-single-select.component.html',
  styleUrls: ['./example-single-select.component.scss']
})
export class ExampleSingleSelectComponent implements OnInit {
  options = ['hello', 'world'];
  item = 'world';

  constructor() {}

  ngOnInit() {}
}
