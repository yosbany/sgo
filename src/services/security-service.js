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
        this.storageService = this.ISLOCALSTORAGE ? LocalStorageServiceInstance : FirebaseServiceInstance;
        SecurityService.instance = this;
    }

    ISLOCALSTORAGE = true;

    async login(email, password){
        const user = await this.storageService.login(email, password);
        return user;
    }

    async logout() {
        this.storageService.logout();
    }

    async getCurrentUser() {
        const user = await this.storageService.getCurrentUser();
        return user;
    }
}

const SecurityServiceInstance = SecurityService.getInstance();
export default SecurityServiceInstance;