import React from "react";
import { Modal, Button } from "react-bootstrap";

interface Options {
  buttons: Array<string>;
  message: string;
  title: string;
}

interface DialogProps {
  option: Options;
  reslove: any;
  reject: any;
  root1: any;
}

const DialogBox: React.FC<DialogProps> = (props: any) => {
  const [showDialog, setShowDialog] = React.useState(true);

  const handleClose = (index: number) => {
    setShowDialog(false);
    props.root1.unmount();
    props.reslove(index);
  };

  return (
    <Modal show={showDialog} onHide={() => handleClose(props.option.buttons.length - 1)}>
      <Modal.Header closeButton>
        <Modal.Title>{props.option.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.option.message}</Modal.Body>
      <Modal.Footer>
        {props.option.buttons &&
          props.option.buttons.map((item: any, i: any) =>
            item === "Cancel" ? (
              <Button key={i} variant="secondary" onClick={() => handleClose(i)}>
                {item}
              </Button>
            ) : (
              <Button key={i} variant="primary" onClick={() => handleClose(i)}>
                {item}
              </Button>
            )
          )}
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(DialogBox);


// import React from "react";
// import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog';
// import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';

// const modalPropsStyles = { main: { maxWidth: 450 } };

// interface Options {
//   buttons: Array<string>,
//   message: string,
//   title: string,
// }
// interface DialogProps {
//   option: Options,
//   reslove: any,
//   reject: any,
//   root1: any
// }
// const DialogBox = (props: DialogProps) => {
//   const [hideDialog, setHideDialog] = React.useState(false);

//   const modalProps = {
//     isBlocking: true,
//     styles: modalPropsStyles,
//   }

//   const dialogContentProps = {
//     type: DialogType.normal,
//     title: props.option.title,
//     subText: props.option.message,
//   };

//   const toggleHideDialog = (e: any, index: number) => {
//     setHideDialog(!hideDialog);
//     props.root1.unmount();
//     props.reslove(index)
//   }

//   return (
//     <Dialog
//       hidden={hideDialog}
//       onDismiss={(e: any) => toggleHideDialog(e, props.option.buttons.length - 1)}
//       dialogContentProps={dialogContentProps}
//       modalProps={modalProps}>
//       <DialogFooter>
//         {props.option.buttons && props.option.buttons.map((item, i) => {
//           return item === 'Cancel' ? <DefaultButton key={i} onClick={(e: any) => toggleHideDialog(e, i)} text={item} /> : <PrimaryButton key={i} style={{ color: '#000000' }} onClick={(e: any) => toggleHideDialog(e, i)} text={item} />
//         })}
//       </DialogFooter>
//     </Dialog>
//   )
// }

// export default React.memo(DialogBox);