import ConversationScreen from "@/components/ConversationScreen/ConversationScreen";
import Sidebar from "@/components/Sidebar";
import {
  getConversationById,
  getConversations
} from "@/db/conversations/utils";
import { getMessages } from "@/db/messages/utils";
import { GetServerSideProps } from "next";
import Head from "next/head";
import nookies from "nookies";
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
          {getRecipientEmail(conversation.users, loggedInUser)}
        </title>
      </Head>

      <Sidebar conversations={conversations}/>

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

  return {
    props: {
      conversation,
      messages,
      conversations,
    },
  };
};
