import {CoreRequest} from "../../../../../base";
import PropTypes from "prop-types";

/**
 * Create article
 *
 * @return {Promise<*>}
 */
export default async function articleCreate(data) {
    return await CoreRequest.fetchPost(`/api/ps/articles`, data)
}

articleCreate.propTypes = {
    data: PropTypes.object,
};