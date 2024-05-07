// import * as Constinfo from './ConstInfo';
// import * as ProgressAction from './../../store/Channel/Progress/actions';
import ReactDOM from "react-dom/client";
import DialogBox from '../../utils/DialogBox';
// import ExportModal from '../RibbonMenu/NavBarRibbon/ExportModal';
// import SaveNotebookModal from "../RibbonMenu/NavBarRibbon/SaveNotebookModal";
// import OpenFileModal from '../RibbonMenu/NavBarRibbon/OpenFileModal';
import axios from 'axios';
import { decrypt } from '../../services/EncryptDecrypt';

export const getUserInfo = () => {
    const userInfo: any = sessionStorage.getItem('userInfo');
    if (userInfo) {
      return decrypt(userInfo);
    }
  };

export const isUser = () => {
  const { userType = '' } = getUserInfo();
  return (userType === 'user' || userType === 'admin') ? true : false;
}

export const showMessageBox = (options: any) => {
  /****
   * let option = {
     message: param.message,
     type: param.type,
     detail: (param.detail) ? "More... \n\n" + param.detail : "",
     title: Constinfo.version
   }*/

  /**** remote.dialog.showMessageBoxSync(remote.getCurrentWindow(), option);*/
  return new Promise((reslove, reject) => {
    const container: any = document.getElementById("dialog-cloud-popup");
    const root1 = ReactDOM.createRoot(container);
    root1.render(<DialogBox option={options} root1={root1} reslove={reslove} reject={reject} />)
  })
}
  