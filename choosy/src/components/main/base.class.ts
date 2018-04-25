import {
  Component,
  Input,
  TemplateRef,
  ElementRef,
  HostBinding,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  SimpleChange,
  OnChanges
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { takeUntil, map, filter, switchMap, debounceTime, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { OptionsService, ConfigService } from '../../services';
import { ChoosyConfig, ChoosyOption } from '../../models';

const keyCodes = {
  '38': 'UP',
  '40': 'DOWN',
  '13': 'ENTER'
};

export const BASE_CONFIG = {
  preserveWhitespaces: false,
  exportAs: 'choosyRef',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OptionsService]
};

export abstract class ChoosyBase implements OnChanges {
  abstract name = 'choosy';
  insId = null;
  initialOptions: Observable<any>;
  @Input() config: Partial<ChoosyConfig> = {};
  @Input()
  set options(opt) {
    this._processOptions(opt);
  }
  @Input() optionTpl: TemplateRef<any>;
  @Input() autoCompleteFn: Function;

  @Output() events: EventEmitter<any> = new EventEmitter();
  @Output() selected: EventEmitter<any> = new EventEmitter();

  @HostBinding('attr.data-instance-id') insIdAttr: string;
  @HostBinding('attr.class') classNameAttr: string;

  protected _keyPressSub: Subject<any> = new Subject();
  protected _autoCompleteSub: Subject<any> = new Subject();
  protected _alive: Subject<boolean> = new Subject();

  optionsLoading = true;

  constructor(
    protected optionsService: OptionsService,
    protected configService: ConfigService,
    protected elRef: ElementRef,
    protected cdRef: ChangeDetectorRef
  ) {}
  init() {
    this.insIdAttr = this.insId;
    this.classNameAttr = this.config.theme;

    this.optionsService.setName(this.insId);

    this.optionsService
      .getSelectedOptions()
      .pipe(takeUntil(this._alive))
      .subscribe(x => {
        this.selected.emit(x);
      });
    this.optionsService.events.pipe(takeUntil(this._alive)).subscribe(e => this.events.emit(e));

    this.optionsService
      .isLoading()
      .pipe(takeUntil(this._alive))
      .subscribe(x => {
        this.optionsLoading = x;
        this.cdRef.detectChanges();
      });
  }

  search(keyword: string) {
    if (typeof keyword != 'string') return;
    this.optionsService.filterOptions(keyword, this.config.search);
  }

  fetch(query: string) {
    if (query.length < this.config.autoComplete.minChars) {
      return;
    }
    this._autoCompleteSub.next(query);
  }

  updateConfig(newConfig) {
    this.config = this.configService.mergeAllWithDefault(this.config, newConfig);
    this.optionsService.updateSettings(this.config);
    this.updateClassName();
  }

  ngOnChanges(change: any) {
    if (change.config) {
      this.updateConfig(change.config.currentValue);
    }
  }

  watchKeyPress() {
    fromEvent(this.elRef.nativeElement, 'keydown')
      .pipe(
        takeUntil(this._alive),
        map((x: KeyboardEvent) => x.keyCode),
        map(x => keyCodes[x]),
        filter(x => x !== undefined)
      )
      .subscribe(x => this._keyPressSub.next(x));
  }

  watchKeyboardActions(optionEl: string = '.choosy-view>div.active') {
    this._keyPressSub
      .asObservable()
      .pipe(
        takeUntil(this._alive),
        tap(x => {
          if (x === 'UP') {
            this.optionsService.markPreviousAsActive();
          } else if (x === 'DOWN') {
            this.optionsService.markNextAsActive();
          } else if (x === 'ENTER') {
            this.optionsService.selectActiveOption();
          }
        }),
        filter(x => x !== 'ENTER')
      )
      .subscribe(a => {
        // todo: smooth scroll
        this.elRef.nativeElement.querySelector(optionEl).scrollIntoView(false);
      });
  }

  autoCompletion() {
    this._autoCompleteSub
      .pipe(
        takeUntil(this._alive),
        tap(x => (this.optionsLoading = true)),
        debounceTime(500),
        switchMap(x => this.autoCompleteFn(x))
      )
      .subscribe((z: any) => {
        this.optionsService.setOptions(z, this.config);
        this.optionsLoading = false;
      });
  }

  updateClassName() {
    const features = [this.config.theme];
    this.classNameAttr = features.join(' ');
  }

  protected _cleanUp() {
    this._alive.next(true);
    this._alive.complete();
  }

  protected _processOptions(opt) {
    this.config = this.configService.mergeWithDefault(this.config);
    if (opt instanceof Observable) {
      this.optionsService.setOptionsFromObservable(opt, this.config);
    } else if (Array.isArray(opt)) {
      this.optionsService.setOptions(opt, this.config);
    } else {
      throw new Error('Invalid options');
    }
    this.initialOptions = this.optionsService.getOptions();
  }
}
