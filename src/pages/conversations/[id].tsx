import ConversationScreen from "@/components/Conversation";
import Sidebar from "@/components/Sidebar";
import RecipientsContext from "@/contexts/user";
import {
  getConversationById,
  getConversations
} from "@/db/conversations/utils";
import { getMessages } from "@/db/messages/utils";
import { getRecipients } from "@/db/users/utils";
import { GetServerSideProps } from "next";
import Head from "next/head";
import nookies from "nookies";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../../../config/firebase";
import { Conversation, IMessage } from "../../../models";
import { getRecipientEmail } from "../../../utils/getRecipientEmail";

const StyledContainer = styled.div`
  display: flex;
`;

const StyledConversationContainer = styled.div`
  flex-grow: 1;
  overflow: scroll;
  height: 100vh;
  ::webekit-scrolbar {
    display: none;
  }
`;

interface Props {
  conversation: Conversation;
  messages: IMessage[];
  conversations: Conversation[];
}

const Conversation = ({ conversation, messages, conversations }: Props) => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);
  return (
    <StyledContainer>
      <Head>
        <title>
          Conversation with{" "}
          {getRecipientEmail(conversation.users, loggedInUser?.email)}
        </title>
      </Head>

      <Sidebar conversations={conversations} />

      <StyledConversationContainer>
        <ConversationScreen conversation={conversation} messages={messages} />
      </StyledConversationContainer>
    </StyledContainer>
  );
};

export default Conversation;

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async (context) => {
  const conversationId = context.params?.id;
  const cookies = nookies.get(context);

  const conversation = await getConversationById(conversationId as string);
  
  const messages = await getMessages(conversationId as string);
  
  const conversations = await getConversations(cookies.userEmail);

  console.log('over here')

  return {
    props: {
      conversation,
      messages,
      conversations,
    },
  };
};
