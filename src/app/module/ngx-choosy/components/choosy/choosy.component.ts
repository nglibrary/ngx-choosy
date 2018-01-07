import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { ChoosyConfig, ChoosyOption } from '../../models';
import { ChoosyConfigService } from '../../services/choosy-config.service';
import { ChoosyListService } from '../../services/choosy-list.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/filter';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'choosy',
  templateUrl: './choosy.component.html',
  preserveWhitespaces: false,
  exportAs: 'choosyRef',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host(){
        display:block;
        position: absolute;
        background: red;
      }
    `
  ]
})
export class ChoosyComponent implements OnInit {
  optionsSub = new BehaviorSubject([]);
  private initialOptions = [];
  @Input() config: Partial<ChoosyConfig> = {};
  @Input()
  set options(opt) {
    if (opt) {
      this.initialOptions = this.listService.mapMetaData(opt);
      this.optionsSub.next(this.initialOptions);
    }
  }
  @Input() optionTpl: TemplateRef<any>;

  constructor(
    private configService: ChoosyConfigService,
    private listService: ChoosyListService
  ) {}
  ngOnInit() {
    this.config = this.configService.mergeWithDefault(this.config);
    this.listService.setOptionsSub(this.optionsSub);
    this.optionsSub.subscribe(temp => {
      console.log('emitetd', temp);
    });
    this.listService.events.subscribe(e => {
      console.log('event', e.name, e.value);
    });
  }

  onSearch(keyword) {
    if (keyword instanceof Event) {
      keyword = (keyword.target as HTMLInputElement).value;
    }
    this.listService.filterOptions(keyword);
  }
}
