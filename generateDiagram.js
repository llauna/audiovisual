import chokidar from 'chokidar';
import plantuml from 'node-plantuml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pumlFile = path.join(__dirname, 'audiovisual.puml');
const outputPNG = path.join(__dirname, 'audiovisual.png');
const outputSVG = path.join(__dirname, 'audiovisual.svg');

// Función para generar PNG
function generatePNG() {
    console.log(`🖼 Generando PNG desde ${pumlFile}...`);
    const gen = plantuml.generate(pumlFile, { format: 'png' });
    gen.out.pipe(fs.createWriteStream(outputPNG))
        .on('finish', () => console.log(`✅ PNG generado: ${outputPNG}`))
        .on('error', (err) => console.error(`❌ Error generando PNG: ${err}`));
}

// Función para generar SVG
function generateSVG() {
    console.log(`🖼 Generando SVG desde ${pumlFile}...`);
    const gen = plantuml.generate(pumlFile, { format: 'svg' });
    gen.out.pipe(fs.createWriteStream(outputSVG))
        .on('finish', () => console.log(`✅ SVG generado: ${outputSVG}`))
        .on('error', (err) => console.error(`❌ Error generando SVG: ${err}`));
}

// Función para generar ambos formatos
function generateDiagrams() {
    generatePNG();
    generateSVG();
}

// Generar al inicio
generateDiagrams();

// Vigilar cambios en el archivo .puml
chokidar.watch(pumlFile).on('change', () => {
    console.log('🔄 Archivo .puml modificado, regenerando diagramas...');
    generateDiagrams();
});
