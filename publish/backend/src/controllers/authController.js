const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {

    try {

        const { username, password } = req.body;

        const [users] = await db.query(
    'SELECT * FROM users WHERE username = ?',
    [username]
);

        if(users.length === 0){
            return res.status(401).json({
                message:'Usuario no encontrado'
            });
        }

        const user = users[0];

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if(!validPassword){
            return res.status(401).json({
                message:'Contraseña incorrecta'
            });
        }

        const token = jwt.sign(
            {
                id:user.id,
                email:user.email,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'8h'
            }
        );

        res.json({
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });

    } catch(error){

        console.log(error);

        res.status(500).json({
            message:'Error interno'
        });

    }

};

module.exports = {
    login
};