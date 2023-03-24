import styled from "styled-components";
import { Conversation } from "../../../models";
import ConversationSelect from "./ConversationSelect";

const StyledConversationsListContainer = styled.div`
  overflow-y: scroll;
  height: 80vh;
`

const ConversationsList = ({
  conversations,
}: {
  conversations: Conversation[] | undefined;
}) => {
  return (
    <StyledConversationsListContainer>
      {conversations?.map((conversation) => (
        <ConversationSelect
          key={conversation.id}
          id={conversation.id}
          conversationUsers={conversation.users}
        />
      ))}
    </StyledConversationsListContainer>
  );
};

export default ConversationsList;
