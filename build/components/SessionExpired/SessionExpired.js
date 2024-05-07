import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { userLogout } from '../../utils/globalUtility';
import * as ErrorMessage from '../Modals/CommonComponent';
const SessionExpired = () => {
    const [isIdle, setIsIdle] = useState(false);
    const handleOnIdle = () => {
        if (sessionStorage['accessToken']) {
            userLogout(false);
            setIsIdle(true); //session expired
        }
    };
    // useIdleTimer({
    //     timeout: sessionTimeout,
    //     onIdle: handleOnIdle
    // });
    const handleOnClick = () => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
    };
    useEffect(() => {
        ErrorMessage.ErrorMessage('Your session is expired');
    }, []);
    return (_jsx("div", { className: 'popup', children: " Your Session is expired" })
    // <Dialog
    //     isOpen={isIdle}
    //     dialogContentProps={{
    //         type: DialogType.normal,
    //         title: 'Session Expired',
    //         showCloseButton: false,
    //         subText: 'Your session has Expired please login again.',
    //     }}
    //     modalProps={
    //         {
    //             isBlocking: true,
    //             styles: { main: { maxWidth: 450 } }
    //         }
    //     }>
    //     <DialogFooter>
    //         <DefaultButton onClick={handleOnClick} text='Login' />
    //     </DialogFooter>
    // </Dialog>
    );
};
export default SessionExpired;
