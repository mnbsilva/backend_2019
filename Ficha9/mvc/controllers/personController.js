// cria ligacao a DB 
// MySQL connection
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'persondb'
});


exports.person_detail = function(req, res, next){  
    var id = req.params.id;
    connection.query('SELECT * FROM persons WHERE id= ?', [id], function (err, rows, fields){
        if (err) throw err;
        //res.send(rows);
        res.render('person', {title: "Person Detail", person : rows[0]});
    })    
};

