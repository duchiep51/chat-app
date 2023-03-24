import { StyledImageWrapper } from "@/atoms/StyledImageWrapper";
import { addUser } from "@/db/users/utils";
import { Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import AppLogo from "../../../assets/chat.png";
import { auth } from "../../../config/firebase";
import { StyledContainer, StyledLoginContainer } from "./styles";


const Login = () => {
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      addUser({ user: user?.user });
      nookies.set(undefined, "userEmail", user?.user.email as string, {
        path: "/",
      });
      router.push("/");
    } catch (error) {
      console.log("Error at login with google:", error);
    }
  };

  return (
    <StyledContainer>
      <Head>
        <title>Login</title>
      </Head>

      <StyledLoginContainer>
        <StyledImageWrapper>
          <Image src={AppLogo} alt="Chat app" height="200" width="200" />
        </StyledImageWrapper>
        <Button variant="outlined" onClick={handleSignIn}>
          Sign in with Google
        </Button>
      </StyledLoginContainer>
    </StyledContainer>
  );
};

export default Login;
