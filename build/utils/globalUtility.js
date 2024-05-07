import { Subject } from 'rxjs';
import { post } from '../services/DataService';
import { logout } from '../components/App/Config';
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
const subject = new Subject();
export const dataService = {
    sendData: (data) => subject.next(data),
    getData: () => subject.asObservable()
};
export const userLogout = (isRedirect = true) => {
    post(logout, null).then(async (response) => {
        localStorage.clear();
        sessionStorage.clear();
        // isRedirect ? location.assign('/') : '';
    });
};
export const userNavHome = (isRedirect = true) => {
    post(logout, null).then(async (response) => {
        // isRedirect ? location.assign('/docs') : '';
    });
};
// export const pingBackendInterval = () => sessionStorage.getItem('accessToken') ? (getUserInfo().pingInterval * 60 * 1000) : null;
