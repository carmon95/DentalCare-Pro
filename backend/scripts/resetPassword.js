const path = require('path');
const readline = require('readline');
const bcrypt = require('bcryptjs');

require('dotenv').config({
    path: path.join(__dirname, '..', '.env')
});

const db = require('../src/config/db');

const getArgument = (name) => {
    const index = process.argv.indexOf(name);
    return index === -1 ? null : process.argv[index + 1];
};

const ask = (question, hidden = false) => new Promise((resolve) => {
    const terminal = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });

    let hideInput = false;
    const write = terminal._writeToOutput.bind(terminal);

    terminal._writeToOutput = (value) => {
        write(hideInput ? '*' : value);
    };

    terminal.question(question, (answer) => {
        terminal.close();
        if (hidden) process.stdout.write('\n');
        resolve(answer);
    });

    hideInput = hidden;
});

const validatePassword = (password) => {
    if (password.length < 12) {
        return 'La contraseña debe tener al menos 12 caracteres.';
    }

    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        return 'La contraseña debe incluir mayúsculas y minúsculas.';
    }

    if (!/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
        return 'La contraseña debe incluir un número y un símbolo.';
    }

    return null;
};

const resetPassword = async () => {
    const username = getArgument('--username');

    if (!username) {
        console.error('Uso: npm run reset-password -- --username <usuario>');
        process.exitCode = 1;
        return;
    }

    if (!process.stdin.isTTY) {
        console.error('Este comando requiere una terminal interactiva para proteger la contraseña.');
        process.exitCode = 1;
        return;
    }

    const password = await ask('Nueva contraseña: ', true);
    const confirmation = await ask('Confirmar contraseña: ', true);
    const passwordError = validatePassword(password);

    if (passwordError) {
        console.error(passwordError);
        process.exitCode = 1;
        return;
    }

    if (password !== confirmation) {
        console.error('Las contraseñas no coinciden. No se realizaron cambios.');
        process.exitCode = 1;
        return;
    }

    const [users] = await db.query(
        'SELECT id FROM users WHERE username = ? LIMIT 1',
        [username]
    );

    if (users.length === 0) {
        console.error('No existe un usuario con ese nombre. No se realizaron cambios.');
        process.exitCode = 1;
        return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await db.query(
        'UPDATE users SET password = ? WHERE id = ?',
        [passwordHash, users[0].id]
    );

    console.log(`Contraseña actualizada para el usuario "${username}".`);
};

resetPassword()
    .catch((error) => {
        console.error('No fue posible restablecer la contraseña:', error.message);
        process.exitCode = 1;
    })
    .finally(() => db.end());
