const connection = require('../config/database');

class Model_Users {
    static Login(email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM penulis WHERE email = ?', [email], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    static Register(nama, email, password) {
        return new Promise((resolve, reject) => {
            connection.query(
                'INSERT INTO penulis (nama, email, password) VALUES (?, ?, ?)',
                [nama, email, password],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    }
    static UpdateProfile(id, data) {
        return new Promise((resolve, reject) => {
            connection.query(
                'UPDATE penulis SET ? WHERE id = ?',
                [data, id],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT id, nama, email, created_at FROM penulis ORDER BY id DESC', (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT id, nama, email, created_at FROM penulis WHERE id = ?', [id], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM penulis WHERE id = ?', [id], (err, result) => {
                if(err) reject(err);
                else resolve(result);
            });
        });
    }
}

module.exports = Model_Users;
