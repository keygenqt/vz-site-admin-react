import {CoreRequest} from "../../../../../base";

/**
 * Get list videos
 *
 * @return {Promise<*>}
 */
export default async function videos() {
    return await CoreRequest.fetchGet('/api/ps/videos/all')
}

videos.propTypes = {};