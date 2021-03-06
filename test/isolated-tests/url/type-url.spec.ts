// url parser
import urlParser from 'url-parse';

// setup
import { Context, setup } from '../../setup';

// tests
describe('Type url', () => {

    var context = new Context();
    setup(context);

    it(`type query should thrown error when types's codename is not set`, () => {
        expect(() => context.deliveryClient.type(null)).toThrowError();
    });

    it(`type url with 'movie' codename should contain '/types/movie`, () => {
        var url = context.deliveryClient.type('movie').toString();
        expect(url).toContain(`/types/movie`);
    });

    it(`type url for all types should end with 'types'`, () => {
        var url = context.deliveryClient.types().toString();
        expect(url).toContain(`/types`);
    });

    it(`type url should contain skip parameter`, () => {
        var skip: number = 549228429;
        var url = context.deliveryClient.types().skipParameter(skip).toString();
        expect(url).toContain('skip=' + skip.toString());
    });

});

