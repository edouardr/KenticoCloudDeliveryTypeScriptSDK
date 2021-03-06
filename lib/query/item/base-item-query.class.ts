// config
import { DeliveryClientConfig } from '../../config/delivery-client.config';

// filters
import { Filters } from '../../models/common/filters';

// models
import { ItemResponses } from '../../models/item/responses';
import { IContentItem } from '../../interfaces/item/icontent-item.interface';
import { IQueryParameter } from '../../interfaces/common/iquery-parameter.interface';
import { TypeResponses } from '../../models/type/responses';
import { IItemQueryConfig } from '../../interfaces/item/iitem-query.config';
import { ItemQueryConfig } from '../../models/item/item-query.config';
import { IHeader } from '../../interfaces/common/iheader.interface';

// base query
import { BaseQuery } from '../common/base-query.class';

// query params
import { Parameters } from '../../models/common/parameters';

// rxjs
import { Observable } from 'rxjs/Rx';

// services
import { QueryService } from '../../services/query.service';

export abstract class BaseItemQuery<TItem extends IContentItem> extends BaseQuery {

    protected parameters: IQueryParameter[] = [];

    protected _contentType?: string;
    protected _queryConfig?: IItemQueryConfig;

    constructor(
        protected config: DeliveryClientConfig,
        protected queryService: QueryService
    ) {
        super(config, queryService)
    }

    /**
     * Used to configure query
     * @param queryConfig Query configuration
     */
    queryConfig(queryConfig: IItemQueryConfig): this {
        this._queryConfig = queryConfig;
        return this;
    }

    /**
    * Gets headers used by this query
    */
    getHeaders(): IHeader[] {
        return this.queryService.getHeaders(this.getQueryConfig());
    }

    // shared parameters

    /**
     * Language codename
     * @param languageCodename Codename of the language
     */
    languageParameter(languageCodename: string): this {
        this.parameters.push(new Parameters.LanguageParameter(languageCodename));
        return this;
    }

    /**
     * Used to limit the number of elements returned by query.
     * @param elementCodenames Array of element codenames to fetch
     */
    elementsParameter(elementCodenames: string[]): this {
        this.parameters.push(new Parameters.ElementsParameter(elementCodenames));
        return this;
    }

    /**
     * Indicates how deep nested modular content items are resolved.
     * @param depth Depth of the query (> 0)
     */
    depthParameter(depth: number): this {
        this.parameters.push(new Parameters.DepthParameter(depth));
        return this;
    }

    private getQueryConfig(): IItemQueryConfig {
        // use default config if none is provider
        if (!this._queryConfig) {
            return new ItemQueryConfig();
        }

        return this._queryConfig;
    }

    protected getMultipleItemsQueryUrl(): string {
        const action = '/items';

        // get all items of all types when no type is specified
        if (this._contentType) {
            this.parameters.push(new Filters.EqualsFilter('system.type', this._contentType));
        }

        // add default language is necessry
        this.processDefaultLanguageParameter();

        return this.queryService.getUrl(action, this.getQueryConfig(), this.parameters);
    }

    protected getSingleItemQueryUrl(codename: string): string {
        const action = '/items/' + codename;

        // add default language is necessry
        this.processDefaultLanguageParameter();

        return this.queryService.getUrl(action, this.getQueryConfig(), this.parameters);
    }

    protected runMultipleItemsQuery(): Observable<ItemResponses.DeliveryItemListingResponse<TItem>> {
        const url = this.getMultipleItemsQueryUrl();

        return this.queryService.getMultipleItems(url, this.getQueryConfig());
    }

    protected runSingleItemQuery(codename: string): Observable<ItemResponses.DeliveryItemResponse<TItem>> {
        const url = this.getSingleItemQueryUrl(codename);

        return this.queryService.getSingleItem(url, this.getQueryConfig());
    }

    private processDefaultLanguageParameter(): void {
        // add default language if none is specified && default language is specified globally
        if (this.config.defaultLanguage) {
            const languageParameter = this.parameters.find(m => m.GetParam() === 'language');
            if (!languageParameter) {
                // language parameter was not specified in query, use globally defined language
                this.parameters.push(new Parameters.LanguageParameter(this.config.defaultLanguage));
            }
        }
    }
}
