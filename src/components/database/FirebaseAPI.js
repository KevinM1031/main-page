/**
 * This file is meant to abstract all the Firebase APIs and/or to add logic to them to fulfill our own needs
 */

import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, db } from "./firebase-config";
import {capitalize} from "@material-ui/core";
import {ref, set, get, query} from "firebase/database";

export const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).catch((error) => {
        // Extract the actual error message from the error message returned from Firebase
        // for better display
        let regExp = /\(([^)]+)\)/;
        let matches = regExp.exec(error.message);
        let errorMessage = matches[1].split('/')[1].split("-").join(" ") + "!";

        // Encapsulates the extracted error message in a new Error object
        throw new Error(capitalize(errorMessage));

    });
}

export const logout = async () => {
    return auth.signOut().then(() => {
        window.location.reload();
    });
}

export const isEditor = () => {
    if (!auth.currentUser) return false;
    return auth.currentUser.email == 'kevinmin1031@gmail.com';
}

export const pathBase = () => {
    return 'contents/';
}

export const setData = async (path, data) => {
    var currData = await getData(path);
    if (currData) {
        for (const key in data) {
            if (data[key]) {
                currData[key] = data[key];  
            }
        }
        await set(ref(db, path), currData);
    } else {
        overwriteData(path, data);
    }
}

const overwriteData = async (path, data) => {
    await set(ref(db, path), data);
}

export const getData = async (path) => {
    let pathRef = ref(db, path);
    let pathQuery = query(pathRef)
    let dataSnapshot = await get(pathQuery);
    let data = dataSnapshot.val();

    return data;
}

export function idToTitle(id) {
    let title = '';
    for (let i = 0; i < id.length; i++) {
        let currChar = id.charAt(i);
        if (currChar == '_') title += ' ';
        else title += currChar;
    }
    return title;
}

export function titleToId(title) {
    let id = '';
    for (let i = 0; i < title.length; i++) {
        let currChar = title.charAt(i);
        if (currChar == ' ') id += '_';
        else id += currChar;
    }
    return id;
}

export const getSectionContent = (page, setContent, listIds=['items'], listReverse=false) => {
    const path = pathBase() + 'section' + page;
    getData(path).then((data) => {
        for (const i in listIds) {
            let listId = listIds[i];
            let items = data[listId];
            if (items) {
                data[listId] = [];
                for (const key in items) {
                    data[listId].push({...{title: idToTitle(key)}, ...items[key]});
                }
                if (listReverse) {
                    data[listId] = data[listId].reverse();
                }
            }
        }
        setContent(data);
    });
}

export const getSectionRawContent = (page, setContent) => {
    const path = pathBase() + 'section' + page;
    getData(path).then((data) => {
        setContent(data);
    });
}

export const updateSectionContent = (page, data, setContent) => {
    const path = pathBase() + 'section' + page;
    setData(path, data).then(() => {
        getSectionContent(page, setContent);
    });
}