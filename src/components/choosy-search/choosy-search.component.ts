import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild
  } from '@angular/core';
import { ChoosyConfig } from '../../interfaces';
import { ChoosyConfigService } from '../../services/choosy-config/choosy-config.service';

@Component({
  selector: 'choosy-search',
  template: `
    <div class="c-search-wrapper">
      <input type="text" (input)="onChange($event.target.value)" [placeholder]="config?.labels?.searchPlaceholder" #inputEl class="c-search-input">
      <i></i>
    </div>
  `,
  styleUrls: ['./choosy-search.component.scss']
})
export class ChoosySearchComponent implements AfterViewInit {
  @Input() config: ChoosyConfig;
  @Output('search') search: EventEmitter<any> = new EventEmitter();
  @ViewChild('inputEl') inputEl: ElementRef;
  constructor(private elRef: ElementRef) { }
  ngAfterViewInit(): void {
    if (this.config && this.config.search.autoFocus) this.inputEl.nativeElement.focus();
  }
  onChange(keyword: string): void {
    this.search.emit(keyword);
  }
}
