export const GROUP_USERS = 'Group Users';
export const VIEW_GROUP = 'Group Details';
export const INDIVIDUAL_USERS = 'Individual Users';

export const ROWSPERPAGE = [10, 25, 50, 100];
export const DEFAULTROWSPERPAGE = 10;

export const nameRegex = /^[a-zA-Z0-9 ]{1,60}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;
export const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z]+)+$/;
export const licenseTextfieldRegex = /^[a-zA-Z0-9 ]{1,100}$/;