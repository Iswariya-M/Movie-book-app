const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aishu@2003',
    database: 'movie_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`;
    const values = [username, email, password, 'user'];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error signing up:', err);
            res.status(500).json({ message: 'Failed to signup' });
            return;
        }
        console.log('User signed up successfully');
        res.status(200).json({ message: 'Successfully signed up' });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) {
            console.error('Error logging in:', err);
            res.status(500).json({ message: 'Failed to login' });
            return;
        }

        if (result.length === 0) {
            console.log('User not found');
            res.status(404).json({ message: 'User not found' });
            return;
        }

        console.log('User logged in successfully:', result[0]);
        const userRole = result[0].role;
        if (userRole === 'admin') {
            res.status(200).json({ message: 'Admin logged in successfully' });
        } else {
            res.status(200).json({ message: 'User logged in successfully' });
        }
    });
});

app.post('/api/bookings', (req, res) => {
    const { title, theatre, date, seats } = req.body;
    const query = `INSERT INTO bookings (title, theatre, date, seats_row1, seats_row2, seats_row3, seats_row4, seats_row5, seats_row6, seats_row7, seats_row8) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [title, theatre, date, seats.row1, seats.row2, seats.row3, seats.row4, seats.row5, seats.row6, seats.row7, seats.row8];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error saving booking:', err);
            return res.status(500).json('Error saving booking');
        }
        console.log('Booking saved successfully:', result);
        res.status(200).json('Booking saved successfully');
    });
});

// app.get('/api/titles', (req, res) => {
//     db.query('SELECT DISTINCT title FROM bookings', (err, results) => {
//         if (err) {
//             console.error('Error fetching titles:', err);
//             return res.status(500).json('Error fetching titles');
//         }
//         res.json(results);
//     });
// });

app.get('/api/titles', (req, res) => {
    const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format
    const query = `
        SELECT DISTINCT title FROM bookings
        WHERE date >= ?
    `;
    db.query(query, [today], (err, results) => {
        if (err) {
            console.error('Error fetching titles:', err);
            return res.status(500).json('Error fetching titles');
        }
        res.json(results);
    });
});

app.get('/api/theatres', (req, res) => {
    const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format
    const query = `
        SELECT DISTINCT theatre FROM bookings
        WHERE date >= ?
    `;
    db.query(query, [today], (err, results) => {
        if (err) {
            console.error('Error fetching theatres:', err);
            return res.status(500).json('Error fetching theatres');
        }
        res.json(results);
    });
});



// app.get('/api/theatres', (req, res) => {
//     db.query('SELECT DISTINCT theatre FROM bookings', (err, results) => {
//         if (err) {
//             console.error('Error fetching theatres:', err);
//             return res.status(500).json('Error fetching theatres');
//         }
//         res.json(results);
//     });
// });

// app.get('/api/dates', (req, res) => {
//     db.query('SELECT DISTINCT date FROM bookings', (err, results) => {
//         if (err) {
//             console.error('Error fetching dates:', err);
//             return res.status(500).json('Error fetching dates');
//         }
//         res.json(results);
//     });
// });

app.get('/api/dates', (req, res) => {
    const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format
    db.query('SELECT DISTINCT date FROM bookings WHERE date >= ?', [today], (err, results) => {
        if (err) {
            console.error('Error fetching dates:', err);
            return res.status(500).json('Error fetching dates');
        }
        res.json(results);
    });
});


// app.get('/api/theater-details/:theater', (req, res) => {
//     const theater = req.params.theater;
//     const query = `SELECT * FROM bookings WHERE theatre = ?`;
//     db.query(query, [theater], (err, results) => {
//         if (err) {
//             console.error('Error fetching theater details:', err);
//             return res.status(500).json('Error fetching theater details');
//         }
//         if (results.length === 0) {
//             return res.status(404).json('Theater details not found');
//         }
//         res.json(results); // Return all details associated with the theater
//     });
// });

app.get('/api/theater-details/:theater', (req, res) => {
    const theater = req.params.theater;
    const today = new Date().toISOString().split('T')[0]; 

    const query = `SELECT * FROM bookings WHERE theatre = ? AND date >= ?`;
    db.query(query, [theater, today], (err, results) => {
        if (err) {
            console.error('Error fetching theater details:', err);
            return res.status(500).json('Error fetching theater details');
        }
        if (results.length === 0) {
            return res.status(404).json('Theater details not found');
        }
        res.json(results); 
    });
});

app.post('/api/submitBooking', (req, res) => {
    const { title, theatre, date, seats } = req.body;
    const query = `SELECT * FROM bookings WHERE title = ? AND theatre = ? AND date = ?`;
    const values = [title, theatre, date];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json('Error checking available seats');
            return;
        }

        if (results.length === 0) {
            res.status(400).json('No booking found for the given parameters');
            return;
        }

        const booking = results[0];
        const availableSeats = [];
        for (let i = 1; i <= 8; i++) {
            availableSeats.push(booking[`seats_row${i}`]);
        }

        let continuousSeatsAvailable = true;

        if (continuousSeatsAvailable) {
            const updatedSeats = [...availableSeats];
            let remainingSeats = seats;
            for (let i = 0; i < 8 && remainingSeats > 0; i++) {
                const availableInRow = updatedSeats[i];
                if (availableInRow >= remainingSeats) {
                    updatedSeats[i] -= remainingSeats;
                    remainingSeats = 0;
                }
            }

            const updateQuery = `UPDATE bookings SET seats_row1 = ?, seats_row2 = ?, seats_row3 = ?, seats_row4 = ?, seats_row5 = ?, seats_row6 = ?, seats_row7 = ?, seats_row8 = ? WHERE id = ?`;
            const updateValues = updatedSeats.concat(booking.id);

            db.query(updateQuery, updateValues, (updateErr, updateResult) => {
                if (updateErr) {
                    console.error(updateErr);
                    res.status(500).json('Error updating booking');
                    return;
                }

                const userBookQuery = `INSERT INTO userbook (title, theatre, date, seats) VALUES (?, ?, ?, ?)`;
                const userBookValues = [title, theatre, date, seats];

                db.query(userBookQuery, userBookValues, (userBookErr, userBookResult) => {
                    if (userBookErr) {
                        console.error(userBookErr);
                        res.status(500).json('Error storing in userbook table');
                        return;
                    }
                    res.status(200).json('Booking saved successfully');
                });
            });
        } else {
            res.status(400).json('Not enough continuous seats available');
        }
    });
});

// app.get('/api/bookings', (req, res) => {
//     const query = `SELECT * FROM bookings`;
//     db.query(query, (err, results) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json('Error retrieving bookings');
//             return;
//         }
//         res.status(200).json(results);
//     });
// });

app.get('/api/bookings', (req, res) => {
    const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format
    const query = `
        SELECT * FROM bookings
        WHERE date >= ?
        ORDER BY date ASC
    `;
    db.query(query, [today], (err, results) => {
        if (err) {
            console.error('Error retrieving bookings:', err);
            res.status(500).json('Error retrieving bookings');
            return;
        }
        res.status(200).json(results);
    });
});


app.get('/api/userbook', (req, res) => {
  const query = `SELECT * FROM userbook ORDER BY date ASC`;
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).json('Error retrieving userbook');
          return;
      }
      res.status(200).json(results);
  });
});

// app.get('/api/userbook', (req, res) => {
//     const today = new Date().toISOString().split('T')[0];  
//     const query = `
//         SELECT * FROM userbook
//         WHERE date >= ?
//         ORDER BY date ASC
//     `;
//     db.query(query, [today], (err, results) => {
//         if (err) {
//             console.error('Error retrieving userbook:', err);
//             res.status(500).json('Error retrieving userbook');
//             return;
//         }
//         res.status(200).json(results);
//     });
// });



// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
  

