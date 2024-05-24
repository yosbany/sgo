import FirebaseServiceInstance from "./firebase-service.js";
import LocalStorageServiceInstance from "./local-storage-service.js";


class DataPersistenceService {
    static instance = null;
    static getInstance() {
        if (!DataPersistenceService.instance) {
            DataPersistenceService.instance = new DataPersistenceService();
        }
        return DataPersistenceService.instance;
    }
    constructor() {
        this.storageService = this.ISLOCALSTORAGE ? LocalStorageServiceInstance : FirebaseServiceInstance;
        DataPersistenceService.instance = this;
    }

    ENTITIES = {
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

    ISLOCALSTORAGE = true;

    async loadData() {
        const jsonPath = './data/load-data.json';
        fetch(jsonPath)
            .then(response => {
                return response.json();
            })
            .then(data => {
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.storageService.setData(key, data[key]);
                    }
                }
                console.log('Datos cargados y guardados en el Local Storage correctamente.');
            })
            .catch(error => {
                console.error('Hubo un problema cargando los datos en el Local Storage:', error);
            });

    }

    async getProveedores() {
        return await this.storageService.getData(this.ENTITIES.PROVEEDORES, []);
    }

    async getOrdenes() {
        return await this.storageService.getData(this.ENTITIES.ORDENES, []);
    }

    async getArticulosXProveedor(proveedor) {
        const articulos = await this.storageService.getData(this.ENTITIES.ARTICULOS, []);
        const filtered = articulos.filter(item => Array.isArray(item.proveedores) && item.proveedores.includes(proveedor));
        return filtered;
    }

    async saveOrden(orden) {
        const ordenes = await this.storageService.getData(this.ENTITIES.ORDENES, []);
        const index = ordenes.findIndex(item => item.id === orden.id);
        if (index !== -1) {
            ordenes[index] = orden;
        } else {
            ordenes.push(orden);
        }
        await this.storageService.setData(this.ENTITIES.ORDENES, ordenes);
    }

    async getOrden(id) {
        const ordenes = await this.storageService.getData(this.ENTITIES.ORDENES,[]);
        const orden = ordenes.find(item => item.id === id);
        return orden || null;
    }

    async deleteOrden(id){
        const ordenes = await this.storageService.getData(this.ENTITIES.ORDENES, []);
        const filtered = ordenes.filter(item => item.id !== id);
        await this.storageService.setData(this.ENTITIES.ORDENES, filtered);
        return filtered;
    }
}

const DataPersistenceServiceInstance = DataPersistenceService.getInstance();
export default DataPersistenceServiceInstance;
