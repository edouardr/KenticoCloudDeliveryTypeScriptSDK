// setup
import { setup, Context } from '../../setup';

// models
import { FieldMapService } from '../../../lib/services/field-map.service';
import { FieldInterfaces } from '../../../lib/fields/field-interfaces';
import { FieldType } from '../../../lib/fields/field-type';
import { ContentItem } from '../../../lib';

// tests
describe('FieldMapService', () => {

    var fieldType = 'invalid';
    
    class FakeField implements FieldInterfaces.IField {
        public type: FieldType = fieldType as any;
        constructor(
            public name: string,
            public value: any
        ) {
        };
    }

    class FakeContentItem extends ContentItem {
        public testField: FakeField;
        public elements: any;
    }

    var context = new Context();
    setup(context);

    var fieldMapService = new FieldMapService(context.getConfig());

    it(`should throw an Error when invalid response is given`, () => {
        expect(() => fieldMapService.mapFields(null, null, null)).toThrowError();
        expect(() => fieldMapService.mapFields(undefined, undefined, undefined)).toThrowError();
        
        expect(() => {
            let item = new FakeContentItem();
            item.elements = {};
            fieldMapService.mapFields(item, undefined, undefined)
        } ).toThrowError();

        expect(() => {
            let item = new FakeContentItem();
            item.system = {} as any;
            fieldMapService.mapFields(item, undefined, undefined)
        } ).toThrowError();

    });

    it(`should throw an Error when unsupported field type is used`, () => {

        var fakeField = new FakeField('testField', 'testValue')

        var fakeItem = new FakeContentItem();
        fakeItem.elements = { 'testField': fakeField };
        fakeItem.system = {} as any;
        fakeItem.system.type = 'movie';
        fakeItem.system.codename = 'cd';
        expect(() => fieldMapService.mapFields(fakeItem, {}, {})).toThrowError(`Unsupported field type '${fieldType}'`);
    });
});

