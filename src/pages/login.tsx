import { Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import WhatAppLogo from "../../assets/whatsapplogo.png";
import { auth } from "../../config/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { StyledImageWrapper } from "@/atoms/StyledImageWrapper";

const StyledContainer = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: whitesmoke;
`;

const StyledLoginContainer = styled.div`
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

  const handleSignIn = () => {
    signInWithGoogle();
  }

  return (
    <StyledContainer>
      <Head>
        <title>Login</title>
      </Head>

      <StyledLoginContainer>
        <StyledImageWrapper>
          <Image src={WhatAppLogo} alt="Chat app" height="200" width="200" />
        </StyledImageWrapper>
        <Button variant="outlined" onClick={handleSignIn}>
          Sign in with Google
        </Button>
      </StyledLoginContainer>
    </StyledContainer>
  );
};

export default Login;
