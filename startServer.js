// startServer.js
const { app, sequelize } = require("./server");

// Port to Listen on
const { PORT = 4004 } = process.env;
const startTheServer = app.listen(PORT, () => {
  sequelize.sync();
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = startTheServer;
