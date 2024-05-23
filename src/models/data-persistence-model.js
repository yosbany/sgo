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

    async saveOrden(orden) {
        // Obtener todas las órdenes existentes
        const ordenes = await this.storageService.getData(ENTITIES.ORDENES, []);
    
        // Verificar si la orden ya existe en la lista
        const index = ordenes.findIndex(o => o.id === orden.id);
    
        if (index !== -1) {
            // Si la orden ya existe, actualizarla
            ordenes[index] = orden;
        } else {
            // Si la orden no existe, agregarla a la lista
            ordenes.push(orden);
        }
    
        // Guardar las órdenes actualizadas en el almacenamiento
        await this.storageService.setData(ENTITIES.ORDENES, ordenes);
    }

    async getOrden(idOrden) {
        try {
            // Obtener las órdenes
            const ordenes = await this.storageService.getData(ENTITIES.ORDENES);
            console.log("Datos obtenidos:", ordenes);
    
            // Verificar que ordenes no sea null o undefined
            if (!ordenes) {
                console.error("No se han obtenido órdenes.");
                return null;
            }
    
            // Convertir ordenes a un array si es necesario
            const ordenesArray = Array.isArray(ordenes) ? ordenes : Object.values(ordenes);
            console.log("Datos como array:", ordenesArray);
    
            // Buscar la orden por ID utilizando find y comparando como cadena
            const obj = ordenesArray.find(orden => String(orden.id) === String(idOrden));
            console.log("Objeto encontrado:", obj);
    
            // Retornar el objeto encontrado o null si no existe
            return obj || null;
        } catch (error) {
            console.error("Error al obtener las órdenes:", error);
            return null;
        }
    }

    async deleteOrden(idOrden){
        const ordenes = await this.storageService.getData(ENTITIES.ORDENES);
        const filtered = Object.values(ordenes).filter(orden => String(orden.id) !== String(idOrden));
        await this.storageService.setData(ENTITIES.ORDENES, filtered);
    }

    async saveMovimiento(movimiento) {
        
    }
}
