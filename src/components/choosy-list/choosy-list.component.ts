import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren,
  ViewContainerRef
  } from '@angular/core';
import { ChoosyOption } from './../../interfaces/index';

@Component({
  selector: 'choosy-list',
  templateUrl: './choosy-list.component.html',
  styleUrls: ['./choosy-list.component.scss']
})
export class ChoosyListComponent implements DoCheck {
  @Input() options: Array<any>;
  @Input() config: any = {};
  @Input('template') template: TemplateRef<any>;
  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();
  @ViewChildren('itemHolder', { read: ViewContainerRef })
  set itemHolders(itemHolders: QueryList<ViewContainerRef>) {
    this.processCustomTemplate(itemHolders, this.template);
  }
  userTemplate: TemplateRef<any>;
  private scrolledToTop = false;

  constructor(
    private elRef: ElementRef,
    private cdRef: ChangeDetectorRef
  ) { }
  ngDoCheck(): void {
    this.cdRef.detectChanges();
    if (!this.scrolledToTop) this.scrollToSelected();
  }
  optionClicked(event: Event, option: ChoosyOption): void {
    this.optionSelected.emit({ event, option });
  }
  private processCustomTemplate(
    itemHolders: QueryList<ViewContainerRef>,
    template: TemplateRef<any>): void {
    if (!template) return;
    itemHolders.forEach((holder: ViewContainerRef, i: number) => {
      holder.clear();
      holder.createEmbeddedView(template, {
        $implicit: this.options[i].value
      }, 0);
    });
    this.cdRef.detectChanges();
  }
  private scrollToSelected(): void {
    const elem = this.elRef.nativeElement.querySelector('.selected');
    const parentElem = this.elRef.nativeElement.querySelector('.c-list-wrapper');
    if (elem && parentElem) parentElem.scrollTop = elem.offsetTop;
    this.scrolledToTop = true;
  }
}
