const connection = require('../config/database');

class Model_Berita {
    static async getAll(id_penulis = null){
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM berita";
            let params = [];
            if(id_penulis) {
                query += " WHERE id_penulis = ?";
                params.push(id_penulis);
            }
            query += " ORDER BY id DESC";
            
            connection.query(query, params, function(err, data){
                if(err) reject(err);
                else resolve(data);
            });
        });
    }

    static async insert(data) {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO berita SET ?", data, function(err, result) {
                if(err) reject(err);
                else resolve(result);
            });
        });
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM berita WHERE id = ?", [id], function(err, data) {
                if(err) reject(err);
                else resolve(data);
            });
        });
    }

    static async update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE berita SET ? WHERE id = ?", [data, id], function(err, result) {
                if(err) reject(err);
                else resolve(result);
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM berita WHERE id = ?", [id], function(err, result) {
                if(err) reject(err);
                else resolve(result);
            });
        });
    }

    static async countAll(id_penulis = null) {
        return new Promise((resolve, reject) => {
            let query = "SELECT COUNT(*) as count FROM berita";
            let params = [];
            if(id_penulis) {
                query += " WHERE id_penulis = ?";
                params.push(id_penulis);
            }
            connection.query(query, params, function(err, data) {
                if(err) reject(err);
                else resolve(data[0].count);
            });
        });
    }

    static async getPublicAll() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT berita.*, penulis.nama as penulis_nama, penulis.email as penulis_email FROM berita JOIN penulis ON berita.id_penulis = penulis.id ORDER BY berita.id DESC", function(err, data) {
                if(err) reject(err);
                else resolve(data);
            });
        });
    }

    static async getPublicById(id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT berita.*, penulis.nama as penulis_nama, penulis.email as penulis_email FROM berita JOIN penulis ON berita.id_penulis = penulis.id WHERE berita.id = ?", [id], function(err, data) {
                if(err) reject(err);
                else resolve(data);
            });
        });
    }
}

module.exports = Model_Berita;
