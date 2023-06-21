import {CoreRequest} from "../../../../../base";
import PropTypes from "prop-types";

/**
 * Get video by id
 *
 * @return {Promise<*>}
 */
export default async function video(id) {
    return await CoreRequest.fetchGet(`/api/ps/videos/all/${id}`)
}

video.propTypes = {
    id: PropTypes.string,
};