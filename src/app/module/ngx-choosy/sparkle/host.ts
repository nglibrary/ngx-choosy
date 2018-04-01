import {
  Injectable,
  ApplicationRef,
  ComponentFactoryResolver,
  Injector,
  Component,
  EmbeddedViewRef,
  ComponentDecorator
} from '@angular/core';
import { ComponentType } from './models';
import { ComponentInstance } from './component-instance';

@Injectable()
export class Host<C> {
  private compFac;
  private compRef;
  compIns: ComponentInstance<C>;
  constructor(
    private appRef: ApplicationRef,
    private compFacResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  attach(component: ComponentType<C>, props = {}): Host<C> {
    this.compFac = this.compFacResolver.resolveComponentFactory(component);
    this.compRef = this.compFac.create(this.injector);
    this.compIns = this.compRef.instance = <ComponentInstance<C>>new ComponentInstance(this.compRef.instance, props);
    console.log('props', props);
    console.log('ins', this.compIns);
    this.appRef.attachView(this.compRef.hostView);
    return this;
  }
  getCompIns(): ComponentInstance<C> {
    return this.compIns;
  }
  detach() {
    this.appRef.detachView(this.compRef.hostView);
    this.compRef.destroy();
  }
  componentView(): HTMLElement {
    return (this.compRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }
}
