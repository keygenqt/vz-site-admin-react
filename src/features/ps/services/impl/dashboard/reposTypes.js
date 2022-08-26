import {CoreRequest} from "../../../../../base";

/**
 * Get info about GitHub repos by month
 *
 * @return {Promise<*>}
 */
export default async function reposTypes() {
    return await CoreRequest.fetchGet('/api/ps/dashboard/repos-types')
}

reposTypes.propTypes = {};