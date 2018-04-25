import { Component, OnInit } from '@angular/core';

// export class TestClass {}

// export function extendSearchMixinClass(c) {
//   return class extends c {
//     onSearch() {
//       console.log('searching...');
//     }
//   };
// }

// export function ViewLayer(config: any = {}) {
//   return function(constructor) {
//     console.log('this is a mixin class data', constructor.prototype);
//     const bc = extendSearchMixinClass(constructor);
//     return class extends bc {};
//   };
// }
// const main = Component({})(TestClass);
// console.log('main', main);

const EMPTY = {
  selector: 'doc-mixin-test',
  templateUrl: './mixin-test.component.html'
};
export function Jaisy(config) {
  return function(c) {
    return class extends Component(config)(c) {
      ngOnInit(): any {
        console.log('jaisy', this);
      }
    };
  };
}

@Component(EMPTY)
@Jaisy({
  selector: 'doc-mixin-test',
  templateUrl: './mixin-test.component.html',
  styles: [
    `:host(){
      border:1px solid red;
    }`
  ]
})
export class MixinTestComponent {}
