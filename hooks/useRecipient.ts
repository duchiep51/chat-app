import { useCollection } from "react-firebase-hooks/firestore";
import { where } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { query } from "firebase/firestore";
import { getRecipientEmail } from "./../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { AppUser, Conversation } from "../models";

export const useRecipient = (conversationUsers: Conversation["users"]) => {
  const [loggedInUser] = useAuthState(auth);

  const recipientEmail = getRecipientEmail(conversationUsers, loggedInUser);

  const queryGetRecipient = query(
    collection(db, "users"),
    where("email", "==", recipientEmail)
  );
  const [recipientSnapshot, _loading, _error] =
    useCollection(queryGetRecipient);

  const recipient = recipientSnapshot?.docs[0]?.data() as AppUser | undefined;

  return { recipient, recipientEmail };
};
