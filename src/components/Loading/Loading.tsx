import { StyledImageWrapper } from "@/atoms/StyledImageWrapper";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import AppLogo from "../../../assets/chat.png";
import { StyledContainer } from "./Loading.styles";

const Loading = () => {
  return (
    <StyledContainer>
      <StyledImageWrapper>
        <Image src={AppLogo} alt="chat app" height="200" width="200" />
      </StyledImageWrapper>
      <CircularProgress />
    </StyledContainer>
  );
};

export default Loading;
