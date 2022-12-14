import CryptoJS from 'crypto-js';
import {ConstantOther} from "./ConstantOther";
import {MethodsRequest} from "../request/MethodsRequest";

/**
 * Auth user
 */
export const ConstantAuth = {
    // key for save to localStorage
    key: 'auth-data',
    // key secret for encryption
    secret: ConstantOther.deviceId,

    // works
    isAuth: () => {
        return ConstantAuth.getData('id') !== undefined
    },
    logout: async () => {
        // clear app data
        ConstantAuth.clearData()
        // clear cookies
        await MethodsRequest.common.logout()
        // restart app
        window.location.href = '/'
    },

    // get values
    getId: () => {
        return ConstantAuth.getData('id')
    },
    getRole: () => {
        return ConstantAuth.getData('role')
    },
    getEmail: () => {
        return ConstantAuth.getData('email')
    },

    // check role
    isGuest: () => {
        return ConstantAuth.getRole() === 'GUEST'
    },
    isAdmin: () => {
        return ConstantAuth.getRole() === 'ADMIN'
    },

    getData: (key) => {
        try {
            const item = localStorage.getItem(ConstantAuth.key)
            const bytes = CryptoJS.AES.decrypt(item, ConstantAuth.secret);
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
            CryptoJS.AES.encrypt(JSON.stringify(data), ConstantAuth.secret).toString()
        )
    },
    clearData: () => {
        localStorage.removeItem(ConstantAuth.key)
    }
};