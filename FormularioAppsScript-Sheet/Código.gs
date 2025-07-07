// Función que se ejecuta al acceder por navegador (GET)
// Muestra el archivo HTML llamado 'index'
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index') // Carga y muestra el archivo index.html
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Permite que se pueda visualizar en un iframe
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents); // <-- importante

    const nombre = data.nombre;
    const correo = data.correo;
    const mensaje = data.mensaje;

    const ss = SpreadsheetApp.openById("1G3yVLmFAYuVutLIlPaKF0uHXvP7tZTJj2x1ZppUSmD8");
    const sheet = ss.getSheetByName("Contactos");
    sheet.appendRow([new Date(), nombre, correo, mensaje]);

    return ContentService.createTextOutput(JSON.stringify({ mensaje: "✔️ Datos registrados." }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ mensaje: "❌ Error: " + err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}



