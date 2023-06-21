import {CoreRequest} from "../../../../../base";
import PropTypes from "prop-types";

/**
 * Create video
 *
 * @return {Promise<*>}
 */
export default async function videoCreate(data) {
    return await CoreRequest.fetchPost(`/api/ps/videos`, data)
}

videoCreate.propTypes = {
    data: PropTypes.object,
};