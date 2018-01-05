import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { cloneDeep } from 'lodash';
import { ChoosyOption, ChoosyRawOption } from './../../interfaces';
import { ChoosyConfigService } from './../../services/choosy-config/choosy-config.service';
import { ChoosyResultsComponent } from './choosy-results.component';

const s = x => JSON.stringify(x);
const configService = new ChoosyConfigService();

describe('ChoosyResultsComponent', () => {
  let comp: ChoosyResultsComponent;
  let fixture: ComponentFixture<ChoosyResultsComponent>;
  let searchEl;
  const simpleOptions = ['one', 'two', 'three', 'four'];

  beforeEach(() => {
    const changeDetectorRefStub = {};
    const elementRefStub = {};
    const choosyConfigServiceStub = {
      getLocalConfig: () => ({
        search: {
          location: 0,
          keys: ['value']
        }
      })
    };
    TestBed.configureTestingModule({
      declarations: [ChoosyResultsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectorRefStub },
        { provide: ElementRef, useValue: elementRefStub },
        ChoosyConfigService
      ]
    });
    fixture = TestBed.createComponent(ChoosyResultsComponent);
    comp = fixture.componentInstance;
    searchEl = fixture.debugElement.query(By.css('choosy-search'));
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });
  it('originalOptions defaults to: []', () => {
    expect(comp.originalOptions).toEqual([]);
  });
  it('processedOptions defaults to: []', () => {
    expect(comp.processedOptions).toEqual([]);
  });
  it('isOpen defaults to: false', () => {
    expect(comp.isOpen).toEqual(false);
  });

  describe('what if', () => {
    it('doesnt have config input? - should inherit default config', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      expect(comp.config).toEqual(configService.getLocalConfig());
    });
    it('input options is in invalid format? - should throw error', () => {
      comp.options = (123 as any);
      expect(() => { comp.ngOnInit() }).toThrowError('Invalid options provided');
    });
    it('input has invalid option? - should defaults to "-"', () => {
      comp.options = ['Mobile', 'Computer', null, undefined, {}, '', false, 0, NaN];
      comp.ngOnInit();
      expect(comp.originalOptions[2].value).toEqual('-');
      expect(comp.originalOptions[3].value).toEqual('-');
      expect(comp.originalOptions[4].value).toEqual('-');
      expect(comp.originalOptions[5].value).toEqual('-');
      expect(comp.originalOptions[6].value).toEqual('-');
      expect(comp.originalOptions[7].value).toEqual('-');
      expect(comp.originalOptions[8].value).toEqual('-');
    });
  });

  describe('config', () => {
    it('search is disabled', () => {
      comp.options = simpleOptions;
      comp.config = { search: { enable: false } } as any;
      comp.ngOnInit();
      expect(comp.config.search.enable).toBeFalsy();
    });
    it('update config', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      expect(comp.config.labels.searchPlaceholder).toBe('Search');
      comp.updateConfig({ labels: { searchPlaceholder: 'select any name...' } });
      expect(comp.config.labels.searchPlaceholder).toBe('select any name...');
    });
  });

  describe('ngOnInit', () => {
    it('throw error when no option is provided', () => {
      expect(() => { comp.ngOnInit(); }).toThrowError('No options provided');
    });
    it('makes expected calls', () => {
      comp.options = simpleOptions;
      const choosyConfigServiceStub = fixture.debugElement.injector.get(ChoosyConfigService);
      spyOn(comp, 'expose');
      spyOn(choosyConfigServiceStub, 'getLocalConfig');
      comp.ngOnInit();
      expect(comp.expose).toHaveBeenCalled();
      expect(choosyConfigServiceStub.getLocalConfig).toHaveBeenCalled();
    });
    it('subscribed to option changes', () => {
      const expectedProperties = ['props', 'uid', 'value'].sort();
      comp.options = simpleOptions;
      comp.ngOnInit();
      expect(comp.originalOptions).toBeDefined();
      expect(comp.processedOptions).toBeDefined();
      expect(comp.originalOptions.length).toEqual(4);
      expect(comp.processedOptions.length).toEqual(4);
      expect(Object.keys(comp.originalOptions[0]).sort()).toEqual(expectedProperties);
    });
    it('emits public events', () => {
      let events = {};
      const expectedProperties = ['actions', 'notifications', 'selections'].sort();
      comp.choosy.subscribe(res => { events = res; });
      comp.options = simpleOptions;
      comp.ngOnInit();
      expect(Object.keys(events).sort()).toEqual(expectedProperties);
    });
  });

  describe('Toggle', () => {
    it('should open', () => {
      comp.open();
      expect(comp.isOpen).toBeTruthy();
    });
    it('should close', () => {
      comp.close();
      expect(comp.isOpen).toBeFalsy();
    });
    it('should toggle', () => {
      comp.toggle();
      expect(comp.isOpen).toBeTruthy();
      comp.toggle();
      expect(comp.isOpen).toBeFalsy();
    });
  });

  describe('actions', () => {
    it('should select a item', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      let beforeSelect = cloneDeep(comp.originalOptions);
      comp.selectOption('one');
      expect(s(comp.originalOptions)).not.toBe(s(beforeSelect));
      beforeSelect = beforeSelect.map(res => {
        if (res.value === 'one') res.props.selected = true;
        return res;
      });
      expect(s(comp.originalOptions)).toBe(s(beforeSelect));
    });
    it('should clear a selected item', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      let beforeSelect = cloneDeep(comp.originalOptions);
      let afterSelect = cloneDeep(comp.originalOptions);
      comp.selectOption('two');
      expect(s(comp.originalOptions)).not.toBe(s(beforeSelect));
      beforeSelect = beforeSelect.map(res => {
        if (res.value === 'two') res.props.selected = true;
        return res;
      });
      afterSelect = afterSelect.map(res => {
        res.props.selected = false;
        return res;
      });
      expect(comp.originalOptions.filter(x => x.props.selected).length).toEqual(1);
      expect(s(comp.originalOptions)).toBe(s(beforeSelect));
      comp.clearSelectedOption('two');
      expect(comp.originalOptions.filter(x => x.props.selected).length).toEqual(0);
      expect(s(comp.originalOptions)).toBe(s(afterSelect));
    });
    it('should clear all selected items', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      let beforeSelect = cloneDeep(comp.originalOptions);
      let afterSelect = cloneDeep(comp.originalOptions);
      comp.selectOption('four');
      beforeSelect = beforeSelect.map(res => {
        if (res.value === 'four') res.props.selected = true;
        return res;
      });
      afterSelect = afterSelect.map(res => {
        res.props.selected = false;
        return res;
      });
      expect(comp.originalOptions.filter(x => x.props.selected).length).toEqual(1);
      expect(s(comp.originalOptions)).toBe(s(beforeSelect));
      comp.clearSelectedOptions();
      expect(comp.originalOptions.filter(x => x.props.selected).length).toEqual(0);
      expect(s(comp.originalOptions)).toBe(s(afterSelect));
    });
    it('should disable a item', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      let beforeSelect = cloneDeep(comp.originalOptions);
      comp.disableOption(x => x === 'three');
      expect(s(comp.originalOptions)).not.toBe(s(beforeSelect));
      beforeSelect = beforeSelect.map(res => {
        if (res.value === 'three') res.props.disabled = true;
        return res;
      });
      expect(comp.originalOptions.filter(x => x.props.disabled).length).toEqual(1);
      expect(s(comp.originalOptions)).toBe(s(beforeSelect));
    });
    it('should disable multiple item', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      let beforeSelect = cloneDeep(comp.originalOptions);
      comp.disableOption(x => (x === 'three' || x === 'four' || x === 'one'));
      expect(s(comp.originalOptions)).not.toBe(s(beforeSelect));
      beforeSelect = beforeSelect.map(res => {
        if (res.value !== 'two') res.props.disabled = true;
        return res;
      });
      expect(comp.originalOptions.filter(x => x.props.disabled).length).toEqual(3);
      expect(s(comp.originalOptions)).toBe(s(beforeSelect));
    });
    it('should clear a disabled item', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      let beforeSelect = cloneDeep(comp.originalOptions);
      let afterSelect = cloneDeep(comp.originalOptions);
      comp.disableOption(x => x === 'two');
      expect(s(comp.originalOptions)).not.toBe(s(beforeSelect));
      beforeSelect = beforeSelect.map(res => {
        if (res.value === 'two') res.props.disabled = true;
        return res;
      });
      afterSelect = afterSelect.map(res => {
        res.props.disabled = false;
        return res;
      });
      expect(comp.originalOptions.filter(x => x.props.disabled).length).toEqual(1);
      expect(s(comp.originalOptions)).toBe(s(beforeSelect));
      comp.clearDisabledOption('two');
      expect(comp.originalOptions.filter(x => x.props.disabled).length).toEqual(0);
      expect(s(comp.originalOptions)).toBe(s(afterSelect));
    });
    it('should clear all disabled items', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      let beforeSelect = cloneDeep(comp.originalOptions);
      let afterSelect = cloneDeep(comp.originalOptions);
      comp.disableOption(x => x === 'two' || x === 'four');
      beforeSelect = beforeSelect.map(res => {
        if (res.value === 'two' || res.value === 'four') res.props.disabled = true;
        return res;
      });
      afterSelect = afterSelect.map(res => {
        res.props.disabled = false;
        return res;
      });
      expect(comp.originalOptions.filter(x => x.props.disabled).length).toEqual(2);
      expect(s(comp.originalOptions)).toBe(s(beforeSelect));
      comp.clearDisabledOptions();
      expect(comp.originalOptions.filter(x => x.props.disabled).length).toEqual(0);
      expect(s(comp.originalOptions)).toBe(s(afterSelect));
    });
    it('should able to add one option', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      comp.addOption('five');
      expect(comp.originalOptions.length).toEqual(5);
      expect(comp.originalOptions.filter((x: ChoosyOption) => x.value === 'five')[0].value).toBe('five');
    });
    it('should able to add multiple option', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      comp.addOption(['five', 'six', 'seven']);
      expect(comp.originalOptions.length).toEqual(7);
      expect(comp.originalOptions.filter((x: ChoosyOption) => x.value === 'seven')[0].value).toBe('seven');
    });
    it('should remove one option', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      comp.removeOption(x => x === 'two');
      expect(comp.originalOptions.length).toEqual(3);
      expect(comp.originalOptions[1].value).toBe('three');
    });
    it('should remove multiple options', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      comp.removeOption(x => (x === 'one' || x === 'three' || x === 'four'));
      expect(comp.originalOptions.length).toEqual(1);
      expect(comp.originalOptions[0].value).toBe('two');
    });
    it('should filter the options', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      comp.filterOptions('asder');
      expect(comp.processedOptions.length).toEqual(0);
      comp.filterOptions('tw');
      expect(comp.processedOptions.length).toEqual(1);
      expect(comp.processedOptions[0].value).toBe('two');
      comp.filterOptions('');
      expect(comp.processedOptions.length).toEqual(4);
      expect(comp.processedOptions[0].value).toBe('one');
    });
    it('get selected options', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      comp.addOption(['five', 'six', 'seven']);
      comp.selectOption('five');
      expect(comp.getSelectedOptions().length).toEqual(1);
      expect(comp.getSelectedOptions()[0]).toBe('five');
    });
    it('reload options', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      comp.reloadOptions(['jan', 'feb', 'march', 'apr', 'may', 'june', 'jul']);
      expect(comp.originalOptions.length).toEqual(7);
      expect(comp.originalOptions[4].value).toBe('may');
    });
    it('reset options', () => {
      comp.options = simpleOptions;
      comp.ngOnInit();
      comp.removeOption((x) => x == 'two');
      expect(comp.originalOptions.length).toEqual(3);
      comp.resetOptions();
      expect(comp.originalOptions.length).toEqual(4);
    });
  });

  describe('subscriptions', () => {
    it('should emit notification on remove', () => {
      let msg;
      comp.options = simpleOptions;
      comp.ngOnInit();
      expect(msg).not.toBeDefined();
      (comp as any).notifications.subscribe(n => msg = n);
      comp.removeOption(x => x == 'three');
      expect(msg).toEqual({ action: 'OPTION_REMOVED', value: null });
    });
    it('should emit selected options on select', () => {
      let sel;
      comp.options = simpleOptions;
      comp.ngOnInit();
      (comp as any).selections.subscribe(n => sel = n);
      comp.selectOption('four');
      expect(sel).toEqual('four');
      comp.selectOption('two');
      expect(sel).toEqual('two');
    })
  });
});
