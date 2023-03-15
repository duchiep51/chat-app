import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVerticalIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import * as EmailValidator from 'email-validator'

const StyledContainer = styled.div`
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
`;

const StyledHeader = styled.div`
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

const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 2px;
`;

const StyledSidebarButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`;

const StyledUserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const StyledSearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;

const Sidebar = () => {
  const [loggedInUser, loading, _error] = useAuthState(auth);
  const [openNewConversationDialog, setOpeNewConversationDialog] =
    React.useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Logout error: ", error);
    }
  };

  const handleOpenNewConversationDialog = () => {
    setOpeNewConversationDialog(true);
    setRecipientEmail("");
  };

  const handleCloseNewConversationDialog = () => {
    setOpeNewConversationDialog(false);
  };

  const isInvitingSelf = recipientEmail === loggedInUser?.email

  const createConversation = () => {
    if (!recipientEmail) return 

    if (!EmailValidator.validate(recipientEmail) && !isInvitingSelf) {
      
    }

    handleCloseNewConversationDialog()
  }

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
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </StyledHeader>

      <StyledSearch>
        <SearchIcon />
        <StyledSearchInput placeholder="Search" />
      </StyledSearch>

      <StyledSidebarButton onClick={handleOpenNewConversationDialog}>
        Start a new conversation
      </StyledSidebarButton>

      <Dialog
        open={openNewConversationDialog}
        onClose={handleCloseNewConversationDialog}
      >
        <DialogTitle>New conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter a google address you want to chat with</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewConversationDialog}>Cancel</Button>
          <Button onClick={createConversation}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default Sidebar;
