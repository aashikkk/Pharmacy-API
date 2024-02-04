const db = require('./db');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// Insert mock data
db.serialize(async () => {
  const usersData = [
    // { fullname: 'John Doe', username: 'john_doe', password: await bcrypt.hash('password123', saltRounds), role: 'Manager' },
    { fullname: 'John Doe', username: 'john_doe', password: 'password123', role: 'Manager' },
    { fullname: 'Alice Smith', username: 'alice_smith', password: 'secret456', role: 'Owner' },
    { fullname: 'Bob Johnson', username: 'bob_cashier', password: 'secret788', role: 'Cashier' },
  ];

  const medicationData = [
    { med_name: 'Paracetamol', description: 'reliever', quantity: 100 },
    { med_name: 'Ibuprofen', description: 'Anti-inflammatory', quantity: 50 },
    { med_name: 'Aspirin', description: 'Blood thinner', quantity: 75 },
    { med_name: 'Amoxicillin', description: 'Antibiotic', quantity: 200 },
    { med_name: 'Lisinopril', description: 'Blood pressure medication', quantity: 150 },
    { med_name: 'Simvastatin', description: 'Cholesterol-lowering drug', quantity: 1000 },
  ];

  const customersData = [
    { customer_name: 'Mary Johnson', phone: '+1 123-456-7890', nic: '123456789V' },
    { customer_name: 'David Lee', phone: '+44 20 1234 5678', nic: '987654321V' },
    { customer_name: 'Linda Brown', phone: '+61 2 9876 5432', nic: '555555555V' },
    { customer_name: 'Sophia Adams', phone: '+1 987-654-3210', nic: '777777777V' },
    { customer_name: 'Daniel Brown', phone: '+44 20 5555 1234', nic: '888888888V' },
    { customer_name: 'Olivia Garcia', phone: '+61 3 1234 5678', nic: '989899999V' },
  ];

  const insertData = (table, data) => {
    const columns = Object.keys(data[0]).join(', ');
    const values = data.map((item) => Object.values(item).map((val) => `'${val}'`).join(', ')).join('), (');
    db.run(`INSERT INTO ${table} (${columns}) VALUES (${values})`);
  };

  insertData('users', usersData);
  insertData('medication', medicationData);
  insertData('customers', customersData);
});

module.exports = db;
