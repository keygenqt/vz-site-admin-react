import PropTypes from "prop-types";
import {ErrorRequest} from "./ErrorRequest";
import {ConstantAuth} from "../constants/ConstantAuth";

export const CoreRequest = {
    fetchGet: fetchGet,
    fetchPost: fetchPost
}

/**
 * Methods query
 *
 * @type {{post: string, get: string, delete: string, put: string}}
 */
const methods = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE'
}

/**
 * Post query fetch
 *
 * @param path
 * @param body
 * @return {Promise<*>}
 */
async function fetchPost(
    path,
    body
) {
    return await _query(
        methods.post,
        path,
        body
    );
}

fetchPost.propTypes = {
    path: PropTypes.string,
    body: PropTypes.object
};

/**
 * Post query fetch
 *
 * @param path
 * @return {Promise<*>}
 */
async function fetchGet(
    path
) {
    return await _query(
        methods.post,
        path,
        null
    );
}

fetchPost.propTypes = {
    path: PropTypes.string,
    body: PropTypes.object
};

/**
 * Base query functions
 * @private
 */
async function _query(
    method,
    path,
    body
) {
    const token = ConstantAuth.getToken()

    return await fetch(path, {
        method: method,
        headers: token ? {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        } : {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null
    }).then(async (response) => {
        const result = await response.json()
        if (response.ok) {
            return result
        } else {
            throw new ErrorRequest(result)
        }
    });
}

_query.propTypes = {
    method: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    body: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.oneOf([null]).isRequired,
    ]).isRequired
};

