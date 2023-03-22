import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Conversation } from "../../../models";
import { queryGetConversationsForCurrentUser } from "./queries";

export const addConversation = async (recipients: string[]) => {
  try {
    await addDoc(collection(db, "conversations"), {
      users: [...recipients],
    });
  } catch (error) {
    console.log("Error at create Conversation: ", error);
  }
};

export const getConversations = async (
  userEmail: string
): Promise<Conversation[]> => {
  let conversationsSnapshot;
  try {
    conversationsSnapshot = await getDocs(
      queryGetConversationsForCurrentUser(userEmail)
    );
  } catch (error) {
    console.log("Error at get Conversations: ", error);
  }

  const conversations = conversationsSnapshot?.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Conversation)
  );

  return conversations ?? [];
};

export const getConversationById = async (
  conversationId: string
): Promise<Conversation> => {
  const conversationRef = doc(db, "conversations", conversationId as string);
  let conversationSnapshot;
  try {
    conversationSnapshot = await getDoc(conversationRef);
  } catch (error) {
    console.log("Error at get conversation by id", error);
  }
  const conversation = conversationSnapshot?.data() as Conversation;
  return conversation;
};
