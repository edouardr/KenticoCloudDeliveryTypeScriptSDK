// setup
import { setup, Context, MockQueryService, Actor, warriorMovieJson } from '../../setup';

// models
import {
    Fields, ContentItem, ContentItemSystemAttributes, ItemResponses, TypeResolver, FieldDecorators, HttpService
} from '../../../lib';

class MockMovie extends ContentItem {
    public titleTest: Fields.TextField;

    @FieldDecorators.codename('released')
    public test_released: Fields.DateTimeField;
    
    @FieldDecorators.codename('length')
    public justNumber: Fields.NumberField;

    constructor() {
        super({
            propertyResolver: (fieldName: string) => {
                if (fieldName === 'title') {
                    return 'titleTest';
                }
            }
        })
    }
}
// tests
describe('Property resolver', () => {

    const context = new Context();
    const typeResolvers = [];
    typeResolvers.push(new TypeResolver('movie', () => new MockMovie()))
    typeResolvers.push(new TypeResolver('actor', () => new Actor()))

    context.typeResolvers = typeResolvers;
    setup(context);

    // mock query service
    const mockQueryService = new MockQueryService(context.getConfig(), new HttpService());

    let response: ItemResponses.DeliveryItemResponse<MockMovie>;

    beforeAll((done) => {
        response = mockQueryService.mockGetSingleItem<MockMovie>(warriorMovieJson, {});
        done();
    })

    it(`checks field is assigned #1`, () => {
        expect(response.item.titleTest.text).toEqual('Warrior');
    });

    it(`checks field is assigned #2`, () => {
        expect(response.item.test_released.datetime).toEqual(new Date('2011-09-09T00:00:00Z'));
    });

    it(`checks field is assigned #3`, () => {
        expect(response.item.justNumber.number).toEqual(151);
    });
});
