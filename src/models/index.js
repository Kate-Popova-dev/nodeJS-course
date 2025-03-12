import {Sequelize} from "sequelize";

const sequelize = new Sequelize({
    dialect: "mysql",
    host: "127.127.126.26",
    port: 3306,
    username: "root",
    password: "",
    database: "nodeJSdb",
    logging: true
})

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize