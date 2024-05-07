import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Modal, Button } from "react-bootstrap";
const DialogBox = (props) => {
    const [showDialog, setShowDialog] = React.useState(true);
    const handleClose = (index) => {
        setShowDialog(false);
        props.root1.unmount();
        props.reslove(index);
    };
    return (_jsxs(Modal, { show: showDialog, onHide: () => handleClose(props.option.buttons.length - 1), children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: props.option.title }) }), _jsx(Modal.Body, { children: props.option.message }), _jsx(Modal.Footer, { children: props.option.buttons &&
                    props.option.buttons.map((item, i) => item === "Cancel" ? (_jsx(Button, { variant: "secondary", onClick: () => handleClose(i), children: item }, i)) : (_jsx(Button, { variant: "primary", onClick: () => handleClose(i), children: item }, i))) })] }));
};
export default React.memo(DialogBox);
