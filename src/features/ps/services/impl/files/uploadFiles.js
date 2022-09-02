import {CoreRequest} from "../../../../../base";

/**
 * Get list articles
 *
 * @return {Promise<*>}
 */
export default async function uploadFiles() {
    return await CoreRequest.fetchGet('/api/ps/file/uploads')
}

uploadFiles.propTypes = {};