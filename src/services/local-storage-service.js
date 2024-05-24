class LocalStorageService {
    static instance = null;
    static getInstance() {
        if (!LocalStorageService.instance) {
            LocalStorageService.instance = new LocalStorageService();
        }
        return LocalStorageService.instance;
    }
    constructor() {
        LocalStorageService.instance = this;
    }

    async login(email, password) {
        // Simulación de la verificación de credenciales
        if (email === 'nriodor@gmail.com' && password === 'NuevaR1oDor') {
            const user = {
                email: 'nriodor@gmail.com',
                uid: String((new Date()).getTime())
            };
            const users = this.getData("usuarios", []);
            const index = users.findIndex(item => item.email === user.email);
            if (index !== -1) {
                users[index] = user;
            } else {
                user.role = 'empleado';
                users.push(user);
            }
            this.setData("usuarios", users)
            return this.getCurrentUser();
        }
        throw new Error('Credenciales incorrectas');
    }

    async logout() {
        this.setData("usuarios", []);
    }

    async getCurrentUser() {
        const users = await this.getData("usuarios", []);
        const user = users.length > 0 ? users[0] : null;
        return user || null;
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
