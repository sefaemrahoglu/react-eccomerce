import { useEffect, useState, createContext, useContext } from "react";
import { get } from "../plugins/api";
import { Flex, Spinner } from "@chakra-ui/react";
import { post } from "../plugins/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await get("auth/me");
        setLoggedIn(true);
        setUser(me);
        console.log(me);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);
  const login = (data) => {
    setLoggedIn(true);
    setUser(data.user);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  };
  const logOut = async (callback) => {
    await post("auth/logout", {
      refresh_token: localStorage.getItem("refreshToken"),
    });
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    callback()
  };

  const values = {
    loggedIn,
    user,
    login,
    logOut,
  };
  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65"
          emptyColor="gray.200"
          size="xl"
          color="red.500"
        />
      </Flex>
    );
  }
  return (
    <AuthContext.Provider value={values}> {children} </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
