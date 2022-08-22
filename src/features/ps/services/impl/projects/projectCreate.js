import {CoreRequest} from "../../../../../base";
import PropTypes from "prop-types";

/**
 * Create project
 *
 * @return {Promise<*>}
 */
export default async function projectCreate(data) {
    return await CoreRequest.fetchPost(`/api/ps/projects`, data)
}

projectCreate.propTypes = {
    id: PropTypes.string,
};