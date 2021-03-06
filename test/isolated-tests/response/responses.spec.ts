// setup
import { setup, Context, Movie, Actor, MockQueryService, warriorMovieJson } from '../../setup';

// models
import { ItemResponses, HttpService } from '../../../lib';

// tests
describe('Responses', () => {

    const context = new Context();
    setup(context);

    // mock query service
    const mockQueryService = new MockQueryService(context.getConfig(), new HttpService())

    let masterResponse: ItemResponses.DeliveryItemResponse<Movie>;

    beforeAll((done) => {
        masterResponse = mockQueryService.mockGetSingleItem<Movie>(warriorMovieJson, {});
        done();
    })

    it(`DeliveryItemListingResponse should be initialize properties for invalid item`, () => {
        const response = new ItemResponses.DeliveryItemListingResponse(null as any, {} as any, {} as any);
        const responseWithEmptyArray = new ItemResponses.DeliveryItemListingResponse([] as any, {} as any, {} as any);

        expect(response.isEmpty).toEqual(true);
        expect(response.firstItem).toEqual(undefined);
        expect(response.lastItem).toEqual(undefined);
        expect(responseWithEmptyArray.firstItem).toEqual(undefined);
        expect(responseWithEmptyArray.lastItem).toEqual(undefined);
    });

    it(`DeliveryItemListingResponse should be initialize properties for invalid item`, () => {
        const response = new ItemResponses.DeliveryItemResponse(null as any, {} as any);
        const responseWithItem = new ItemResponses.DeliveryItemResponse({'test':1} as any, {} as any);

        expect(response.isEmpty).toEqual(true);
        expect(responseWithItem.isEmpty).toEqual(false);
    });

});

