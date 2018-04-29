import { Component, OnInit, Input } from '@angular/core';
import { names } from '../../choosy-demo/basic/data';

@Component({
  selector: 'doc-section',
  templateUrl: './section.component.html',
  styles: []
})
export class SectionComponent implements OnInit {
  @Input() name: string;
  @Input() desc: string;
  constructor() {}

  ngOnInit() {}
}
