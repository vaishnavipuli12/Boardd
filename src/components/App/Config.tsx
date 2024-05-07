export const username = "taskmanager";
export const password = "taskmanager@123";

const environment: string = 'Local'; //Prod or Local
let baseURL = 'https://192.168.1.42:8000';

export const getBackendURL = (type: string = '') => {
    let updatedApi = baseURL;
    if (environment === 'Local') {
        // We are using baseURL & ports for local development
        baseURL = 'http://192.168.1.42';
        
        const ports = {
            nodejs: 8080,
            backend: 8000
        }

        updatedApi = baseURL + ':';
        if (type) {
            updatedApi += ports.nodejs
        } else {
            updatedApi += ports.backend
        }
    } else if (environment === 'Prod') {
        if (type) {
            updatedApi += `/node`
        }
    }

    return updatedApi;
};

// export const websocketurl = 'json.webpubsub.azure.v1';
export const sessionTimeout = 1000 * 60 * 45; //45 minutes
export const passwordSaltKey = 'REGANAM$2023$REGANAM';
export const tokenSaltKey = 'REGANAM$6960$NOSVUKI';

export const getToken = `/api/token/`;
export const refreshToken = `/user/token/refresh`;


// APIS for login and signup
export const login = "/user/login";
export const signup = "/user/";
export const changePassword = "/user/password";

// USER apis
export const usertoken = '/user/generate_sas_token';
export const createFolder = '/user/folder';
export const filesList = '/files/';
export const deleteFile = '/files/metadata';

export const logout = '/user/logout';
export const userActivation = '/user/activation-link';
export const resetPassword = '/user/password-reset/';
export const userProfilePic = '/user/profile/photo'

export const defaultPingInterval = 5; //One Minute
export const defaultErrorMsg = "Something went wrong!";
export const defaultMaxFileSize = 10;