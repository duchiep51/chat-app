import { StyledImageWrapper } from "@/atoms/StyledImageWrapper";
import { Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import AppLogo from "../../../assets/chat.png";
import { auth } from "../../../config/firebase";
import { StyledContainer, StyledLoginContainer } from "./styles";

const Login = () => {
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);

  const handleSignIn = () => {
    signInWithGoogle();
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
