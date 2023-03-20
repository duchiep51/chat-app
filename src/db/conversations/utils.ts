import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const addConversation = async (recipients: string[]) => {
  try {
    await addDoc(collection(db, "conversations"), {
      users: [...recipients],
    });
  } catch (error) {
    console.log("Error at create Conversation: ", error);
  }
};
