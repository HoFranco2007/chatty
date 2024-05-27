const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '.next');
const newBuildDir = path.join(__dirname, 'custom_next');

if (fs.existsSync(buildDir)) {
  fs.renameSync(buildDir, newBuildDir);
} else {
  console.error('No se encontró la carpeta .next');
  process.exit(1);
}

// Función para actualizar las rutas en los archivos generados
function replaceInFile(filePath, searchValue, replaceValue) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const newContent = fileContent.replace(new RegExp(searchValue, 'g'), replaceValue);
  fs.writeFileSync(filePath, newContent, 'utf8');
}

// Recorrer y actualizar rutas en los archivos generados
function updatePaths(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      updatePaths(filePath);
    } else {
      replaceInFile(filePath, '/_next', '/custom_next');
    }
  });
}

// Iniciar actualización de rutas
updatePaths(path.join(__dirname, 'out'));

console.log('Carpeta _next renombrada a custom_next y rutas actualizadas');