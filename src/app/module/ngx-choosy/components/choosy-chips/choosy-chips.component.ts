import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ChoosyOption } from '../../models';
import { ChoosyListService } from '../../services/choosy-list.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { ChoosyComponent } from '../../../../demo/choosy/choosy.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'choosy-chips',
  templateUrl: 'choosy-chips.component.html'
})
export class ChoosyChipsComponent implements OnInit, OnChanges {
  @Input() ref: any;
  options: ChoosyOption[] = [];
  constructor() {}

  ngOnInit() {
    console.log('instanceof', this.ref instanceof ChoosyComponent);
    this.ref.listService
      .getAllSelectedOptions()
      .map(a => a.filter(x => x.state && x.state.selected === true))
      .subscribe(a => {
        console.log('ref view', a);
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
