import {CoreRequest} from "../../../../../base";

/**
 * Get list projects
 *
 * @return {Promise<*>}
 */
export default async function projects() {
    return await CoreRequest.fetchGet('/api/ps/projects/all')
}

projects.propTypes = {};