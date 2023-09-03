const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  port: 3307
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



class Users extends Sequelize.Model {}
Users.init({
  firstName: Sequelize.STRING,
  lastName:Sequelize.STRING
}, { sequelize, modelName: 'users' });


//se desea eliminar el usuario con el ID 1
sequelize.sync()
  .then(() => {
    return Users.destroy({
      where: {
        id: 1
      }
    });
  })
  .then(numDeletedRows => {
    if (numDeletedRows === 1) {
      console.log('Usuario eliminado correctamente.');
    } else {
      console.log('Usuario no encontrado o no se pudo eliminar.');
    }
  });

