// url parser
import urlParser from 'url-parse';

// setup
import { setup, Context } from '../../setup';

import { QueryConfig } from '../../../lib/models/common/query.config';
import { ItemQueryConfig } from '../../../lib/models/item/item-query.config';

// tests
describe('Query configurations', () => {

  var context = new Context();
  setup(context);

  it(`QueryConfig should set values properly`, () => {
    var queryConfig = new QueryConfig({usePreviewMode: true, waitForLoadingNewContent: true});
    expect(queryConfig.usePreviewMode).toEqual(true);
    expect(queryConfig.waitForLoadingNewContent).toEqual(true);

    var queryConfig = new QueryConfig({usePreviewMode: false, waitForLoadingNewContent: false});
    expect(queryConfig.usePreviewMode).toEqual(false);
    expect(queryConfig.waitForLoadingNewContent).toEqual(false);
  });

  it(`ItemQuerConfig should set values properly`, () => {
    var queryConfig = new ItemQueryConfig({usePreviewMode: true, waitForLoadingNewContent: true});
    expect(queryConfig.usePreviewMode).toEqual(true);
    expect(queryConfig.waitForLoadingNewContent).toEqual(true);

    var queryConfig = new ItemQueryConfig({usePreviewMode: false, waitForLoadingNewContent: false});
    expect(queryConfig.usePreviewMode).toEqual(false);
    expect(queryConfig.waitForLoadingNewContent).toEqual(false);
  });

});

