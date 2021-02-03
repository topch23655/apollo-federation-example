import * as admin from 'firebase-admin';
import serviceAccount  from "./serviceAccountKey.json";

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var Auth = app.auth();
export default {Auth};