import { queryGetConversationsForCurrentUser } from "@/db/conversations/queries";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth } from "../../../config/firebase";
import ConversationsList from "./ConversationsList";
import SearchBar from "./SearchBar";
import SidebarHeader from "./SidebarHeader";
import StartNewConversation from "./StartNewConversation";
import { StyledContainer } from "./styles";

const Sidebar = () => {
  const [loggedInUser] = useAuthState(auth);

  const [conversationSnapshot, __loading] = useCollection(
    queryGetConversationsForCurrentUser(loggedInUser?.email as string)
  );
  const conversations = conversationSnapshot?.docs;

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
