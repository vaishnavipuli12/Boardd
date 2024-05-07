import * as ConstFun from "./../Constant/ConstantFunction";

export function ErrorMessage(message: any) {
  if (message) {
    if (message.hasOwnProperty('error')) {
      // alert(message.error);
      let object = {};
      if (typeof message.details === "string") {
        object = {
          title: message.error,
          type: 'info',
          message: message.details,
          buttons: ["OK"]
        }
      } else {
        object = {
          title: "Task Manager 1",
          message: message.error,
          type: 'info',
          buttons: ["OK"]
        }
      }
      ConstFun.showMessageBox(object);
    }
  }
}
