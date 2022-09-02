import {ConstantConf} from "../../ConstantConf";

/**
 * Utils
 */
export const AppUtils = {
    // check is image
    isImage: (fileMime) => {
        return fileMime.includes('png')
            || fileMime.includes('jpg')
            || fileMime.includes('jpeg')
    },
    // create file link
    getUrl: (fileName) => {
        return `${ConstantConf.apiPath}/api/ps/file/${fileName}`
    },
    // create file link
    getUrlPretty: (originalFileName) => {
        return `${ConstantConf.apiPath}/api/ps/file/${originalFileName}`
    },
};