import mysql from 'mysql2'

export default function handler(req, res) {

    const connection = mysql.createConnection({
        host:process.env.MYSQL_HOST,
        user:process.env.MYSQL_USER,
        password:process.env.MYSQL_PASSWORD,
        database:process.env.MYSQL_DATABASE
    })

    connection.connect();

    if (req.method === "POST") {
        const { newTask, newStatus, newSize } = req.body
        connection.query(
            'INSERT INTO flatplan (task, status, size ) VALUES (?,?,?)',
            [newTask, newStatus, newSize],
            function (error, results, fields) {
                if (error) throw error
                res.status(200).json({message: 'Task added succesfully'})
            }
        )

    } else if (req.method === "PUT") {
        const { id, value, field } = req.body
        connection.query(
            'UPDATE flatplan SET '+connection.escapeId(field) +' = ? WHERE id = ?', [value, id],
            function (error, results, fields) {
                if (error) throw error
                res.status(200).json({message: 'Task updated succesfully'})
            }            
        )

    } else if (req.method === "DELETE") {
        const id = req.query.id
        connection.query("DELETE FROM flatplan WHERE id=?", [id],
            function (error, results, fields) {
            if (error) throw error
            res.status(200).json({message: 'Task deleted succesfully'})
        })

    } else {
        connection.query('SELECT * FROM flatplan', function (error, results, fields) {
            if (error) throw error;
            res.status(200).json(results);
        });

    }
    
    connection.end();
}    