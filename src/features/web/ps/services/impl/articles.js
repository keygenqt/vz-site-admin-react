import {CoreRequest} from "../../../../../base";

/**
 * Get list articles
 *
 * @return {Promise<*>}
 */
export default async function articles() {
    return await CoreRequest.fetchGet('/ps/articles')
}

articles.propTypes = {};