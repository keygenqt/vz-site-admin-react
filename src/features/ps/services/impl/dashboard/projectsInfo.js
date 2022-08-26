import {CoreRequest} from "../../../../../base";

/**
 * Get info about projects
 *
 * @return {Promise<*>}
 */
export default async function projectsInfo() {
    return await CoreRequest.fetchGet('/api/ps/dashboard/projects-count')
}

projectsInfo.propTypes = {};