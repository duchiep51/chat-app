import { Conversation } from "../../../models";
import ConversationSelect from "./ConversationSelect";

const ConversationsList = ({
  conversations,
}: {
  conversations: Conversation[] | undefined;
}) => {
  return (
    <>
      {conversations?.map((conversation) => (
        <ConversationSelect
          key={conversation.id}
          id={conversation.id}
          conversationUsers={conversation.users}
        />
      ))}
    </>
  );
};

export default ConversationsList;
