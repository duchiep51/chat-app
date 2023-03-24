import Loading from "@/components/Loading/Loading";
import { RecipientsProvider } from "@/contexts/user";
import { addUser } from "@/db/users/utils";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import Login from "./login";
import { redirect } from 'next/navigation';

export default function App({ Component, pageProps }: AppProps) {
  const [loggedInUser, loading, _error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loggedInUser) {
      addUser({ user: loggedInUser });
      nookies.set(undefined, "userEmail", loggedInUser.email as string, {
        path: "/",
      });
    }
  }, [loggedInUser]);

  // useEffect(() => {
  //   return () => {
  //     !loggedInUser && router.push('/login')
  //   }
  // })

  // if (loading) return <Loading />;
  // if (!loggedInUser) return <div />;

  // if (!loggedInUser)

  return (
    <RecipientsProvider>
      <Component {...pageProps} />
    </RecipientsProvider>
  );
}
