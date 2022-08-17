/**
 * Auth user
 */
export const ConstantAuth = {
    // key for save to localStorage
    key: 'auth-data',

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

    // set/get response aut data
    getData: (key) => {
        const item = localStorage.getItem(ConstantAuth.key)
        return item ? JSON.parse(item)[key] : undefined
    },
    setData: (obj) => {
        localStorage.setItem(ConstantAuth.key, JSON.stringify(obj))
    }
};