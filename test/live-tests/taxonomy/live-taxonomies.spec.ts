// setup
import { setup, Context } from '../../setup';

// models
import { FieldModels, TaxonomyResponses, TaxonomyGroup } from '../../../lib';

// tests
describe('Live taxonomies', () => {

  var context = new Context();
  setup(context);

  var termsWithNestedTermsCodename: string = 'film'; // codename of the taxonomy term that has nested terms
  var numberOfNestedTerms: number = 3; // this is the number of nested terms defined by 'termsWithNestedTermsCodename'
  var existingTaxonomyCodename: string = 'movietype'; // codename of some of the defined taxonomies
  var numberOfTaxonomies: number = 2; // number of defined taxonomies
  var response: TaxonomyResponses.TaxonomiesResponse;

  var taxonomy: TaxonomyGroup;

  beforeAll((done) => {
    context.deliveryClient.taxonomies()
      .get()
      .subscribe(r => {
        response = r as TaxonomyResponses.TaxonomiesResponse
        taxonomy = response.taxonomies.find(m => m.system.codename === existingTaxonomyCodename);
        done();
      });
  });

  it(`taxonomies should be defined`, () => {
    expect(response.taxonomies).toBeDefined();
  });

  it(`there should be '${numberOfTaxonomies}' taxonomies`, () => {
    expect(response.taxonomies.length).toEqual(numberOfTaxonomies);
  });

  it(`taxonomy with codename '${existingTaxonomyCodename}' should be defined`, () => {
    expect(taxonomy).toBeDefined();
  });

  it(`taxomy system attributes should be defined`, () => {
    expect(taxonomy.system).toBeDefined();
    expect(taxonomy.system.codename).toBeDefined();
    expect(taxonomy.system.id).toBeDefined();
    expect(taxonomy.system.lastModified).toBeDefined();
    expect(taxonomy.system.name).toBeDefined();
  });

  it(`taxonomy group should match requested type`, () => {
    expect(taxonomy.system.codename).toEqual(existingTaxonomyCodename);
  });

  it(`taxonomy group should have defined terms`, () => {
    expect(taxonomy.terms).toBeDefined();
  });

  it(`taxonomy group should have > 0 terms`, () => {
    expect(taxonomy.terms.length).toBeGreaterThan(0);
  });

  it(`taxonomy group should contain nested taxonomies`, () => {
    var termsWithNestedTerms = taxonomy.terms.find(m => m.codename === termsWithNestedTermsCodename);
    expect(termsWithNestedTerms).toBeDefined();
    expect(termsWithNestedTerms.terms).toBeDefined();
    expect(termsWithNestedTerms.terms.length).toEqual(numberOfNestedTerms);
  });
});

