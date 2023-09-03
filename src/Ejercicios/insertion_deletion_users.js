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
  lastName: Sequelize.STRING
}, { sequelize, modelName: 'users' });

//Lista de usuarios a eliminar
const userIdsToDelete = [1, 2, 3];

// Eliminar varios usuarios por sus IDs
sequelize.sync()
  .then(() => {
    return Users.destroy({
      where: {
        id: userIdsToDelete
      }
    });
  })
  .then(numDeletedRows => {
    if (numDeletedRows > 0) {
      console.log(`${numDeletedRows} usuarios eliminados correctamente.`);
    } else {
      console.log('No se encontraron usuarios para eliminar.');
    }
  })
  .catch(err => {
    console.error('Error al eliminar usuarios:', err);
  });
