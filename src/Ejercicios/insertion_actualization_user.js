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


//Insertar y actualizar usuario con ID 1
sequelize.sync()
  .then(() => {
    return Users.findByPk(1);
  })
  .then(user => {
    if (user) {
      // Actualizar los datos del usuario
      user.firstName = 'NuevoNombre';
      user.lastName = 'NuevoApellido';
      return user.save();
    }
  })
  .then(updatedUser => {
    if (updatedUser) {
      console.log('Usuario actualizado:', updatedUser.toJSON());
    } else {
      console.log('Usuario no encontrado.');
    }
  });





