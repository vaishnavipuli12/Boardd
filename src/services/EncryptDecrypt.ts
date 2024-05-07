//@ts-nocheck
var CryptoJS = require("crypto-js");
const SECRETE_KEY = "REGANAM2023"



export const encrypt = (data: any, SaltKey = '') => {
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SaltKey ? SaltKey : SECRETE_KEY).toString();

    return ciphertext
}

export const decrypt = (ciphertext: any) => {
    var bytes = CryptoJS.AES.decrypt(ciphertext.substr(1, ciphertext.length - 2), SECRETE_KEY);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));


    return decryptedData
}


export const fileOpen = async (fileObj: any) => {
    try {
        const file = await fileObj;
        /**** const pickerOpts = {
            types: [
                {
                    description: 'Task Manager Notebook (*.JNBx)',
                    accept: {
                        'JNBx/*': ['.JNbx']
                    }
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false
        };
        let [fileHandle] = await window.showOpenFilePicker(pickerOpts);
        const file = await fileHandle.getFile(); */
        const decData = decrypt(await file.text())
        return decData
    }
    catch (e) {
        if (e.code == 20) {
            return { code: e.code, message: e.message }
        }
        return { code: 500, message: 'File Not supported' }
    }

}

export const fileOpenWithPath = async (path: any) => {
    /**** var fs = require('fs') */
    try {
        let decrData = ''/**** fs.readFileSync(path, 'utf8');
        const decData = decrypt(decrData)*/
        return decData;
    }
    catch (e) {
        return { code: e.code, message: e.message }
    }
}
