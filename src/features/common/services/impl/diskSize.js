import {CoreRequest} from "../../../../base";
import PropTypes from "prop-types";

/**
 * Get info about disk
 *
 * @return {Promise<*>}
 */
export default async function diskSize() {
    return await CoreRequest.fetchGet('/api/ps/dashboard/hard-disk-size')
}

diskSize.propTypes = {};