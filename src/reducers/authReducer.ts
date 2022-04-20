export interface Action {
  type: string;
  payload: any;
}

const isAuthenticated = { loggedIn: false };

export const authReducer = (state = isAuthenticated, action: Action) => {
  switch (action.type) {
    case "login":
      return { ...action.payload, loggedIn: true };
    case "logout":
      return { loggedIn: false };
    default:
      return state;
  }
};

export const initFunction = () => {
  let sessionUser: any = sessionStorage.getItem("user");
  let user: any;
  if (!sessionUser) {
    user = sessionUser;
  } else {
    user = JSON.parse(sessionUser);
  }
  return user;
};
