import BaseView from './base-view.js';

export default class ProceduresView extends BaseView {

    constructor() {
        super();
        this.registrosDummy = [
            { titulo: "Procedimiento 1", resumen: "Resumen del procedimiento 1", descripcion: "Descripción del procedimiento 1" },
            { titulo: "Procedimiento 2", resumen: "Resumen del procedimiento 2", descripcion: "Descripción del procedimiento 2" }
        ];
    }

    async renderView() {
        await this.getPartials('procedures.html', 'Procedimientos');
        this.initEventView();
        this.cargarDatosDummy();
    }

    initEventView() {

    }

    // Función para cargar los datos dummy en la tabla
    cargarDatosDummy() {
        const tablaRegistros = document.getElementById("tablaRegistros");

        this.registrosDummy.forEach(registro => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${registro.titulo}</td>
                <td>${registro.resumen}</td>
                <td>
                    <button type="button" class="btn btn-primary ver" data-bs-toggle="modal" data-bs-target="#verRegistroModal">Ver</button>
                    <button type="button" class="btn btn-success actualizar" data-bs-toggle="modal" data-bs-target="#actualizarRegistroModal">Actualizar</button>
                    <button type="button" class="btn btn-danger eliminar" data-bs-toggle="modal" data-bs-target="#eliminarRegistroModal">Eliminar</button>
                </td>
            `;
            tablaRegistros.appendChild(fila);
        });

        // Asignar eventos a los botones de acciones
        const botonesVer = document.querySelectorAll(".ver");
        botonesVer.forEach((boton, index) => {
            boton.addEventListener("click", function () {
                mostrarDetalle(registrosDummy[index]);
            });
        });

        // Asignar eventos a los botones de actualización
        const botonesActualizar = document.querySelectorAll(".actualizar");
        botonesActualizar.forEach((boton, index) => {
            boton.addEventListener("click", function () {
                mostrarDatosActualizar(registrosDummy[index]);
            });
        });

        // Asignar eventos a los botones de eliminación
        const botonesEliminar = document.querySelectorAll(".eliminar");
        botonesEliminar.forEach((boton, index) => {
            boton.addEventListener("click", function () {
                mostrarConfirmacionEliminacion(registrosDummy[index]);
            });
        });
    }

    // Función para mostrar el detalle de un registro
    mostrarDetalle(registro) {
        const verTitulo = document.getElementById("verTitulo");
        const verResumen = document.getElementById("verResumen");
        const verDescripcion = document.getElementById("verDescripcion");

        verTitulo.textContent = registro.titulo;
        verResumen.textContent = registro.resumen;
        verDescripcion.textContent = registro.descripcion;
    }

    // Función para mostrar los datos a actualizar
    mostrarDatosActualizar(registro) {
        const actualizarTitulo = document.getElementById("actualizarTitulo");
        const actualizarResumen = document.getElementById("actualizarResumen");
        const actualizarDescripcion = document.getElementById("actualizarDescripcion");

        actualizarTitulo.value = registro.titulo;
        actualizarResumen.value = registro.resumen;
        actualizarDescripcion.value = registro.descripcion;
    }

    // Función para mostrar confirmación de eliminación
    mostrarConfirmacionEliminacion(registro) {
        // Aquí podrías implementar la lógica para eliminar el registro
        console.log("Eliminar:", registro);
    }
}