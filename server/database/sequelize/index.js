const { Sequelize, DataTypes } = require("sequelize");

// create a database connection in your application using a Sequelize instance and the config file
const connection = new Sequelize(
  "Inventory",
  "root",
  "root",
  {
    host: "localhost",
    dialect: "mysql",
  }
);
//verify your connection here !
connection.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));
//  create your table using sequilize
const items = connection.define("item", {
  ref: {
    type: DataTypes.STRING,
    allowNull: false, // Don't allow null values
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Don't allow null values
  },
  description: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false, // Don't allow null values
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false, // Don't allow null values
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false, // Don't allow null values
  }, 
  criticalStock: { 
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false, // Don't allow null values
  }
});



// this call, Sequelize will automatically perform an SQL query to the database and create a table, printing the message phrase table created successfully!.
// please run this below *****one time***** after creating your connection

connection
  .sync({ force: true })
  .then(() => {
    console.log("Tables created!");
  })
  .catch((error) => {
    console.error("Unable to create table :",error);
  });

// export your Model items below
 
const db = {
  connection,
  Sequelize,
items
};

module.exports = db;