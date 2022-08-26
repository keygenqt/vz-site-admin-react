import {CoreRequest} from "../../../../../base";

/**
 * Get info about GitHub repos
 *
 * @return {Promise<*>}
 */
export default async function publicReposInfo() {
    return await CoreRequest.fetchGet('/api/ps/dashboard/repos-count')
}

publicReposInfo.propTypes = {};