import {
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { IMessage } from "../../../models";
import { convertFirestoreTimestampToString } from "../../../utils/timpestamp";
import { queryGetMessages } from "./queries";

export const getMessages = async (
  conversationId: string
): Promise<IMessage[]> => {
  const queryMessages = queryGetMessages(conversationId);

  let messagesSnapshot;
  try {
    messagesSnapshot = await getDocs(queryMessages);
  } catch (error) {
    console.log("Error at get messages: ", error);
  }

  const messages = messagesSnapshot?.docs.map((doc) => transformMessage(doc));

  return messages ?? [];
};

export const transformMessage = (
  message: QueryDocumentSnapshot<DocumentData>
) =>
  ({
    id: message.id,
    ...message.data(),
    sent_at: message.data().sent_at
      ? convertFirestoreTimestampToString(message.data().sent_at as Timestamp)
      : null,
  } as IMessage);
