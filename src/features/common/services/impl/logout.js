import {CoreRequest} from "../../../../base";

/**
 * Clear session
 *
 * @return {Promise<*>}
 */
export default async function logout() {
    return await CoreRequest.fetchGet('/api/ps/logout')
}

logout.propTypes = {};