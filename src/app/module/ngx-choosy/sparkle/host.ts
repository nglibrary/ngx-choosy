import {
  Injectable,
  ApplicationRef,
  ComponentFactoryResolver,
  Injector,
  Component,
  EmbeddedViewRef
} from '@angular/core';

@Injectable()
export class Host {
  private compFac;
  private compRef;
  private compIns: Component;
  constructor(
    private appRef: ApplicationRef,
    private compFacResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  attach(component: Component): Host {
    this.compFac = this.compFacResolver.resolveComponentFactory(component as any);
    this.compRef = this.compFac.create(this.injector);
    this.compIns = this.compRef.instance;
    this.appRef.attachView(this.compRef.hostView);
    return this;
  }
  detach() {
    this.appRef.detachView(this.compRef.hostView);
    this.compRef.destroy();
  }
  componentView(): HTMLElement {
    return (this.compRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }
}
