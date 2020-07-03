import app from 'firebase/app';
import firebase from 'firebase/app';
// import firebase from 'firebase';
import 'firebase/auth';





const config = {
    apiKey: "AIzaSyAfSB03BUXb7SqciMyekuYXsmpPY-norm8",
    authDomain: "achraiut.firebaseapp.com",
    databaseURL: "https://achraiut.firebaseio.com",
    projectId: "achraiut",
    storageBucket: "achraiut.appspot.com",
    messagingSenderId: "453061761258",
    appId: "1:453061761258:web:33670864fd15984789df93",
    measurementId: "G-YR7NF3QWGR"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    getCurrentUser = () => this.auth.currentUser;

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    getTokenId = () =>
        this.auth.currentUser.getIdToken(/* forceRefresh */ true);

    getSignInWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        // var provider = firebase.auth.GoogleAuthProvider();
        return this.auth.signInWithPopup(provider);
    }

    getSignInWithFacebook = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        // var provider = this.auth.FacebookAuthProvider();
        return this.auth.signInWithPopup(provider);
    }

    // sendPasswordResetEmail = (emailAddress) => {
    //     this.auth.sendPasswordResetEmail(emailAddress);
    // }

}

export default Firebase;
