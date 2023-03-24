import { queryGetMessages } from "@/db/messages/queries";
import { transformMessage } from "@/db/messages/utils";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import {
  KeyboardEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../../config/firebase";
import { useRecipient } from "../../../hooks/useRecipient";
import { Conversation, IMessage } from "../../../models";
import ConversationHeader from "./ConversationHead";
import Message from "./Message";
import {
  EndOfMessageForAutoScroll,
  StyledInput,
  StyledInputContainer,
  StyledMessageContainer,
} from "./styles";

const Conversation = ({
  conversation,
  messages,
}: {
  conversation: Conversation;
  messages: IMessage[];
}) => {
  const endOfMessageRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loggedInUser, _loading, _error] = useAuthState(auth);

  const conversationUsers = conversation.users;

  const { recipient, recipientEmail } = useRecipient(conversationUsers);

  const router = useRouter();
  const conversationId = router.query.id as string;

  const [messagesSnapshot, messagesLoading, __error] = useCollection(
    queryGetMessages(conversationId)
  );

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

  const addMessageToDbAndUpdateLastSeen = async () => {
    await setDoc(
      doc(db, "users", loggedInUser?.email as string),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    await addDoc(collection(db, "messages"), {
      conversation_id: conversationId,
      sent_at: serverTimestamp(),
      text: newMessage,
      user: loggedInUser?.email,
    });

    setNewMessage("");
    scrollToBottom();
  };

  const sendMessageOnEnter: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!newMessage) return;
      addMessageToDbAndUpdateLastSeen();
    }
  };

  const sendMessageOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (!newMessage) return;
    addMessageToDbAndUpdateLastSeen();
  };

  const scrollToBottom = () => {
    endOfMessageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <ConversationHeader
        recipient={recipient}
        recipientEmail={recipientEmail as string}
      />
      <StyledMessageContainer>
        {showMessages()}
        <EndOfMessageForAutoScroll ref={endOfMessageRef} />
      </StyledMessageContainer>

      <StyledInputContainer>
        <InsertEmoticonIcon />
        <StyledInput
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value as string)}
          onKeyDown={sendMessageOnEnter}
        />
        <IconButton onClick={sendMessageOnClick} disabled={!newMessage}>
          <SendIcon />
        </IconButton>
        <IconButton>
          <MicIcon />
        </IconButton>
      </StyledInputContainer>
    </>
  );
};

export default Conversation;
