import {CoreRequest} from "../../../../../base";

/**
 * Get info about GitHub followers
 *
 * @return {Promise<*>}
 */
export default async function followersInfo() {
    return await CoreRequest.fetchGet('/api/ps/dashboard/followers-count')
}

followersInfo.propTypes = {};