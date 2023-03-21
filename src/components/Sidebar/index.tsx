import SearchBar from "@/atoms/SearchBar";
import { queryGetConversationsForCurrentUser } from "@/db/conversations/queries";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth } from "../../../config/firebase";
import { Conversation } from "../../../models";
import ConversationsList from "./ConversationsList";
import SidebarHeader from "./SidebarHeader";
import StartNewConversation from "./StartNewConversation";
import { StyledContainer } from "./styles";

const Sidebar = () => {
  const [loggedInUser] = useAuthState(auth);

  const [conversationSnapshot, __loading] = useCollection(
    queryGetConversationsForCurrentUser(loggedInUser?.email as string)
  );
  const conversations = conversationSnapshot?.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Conversation)
  );

  return (
    <StyledContainer>
      <SidebarHeader />
      <SearchBar />
      <StartNewConversation conversations={conversations} />
      <ConversationsList conversations={conversations} />
    </StyledContainer>
  );
};

export default Sidebar;
