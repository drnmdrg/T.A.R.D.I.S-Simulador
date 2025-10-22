'use strict';

const TARDIS_NAME = 'TARDIS';
const DOCTOR_TITLE = 'El Doctor';
const DESTINOS = [
  { nombre: 'Año 1963 - Londres', riesgo: 2 },
  { nombre: 'Año 1815 - Waterloo', riesgo: 4 },
  { nombre: 'Año 2500 - Colonia espacial', riesgo: 5 },
  { nombre: 'Planeta desconocido: Skaros', riesgo: 7 },
  { nombre: 'Año 3000000 - Era posthumana', riesgo: 9 }
];
const COMPAÑEROS = ['Rose Tyler', 'Martha Jones', 'Donna Noble', 'Clara Oswald', 'Bill Potts'];


let piloto = null;
let compañeroSeleccionado = null;
let destinoSeleccionado = null;
let energiasTardis = 100;

function iniciarSimulador() {
  console.clear();
  console.log('=== Bienvenido al simulador de ' + TARDIS_NAME + ' ===');
  piloto = prompt('Nombre del piloto (tu nombre):', 'Anónimo');
  if (!piloto || piloto.trim() === '') {
    piloto = 'Piloto desconocido';
  }
  console.log('Piloto registrado:', piloto);
  alert('Bienvenido, ' + piloto + '! Abre la consola para interactuar con la TARDIS.');
}

function mostrarCompaneros() {
  console.log('\nCompañeros disponibles:');
  for (let i = 0; i < COMPAÑEROS.length; i++) {
    console.log((i + 1) + ') ' + COMPAÑEROS[i]);
  }
}


function seleccionarCompanero() {
  mostrarCompaneros();
  const entrada = prompt('Elige un número para seleccionar compañero (1-' + COMPAÑEROS.length + '):', '1');
  const idx = parseInt(entrada, 10) - 1;
  if (isNaN(idx) || idx < 0 || idx >= COMPAÑEROS.length) {
    alert('Selección no válida. Se asignará un compañero aleatorio.');
    const rand = Math.floor(Math.random() * COMPAÑEROS.length);
    compañeroSeleccionado = COMPAÑEROS[rand];
  } else {
    compañeroSeleccionado = COMPAÑEROS[idx];
  }
  console.log('Compañero seleccionado:', compañeroSeleccionado);
}

function mostrarDestinos() {
  console.log('\nDestinos disponibles:');
  for (let i = 0; i < DESTINOS.length; i++) {
    console.log((i + 1) + ') ' + DESTINOS[i].nombre + ' (riesgo: ' + DESTINOS[i].riesgo + ')');
  }
}

function seleccionarDestino() {
  mostrarDestinos();
  const entrada = prompt('Elige un destino por número (1-' + DESTINOS.length + '):', '1');
  const idx = parseInt(entrada, 10) - 1;
  if (isNaN(idx) || idx < 0 || idx >= DESTINOS.length) {
    alert('Destino inválido. Se elegirá el destino por defecto (1).');
    destinoSeleccionado = DESTINOS[0];
  } else {
    destinoSeleccionado = DESTINOS[idx];
  }
  console.log('Destino seleccionado:', destinoSeleccionado.nombre);
}

function realizarViaje() {
  if (!destinoSeleccionado) {
    console.warn('No hay destino seleccionado. Selecciona uno antes de viajar.');
    return;
  }
  console.log('\nConfigurando el viaje...');

  const confirmar = confirm('¿Deseas iniciar el viaje a ' + destinoSeleccionado.nombre + ' con ' + compañeroSeleccionado + '?');
  if (!confirmar) {
    console.log('Viaje cancelado por el piloto.');
    return;
  }


  const etapas = 5;
  for (let etapa = 1; etapa <= etapas; etapa++) {
  
    const perdida = destinoSeleccionado.riesgo * etapa;
    energiasTardis -= perdida / 10;
    if (energiasTardis < 0) energiasTardis = 0;
    console.log('Etapa', etapa, '- consumo:', (perdida / 10).toFixed(1) + '%', '— energía restante:', energiasTardis.toFixed(1) + '%');
    
    if (energiasTardis <= 10) {
      console.warn('Energía crítica! La TARDIS ha entrado en modo reserva.');
      alert('¡Advertencia! Energía crítica. El viaje puede fallar.');
      break;
    }
  }


  if (energiasTardis > 50) {
    console.log('El viaje fue exitoso. Llegaste a', destinoSeleccionado.nombre, 'y regresaste sin mayores problemas.');
    alert('Viaje completado con éxito a ' + destinoSeleccionado.nombre + ' — Energía restante: ' + energiasTardis.toFixed(1) + '%');
  } else if (energiasTardis > 10) {
    console.log('Viaje riesgoso: tuviste incidentes menores en', destinoSeleccionado.nombre, 'pero lograste volver.');
    alert('Viaje riesgoso completado. Revisar sistemas de la TARDIS.');
  } else {
    console.error('Viaje fallido: la TARDIS quedó en modo reserva o inestable. Necesitas recargar energía.');
    alert('Viaje fallido. Energía insuficiente.');
  }
}


function escanearAmbiente() {
  if (!destinoSeleccionado) {
    console.log('Escaneo imposible: sin destino.');
    return;
  }
  console.log('\nIniciando escaneo del ambiente en', destinoSeleccionado.nombre);

  const lecturas = ['Radiación', 'Oxígeno', 'Gravedad', 'Vida microbiana', 'Anomalía temporal'];
  for (const item of lecturas) {
    const valor = Math.floor(Math.random() * 100);
    console.log('Sensor:', item, '- lectura:', valor);
  }
  alert('Escaneo finalizado. Revisa la consola para ver las lecturas.');
}


function recargarEnergia() {
  console.log('\nIniciando protocolo de recarga...');
  while (energiasTardis < 100) {
    const confirmar = confirm('Recargar 10% de energía? (actual: ' + energiasTardis.toFixed(1) + '%)');
    if (!confirmar) {
      console.log('Recarga cancelada por el piloto.');
      break;
    }
    energiasTardis += 10;
    if (energiasTardis > 100) energiasTardis = 100;
    console.log('Recarga completada. Energía ahora:', energiasTardis.toFixed(1) + '%');
    if (energiasTardis === 100) {
      alert('Energía al 100%.');
      break;
    }
  }
}


function menuPrincipal() {
  let salir = false;
  while (!salir) {
    console.log('\n=== MENÚ PRINCIPAL ===');
    console.log('Piloto:', piloto);
    console.log('Compañero:', compañeroSeleccionado);
    console.log('Destino:', destinoSeleccionado ? destinoSeleccionado.nombre : 'No seleccionado');
    console.log('Energía TARDIS:', energiasTardis.toFixed(1) + '%');

    const opcion = prompt(
      'Elige una opción por número:\n' +
      '1) Seleccionar compañero\n' +
      '2) Seleccionar destino\n' +
      '3) Escanear ambiente\n' +
      '4) Iniciar viaje\n' +
      '5) Recargar energía\n' +
      '6) Estado (imprimir en consola)\n' +
      '7) Salir',
      '6'
    );

    switch (opcion) {
      case '1':
        seleccionarCompanero();
        break;
      case '2':
        seleccionarDestino();
        break;
      case '3':
        escanearAmbiente();
        break;
      case '4':
        realizarViaje();
        break;
      case '5':
        recargarEnergia();
        break;
      case '6':
        console.log('Estado actual:', { piloto, compañeroSeleccionado, destinoSeleccionado, energiasTardis });
        break;
      case '7':
        if (confirm('¿Seguro que quieres salir del simulador?')) {
          salir = true;
        }
        break;
      default:
        alert('Opción no válida. Intenta de nuevo.');
    }
  }
  console.log('Simulador finalizado. Gracias por pilotar la ' + TARDIS_NAME + '.');
}


window.addEventListener('load', () => {
  iniciarSimulador();

  seleccionarCompanero();
  seleccionarDestino();
  menuPrincipal();
});
