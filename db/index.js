const mongoose = require("mongoose");

const DBConnect = (app) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => {
      const PORT = process.env.PORT;

      app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
      });

      console.log("Conexión exitosa a la BBDD");
    })
    .catch((err) => console.log(err));
};

module.exports = DBConnect;
