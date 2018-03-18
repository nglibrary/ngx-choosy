import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { ChoosyComponent } from '../src/app/module/ngx-choosy/components/choosy/choosy.component';

storiesOf('My Button', module).add('with some emoji', () => ({
  component: ChoosyComponent,
  props: {
    text: '😀 😎 👍 💯'
  }
}));
