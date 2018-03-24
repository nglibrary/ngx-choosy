import {
  Directive,
  HostListener,
  Input,
  TemplateRef,
  Renderer2,
  HostBinding,
  ElementRef,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl
} from '@angular/forms';
import { ChoosyHostService } from '../services/choosy-host.service';
import { ChoosyComponent } from '../components/choosy/choosy.component';
import { ChoosyConfig } from '../models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector:
    'input[choosySelect],input[choosy-multi-select],input.choosy-multi-select',
  exportAs: 'choosyMultiSelectRef'
})
export class ChoosyMultiSelectDirective {
  @Input() options: any[] = [];
  @Input() config: Partial<ChoosyConfig> = {};
  @Input() optionTpl: TemplateRef<any>;
  instanceIDSub = new BehaviorSubject('');
  value: any = null;
  instanceID: string = null;
  choosyCompIns: ChoosyComponent = null;
  private changeFn: Function;
  constructor(
    private hostService: ChoosyHostService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    public model: NgControl
  ) { }

  @HostBinding('attr.data-choost-instance-id') instanceIDAttr: string;

  @HostListener('document:click', ['$event'])
  documentClickEvent(event: Event): void {
    if (this.hostService.instanceID === this.instanceID) {
      this.hostService.closeOnOutsideClick(this.elRef.nativeElement, event);
    }
  }
  @HostListener('focus')
  onFocus($event) {
    const b = {
      options: this.options,
      config: { ...this.config, type: 'multi-select' },
      optionTpl: this.optionTpl
    };
    if (!this.instanceID) {
      this.instanceID = Math.random()
        .toString(36)
        .substr(2, 5);
      this.instanceIDAttr = this.instanceID;
    } else {
      this.instanceID = this.instanceIDAttr;
    }
    this.instanceIDSub.next(this.instanceID);

    this.choosyCompIns = this.hostService.init(
      ChoosyComponent as any,
      b,
      this.instanceID
    );
    this.setPosition();
    this.choosyCompIns.initialized.filter(a => a === true).subscribe(a => {
      this.choosyCompIns.listService.setOptionAsSelected(
        v => this.getValue(v) === this.getValue(this.model.control.value)
      );
    });

    this.choosyCompIns.listService.events
      .filter(a => a.name === 'optionSelected')
      .map(a => a.value)
      .subscribe(a => {
        // this.changeFn(a);
        this.model.control.setValue(a);
        this.renderer.setProperty(
          this.elRef.nativeElement,
          'value',
          this.getValue(a)
        );
        // this.hostService.destroy();
      });
  }

  @HostListener('blur')
  onBlur($event) {
    // this.hostService.destroy();
  }
  @HostListener('keyup', ['$event'])
  onKeyup($event) {
    this.choosyCompIns.listService.filterOptions($event.target.value);
    // this.hostService.destroy();
  }

  optionRemoved() {

  }

  private setPosition() {
    this.hostService.renderer = this.renderer;
    this.hostService.setPosition(this.elRef.nativeElement, 'AUTO', 300);
  }

  private getValue(value, key = this.config.displayValue) {
    if (typeof key === 'function') {
      return key(value);
    }
    if (key) {
      let v = value;
      key.split('.').map(a => (v = v[a]));
      value = v;
    }
    return value;
  }
}
