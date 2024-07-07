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
        this.storageService = this.getStorageService();
        DataPersistenceService.instance = this;
    }

    getStorageService(){
        const type = 'firebase'
        return type === 'firebase' ? FirebaseServiceInstance : LocalStorageServiceInstance;
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

    async getListBackup(){
        const jsonPath = './data/backup/info-list-backup.json';
        const response = await fetch(jsonPath);
        if (response.ok) {
            const jsonData = await response.json();
            if (jsonData.hasOwnProperty("listBackup")) {
                console.log(jsonData.listBackup);
                return jsonData.listBackup;
            }
        }
    }

    async restoredBackup(backup) {
        const jsonPath = './data/backup/'+backup+'.json';
        fetch(jsonPath)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                for (const key in jsonData) {
                    if (jsonData.hasOwnProperty(key)) {
                        this.storageService.setData(key, jsonData[key]);
                    }
                }
            })
    }

    async getProveedores() {
        return await this.storageService.getData(this.ENTITIES.PROVEEDORES, []);
    }

    async getOrdenes() {
        return await this.storageService.getData(this.ENTITIES.ORDENES, []);
    }

    async getArticles() {
        return await this.storageService.getData(this.ENTITIES.ARTICULOS, []);
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
            const time = (new Date()).getTime();
            orden.id = time;
            ordenes.push(orden);
        }
        await this.storageService.setData(this.ENTITIES.ORDENES, ordenes);
    }

    async saveArticulo(articulo) {
        const articulos = await this.storageService.getData(this.ENTITIES.ARTICULOS, []);
        const index = articulos.findIndex(item => item.hasOwnProperty('id') && item.id === articulo.id);

        if (index !== -1) {
            articulos[index] = articulo;
        } else {
            const time = (new Date()).getTime();
            articulo.id = time;
            articulos.push(articulo);
        }
        await this.storageService.setData(this.ENTITIES.ARTICULOS, articulos);
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
