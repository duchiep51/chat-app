import { StyledImageWrapper } from "@/atoms/StyledImageWrapper";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import styled from "styled-components";
import WhatAppLogo from "../../../assets/whatsapplogo.png";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loading = () => {
  return (
    <StyledContainer>
      <StyledImageWrapper>
        <Image src={WhatAppLogo} alt="chat app" height="200" width="200" />
      </StyledImageWrapper>
      <CircularProgress />
    </StyledContainer>
  );
};

export default Loading;
