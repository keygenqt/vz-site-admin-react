import PropTypes from "prop-types";
import {ErrorRequest} from "./ErrorRequest";
import {ConstantAuth} from "../constants/ConstantAuth";

export const CoreRequest = {
    fetchGet: fetchGet,
    fetchPost: fetchPost,
    fetchPut: fetchPut,
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

/**
 * Post query fetch
 *
 * @param path
 * @param body
 * @return {Promise<*>}
 */
async function fetchPut(
    path,
    body
) {
    return await _query(
        methods.put,
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
        methods.get,
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
    return await fetch(path, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null
    }).then(async (response) => {
        const result = await response.json()
        if (response.ok) {
            return result
        } else if (result.code === 401) {
            ConstantAuth.logout()
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
