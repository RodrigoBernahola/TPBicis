import { formatearDecimales } from "./utils.js";

export class Fila {
    constructor(numeroLinea, nroMes, reloj, rndVentaMayorACinco, booleanoVentaMayorACinco, rndCantidadAdicionalVendida, 
        cantidadAdicionalVendida, rndTipoBici6, tipoBici6, ingresoAdicional6, rndTipoBici7, tipoBici7, ingresoAdicional7, 
        rndTipoBici8, tipoBici8, ingresoAdicional8, rndTipoBici9, tipoBici9, ingresoAdicional9, rndTipoBici10, tipoBici10, 
        ingresoAdicional10, acIngresoAdicionalDiario) {
        this.numeroLinea = numeroLinea;
        this.nroMes = nroMes;
        this.reloj = reloj;
        this.rndVentaMayorACinco = rndVentaMayorACinco;
        this.booleanoVentaMayorACinco = booleanoVentaMayorACinco;
        this.rndCantidadAdicionalVendida = rndCantidadAdicionalVendida;
        this.cantidadAdicionalVendida = cantidadAdicionalVendida;
        this.rndTipoBici6 = rndTipoBici6;
        this.tipoBici6 = tipoBici6;
        this.ingresoAdicional6 = ingresoAdicional6;
        this.rndTipoBici7 = rndTipoBici7;
        this.tipoBici7 = tipoBici7;
        this.ingresoAdicional7 = ingresoAdicional7;
        this.rndTipoBici8 = rndTipoBici8;
        this.tipoBici8 = tipoBici8;
        this.ingresoAdicional8 = ingresoAdicional8;
        this.rndTipoBici9 = rndTipoBici9;
        this.tipoBici9 = tipoBici9;
        this.ingresoAdicional9 = ingresoAdicional9;
        this.rndTipoBici10 = rndTipoBici10;
        this.tipoBici10 = tipoBici10;
        this.ingresoAdicional10 = ingresoAdicional10
        this.acIngresoAdicionalDiario = acIngresoAdicionalDiario;
    }

    obtenerCantidadAdicionalVendida(rndVentaMayorACinco, arrayProbabilidadesDeCantidadDeVentas) {

        let indexSeis = arrayProbabilidadesDeCantidadDeVentas[0];
        let indexSiete = arrayProbabilidadesDeCantidadDeVentas[1];
        let indexOcho = arrayProbabilidadesDeCantidadDeVentas[2];
        let indexNueve = arrayProbabilidadesDeCantidadDeVentas[3];
        let indexDiez = arrayProbabilidadesDeCantidadDeVentas[4];

        let arrayProbabilidadAcumulada = [
            indexSeis,
            indexSeis + indexSiete,
            indexSeis + indexSiete + indexOcho,
            indexSeis + indexSiete + indexOcho + indexNueve,
            indexSeis + indexSiete + indexOcho + indexNueve + indexDiez 
        ];

        const cantidadVendida = [6, 7, 8, 9, 10];

        let index = arrayProbabilidadAcumulada.findIndex(prob => rndVentaMayorACinco < prob);
        return cantidadVendida[index];

    }


    determinarTipoBiciVendida(rndTipoBici, arrayProbabilidadesDeTipos) {

        let indexA = arrayProbabilidadesDeTipos[0];
        let indexB = arrayProbabilidadesDeTipos[1];
        let indexC = arrayProbabilidadesDeTipos[2];

        const arrayProbabilidadAcumulada = [
            indexA,
            indexA + indexB,
            indexA +  indexB + indexC
        ]

        const tipoBiciVendida = ['A', 'B', 'C'];

        let index = arrayProbabilidadAcumulada.findIndex(prob => rndTipoBici < prob);
        return tipoBiciVendida[index]

    }


    determinarIngresoPorTipoVendida(tipoBici, arrayIngresosAdicionalesPorTipo) {

        let index = 0;

        if (tipoBici === 'B') {
            index = 1;
        }

        else if (tipoBici === 'C' ) {
            index = 2;
        }

        return arrayIngresosAdicionalesPorTipo[index]
    }


    procesarVentasAdicionales(objetoFila, parametrosModelo) {

        this.booleanoVentaMayorACinco = true;
        this.rndCantidadAdicionalVendida = formatearDecimales(Math.random(), 4);
        this.cantidadAdicionalVendida = this.obtenerCantidadAdicionalVendida(objetoFila.rndCantidadAdicionalVendida, parametrosModelo.probabilidadesDeCantidadDeVentas)

        //OBTENER TIPO DE BICIS VENDIDAS ADICIONALES

        this.rndTipoBici6 = formatearDecimales(Math.random(), 4);
        this.tipoBici6 = this.determinarTipoBiciVendida(this.rndTipoBici6, parametrosModelo.probabilidadesDeTipos)
        this.ingresoAdicional6 = this.determinarIngresoPorTipoVendida(this.tipoBici6, parametrosModelo.ingresosAdicionalesPorTipo)
        this.acIngresoAdicionalDiario += this.ingresoAdicional6;

        if (this.cantidadAdicionalVendida >= 7) {

            this.rndTipoBici7 = formatearDecimales(Math.random(), 4);
            this.tipoBici7 = this.determinarTipoBiciVendida(this.rndTipoBici7, parametrosModelo.probabilidadesDeTipos)
            this.ingresoAdicional7 = this.determinarIngresoPorTipoVendida(this.tipoBici7, parametrosModelo.ingresosAdicionalesPorTipo)
            this.acIngresoAdicionalDiario += this.ingresoAdicional7;

            if (this.cantidadAdicionalVendida >= 8) {

                this.rndTipoBici8 = formatearDecimales(Math.random(), 4);
                this.tipoBici8 = this.determinarTipoBiciVendida(this.rndTipoBici8, parametrosModelo.probabilidadesDeTipos)
                this.ingresoAdicional8 = this.determinarIngresoPorTipoVendida(this.tipoBici8, parametrosModelo.ingresosAdicionalesPorTipo)
                this.acIngresoAdicionalDiario += this.ingresoAdicional8;

                if (this.cantidadAdicionalVendida >= 9) {

                    this.rndTipoBici9 = formatearDecimales(Math.random(), 4);
                    this.tipoBici9 = this.determinarTipoBiciVendida(this.rndTipoBici9, parametrosModelo.probabilidadesDeTipos)
                    this.ingresoAdicional9 = this.determinarIngresoPorTipoVendida(this.tipoBici9, parametrosModelo.ingresosAdicionalesPorTipo)
                    this.acIngresoAdicionalDiario += this.ingresoAdicional9;

                    if (this.cantidadAdicionalVendida >= 10) {

                        this.rndTipoBici10 = formatearDecimales(Math.random(), 4);
                        this.tipoBici10= this.determinarTipoBiciVendida(this.rndTipoBici10, parametrosModelo.probabilidadesDeTipos)
                        this.ingresoAdicional10 = this.determinarIngresoPorTipoVendida(this.tipoBici10, parametrosModelo.ingresosAdicionalesPorTipo)
                        this.acIngresoAdicionalDiario += this.ingresoAdicional10;
                    }
                }
            }

        }
    }


    simularDia (parametrosModelo) {

        console.log(`dentro de funcion dia: ${this.reloj} y mes: ${this.nroMes}` )
    
        this.rndVentaMayorACinco = formatearDecimales(Math.random(), 4)        
        
        if (this.rndVentaMayorACinco < parametrosModelo.probabilidadDeVenderMasDeCinco) {

            this.procesarVentasAdicionales(this, parametrosModelo)

        }

    }

    renderizarFila(acIngresoAdicionalMensual) {

        //RENDERIZAR LOS DATOS DE LA FILA
        const tbody = document.getElementById('cuerpoDeTabla');

        const tr = document.createElement('tr');

        // Crear los <td> para cada valor en el objeto Fila
        Object.values(this).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });

        let tdAcumulador = document.createElement('td');
        tdAcumulador.textContent = acIngresoAdicionalMensual;
        tr.appendChild(tdAcumulador)

        tbody.appendChild(tr);
            
    }

}