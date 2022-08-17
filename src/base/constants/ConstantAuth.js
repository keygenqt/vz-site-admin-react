import CryptoJS from 'crypto-js';
import {ConstantOther} from "./ConstantOther";

/**
 * Auth user
 */
export const ConstantAuth = {
    // key for save to localStorage
    key: 'auth-data',

    // works
    isAuth: () => {
        return ConstantAuth.getData('token') !== undefined
    },
    logout: () => {
        ConstantAuth.clearData()
    },

    // get values
    getId: () => {
        return ConstantAuth.getData('id')
    },
    getRole: () => {
        return ConstantAuth.getData('role')
    },
    getRefreshToken: () => {
        return ConstantAuth.getData('refreshToken')
    },
    getEmail: () => {
        return ConstantAuth.getData('email')
    },
    getToken: () => {
        return ConstantAuth.getData('token')
    },

    // TODO
    // I did not find a 100% reliable way to securely store the secret of the key, as I understand it is not.
    // Based on the fact that breaking is not building, I think this is a fairly reliable solution,
    // until I found the right way.
    getData: (key) => {
        try {
            const item = localStorage.getItem(ConstantAuth.key)
            const bytes = CryptoJS.AES.decrypt(item, ConstantOther.deviceId);
            const data = bytes.toString(CryptoJS.enc.Utf8)
            return JSON.parse(data)[key]
        } catch (e) {
            ConstantAuth.clearData()
            return undefined
        }
    },
    setData: (data) => {
        localStorage.setItem(
            ConstantAuth.key,
            CryptoJS.AES.encrypt(JSON.stringify(data), ConstantOther.deviceId).toString()
        )
    },
    clearData: () => {
        localStorage.removeItem(ConstantAuth.key)
    }
};