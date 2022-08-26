import {CoreRequest} from "../../../../../base";

/**
 * Get list GitHub repos mast popular
 *
 * @return {Promise<*>}
 */
export default async function reposPopular() {
    return await CoreRequest.fetchGet('/api/ps/dashboard/repos-popular')
}

reposPopular.propTypes = {};