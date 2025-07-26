function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  try {
    const nombre = e.parameter.nombre;
    const correo = e.parameter.correo;
    const mensaje = e.parameter.mensaje;

    const ss = SpreadsheetApp.openById("1G3yVLmFAYuVutLIlPaKF0uHXvP7tZTJj2x1ZppUSmD8");
    const hoja = ss.getSheetByName("Contactos");
    hoja.appendRow([new Date(), nombre, correo, mensaje]);

    return ContentService.createTextOutput(JSON.stringify({ mensaje: "✔️ Datos registrados." }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ mensaje: "❌ Error: " + err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
