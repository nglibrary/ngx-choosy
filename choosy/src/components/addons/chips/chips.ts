import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ChoosyOptions } from '../../../models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'choosy-chips',
  templateUrl: 'chips.html'
})
export class Chips implements OnInit, OnChanges {
  @Input() ref: any;
  options: ChoosyOptions = [];
  constructor() {}

  ngOnInit() {
    this.ref.listService
      .getAllSelectedOptions()
      .map(a => a.filter(x => x.state && x.state.selected === true))
      .subscribe(a => {
        this.options = a;
      });
  }
  ngAfterViewInit() {
    // this.ref.instanceIDSub.filter(a => a !== '').subscribe(t => {
    //   console.log('ref view', t);
    // });
    // let foo = this.hostService
    //     .getInstance(this.ref)
  }

  displayValue(parts, obj) {
    return parts.split('.').reduce((p, c) => p[c], obj);
  }
  ngOnChanges(a) {
    // a.ref.currentValue.instanceIDSub
    //   .filter(a => a !== '')
    //   .switchMap(s => {
    //     console.log('SSS', this.hostService.getInstances());
    //     return this.hostService.getInstance(s).listService.getAllSelectedOptions();
    //   })
    //   .map(a => a.filter(x => x.state && x.state.selected === true))
    //   .subscribe(a => {
    //     console.log('ref view', a);
    //     this.options = a;
    //   });
    // if (this.ref) {
    //   this.hostService
    //     .getInstance(this.ref)
    //     .listService.getAllSelectedOptions()
    //     .map(a => a.filter(x => x.state && x.state.selected === true))
    //     .subscribe(a => {
    //       this.options = a;
    //     });
    // }
  }

  deselect(option) {
    this.ref.listService.clearSelectedOption(option);
  }
}
