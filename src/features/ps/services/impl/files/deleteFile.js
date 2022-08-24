import PropTypes from "prop-types";
import {CoreRequest} from "../../../../../base";

/**
 * Delete file
 *
 * @return {Promise<*>}
 */
export default async function deleteFile(fileName) {
    return await CoreRequest.fetchDelete(`/api/ps/file/${fileName}`)
}

deleteFile.propTypes = {
    id: PropTypes.string
};