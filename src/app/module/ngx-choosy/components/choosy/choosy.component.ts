import { Component, OnInit, Input, TemplateRef } from '@angular/core';

import { ChoosyConfig, ChoosyOption } from '../../models';
import { ChoosyConfigService } from '../../services/choosy-config.service';
import { ChoosyListService } from '../../services/choosy-list.service';
import { ChoosySearchService } from '../../services/choosy-search.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'choosy',
  templateUrl: './choosy.component.html'
})
export class ChoosyComponent implements OnInit {
  @Input() config: Partial<ChoosyConfig> = {};
  @Input() options: ChoosyOption[] = [];
  @Input() optionTpl: TemplateRef<any>;

  private initialOptions = [];

  constructor(
    private configService: ChoosyConfigService,
    private listService: ChoosyListService,
    private searchService: ChoosySearchService
  ) {}
  ngOnInit() {
    this.config = this.configService.mergeWithDefault(this.config);
    this.options = this.initialOptions = this.options.map(
      this.listService.addMetaData.bind(this.listService)
    );
  }
  onSearch(keyword) {
    this.searchService.search(this.initialOptions, keyword).then(res => {
      if (res.length === 0) {
        this.options = [...this.initialOptions];
      } else {
        this.options = res;
      }
    });
  }
}
