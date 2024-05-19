class LocalStorageService {
    static instance = null;

    static getInstance() {
        if (!LocalStorageService.instance) {
            LocalStorageService.instance = new LocalStorageService();
        }
        return LocalStorageService.instance;
    }

    constructor() {
        if (!LocalStorageService.instance) {
            LocalStorageService.instance = this;
        }
        return LocalStorageService.instance;
    }

    async login(email, password) {
        try {
            if (email === 'nriodor@gmail.com' && password === 'NuevaR1oDor') {
                await this.registerCurrentUserInDatabase();
                return this.getCurrentUser();
            }
            throw new Error('Error al iniciar sesión');
        } catch (error) {
            throw new Error('Error al iniciar sesión: ' + error.message);
        }
    }

    getCurrentUser() {
        return {
            email: 'nriodor@gmail.com',
            role: 'empleado',
            uid: 'k7cMqBzSkHVKBtTmTVV3p06RywI3'
        };
    }

    getData(path, defaultValue = null) {
        try {
            const storedData = localStorage.getItem(path);
            return storedData !== null ? JSON.parse(storedData) : defaultValue;
        } catch (error) {
            throw new Error('Error al leer de localStorage: ' + error.message);
        }
    }

    setData(path, data) {
        try {
            localStorage.setItem(path, JSON.stringify(data));
        } catch (error) {
            throw new Error('Error al escribir en localStorage: ' + error.message);
        }
    }

    deleteData(path) {
        try {
            localStorage.removeItem(path);
        } catch (error) {
            throw new Error('Error al eliminar de localStorage: ' + error.message);
        }
    }
}

const LocalStorageServiceInstance = LocalStorageService.getInstance();
export default LocalStorageServiceInstance;
