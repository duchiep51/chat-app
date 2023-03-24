import { User } from "firebase/auth";
import { doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AppUser } from "../../../models";
import { queryGetRecipients } from "./queries";

type UserFirebase = User | null | undefined;

export const addUser = async ({ user }: { user: UserFirebase }) => {
  try {
    await setDoc(
      getUserDocReference(user?.email as string),
      {
        email: user?.email,
        lastSeen: serverTimestamp(),
        photoURL: user?.photoURL,
      },
      {
        merge: true,
      }
    );
  } catch (error) {
    console.log("Error at set user: ", error);
  }
};

export const getRecipients = async (recipientEmails: any[]): Promise<AppUser[]> => {
  let recipientsSnapshot;
  try {
    recipientsSnapshot = await getDocs(queryGetRecipients(recipientEmails));
  } catch (error) {
    console.log("Error at get recipients: ", error);
  }

  const recipients = recipientsSnapshot?.docs.map(
    (doc) => ({ ...doc.data()} as AppUser)
  );

  return recipients ?? [];
};

export const getUserDocReference = (userEmail: string) =>
  doc(db, "users", userEmail);
