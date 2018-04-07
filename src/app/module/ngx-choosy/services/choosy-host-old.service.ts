import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  ViewContainerRef,
  Renderer2
} from '@angular/core';
import { ChoosyComponent } from '../components/choosy/choosy.component';
import { ChoosyPosition } from '../models';

@Injectable()
export class ChoosyHostService {
  static instances = {};
  compIns: ChoosyComponent;
  vcRef: ViewContainerRef;
  compRef: ComponentRef<ChoosyComponent>;
  compFac: ComponentFactory<ChoosyComponent>;
  compView: HTMLElement;
  renderer: Renderer2;
  instanceID = null;
  constructor(
    private appRef: ApplicationRef,
    private compFacResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  init(component: ChoosyComponent, bindings: object = {}, instanceID: string) {
    if (ChoosyHostService.instances[instanceID]) {
      return ChoosyHostService.instances[instanceID];
    }
    this.compFac = this.compFacResolver.resolveComponentFactory(component as any);
    this.compRef = this.compFac.create(this.injector);
    this.compIns = this.bindInputs(this.compRef.instance, bindings);
    this.appRef.attachView(this.compRef.hostView);
    this.compView = this.getComponentView();
    this.addInstance(instanceID);
    document.body.appendChild(this.compView);
    return this.compIns;
  }

  bindInputs(ins: ChoosyComponent, bindings: object): ChoosyComponent {
    Object.keys(bindings).forEach(k => (ins[k] = bindings[k]));
    return ins;
  }

  destroy(): void {
    this.appRef.detachView(this.compRef.hostView);
    delete ChoosyHostService.instances[this.instanceID];
    this.compRef.destroy();
  }

  addInstance(instanceID: string) {
    this.compIns.instanceID = this.instanceID = instanceID;
    ChoosyHostService.instances[this.instanceID] = this.compIns;
  }
  getInstanceID() {
    return this.compIns.instanceID;
  }
  getInstance(instanceID) {
    return ChoosyHostService.instances[instanceID];
  }
  getInstances() {
    return ChoosyHostService.instances;
  }
  setPosition(srcEl: HTMLElement, position: ChoosyPosition = 'AUTO', fixedWidth = 120) {
    let top, width, left;
    const elCoOrds = this.getElementOffset(srcEl);
    if (position === 'AUTO') {
      ({ top, left, width } = elCoOrds);
    } else if (position === 'FIXED') {
      ({ top, left } = elCoOrds);
      width = fixedWidth;
    }
    this.applyStyle(this.compView, { top, width, left });
  }

  // TODO: make smart positioning of dropdown based on window height/width

  private getElementOffset(element: HTMLElement): { [x: string]: any } {
    const coOrds = element.getBoundingClientRect();
    const top = window.scrollY + coOrds.top + coOrds.height;
    const left = window.scrollX + coOrds.left;
    return {
      height: Math.ceil(coOrds.height),
      width: Math.ceil(coOrds.width),
      bottom: Math.ceil(coOrds.bottom),
      right: Math.ceil(coOrds.right),
      top: Math.ceil(top),
      left: Math.ceil(left)
    };
  }
  private applyStyle(element: HTMLElement, styleObj: { [x: string]: any } = {}): void {
    // tslint:disable-next-line:forin
    for (const style in styleObj) {
      this.renderer.setStyle(element, style, styleObj[style] + 'px');
    }
  }

  private getComponentView(): HTMLElement {
    return (this.compRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  closeOnOutsideClick(el: HTMLElement, event: any) {
    if (!this.compIns) {
      return;
    }
    const compEl = this.compIns.elRef.nativeElement;
    if (event.target !== el && event.target !== compEl && !compEl.contains(event.target)) {
      this.destroy();
    }
    // event.preventDefault();
    // event.stopImmediatePropagation();
    // TODO: refactor
  }
}
