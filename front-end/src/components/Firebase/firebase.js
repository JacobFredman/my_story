import app from 'firebase/app';

{/* <script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js"></script> */ }

{/* <script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-analytics.js"></script> */ }


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
    }
}

export default Firebase;
