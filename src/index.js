import { firebase } from "@firebase/app";
import "@firebase/storage";
import { getUrlParams } from "./common/uri";
import { getFirebaseConfig } from "./common/firebaseConfig";

firebase.initializeApp(getFirebaseConfig())

const frame = document.getElementById("frame");
const { project } = getUrlParams();

