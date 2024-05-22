import FirebaseServiceInstance from "../services/firebase-service.js";
import LocalStorageServiceInstance from "../services/local-storage-service.js";

const ENTITIES = {
    USUARIOS: 'usuarios',
    PROVEEDORES: 'proveedores',
    ORDENES: 'ordenes',
    CLIENTES: 'clientes',
    ARTICULOS: 'articulos',
    NOMINAS: 'nominas',
    MOVIMIENTOS: 'movimientos',
    RECETAS: 'recetas',
    TAREAS: 'tareas',
    EMPLEADOS: 'empleados'
}

export default class DataPersistenceModel {
    constructor() {
        this.storageService = this.isLocalStorage ? LocalStorageServiceInstance : FirebaseServiceInstance;
    }

    isLocalStorage = true;

    async loadData() {
        const jsonPath = './src/models/load-data.json';
        fetch(jsonPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.storageService.setData(key, data[key]);
                    }
                }
                console.log('Datos JSON cargados y guardados en Local Storage.');
            })
            .catch(error => {
                console.error('Hubo un problema con la petición Fetch:', error);
            });

    }

    async registerCurrentUserInDatabase() {
        try {
            const currentUser = this.storageService.getCurrentUser();
            if (!currentUser) {
                throw new Error('No hay usuario autenticado para registrar en la base de datos');
            }
            let userRegister = null;
            try {
                userRegister = await this.storageService.getData(`users/${currentUser.uid}`);
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error.message);
            }

            if (userRegister === null) {
                const userDataToSave = {
                    name: currentUser.displayName,
                    email: currentUser.email,
                    uid: currentUser.uid
                };
                await this.storageService.setData(`users/${currentUser.uid}`, userDataToSave);
                console.log('Usuario registrado en la base de datos correctamente');
            } else {
                console.log('El usuario ya está registrado en la base de datos');
            }
        } catch (error) {
            throw new Error('Error al registrar usuario en la base de datos: ' + error.message);
        }
    }

    async getProveedores() {
        return await this.storageService.getData(ENTITIES.PROVEEDORES, []);
    }

    async getOrdenesCompra() {
        return await this.storageService.getData(ENTITIES.ORDENES, []);
    }

    async getArticulosXProveedor(proveedor) {
        const articulos = await this.storageService.getData(ENTITIES.ARTICULOS);
        const filtered = Object.values(articulos).filter(articulo => Array.isArray(articulo.proveedores) && articulo.proveedores.includes(proveedor));
        return filtered;
    }

    async saveMovimiento(movimiento) {
        const movimientos = await this.storageService.getData(ENTITIES.MOVIMIENTOS, []);
        movimientos.push(movimiento);
        await this.storageService.setData(ENTITIES.MOVIMIENTOS, movimientos);
    }
}
