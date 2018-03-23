import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'choosy-footer',
  templateUrl: './choosy-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChoosyFooterComponent implements OnInit {
  @Input() options;
  constructor() {}

  ngOnInit() {}
}
