import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVerticalIcon from "@mui/icons-material/MoreVert";
import { IconButton, Tooltip } from "@mui/material";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase";
import { StyledHeader, StyledUserAvatar } from "./styles";

const SidebarHeader = () => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Logout error: ", error);
    }
  };

  return (
    <StyledHeader>
      <Tooltip title={loggedInUser?.displayName as string} placement="right">
        <StyledUserAvatar src={loggedInUser?.photoURL || ""} />
      </Tooltip>

      <div>
        <Tooltip title="Settings" placement="right">
          <IconButton>
            <MoreVerticalIcon />
          </IconButton>
        </Tooltip>
        <IconButton>
          <ChatIcon />
        </IconButton>
        <Tooltip title="Sign out" placement="right">
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </div>
    </StyledHeader>
  );
};

export default SidebarHeader;
