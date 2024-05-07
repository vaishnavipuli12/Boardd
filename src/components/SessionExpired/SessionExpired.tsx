import { useState, useEffect } from 'react';
// import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
// import { DefaultButton } from '@fluentui/react/lib/Button';
// import { useIdleTimer } from 'react-idle-timer';
import { sessionTimeout } from '../App/Config'
import { userLogout } from '../../utils/globalUtility';
import * as ErrorMessage from '../Modals/CommonComponent';
import { useFetcher } from 'react-router-dom';

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

    useEffect(() =>{
        ErrorMessage.ErrorMessage('Your session is expired');
    }, [])

    return (
        <div className='popup'> Your Session is expired</div>
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