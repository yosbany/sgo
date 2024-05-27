import FirebaseServiceInstance from "./firebase-service.js";
import LocalStorageServiceInstance from "./local-storage-service.js";

class SecurityService {
    static instance = null;
    static getInstance() {
        if (!SecurityService.instance) {
            SecurityService.instance = new SecurityService();
        }
        return SecurityService.instance;
    }
    constructor() {
        this.storageService = this.getStorageService();
        SecurityService.instance = this;
    }

    getStorageService(){
        const type = 'firebase'
        return type === 'firebase' ? FirebaseServiceInstance : LocalStorageServiceInstance;
    }

    async login(email, password){
        const user = await this.storageService.login(email, password);
        await this.registerCurrentUserInDatabase(user);
        return user;
    }

    async logout() {
        this.storageService.logout();
    }

    async getCurrentUser() {
        const user = await this.storageService.getCurrentUser();
        return user;
    }

    async registerCurrentUserInDatabase(user) {
        try {
            if (!user) {
                throw new Error('No hay usuario autenticado para registrar en la base de datos');
            }
            let userInDatabase = null;
            try {
                userInDatabase = await this.storageService.getData(`users/${user.uid}`);
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error.message);
            }
            if (!userInDatabase) {
                const userToSaveInDatabase = {
                    email: user.email,
                    uid: user.uid
                };
                await this.storageService.setData(`users/${user.uid}`, userToSaveInDatabase);
                console.log('Usuario registrado en la base de datos correctamente');
            } else {
                console.log('El usuario ya está registrado en la base de datos');
            }
        } catch (error) {
            throw new Error('Error al registrar usuario en la base de datos: ' + error.message);
        }
    }
}

const SecurityServiceInstance = SecurityService.getInstance();
export default SecurityServiceInstance;