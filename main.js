document.addEventListener('DOMContentLoaded', () => {
    function alternarInputs(estadoInputs) {
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach((input) => {
            input.disabled = !estadoInputs;
        });
    }

    function eventHandler(e) {
        let booleano = e.target.value === 'si';
        alternarInputs(booleano);
    }

    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio) => {
        radio.addEventListener('click', (e) => eventHandler(e));
    });

    alternarInputs(false);

    function obtenerValoresParametros() {
        let cantidadDeMeses = parseFloat(document.getElementById('CantidadMeses').value);
        let mostrarAPartir = parseFloat(document.getElementById('MostrarAPartir').value);

        const datosCantidades = {
            cantidadDeMeses,
            mostrarAPartir
        };

        let probabilidadDeVenderMasDeCinco = parseFloat(document.getElementById('PMasDeCinco').value);

        let probabilidadDeVenderSeis = parseFloat(document.getElementById('PSeis').value);
        let probabilidadDeVenderSiete = parseFloat(document.getElementById('PSiete').value);
        let probabilidadDeVenderOcho = parseFloat(document.getElementById('POcho').value);
        let probabilidadDeVenderNueve = parseFloat(document.getElementById('PNueve').value);
        let probabilidadDeVenderDiez = parseFloat(document.getElementById('PDiez').value);

        let probabilidadDeTipoA = parseFloat(document.getElementById('PTipoA').value);
        let probabilidadDeTipoB = parseFloat(document.getElementById('PTipoB').value);
        let probabilidadDeTipoC = parseFloat(document.getElementById('PTipoC').value);

        let ingresoAdicionalTipoA = parseFloat(document.getElementById('AdicionalA').value);
        let ingresoAdicionalTipoB = parseFloat(document.getElementById('AdicionalB').value);
        let ingresoAdicionalTipoC = parseFloat(document.getElementById('AdicionalC').value);

        const values = {
            probabilidadDeVenderMasDeCinco,
            probabilidadesDeCantidadDeVentas: [
                probabilidadDeVenderSeis,
                probabilidadDeVenderSiete,
                probabilidadDeVenderOcho,
                probabilidadDeVenderNueve,
                probabilidadDeVenderDiez
            ],
            probabilidadesDeTipos: [
                probabilidadDeTipoA,
                probabilidadDeTipoB,
                probabilidadDeTipoC
            ],
            ingresosAdicionalesPorTipo: [
                ingresoAdicionalTipoA,
                ingresoAdicionalTipoB,
                ingresoAdicionalTipoC
            ]
        };

        return { datosCantidades, values };
    }

    function validarProbabilidades(values) {
        const sumaCantidadVentas = values.probabilidadesDeCantidadDeVentas.reduce((a, b) => a + b, 0);
        const sumaTipos = values.probabilidadesDeTipos.reduce((a, b) => a + b, 0);

        return sumaCantidadVentas === 1 && sumaTipos === 1;
    }

    document.querySelector('#iniciarSimulacion').addEventListener('click', (e) => {
        e.preventDefault();
        const { datosCantidades, values } = obtenerValoresParametros();

        if (validarProbabilidades(values)) {
            document.getElementById('errorMensaje').style.display = 'none';
            const event = new CustomEvent('simulationValuesUpdated', { detail: { datosCantidades, values } });
            document.dispatchEvent(event);
        } else {
            document.getElementById('errorMensaje').style.display = 'block';
        }
    });
});
