import { Avatar, Button } from "@mui/material";
import styled from "styled-components";

export const StyledContainer = styled.div`
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  border-right: 1px solid whitesmoke;
  ::webekit-scrolbar {
    display: none;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;

export const StyledSidebarButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`;

export const StyledUserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

