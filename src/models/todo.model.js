import {Sequelize, DataTypes, Model} from "sequelize";
import sequelize from "./index.js"
import User from "./user.model.js";

class Todo extends Model {
}

Todo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "new"
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    sequelize,
    modelName: "Todo",
    tableName: "todos",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
})
Todo.belongsTo(User)


export default Todo;
