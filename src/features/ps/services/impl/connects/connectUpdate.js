import {CoreRequest} from "../../../../../base";
import PropTypes from "prop-types";

/**
 * Update article
 *
 * @return {Promise<*>}
 */
export default async function connectUpdate(id, data) {
    return await CoreRequest.fetchPut(`/api/ps/connects/${id}`, data)
}

connectUpdate.propTypes = {
    id: PropTypes.string,
};