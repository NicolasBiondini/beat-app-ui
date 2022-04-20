type response = {
    status: boolean,
    message : string,
    error? : string
}

const validateUser_name = (user_name : string, length : number, maxLength : number) : boolean => {

    if(user_name.length < length){
        return false;
    }

    if(user_name.length > maxLength){
        return false;
    }

    return true
}

const validateEmail = (email : string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

const validatePassword = (field : string, length : number) : boolean => {

    let rgx = /^([\w.-](?!\.(com|net|html?|js|jpe?g|png)$)){8,}$/;

    if(field.length < length){
        return false;
    }
    let rgxValue = (rgx).test(field);

    if(!rgxValue){
        return false;
    }
     
    return true;
}

const comparePasswords = (password1 : string, password2 : string) : boolean => {
    if(password1 === password2){
        return true
    } else {
        return false
    }
}

export const fullValidator = (user_name: string, email: string, password1: string, password2 : string) : response => {

    if(!validateUser_name(user_name, 6, 18)){
        return {status: false, message: 'Invalid User Name. Insert a correct User Name.', error: "user_name"};
    }
    if(!validateEmail(email)){
        return {status: false, message: 'Invalid Email, try again.', error: "email"};
    }
    if(!validatePassword(password1, 8)){
        return {status: false, message: 'Invalid password. Insert a correct password.', error: "password"};
    }
    if(!comparePasswords(password1, password2)){
        return {status: false, message: "The passwords dosn't match. Try again.", error: "password"};
    }

    return {status: true, message: 'All correct!'};
}

export const simpleValidator = (email : string, password : string) : response => {

    if(!validateEmail(email)){
        return {status: false, message: 'Invalid Email, try again.', error: 'email'};
    }

    if(!validatePassword(password, 8)){
        return {status: false, message: 'Invalid password. Insert a correct password.', error: 'password'};
    }

    return {status: true, message: 'All correct!'};
}