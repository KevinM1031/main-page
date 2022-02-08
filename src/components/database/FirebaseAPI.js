/**
 * This file is meant to abstract all the Firebase APIs and/or to add logic to them to fulfill our own needs
 */

import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "./firebase-config";
import {capitalize} from "@material-ui/core";

/**
 * Abstracts out the signInWithEmail and Password API provided by Firebase to
 * parse error message.
 * @param email entered email address
 * @param password entered password
 * @returns {Promise<UserCredential>}
 */
export const loginByEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                // Extract the actual error message from the error message returned from Firebase
                // for better display
                let regExp = /\(([^)]+)\)/;
                let matches = regExp.exec(error.message);
                let errorMessage = matches[1].split('/')[1].split("-").join(" ") + "!";

                // Encapsulates the extracted error message in a new Error object
                throw new Error(capitalize(errorMessage));

            })
}
