const bcrypt = require('bcryptjs');

bcrypt.hash('Admin123', 10)
    .then(hash => {
        console.log('Hash generado:');
        console.log(hash);
    })
    .catch(error => {
        console.error(error);
    });