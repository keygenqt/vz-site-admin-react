import {CoreRequest} from "../../../../base";
import PropTypes from "prop-types";

/**
 * Update article
 *
 * @return {Promise<*>}
 */
export default async function articleUpdate(id, data) {
    return await CoreRequest.fetchPut(`/api/ps/articles/${id}`, data)
}

articleUpdate.propTypes = {
    id: PropTypes.string,
};