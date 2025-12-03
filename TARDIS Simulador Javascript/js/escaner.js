function analizarTiempo() {
const valor = parseInt(document.getElementById('inputTiempo').value);
const salida = document.getElementById('resultado');


if (isNaN(valor)) {
salida.textContent = "La TARDIS no puede escanear un año inexistente.";
return;
}


let mensaje = "";


if (valor < 0) {
mensaje = "Época prehistórica. Probables señales de depredadores gigantes y viajeros del tiempo imprudentes.";
} else if (valor < 1599) {
mensaje = "Alta actividad mística. El escáner detecta ecos de magia… o tecnología demasiado avanzada para la época.";
} else if (valor > 1600 && valor < 1800) {
mensaje = "Lectura inusual: nacimiento de múltiples líneas temporales relacionadas con la TARDIS.";
} else if (valor >= 2000 && valor < 2100) {
mensaje = "Era moderna. Señales débiles de distorsión provocadas por decisiones humanas… y algún que otro alien despistado.";
} else if (valor >= 2100 && valor < 4000) {
mensaje = "Expansión humana al espacio. Nivel creciente de anomalías por viajes interestelares tempranos.";
} else if (valor >= 4000 && valor < 100000) {
mensaje = "Civilizaciones mixtas. El escáner registra choques culturales, portales y modales intergalácticos dudosos.";
} else {
mensaje = "Futuro profundo. Energía temporal extremadamente inestable. Se recomienda casco, valentía y quizás un destornillador sónico.";
}


salida.textContent = mensaje;
}