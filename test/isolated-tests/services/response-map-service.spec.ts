// setup
import { setup, Context } from '../../setup';

// models
import { ResponseMapService } from '../../../lib/services/response-map.service';

// tests
describe('ResponseMapService', () => {

    var context = new Context();
    setup(context);

    var responseMapService = new ResponseMapService(context.getConfig());

    it(`should throw an Error when invalid response is given`, () => {
        expect(() => responseMapService.mapResponseDebug(null)).toThrowError();
        expect(() => responseMapService.mapResponseDebug(undefined)).toThrowError();
    });
});

