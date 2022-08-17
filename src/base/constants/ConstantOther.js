import {browserName, osName, mobileVendor} from 'react-device-detect';
import md5 from "md5";

/**
 * Apps constants sundries
 */
export const ConstantOther = {
    nickname: '@keygenqt',
    email: 'dev@keygenqt.com',
    copy: '© 2022 KeyGenQt',
    psBlogViewUrl: 'https://version2.keygenqt.com/blog',
    deviceId: md5("wnIwF1OMwTu8Qxwg" + browserName + osName + mobileVendor),
    languages: {
        ru: 'ru',
        en: 'en'
    }
};