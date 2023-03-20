import { User } from "firebase/auth";
import {
    doc, serverTimestamp,
    setDoc
} from "firebase/firestore";
import { db } from "../../../config/firebase";

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

export const getUserDocReference = (userEmail: string) =>
  doc(db, "users", userEmail);
