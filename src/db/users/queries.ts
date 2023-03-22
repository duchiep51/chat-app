import { where } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { query } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const queryGetUsers = (userEmail: string) =>
  query(collection(db, "users"), where("email", "!=", userEmail));
