import express from 'express';
import cors from 'cors';
import { connection } from './connectDB.js';

const app = express();
const Port = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (connection.state === 'disconnected') {
  }
  next();
});


app.get('/restaurants', (req, res) => {
  connection.query('SELECT * FROM partners', (err, results) => {
    if (err) {
        console.error(err);
    }
    res.json(results);
  });
});

app.get('/pizzaPlus', (req, res) => {
    connection.query('SELECT * FROM menu WHERE restaurant_id = 1', (err, results) => {
      if (err) {
          console.error(err);
      }
      res.json(results);
    });
  });


  app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM partners WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Ресторан не найден' });
      }
      res.json(results[0]);
    });
  });
  
  app.get('/menu/:restaurantId', (req, res) => {
    const restaurantId = req.params.restaurantId;
    connection.query('SELECT * FROM menu WHERE restaurant_id = ?', [restaurantId], (err, results) => {
      if (err) {
        console.error(err);
      }
      res.json(results);
    });
  });


  app.post('/login', (req, res) => {
    const { login, password } = req.body;
    
    if (!login || !password) {
      return res.status(400).json({ error: 'Введите логин и пароль' });
    }
    
    connection.query(
      'SELECT id, login, name FROM users WHERE login = ? AND password = ?',
      [login, password],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
          res.json({ 
            success: true, 
            user: results[0],
            message: 'Успешный вход'
          });
        } else {
          res.status(401).json({ error: 'Неверный логин или пароль' });
        }
      }
    );
  });


  app.post('/register', (req, res) => {
    const { login, password, name, email, phone, address } = req.body;
  
    if (!login || !password || !name) {
      return res.status(400).json({ 
        error: 'Логин, пароль и имя обязательны' 
      });
    }
  
    connection.query(
      'SELECT id FROM users WHERE login = ?',
      [login],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
  
        if (results.length > 0) {
          return res.status(400).json({ 
            error: 'Пользователь уже существует' 
          });
        }
  
        connection.query(
          `INSERT INTO users (login, password, name, email, phone, address) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [login, password, name, email || null, phone || null, address || null],
          (err, result) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
  
            res.status(201).json({ 
              success: true, 
              message: 'Регистрация успешна'
            });
          }
        );
      }
    );
  });

app.listen(Port, () => {
  console.log(` Сервер запущен на http://localhost:${Port}`);
});