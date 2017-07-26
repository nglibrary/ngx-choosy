import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges
  } from '@angular/core';
import { ChoosyConfig } from '../../interfaces';
import * as C from '../../utils/constants';

@Component({
  selector: 'choosy-footer',
  template: `
    <div class="choosy-footer-wrapper" *ngIf="show" [ngClass]="className">
     <div class="choosy-footer">{{message}}</div>
    </div>
  `,
  styles: [
    `:host(){
      display:block;
    }`
  ]
})
export class ChoosyFooterComponent implements OnChanges {
  @Input() config: ChoosyConfig;
  @Input() type: string;
  className = '';
  show = false;
  message: string;
  constructor(private elRef: ElementRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.type) return;
    const value = changes.type.currentValue;
    this.show = true;
    if (value.type === C.FOOTER_INITIAL && value.data === 0)
      this.message = this.config.labels.noOptionsToDisplay;
    else if (value.type === C.FOOTER_FILTER && value.data === 0)
      this.message = this.config.labels.noResultsToDisplay;
    else if (value.type === C.FOOTER_FILTER && value.data > 0) {
      this.message = `${value.data} ${this.config.labels.XRecordsMatches}`;
      this.show = this.config.footer.countSummary;
    }
    else if (value.type === C.FOOTER_DEFAULT && value.data > 0) {
      this.message = `${value.data} ${this.config.labels.XRecords}`;
      this.show = this.config.footer.countSummary;
    }
    else if (value.type === C.FOOTER_DEFAULT && value.data === 0)
      this.message = this.config.labels.noOptionsProvided;
    else
      this.show = false;
    const type = value.type.toLowerCase();
    const data = (value.data > 0) ? 'has-data' : 'no-data';
    this.className = `${type} ${data}`;
  }
}
