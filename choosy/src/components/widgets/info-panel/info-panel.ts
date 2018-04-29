import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'choosy-info-panel-widget',
  template: `
  <div>
    {{(options|async)?.length }} options found!
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
})
export class InfoPanelWidget {
  @Input() options;
}
