import React, { useContext, useState, createContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import endPoints from "../services/api/index";

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: "*/*",
        "content-Type": "application/json",
      },
    };

    const {
      data: { access_token },
    } = await axios.post(endPoints.auth.login, { email, password }, options);
    console.log(access_token);

    if (access_token) {
      const token = access_token.access_token;
      Cookies.set("token", token, { expire: 5 });
      console.log(token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      console.log(user);
      setUser(user);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = "/login";
  };

  return {
    user,
    signIn,
    error,
    setError,
    logout,
  };
}
