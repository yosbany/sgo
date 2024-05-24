import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import { getDatabase, ref, set, get, push } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js';


class FirebaseService {
    static instance = null;
    static getInstance() {
        if (!FirebaseService.instance) {
            FirebaseService.instance = new FirebaseService();
        }
        return FirebaseService.instance;
    }
    constructor() {
        const app = initializeApp(this.FIREBASECONFIG);
        this.auth = getAuth(app);
        this.db = getDatabase(app);
        FirebaseService.instance = this;
    }

    FIREBASECONFIG = {
        apiKey: "AIzaSyCOKQBJthEjqji2GxPsjcEZtUu965wtc1c",
        authDomain: "nrd-firebase.firebaseapp.com",
        databaseURL: "https://nrd-firebase-default-rtdb.firebaseio.com",
        projectId: "nrd-firebase",
        storageBucket: "nrd-firebase.appspot.com",
        messagingSenderId: "840023356475",
        appId: "1:840023356475:web:a7411b9b5808ac51d8581e"
    };

    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            this.registerCurrentUserInDatabase();
            return userCredential.user;
        } catch (error) {
            throw new Error('Error al iniciar sesión: ' + error.message);
        }
    }

    async logout() {
        try {
            await signOut(this.auth);
        } catch (error) {
            throw new Error('Error al cerrar sesión: ' + error.message);
        }
    }

    async getCurrentUser() {
        try {
            const user = await new Promise((resolve, reject) => {
                const unsubscribe = onAuthStateChanged(this.auth, (user) => {
                    unsubscribe();
                    resolve(user);
                }, (error) => {
                    unsubscribe();
                    reject(error);
                });
            });
            return user;
        } catch (error) {
            throw new Error('Error al verificar la autenticación: ' + error.message);
        }
    }

    async getData(path, defaultValue = null) {
        try {
            const snapshot = await this.db.ref(path).once('value');
            const data = snapshot.val();
            return data !== null ? data : defaultValue;
        } catch (error) {
            throw new Error('Error al leer de la base de datos: ' + error.message);
        }
    }

    async setData(path, data) {
        try {
            await this.db.ref(path).set(data);
        } catch (error) {
            throw new Error('Error al escribir en la base de datos: ' + error.message);
        }
    }

}

const FirebaseServiceInstance = FirebaseService.getInstance();
export default FirebaseServiceInstance;