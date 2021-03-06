import { IContentTypeQueryConfig } from '../../interfaces/type/icontent-type-query.config'
import { QueryConfig } from '../common/query.config';

export class ContentTypeQueryConfig extends QueryConfig implements IContentTypeQueryConfig {

    constructor(
        protected options?: {
            /**
             * Indicates if preview mode is used
             */
            usePreviewMode?: boolean,
            /**
             * Indicates if the response should wait for new content
             */
            waitForLoadingNewContent?: boolean
        }
    ) {
        super(options)
    }
}
