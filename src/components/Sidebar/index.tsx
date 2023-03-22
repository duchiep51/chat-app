import SearchBar from "@/atoms/SearchBar";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase";
import useConversation from "../../../hooks/useConversation";
import useDebounce from "../../../hooks/useDebounce";
import { Conversation } from "../../../models";
import ConversationsList from "./ConversationsList";
import SidebarHeader from "./SidebarHeader";
import StartNewConversation from "./StartNewConversation";
import { StyledContainer } from "./styles";

type Props = {
  conversations?: Conversation[];
};

const Sidebar = ({ conversations: initialConversations }: Props) => {
  const [loggedInUser] = useAuthState(auth);
  const [searchKeys, setSearchKeys] = useState<string>("");
  const { conversations } = useConversation();
  const debouncedSearchKeys = useDebounce<string>(searchKeys);
  const [displayedConversations, setDisplayedConversations] = useState<
    Conversation[] | undefined
  >(initialConversations);

  useEffect(() => {
    if (!conversations) return;

    let searchedConversations = [...conversations];

    if (debouncedSearchKeys) {
      searchedConversations = conversations?.filter((c) =>
        c.users.find(
          (u) => u.includes(debouncedSearchKeys) && u !== loggedInUser?.email
        )
      );
    }

    setDisplayedConversations(searchedConversations);
  }, [debouncedSearchKeys, conversations]);

  return (
    <StyledContainer>
      <SidebarHeader />
      <SearchBar onInputChange={(e) => setSearchKeys(e.target.value)} />
      <StartNewConversation conversations={conversations} />
      <ConversationsList conversations={displayedConversations} />
    </StyledContainer>
  );
};

export default Sidebar;
