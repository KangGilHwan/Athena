const pool = require('./db_connect');

module.exports = function() {
  return {
    findAll: function(callback){
      pool.getConnection(function(err, con) {
        console.log(`group find error : ${err}`);
        let sql = 'SELECT * FROM groupinfo';
        con.query(sql, function(error, rows, fields) {
          con.release();
          if(error){
            return callback(error);
          }
          callback(null, rows);
        });
      });
    },
    make: function(data, callback) {
      pool.getConnection(function(err, con) {
        console.log(`group make error : ${err}`);
        let sql = 'INSERT INTO groupinfo (name) VALUES (?)';
        con.query(sql, data.name, function(error, rows, fields) {
          con.release();
          if (error) {
            return callback(error)
          };
          console.log(`id : ${rows.insertId}`);
          callback(null, rows);
        });
      });
    },
    show: function(groupId, callback) {
      pool.getConnection(function(err, con) {
        console.log(`board show error : ${err}`);
        let sql = 'SELECT id, name FROM groupinfo WHERE id = ?';
        con.query(sql, groupId, function(error, result, fields) {
          con.release();
          if (error) {
            return callback(error)
          };
          console.log('success show');
          callback(null, result);
        });
      });
    }
  }
}
