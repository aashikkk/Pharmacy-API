const db = require("./db");

// User Controller
const getUsers = (req, res) => {
	db.all("SELECT * FROM users WHERE is_deleted = 0", (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(rows);
	});
};

const getUserById = (req, res) => {
	const userId = req.params.id;
	db.get("SELECT * FROM users WHERE user_id = ?", [userId], (err, row) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (!row) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json(row);
	});
};

const createUser = (req, res) => {
	const { fullname, username, password, role } = req.body;
	db.run(
		"INSERT INTO users (fullname, username, password, role) VALUES (?, ?, ?, ?)",
		[fullname, username, password, role],
		function (err) {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			res.json({ message: "User created", userId: this.lastID });
		}
	);
};

const updateUser = (req, res) => {
	const userId = req.params.id;
	const { fullname, username, password, role } = req.body;

	// Initialize an empty array to store the columns to be updated
	const updateColumns = [];

	// Construct the SQL query dynamically based on provided attributes
	let query = "UPDATE users SET ";

	if (fullname !== undefined) {
		query += "fullname = ?, ";
		updateColumns.push(fullname);
	}

	if (username !== undefined) {
		query += "username = ?, ";
		updateColumns.push(username);
	}

	if (password !== undefined) {
		query += "password = ?, ";
		updateColumns.push(password);
	}

	if (role !== undefined) {
		query += "role = ?, ";
		updateColumns.push(role);
	}

	// Remove the trailing comma and space
	query = query.slice(0, -2);

	// Add the WHERE clause
	query += " WHERE user_id = ?";

	// Add the userId to the updateColumns array
	updateColumns.push(userId);

	// Execute the query
	db.run(query, updateColumns, function (err) {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (this.changes === 0) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json({ message: "User updated" });
	});
};

const softDeleteUser = (req, res) => {
	const userId = req.params.id;
	db.run(
		"UPDATE users SET is_deleted = 1 WHERE user_id = ?",
		[userId],
		function (err) {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			if (this.changes === 0) {
				return res.status(404).json({ error: "User not found" });
			}
			res.json({ message: "User soft-deleted" });
		}
	);
};

const hardDeleteUser = (req, res) => {
	const userId = req.params.id;
	db.run("DELETE FROM users WHERE user_id = ?", [userId], function (err) {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (this.changes === 0) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json({ message: "User permanently deleted" });
	});
};

// Medication Controller
const getMedications = (req, res) => {
	db.all("SELECT * FROM medication WHERE is_deleted = 0", (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(rows);
	});
};

const getMedicationById = (req, res) => {
	const medicationId = req.params.id;
	db.get(
		"SELECT * FROM medication WHERE med_id = ? AND is_deleted = 0",
		[medicationId],
		(err, row) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			if (!row) {
				return res.status(404).json({ error: "Medication not found" });
			}
			res.json(row);
		}
	);
};

const insertMedication = (req, res) => {
	const { med_name, description, quantity } = req.body;
	db.run(
		"INSERT INTO medication (med_name, description, quantity) VALUES (?, ?, ?)",
		[med_name, description, quantity],
		function (err) {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			res.json({ message: "Medication created", medId: this.lastID });
		}
	);
};

const updateMedication = (req, res) => {
	const medicationId = req.params.id;
	const { med_name, description, quantity } = req.body;

	// Initialize an empty array to store the columns to be updated
	const updateColumns = [];

	// Construct the SQL query dynamically based on provided attributes
	let query = "UPDATE medication SET ";

	if (med_name !== undefined) {
		query += "med_name = ?, ";
		updateColumns.push(med_name);
	}

	if (description !== undefined) {
		query += "description = ?, ";
		updateColumns.push(description);
	}

	if (quantity !== undefined) {
		query += "quantity = ?, ";
		updateColumns.push(quantity);
	}

	// Remove the trailing comma and space
	query = query.slice(0, -2);

	// Add the WHERE clause
	query += " WHERE med_id = ?";

	// Add the userId to the updateColumns array
	updateColumns.push(medicationId);

	db.run(query, updateColumns, function (err) {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (this.changes === 0) {
			return res.status(404).json({ error: "Medication not found" });
		}
		res.json({ message: "Medication updated" });
	});
};

const softDeleteMedication = (req, res) => {
	const medicationId = req.params.id;
	db.run(
		"UPDATE medication SET is_deleted = 1 WHERE med_id = ?",
		[medicationId],
		function (err) {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			if (this.changes === 0) {
				return res.status(404).json({ error: "Medication not found" });
			}
			res.json({ message: "Medication soft-deleted" });
		}
	);
};

const hardDeleteMedication = (req, res) => {
	const medicationId = req.params.id;
	db.run(
		"DELETE FROM medication WHERE med_id = ?",
		[medicationId],
		function (err) {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			if (this.changes === 0) {
				return res.status(404).json({ error: "Medication not found" });
			}
			res.json({ message: "Medication permanently deleted" });
		}
	);
};

// Customer Controller
const getCustomers = (req, res) => {
	db.all("SELECT * FROM customers WHERE is_deleted = 0", (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(rows);
	});
};

const getCustomerById = (req, res) => {
	const customerId = req.params.id;
	db.get(
		"SELECT * FROM customers WHERE customer_id = ? AND is_deleted = 0",
		[customerId],
		(err, row) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			if (!row) {
				return res.status(404).json({ error: "Customer not found" });
			}
			res.json(row);
		}
	);
};

const insertCustomer = (req, res) => {
	const { customer_name, phone, nic } = req.body;
	db.run(
		"INSERT INTO customers (customer_name, phone, nic) VALUES (?, ?, ?)",
		[customer_name, phone, nic],
		function (err) {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			res.json({ message: "Customer created", customerId: this.lastID });
		}
	);
};

const updateCustomer = (req, res) => {
	const customerId = req.params.id;
	const { customer_name, phone, nic } = req.body;

	// Initialize an empty array to store the columns to be updated
	const updateColumns = [];

	// Construct the SQL query dynamically based on provided attributes
	let query = "UPDATE customers SET ";

	if (customer_name !== undefined) {
		query += "customer_name = ?, ";
		updateColumns.push(customer_name);
	}

	if (phone !== undefined) {
		query += "phone = ?, ";
		updateColumns.push(phone);
	}

	if (nic !== undefined) {
		query += "nic = ?, ";
		updateColumns.push(nic);
	}

	// Remove the trailing comma and space
	query = query.slice(0, -2);

	// Add the WHERE clause
	query += " WHERE customer_id = ?";

	// Add the userId to the updateColumns array
	updateColumns.push(customerId);
	db.run(query, updateColumns, function (err) {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (this.changes === 0) {
			return res.status(404).json({ error: "Customer not found" });
		}
		res.json({ message: "Customer updated" });
	});
};

const softDeleteCustomer = (req, res) => {
	const customerId = req.params.id;
	db.run(
		"UPDATE customers SET is_deleted = 1 WHERE customer_id = ?",
		[customerId],
		function (err) {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			if (this.changes === 0) {
				return res.status(404).json({ error: "Customer not found" });
			}
			res.json({ message: "Customer soft-deleted" });
		}
	);
};

const hardDeleteCustomer = (req, res) => {
	const customerId = req.params.id;
	db.run(
		"DELETE FROM customers WHERE customer_id = ?",
		[customerId],
		function (err) {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			if (this.changes === 0) {
				return res.status(404).json({ error: "Customer not found" });
			}
			res.json({ message: "Customer permanently deleted" });
		}
	);
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	softDeleteUser,
	hardDeleteUser,
	getMedications,
	getMedicationById,
	insertMedication,
	updateMedication,
	softDeleteMedication,
	hardDeleteMedication,
	getCustomers,
	getCustomerById,
	insertCustomer,
	updateCustomer,
	softDeleteCustomer,
	hardDeleteCustomer,
};
