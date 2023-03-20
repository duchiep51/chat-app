import { addConversation } from "@/db/conversations/utils";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@mui/material";
import * as EmailValidator from "email-validator";
import {
  DocumentData,
  QueryDocumentSnapshot
} from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase";
import { Conversation } from "../../../models";
import { StyledSidebarButton } from "./styles";

const StartNewConversation = ({
  conversations,
}: {
  conversations: QueryDocumentSnapshot<DocumentData>[] | undefined;
}) => {
  const [loggedInUser] = useAuthState(auth);

  const [openNewConversationDialog, setOpeNewConversationDialog] =
    useState<boolean>(false);
  const [recipientEmail, setRecipientEmail] = useState<string>("");

  const handleOpenNewConversationDialog = () => {
    setOpeNewConversationDialog(true);
    setRecipientEmail("");
  };

  const handleCloseNewConversationDialog = () => {
    setOpeNewConversationDialog(false);
  };

  const isConversationsExisted = (recipientEmail: string) => {
    return conversations?.find((conversation) =>
      (conversation.data() as Conversation).users.includes(recipientEmail)
    );
  };

  const isInvitingSelf = recipientEmail === loggedInUser?.email;

  const createConversation = async () => {
    if (!recipientEmail) return;

    if (
      EmailValidator.validate(recipientEmail) &&
      !isInvitingSelf &&
      !isConversationsExisted(recipientEmail)
    ) {
      await addConversation([recipientEmail, loggedInUser?.email as string]);
    }

    handleCloseNewConversationDialog();
  };

  return (
    <>
      <StyledSidebarButton onClick={handleOpenNewConversationDialog}>
        Start a new conversation
      </StyledSidebarButton>
      <Dialog
        open={openNewConversationDialog}
        onClose={handleCloseNewConversationDialog}
      >
        <DialogTitle>New conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a google address you want to chat with
          </DialogContentText>
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
          <Button onClick={createConversation}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StartNewConversation;
