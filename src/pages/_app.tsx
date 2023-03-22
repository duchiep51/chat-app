import Loading from "@/components/Loading/Loading";
import { addUser } from "@/db/users/utils";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import Login from "./login";
import nookies from "nookies";

export default function App({ Component, pageProps }: AppProps) {
  const [loggedInUser, loading, _error] = useAuthState(auth);

  useEffect(() => {
    if (loggedInUser) {
      addUser({ user: loggedInUser });
      nookies.set(undefined, "userEmail", loggedInUser.email as string, {
        path: "/",
      });
    }
  }, [loggedInUser]);

  if (loading) return <Loading />;
  if (!loggedInUser) return <Login />;
  return <Component {...pageProps} />;
}
