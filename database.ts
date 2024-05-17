import { Pool } from "pg";

const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'todo',
password: 'Erez0101',
port: 5432,

});


export const getTodos = async () => {
    const res = await pool.query('SELECT * FROM todo');
    return res.rows;
};


export const addTodo=  async (task: string) => {
    const res = await pool.query('INSERT INTO todo (task) VALUES ($1) RETURNING *', [task]);
    return res.rows[0];
}

export const deleteTodo = async (id:number) => {
    const res = await pool.query('DELETE FROM todo WHERE id = $1 RETURNING *', [id])
}
