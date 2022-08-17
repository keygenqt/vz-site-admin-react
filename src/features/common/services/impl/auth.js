import PropTypes from "prop-types";
import {ConstantOther, CoreRequest} from "../../../../base";

/**
 * Login user in api
 *
 * @param email
 * @param password
 *
 * @return {Promise<*>}
 */
export default async function auth(email, password) {
    return await CoreRequest.fetchPost('/api/ps/auth', {
        deviceId: ConstantOther.deviceId,
        email: email,
        password: password
    })
}

auth.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string
};