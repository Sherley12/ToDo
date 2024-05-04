async function getAllTasks() {
    const conn = await getConnection();
    try {
      const rows = await conn.query('SELECT * FROM tasks');
      return rows;
    } finally {
      conn.release();
    }
  }

async function getTaskById(id) {
    const conn = await getConnection();
    try {
      const rows = await conn.query('SELECT * FROM tasks WHERE id = ?', [id]);
      return rows[0];
    } finally {
      conn.release();
    }
  }

async function createTask(task) {
    const { text, completed } = task;
    const conn = await getConnection();
    try {
      const res = await conn.query('INSERT INTO tasks (text, completed) VALUES (?, ?)', [text, completed]);
      return res.insertId;
    } finally {
      conn.release();
    }
  }


async function updateTask(id, task) {
    const { text, completed } = task;
    const conn = await getConnection();
    try {
      await conn.query('UPDATE tasks SET text = ?, completed = ? WHERE id = ?', [text, completed, id]);
    } finally {
      conn.release();
    }
  }

async function deleteTask(id) {
    const conn = await getConnection();
    try {
      await conn.query('DELETE FROM tasks WHERE id = ?', [id]);
    } finally {
      conn.release();
    }
  }

 module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
  };
