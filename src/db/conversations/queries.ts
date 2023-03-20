import { collection, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const queryGetConversationsForCurrentUser = (userEmail: string) =>
  query(
    collection(db, "conversations"),
    where("users", "array-contains", userEmail)
  );
