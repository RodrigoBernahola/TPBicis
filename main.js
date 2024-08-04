document.addEventListener('DOMContentLoaded', () => {

    function alternarInputs(estadoInputs) {
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach( (input) => {
            input.disabled = !estadoInputs;
        })
    }

    function eventHandler (e) {

        let booleano = e.target.value === 'si';
        alternarInputs(booleano);
    }

    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach( (radio) => {
        radio.addEventListener('click', (e) => eventHandler(e) );
    })

    alternarInputs(false);

    function obtenerValoresParametros() {

        let cantidadDeMeses = parseFloat(document.getElementById('CantidadMeses').value);
        let mostrarAPartir = parseFloat(document.getElementById('MostrarAPartir').value);

        const datosCantidades = {
            cantidadDeMeses,
            mostrarAPartir
        };

        let probabilidadDeVenderMasDeCinco = parseFloat(document.getElementById('PMasDeCinco').value)
        

        let probabilidadDeVenderSeis = parseFloat(document.getElementById('PSeis').value);
        let probabiliadDeVenderSiete = parseFloat(document.getElementById('PSiete').value);
        let probabiliadDeVenderOcho = parseFloat(document.getElementById('POcho').value);
        let probabiliadDeVenderNueve = parseFloat(document.getElementById('PNueve').value);
        let probabiliadDeVenderDiez = parseFloat(document.getElementById('PDiez').value);


        let probabilidadDeTipoA = parseFloat(document.getElementById('PTipoA').value);
        let probabiliadaDeTipoB = parseFloat(document.getElementById('PTipoB').value);
        let probabilidadDeTipoC = parseFloat(document.getElementById('PTipoC').value);


        let ingresoAdicionalTipoA = parseFloat(document.getElementById('AdicionalA').value);
        let ingresoAdicionalTipoB = parseFloat(document.getElementById('AdicionalB').value);
        let ingresoAdicionalTipoC = parseFloat(document.getElementById('AdicionalC').value);


        const values = {
            probabilidadDeVenderMasDeCinco,

            probabilidadesDeCantidadDeVentas: [
                probabilidadDeVenderSeis,
                probabiliadDeVenderSiete,
                probabiliadDeVenderOcho,
                probabiliadDeVenderNueve,
                probabiliadDeVenderDiez
            ],

            probabilidadesDeTipos: [
                probabilidadDeTipoA,
                probabiliadaDeTipoB,
                probabilidadDeTipoC
            ],

            ingresosAdicionalesPorTipo: [
                ingresoAdicionalTipoA,
                ingresoAdicionalTipoB,
                ingresoAdicionalTipoC
            ]
        };

        const event =  new CustomEvent('simulationValuesUpdated', {detail: {datosCantidades, values}});
        document.dispatchEvent(event);
    }

    document.querySelector('button').addEventListener('click', (e) => {
        e.preventDefault();
        obtenerValoresParametros()
    })

    
})