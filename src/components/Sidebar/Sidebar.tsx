import React from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVerticalIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

const StyledContainer = styled.div``;

const StyledHeader = styled.div``;

const StyledSearch = styled.div``;

const StyledSidebarButton = styled.button``;

const StyledUserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const Sidebar = () => {
  return (
    <StyledContainer>
      <StyledHeader>
        <Tooltip title="User Email" placement="right">
          <StyledUserAvatar />
        </Tooltip>

        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVerticalIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <LogoutIcon />
          </IconButton>
        </div>
      </StyledHeader>

      <StyledSearch></StyledSearch>

      <StyledSidebarButton></StyledSidebarButton>
    </StyledContainer>
  );
};

export default Sidebar;
