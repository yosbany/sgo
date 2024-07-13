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

    getStorageService() {
        const type = 'firebase';
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
    };

    async getListBackup() {
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
        const jsonPath = './data/backup/' + backup + '.json';
        const response = await fetch(jsonPath);
        const jsonData = await response.json();
        for (const key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                await this.storageService.setData(key, jsonData[key]);
            }
        }
    }

    async getArticulosXProveedor(proveedor) {
        const articulos = await this.findAll(this.ENTITIES.ARTICULOS);
        return articulos.filter(item => Array.isArray(item.proveedores) && item.proveedores.includes(proveedor));
    }

    async findById(entity, id) {
        const data = await this.storageService.getData(entity, []);
        console.log("data",data)
        return data.find(item => String(item.id) === String(id)) || null;
    }

    async findAll(entity) {
        return await this.storageService.getData(entity, []);
    }

    async deleteById(entity, id) {
        const data = await this.storageService.getData(entity, []);
        const filtered = data.filter(item => item.id !== id);
        await this.storageService.setData(entity, filtered);
        return filtered;
    }

    async saveOrUpdate(entity, item) {
        const data = await this.storageService.getData(entity, []);
        const index = data.findIndex(existingItem => existingItem.id === item.id);
        if (index !== -1) {
            data[index] = item;
        } else {
            item.id = (new Date()).getTime();
            data.push(item);
        }
        await this.storageService.setData(entity, data);
    }

    // Specific methods for each entity
    async getUsuarios() {
        return await this.findAll(this.ENTITIES.USUARIOS);
    }

    async getProveedores() {
        return await this.findAll(this.ENTITIES.PROVEEDORES);
    }

    async getOrdenes() {
        return await this.findAll(this.ENTITIES.ORDENES);
    }

    async getClientes() {
        return await this.findAll(this.ENTITIES.CLIENTES);
    }

    async getArticulos() {
        return await this.findAll(this.ENTITIES.ARTICULOS);
    }

    async getNominas() {
        return await this.findAll(this.ENTITIES.NOMINAS);
    }

    async getMovimientos() {
        return await this.findAll(this.ENTITIES.MOVIMIENTOS);
    }

    async getRecetas() {
        return await this.findAll(this.ENTITIES.RECETAS);
    }

    async getTareas() {
        return await this.findAll(this.ENTITIES.TAREAS);
    }

    async getEmpleados() {
        return await this.findAll(this.ENTITIES.EMPLEADOS);
    }

    async saveUsuario(usuario) {
        await this.saveOrUpdate(this.ENTITIES.USUARIOS, usuario);
    }

    async saveProveedor(proveedor) {
        await this.saveOrUpdate(this.ENTITIES.PROVEEDORES, proveedor);
    }

    async saveOrden(orden) {
        await this.saveOrUpdate(this.ENTITIES.ORDENES, orden);
    }

    async saveCliente(cliente) {
        await this.saveOrUpdate(this.ENTITIES.CLIENTES, cliente);
    }

    async saveArticulo(articulo) {
        await this.saveOrUpdate(this.ENTITIES.ARTICULOS, articulo);
    }

    async saveNomina(nomina) {
        await this.saveOrUpdate(this.ENTITIES.NOMINAS, nomina);
    }

    async saveMovimiento(movimiento) {
        await this.saveOrUpdate(this.ENTITIES.MOVIMIENTOS, movimiento);
    }

    async saveReceta(receta) {
        await this.saveOrUpdate(this.ENTITIES.RECETAS, receta);
    }

    async saveTarea(tarea) {
        await this.saveOrUpdate(this.ENTITIES.TAREAS, tarea);
    }

    async saveEmpleado(empleado) {
        await this.saveOrUpdate(this.ENTITIES.EMPLEADOS, empleado);
    }

    async getUsuario(id) {
        return await this.findById(this.ENTITIES.USUARIOS, id);
    }

    async getProveedor(id) {
        return await this.findById(this.ENTITIES.PROVEEDORES, id);
    }

    async getOrden(id) {
        console.log("id",id)
        return await this.findById(this.ENTITIES.ORDENES, id);
    }

    async getCliente(id) {
        return await this.findById(this.ENTITIES.CLIENTES, id);
    }

    async getArticulo(id) {
        return await this.findById(this.ENTITIES.ARTICULOS, id);
    }

    async getNomina(id) {
        return await this.findById(this.ENTITIES.NOMINAS, id);
    }

    async getMovimiento(id) {
        return await this.findById(this.ENTITIES.MOVIMIENTOS, id);
    }

    async getReceta(id) {
        return await this.findById(this.ENTITIES.RECETAS, id);
    }

    async getTarea(id) {
        return await this.findById(this.ENTITIES.TAREAS, id);
    }

    async getEmpleado(id) {
        return await this.findById(this.ENTITIES.EMPLEADOS, id);
    }

    async deleteUsuario(id) {
        return await this.deleteById(this.ENTITIES.USUARIOS, id);
    }

    async deleteProveedor(id) {
        return await this.deleteById(this.ENTITIES.PROVEEDORES, id);
    }

    async deleteOrden(id) {
        return await this.deleteById(this.ENTITIES.ORDENES, id);
    }

    async deleteCliente(id) {
        return await this.deleteById(this.ENTITIES.CLIENTES, id);
    }

    async deleteArticulo(id) {
        return await this.deleteById(this.ENTITIES.ARTICULOS, id);
    }

    async deleteNomina(id) {
        return await this.deleteById(this.ENTITIES.NOMINAS, id);
    }

    async deleteMovimiento(id) {
        return await this.deleteById(this.ENTITIES.MOVIMIENTOS, id);
    }

    async deleteReceta(id) {
        return await this.deleteById(this.ENTITIES.RECETAS, id);
    }

    async deleteTarea(id) {
        return await this.deleteById(this.ENTITIES.TAREAS, id);
    }

    async deleteEmpleado(id) {
        return await this.deleteById(this.ENTITIES.EMPLEADOS, id);
    }
}

const DataPersistenceServiceInstance = DataPersistenceService.getInstance();
export default DataPersistenceServiceInstance;
