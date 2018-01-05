import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  ViewContainerRef
  } from '@angular/core';
import { ChoosyResultsComponent } from '../../components/choosy-results/choosy-results.component';
import { ChoosyManagerService } from '../choosy-manager/choosy-manager.service';

@Injectable()
export class ChoosyComponentBuilderService {
  compIns: ChoosyResultsComponent;
  vcRef: ViewContainerRef;
  compRef: ComponentRef<ChoosyResultsComponent>;
  compFac: ComponentFactory<ChoosyResultsComponent>;
  constructor(
    private compFacResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private choosyManager: ChoosyManagerService
  ) { }
  initiateComponent(insID: string) {
    this.compFac = this.compFacResolver.resolveComponentFactory(ChoosyResultsComponent);
    this.compRef = this.compFac.create(this.injector);
    this.compIns = this.compRef.instance;
    this.choosyManager.addInstance(this.compIns, insID);
  }
  attachComponent() {
    this.appRef.attachView(this.compRef.hostView);
    document.body.appendChild(this.getComponentView());
  }
  getComponentView(): HTMLElement {
    return (this.compRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }
  setComponentInputs(inputObj: { [x: string]: any }) {
    for (let name in inputObj) {
      this.compIns[name] = inputObj[name];
    }
  }
  getComponentRef(): ComponentRef<any> {
    return this.compRef;
  }
  getComponentIns(): ChoosyResultsComponent {
    return this.compIns;
  }
  destroyComponent() {
    this.appRef.detachView(this.compRef.hostView);
    this.compRef.destroy();
  }
}
