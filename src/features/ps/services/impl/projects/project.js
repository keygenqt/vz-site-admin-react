import {CoreRequest} from "../../../../../base";
import PropTypes from "prop-types";

/**
 * Get project by id
 *
 * @return {Promise<*>}
 */
export default async function project(id) {
    return await CoreRequest.fetchGet(`/api/ps/projects/${id}`)
}

project.propTypes = {
    id: PropTypes.string,
};