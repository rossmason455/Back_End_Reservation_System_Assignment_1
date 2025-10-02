const pool = require('./db/mysql');

async function runTest() {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    console.log('MySQL connected! Server time:', rows[0].now);
  } catch (err) {
    console.error('MySQL connection failed:', err.message);
  } finally {
    await pool.end(); 
  }
}

runTest();