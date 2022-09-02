import {CoreRequest} from "../../../../../base";

/**
 * Get list connects
 *
 * @return {Promise<*>}
 */
export default async function connects() {
    return await CoreRequest.fetchGet('/api/ps/connects')
}

connects.propTypes = {};