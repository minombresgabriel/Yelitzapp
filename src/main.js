const { app, BrowserWindow } = require('electron');

function createWindow() {
  // Crea una ventana de navegador.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Carga la aplicación de React.
  win.loadURL('http://localhost:3000'); // Puedes cambiar la URL según la configuración de tu proyecto de React.

  // Abre las herramientas de desarrollo (quita esta línea para producción).
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
