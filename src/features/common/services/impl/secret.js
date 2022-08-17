import {CoreRequest} from "../../../../base";

/**
 * Get secret for encryption from server
 *
 * @return {Promise<*>}
 */
export default async function secret() {
    return await CoreRequest.fetchGet('/ps/secret')
}

secret.propTypes = {};