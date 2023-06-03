import * as Realm from "realm-web";
import { app } from "../../service/mongoDB-sdk";
import {
  handleLogin,
  handleAuthenticationErrors,
} from "../../state/actions/authentication";
import { addUser, getUser } from "../../service";

const useAuthentication = (dispatch) => {
  async function loginEmailPassword(user) {
    const credentials = Realm.Credentials.emailPassword(
      user.email,
      user.password
    );
    try {
      const userLogged = await app.logIn(credentials);
      let userData = user;
      if (userData.first) {
        addUser(userData);
        delete userData.password;
      } else {
        userData = await getUser(user.email);
      }
      dispatch(handleLogin(userData));
      return userLogged;
    } catch (error) {
      dispatch(handleAuthenticationErrors(error));
    }
  }

  const registerEmailPassword = async (user) => {
    try {
      await app.emailPasswordAuth.registerUser({
        email: user.email,
        password: user.password,
      });
      return loginEmailPassword(user);
    } catch (error) {
      dispatch(handleAuthenticationErrors(error));
    }
  };

  const handleUserLogout = async () => {
    try {
      await app.currentUser
        ?.logOut()
        .then(() => console.log("Successfully logout"));
    } catch (error) {
      dispatch(handleAuthenticationErrors(error));
    }
  };

  // const handleAuthentication = async () => {
  //   try {
  //     const currentUser = app.currentUser;
  //     currentUser &&
  //       (await getUser(currentUser.email).then((userProfile) =>
  //         dispatch(handleLogin(userProfile))
  //       ));
  //   } catch (error) {
  //     dispatch(handleAuthenticationErrors(error));
  //   }
  // };
  async function handleAuthentication() {
    const currentUser = app.currentUser;
    if (currentUser) return new Promise(resolve => {
      getUser(currentUser)
      .then((userProfile) => {
        resolve(userProfile)
        dispatch(handleLogin(userProfile))
      })
      .catch((err) => dispatch(handleAuthenticationErrors(err)));
    })
  }

  return {
    loginEmailPassword,
    registerEmailPassword,
    handleUserLogout,
    handleAuthentication,
  };
};

export default useAuthentication;
