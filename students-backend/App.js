const express = require("express");
const app = express();
const database = require('./db');
const cors = require("cors")
const router = require('./Routes/index')
const auth  = require('./middlewares/authorize');

require('dotenv').config();
const PORT = process.env.PORT

// INSERT INTO "users" ("id","email","password","createdAt","updatedAt") VALUES (DEFAULT,1,'arsen@narimanyan.de','$2b$10$Cl3KG3xxSJJo31N2iZWku.vaomAUvvr.SzZ.E1o/cEBviR8iz4AJ.','18.10.2022','18.10.2022') RETURNING "id","email","password","createdAt","updatedAt";

const start = async () => {
    try {
        await database.authenticate()
        await database.sync()
        app.use(cors())
        app.use(express.json());
        app.use(router)
        app.use(auth.authorize);

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

    } catch (e) {
        console.log(e)
    }
}

start();
console.clear();
