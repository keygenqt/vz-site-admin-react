import {CoreRequest} from "../../../../../base";
import PropTypes from "prop-types";

/**
 * Get info about articles
 *
 * @return {Promise<*>}
 */
export default async function articlesInfo() {
    return await CoreRequest.fetchGet('/api/ps/dashboard/articles-count')
}

articlesInfo.propTypes = {};