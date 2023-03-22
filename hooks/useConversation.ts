import { queryGetConversationsForCurrentUser } from "@/db/conversations/queries";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth } from "../config/firebase";
import { Conversation } from "../models";

const useConversation = () => {
  const [loggedInUser] = useAuthState(auth);
  const [conversationSnapshot, loading] = useCollection(
    queryGetConversationsForCurrentUser(loggedInUser?.email as string)
  );
  const conversations = useMemo(
    () =>
      conversationSnapshot?.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as Conversation)
      ),
    [conversationSnapshot]
  );

  return {
    conversations,
    loading
  };
};

export default useConversation;
