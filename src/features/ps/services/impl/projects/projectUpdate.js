import {CoreRequest} from "../../../../../base";
import PropTypes from "prop-types";

/**
 * Update project
 *
 * @return {Promise<*>}
 */
export default async function projectUpdate(id, data) {
    return await CoreRequest.fetchPut(`/api/ps/projects/${id}`, data)
}

projectUpdate.propTypes = {
    id: PropTypes.string,
};