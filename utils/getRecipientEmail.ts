import { User } from "firebase/auth";
import { Conversation } from "./../models/index";

export const getRecipientEmail = (
  conversationUsers: Conversation["users"],
  loggedInUser?: User | null
) => conversationUsers.find((userEmail) => userEmail !== loggedInUser?.email);