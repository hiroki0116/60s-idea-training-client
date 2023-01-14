import { NextRouter } from "next/router";
// utils
import isEmpty from "lodash/isEmpty";
import { auth } from "utils/firebase";
import { APIWithoutAuth } from "utils/api";
// types
import { IUser } from "types/User";
import { MessageApi } from "antd/lib/message";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

type GoogleLoginProps = {
    setLoading: (boolean) => void;
    setShowLogin: (boolean) => void;
    setUser: (IUser)=> void;
    saveUserAndToken: (IUser, string) => void;
    message: MessageApi;
    router : NextRouter;
}

export const signInWithGoogle = ({ setLoading, setShowLogin, setUser,saveUserAndToken, message, router }: GoogleLoginProps) => {
  const provider = new GoogleAuthProvider().setCustomParameters({
    prompt: "select_account",
  });
  signInWithPopup(auth, provider)
    .then(async (result: any) => {
      setLoading(true);
      const user = result.user;
      const { data } = await APIWithoutAuth.get(`/users/?email=${user.email}`);

      // if user is not in database, create new user
      if (isEmpty(data.data)) {
        const { data } = await APIWithoutAuth.post("/users/signup", {
          email: user.email,
          firstName: user.displayName,
          lastName: "User",
          firebaseUID: user.uid,
          images: [
            {
              url: user.photoURL,
              about: "Google profile image",
            },
          ],
        });
        setUser(data.data);
        saveUserAndToken(data.data, user.accessToken);
        message.success("Login success.");
        setShowLogin(false);
        router.push("/dashboard");
        return;
      }
      setUser(data.data);
      setLoading(false);
      saveUserAndToken(data.data, user.accessToken);
      message.success("Login success.");
      setShowLogin(false);
      router.push("/dashboard");
    })
    .catch((error) => {
      message.error(error.message);
    });
};
