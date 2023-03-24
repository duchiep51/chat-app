import { Conversation } from "./../models/index";

export const getRecipientEmail = (
  conversationUsers: Conversation["users"],
  loggedInUserEmail?: string | null
) => conversationUsers.find((userEmail) => userEmail !== loggedInUserEmail);
