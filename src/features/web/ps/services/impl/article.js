import {CoreRequest} from "../../../../../base";
import PropTypes from "prop-types";

/**
 * Get list articles
 *
 * @return {Promise<*>}
 */
export default async function article(id) {
    return await CoreRequest.fetchGet(`/api/ps/articles/${id}`)
}

article.propTypes = {
    id: PropTypes.string,
};