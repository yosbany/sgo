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
                return this.getCurrentUser();
            }
            throw new Error('Error al iniciar sesión');
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
            const results = storedData !== null ? JSON.parse(storedData) : defaultValue;
            console.log(path, results);
            return results
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

}

const LocalStorageServiceInstance = LocalStorageService.getInstance();
export default LocalStorageServiceInstance;
