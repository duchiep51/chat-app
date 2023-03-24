import { StyledImageWrapper } from "@/atoms/StyledImageWrapper";
import { addUser } from "@/db/users/utils";
import { Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import styled from "styled-components";
import AppLogo from "../../../assets/chat.png";
import { auth } from "../../../config/firebase";

export const StyledContainer = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: whitesmoke;
`;

export const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

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
