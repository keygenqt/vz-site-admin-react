import {CoreRequest} from "../../../../../base";
import PropTypes from "prop-types";

/**
 * Update video
 *
 * @return {Promise<*>}
 */
export default async function videoUpdate(id, data) {
    return await CoreRequest.fetchPut(`/api/ps/videos/${id}`, data)
}

videoUpdate.propTypes = {
    id: PropTypes.string,
};