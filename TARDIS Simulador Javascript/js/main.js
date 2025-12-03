'use strict';

let DESTINOS = [];
let COMPANEROS = [];

async function cargarDatosJSON() {
  try {
    const respuesta = await fetch('./db/data.json');
    const datos = await respuesta.json();

    DESTINOS = datos.DESTINOS;
    COMPANEROS = datos.COMPANEROS;

    renderSelectores();
  } catch (error) {
    console.error('Error cargando JSON:', error);
  }
}
let estado = {
  piloto: '',
  companero: '',
  destino: null,
  energia: 100
};

window.addEventListener('load', () => {
  cargarEstado();
  renderEstado();
});

window.addEventListener('storage', (event) => {
  if (event.key === 'tardisEstado') {
    cargarEstado();
    renderEstado();
  }
});

function guardarEstado() {
  localStorage.setItem('tardisEstado', JSON.stringify(estado));
}
function cargarEstado() {
  const data = localStorage.getItem('tardisEstado');
  if (data) {
    estado = JSON.parse(data);
  }
}


function renderEstado() {
  document.getElementById('pilotoNombre').textContent = estado.piloto || 'No registrado';
  document.getElementById('companeroNombre').textContent = estado.companero || 'No seleccionado';
  document.getElementById('destinoNombre').textContent = estado.destino ? estado.destino.nombre : 'No seleccionado';
  document.getElementById('energiaValor').textContent = estado.energia.toFixed(1) + '%';
}

function renderSelectores() {
  const companeroSel = document.getElementById('companeroSelect');
  companeroSel.innerHTML = '';
  COMPANEROS.forEach((c, i) => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    companeroSel.appendChild(opt);
  });

  const destinoSel = document.getElementById('destinoSelect');
  destinoSel.innerHTML = '';
  DESTINOS.forEach((d, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `${d.nombre} (riesgo: ${d.riesgo})`;
    destinoSel.appendChild(opt);
  });
}


function registrarPiloto(nombre) {
  estado.piloto = nombre.trim() || 'Piloto desconocido';
  guardarEstado();
  renderEstado();
}


function seleccionarCompanero(nombre) {
  estado.companero = nombre;
  guardarEstado();
  renderEstado();
}


function seleccionarDestino(idx) {
  estado.destino = DESTINOS[idx];
  guardarEstado();
  renderEstado();
}


function escanearAmbiente(destino) {
  if (!destino) return [];
  const lecturas = ['Radiación', 'Oxígeno', 'Gravedad', 'Vida microbiana', 'Anomalía temporal'];
  return lecturas.map(item => ({
    sensor: item,
    valor: Math.floor(Math.random() * 100)
  }));
}


function realizarViaje(destino, energia, companero) {
  if (!destino || !companero) return { exito: false, mensaje: 'Selecciona destino y compañero.' };
  let energiaRestante = energia;
  let mensaje = '';
  let etapas = 5;
  let energiaCritica = false;

  for (let etapa = 1; etapa <= etapas; etapa++) {
    const perdida = destino.riesgo * etapa;
    energiaRestante -= perdida / 10;
    if (energiaRestante < 0) energiaRestante = 0;
    if (energiaRestante <= 10) {
      energiaCritica = true;
      break;
    }
  }

  if (energiaRestante > 50) {
    mensaje = `Viaje exitoso a ${destino.nombre}. Energía restante: ${energiaRestante.toFixed(1)}%`;
  } else if (energiaRestante > 10) {
    mensaje = `Viaje riesgoso a ${destino.nombre}. Energía baja: ${energiaRestante.toFixed(1)}%`;
  } else {
    mensaje = `Viaje fallido. Energía crítica (${energiaRestante.toFixed(1)}%).`;
  }

  if (energiaCritica === true) {
    Swal.fire({
      
      theme: 'dark',
      title: "¡Alerta de Energía Crítica!",
      text: mensaje,
      imageUrl: "./assets/tardis choque.gif",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "TARDIS estrellandose"
    });
  }

  return { exito: energiaRestante > 10, energia: energiaRestante, mensaje };
}



function recargarEnergia(actual, cantidad) {
  let nueva = actual + cantidad;
  if (nueva > 100) nueva = 100;
  return nueva;
}


document.addEventListener('DOMContentLoaded', async function() {
  cargarEstado();
  await cargarDatosJSON();
  renderSelectores();
  renderEstado();
});


  document.getElementById('pilotoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('pilotoInput').value;
    registrarPiloto(nombre);
    this.reset();
  });


  document.getElementById('companeroSelect').addEventListener('change', function() {
    seleccionarCompanero(this.value);
  });


  document.getElementById('destinoSelect').addEventListener('change', function() {
    seleccionarDestino(Number(this.value));
  });

  document.getElementById('escanearBtn').addEventListener('click', function() {
    const resultados = escanearAmbiente(estado.destino);
    const lista = document.getElementById('escanearResultados');
    lista.innerHTML = '';
    resultados.forEach(r => {
      const li = document.createElement('li');
      li.textContent = `${r.sensor}: ${r.valor}`;
      lista.appendChild(li);
    });
  });

  document.getElementById('viajarBtn').addEventListener('click', function() {
    const resultado = realizarViaje(estado.destino, estado.energia, estado.companero);
    estado.energia = resultado.energia;
    guardarEstado();
    renderEstado();
    document.getElementById('viajeResultado').textContent = resultado.mensaje;
  });


  document.getElementById('recargarBtn').addEventListener('click', function() {
    estado.energia = recargarEnergia(estado.energia, 10);
    guardarEstado();
    renderEstado();
  });
