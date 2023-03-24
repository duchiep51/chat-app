import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import { AppUser } from "../../../models";
import { convertFirestoreTimestampToString } from "../../../utils/timpestamp";
import RecipientAvatar from "../RecipientAvatar/RecipientAvatar";
import {
  StyledH3,
  StyledHeaderIcon,
  StyledHeaderInfo,
  StyledRecipientHeader,
} from "./styles";

const ConversationHeader = ({
  recipient,
  recipientEmail,
}: {
  recipient: AppUser | undefined;
  recipientEmail: string;
}) => {
  return (
    <StyledRecipientHeader>
      <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
      <StyledHeaderInfo>
        <StyledH3>{recipientEmail}</StyledH3>
        {recipient && (
          <span>
            Last active: {convertFirestoreTimestampToString(recipient.lastSeen)}
          </span>
        )}
      </StyledHeaderInfo>

      <StyledHeaderIcon>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </StyledHeaderIcon>
    </StyledRecipientHeader>
  );
};

export default ConversationHeader;
