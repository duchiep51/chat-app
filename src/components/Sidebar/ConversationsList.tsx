import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Conversation } from "../../../models";
import ConversationSelect from "../ConversationSelect/ConversationSelect";

const ConversationsList = ({
  conversations,
}: {
  conversations: QueryDocumentSnapshot<DocumentData>[] | undefined;
}) => {
  return (
    <>
      {conversations?.map((conversation) => (
        <ConversationSelect
          key={conversation.id}
          id={conversation.id}
          conversationUsers={(conversation.data() as Conversation).users}
        />
      ))}
    </>
  );
};

export default ConversationsList;
