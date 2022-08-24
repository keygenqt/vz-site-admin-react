import PropTypes from "prop-types";
import {CoreRequest} from "../../../../../base";

/**
 * Upload new file
 *
 * @return {Promise<*>}
 */
export default async function uploadFile(formData) {
    return await CoreRequest.fetchPost('/api/ps/file/upload', formData, null)
}

uploadFile.propTypes = {
    formData: PropTypes.object,
};