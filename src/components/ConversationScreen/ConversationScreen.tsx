import { IconButton } from "@mui/material";
import styled from "styled-components";
import { useRecipient } from "../../../hooks/useRecipient";
import { Conversation, IMessage } from "../../../models";
import {
  convertFirestoreTimestampToString,
  generateQueryGetMessage,
  transformMessage,
} from "../../../utils/getMessageInConversation";
import RecipientAvatar from "../RecipientAvatar/RecipientAvatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "../Message/Message";

const StyledRecipientHeader = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 11px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const StyledHeaderInfo = styled.div`
  flex-grow: 1;
  > h3 {
    margin-top: 0;
    margin-bottom: 3px;
  }

  > span {
    font-size: 14px;
    color: gray;
  }
`;

const StyledH3 = styled.h3`
  word-break: break-all;
`;

const StyledHeaderIcon = styled.div`
  display: flex;
`;

const StyledMessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const ConversationScreen = ({
  conversation,
  messages,
}: {
  conversation: Conversation;
  messages: IMessage[];
}) => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);

  const conversationUsers = conversation.users;

  const { recipient, recipientEmail } = useRecipient(conversationUsers);

  const router = useRouter();
  const conversationId = router.query.id as string;

  const queryGetMessages = generateQueryGetMessage(conversationId);

  const [messagesSnapshot, messagesLoading, __error] =
    useCollection(queryGetMessages);

  const showMessages = () => {
    if (messagesLoading) {
      return messages.map((message) => (
        <Message key={message.id} message={message} />
      ));
    }

    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message key={message.id} message={transformMessage(message)} />
      ));
    }

    return null;
  };

  return (
    <>
      <StyledRecipientHeader>
        <RecipientAvatar
          recipient={recipient}
          recipientEmail={recipientEmail}
        />
        <StyledHeaderInfo>
          <StyledH3>{recipientEmail}</StyledH3>
          {recipient && (
            <span>
              Last active:{" "}
              {convertFirestoreTimestampToString(recipient.lastSeen)}
            </span>
          )}
        </StyledHeaderInfo>

        <StyledHeaderIcon>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </StyledHeaderIcon>
      </StyledRecipientHeader>
      <StyledMessageContainer>{showMessages()}</StyledMessageContainer>
    </>
  );
};

export default ConversationScreen;
