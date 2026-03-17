const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de tu base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'silent_hill_archives',
  password: 'Contrasena123',
  port: 5432,
});

// --- RUTAS DE PERSONAJES (Characters) ---

app.get("/api/characters", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM characters ORDER BY char_id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/characters", async (req, res) => {
  const { name, status, description, image } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO characters (name, status, description, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, status, description, image]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/characters/:id", async (req, res) => {
  const { name, status, description, image } = req.body;
  try {
    await pool.query(
      "UPDATE characters SET name=$1, status=$2, description=$3, image=$4 WHERE char_id=$5",
      [name, status, description, image, req.params.id]
    );
    res.json({ message: "Actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/characters/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM characters WHERE char_id = $1", [req.params.id]);
    res.json({ message: "Eliminado de los archivos" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- RUTAS DE MONSTRUOS (Monsters) ---

app.get("/api/monsters", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM monsters ORDER BY monster_id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/monsters", async (req, res) => {
  const { name, danger, description, image } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO monsters (name, danger, description, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, danger, description, image]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/monsters/:id", async (req, res) => {
  const { name, danger, description, image } = req.body;
  try {
    await pool.query(
      "UPDATE monsters SET name=$1, danger=$2, description=$3, image=$4 WHERE monster_id=$5",
      [name, danger, description, image, req.params.id]
    );
    res.json({ message: "Entidad actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/monsters/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM monsters WHERE monster_id = $1", [req.params.id]);
    res.json({ message: "Entidad purgada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("-----------------------------------------");
  console.log("   SILENT HILL ARCHIVE SERVER RUNNING    ");
  console.log("   Listening on: http://localhost:3000   ");
  console.log("-----------------------------------------");
});