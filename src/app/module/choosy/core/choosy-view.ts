import { Component, Type, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { ServiceLocator } from '../choosy.module';
import { ListService, ConfigService } from './services';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Config } from '../models';

const ChoosyBaseView = function<T extends Type<any>>(superclass: T): T {
  return class extends superclass {
    listService = ServiceLocator.injector.get(ListService);
    configService = ServiceLocator.injector.get(ConfigService);
    instanceID = null;
    initialized = new Subject<any>();
    initialOptions: Observable<any>;
    name = 'choosy';
    alive: Subject<boolean> = new Subject();
    @Input() config: Partial<Config> = {};
    @Input()
    set options(opt) {
      this.config = this.configService.mergeWithDefault(this.config);
      if (opt instanceof Observable) {
        this.listService.setOptionsFromObservable(opt, this.config);
      } else if (Array.isArray(opt)) {
        this.listService.setOptions(opt, this.config);
      } else {
        throw new Error('Invalid options');
      }
      this.initialOptions = this.listService.getOptions();
    }
    @Output() events: EventEmitter<any> = new EventEmitter();
    @Output() selected: EventEmitter<any> = new EventEmitter();

    @HostBinding('attr.data-instance-id') instanceIDAttr: string;

    optionsLoading = true;

    ngOnInit() {
      this.instanceIDAttr = this.instanceID;
      this.listService.setName(this.instanceID);
      this.initialized.next(true);
      this.listService.getSelectedOptions().subscribe(x => {
        this.selected.emit(x);
      });
      this.listService.events.subscribe(e => this.events.emit(e));
      this.listService.isLoading().subscribe(x => {
        this.optionsLoading = x;
      });
      if (this.choosyInit) {
        this.choosyInit();
      }
    }

    updateConfig(newConfig) {
      this.config = this.configService.mergeAllWithDefault(this.config, newConfig);
      this.listService.updateSettings(this.config);
    }

    ngOnChanges(change: any) {
      if (change.config) {
        this.updateConfig(change.config.currentValue);
      }
    }
  };
};

export function ChoosyView(config: any) {
  return function<T>(target) {
    return Component(config)(ChoosyBaseView(target));
  };
}

export function ChoosyOptions(): any {
  return function(target, key, descriptor) {
    const getter = function() {
      return this.initialOptions;
    };

    if (delete target[key]) {
      Object.defineProperty(target, key, {
        get: getter,
        enumerable: false
      });
    }
  };
}
