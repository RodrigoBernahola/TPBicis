import { Fila } from "./filaSimulacion.js";
import { formatearDecimales } from "./utils.js";

let numeroLinea = 0;
let acIngresoAdicionalMensual = 0;
let arrayIngresosMensuales = [];
let arrayCantidadOcurrenciasIngresosMensuales = [];


function procesarIngresoAdicionalMensualAcumulado(acIngresoAdicionalMensual) {

    let index = arrayIngresosMensuales.findIndex( (ingreso) => ingreso === acIngresoAdicionalMensual );

    if (index === -1) {

        arrayIngresosMensuales.push(acIngresoAdicionalMensual);
        arrayCantidadOcurrenciasIngresosMensuales.push(1);

    }

    else {

        arrayCantidadOcurrenciasIngresosMensuales[index] += 1;

    }


}


function mostrarTablaResultados(mesesTotales) {

    const cuerpoDeTablaResultados = document.getElementById('cuerpoDeTablaProbabilidades');

    let limite = arrayIngresosMensuales.length;

    for (let i = 0; i < limite; i++) {

        let tr = document.createElement('tr');

        let tdIngreso = document.createElement('td');
        tdIngreso.textContent = arrayIngresosMensuales[i];

        tr.appendChild(tdIngreso);

        let tdOcurrencias = document.createElement('td');
        tdOcurrencias.textContent = arrayCantidadOcurrenciasIngresosMensuales[i];

        tr.appendChild(tdOcurrencias);

        let tdProbabilidad = document.createElement('td');
        let probabilidad= formatearDecimales(arrayCantidadOcurrenciasIngresosMensuales[i] / mesesTotales, 4);
        tdProbabilidad.textContent = probabilidad;

        tr.appendChild(tdProbabilidad);

        let probabilidadPorcentaje = document.createElement('td');
        let probabilidadFormateada = formatearDecimales(probabilidad * 100, 4)
        probabilidadPorcentaje.textContent = `${probabilidadFormateada}%`;

        tr.appendChild(probabilidadPorcentaje);
        cuerpoDeTablaResultados.appendChild(tr);

    }

    


}

function iniciarSimulacion(datosVista, parametrosModelo) {

    let cantidadDeMeses = datosVista.cantidadDeMeses;

    for (let i = 1; i <= cantidadDeMeses; i++) {

        //Renderizar las filas que esten en el mes seleccionado
        for(let j = 1; j <= 30; j++) {

            numeroLinea += 1;
            let fila = new Fila(
                numeroLinea,
                i,
                j,
                '0',
                false,
                '0',
                '-',
                '-',
                '-',
                0,
                '-',
                '-',
                0,
                '-',
                '-',
                0,
                '-',
                '-',
                0,
                '-',
                '-',
                0,
                0
            )


            fila.simularDia(parametrosModelo)
            
            //EXTRAER EL VALOR DE INGRESOS EN ESE DIA Y AGREGARLO AL ACUMULADOR
            acIngresoAdicionalMensual += fila.acIngresoAdicionalDiario;

            console.log('fuera de la funcion')
            console.log(fila)
            console.log(`Ingreso adicional mensual acumulado ${acIngresoAdicionalMensual}`)
            
            if ( i >= datosVista.mostrarAPartir) {
                fila.renderizarFila(acIngresoAdicionalMensual)
            }
            
            if (j === 30) {

                procesarIngresoAdicionalMensualAcumulado(acIngresoAdicionalMensual);
                acIngresoAdicionalMensual = 0;

            }
        }

    }


}


document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('simulationValuesUpdated', (event) => {

        console.log('Datos Meses:')
        console.log(event.detail.datosCantidades);
        console.log('Datos Probabilidades')
        console.log(event.detail.values)
        
        iniciarSimulacion(event.detail.datosCantidades, event.detail.values)
        mostrarTablaResultados(event.detail.datosCantidades.cantidadDeMeses)
    })


})