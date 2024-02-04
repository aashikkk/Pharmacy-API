const express = require("express");
const passport = require("./passport_config");
const router = express.Router();
const controller = require("./controller").default;
const {
	updateViewAccess,
	softDeleteAccess,
	specialOwnerAccess,
} = require("./roles_auth");

// Login route
router.post("/login", passport.authenticate("local"), (req, res) => {
	// Authentication successful
	res.json({ message: "Login successful", user: req.user });
});

// User Routes
router.get("/users", specialOwnerAccess, controller.getUsers);
router.get("/users/:id", specialOwnerAccess, controller.getUserById);
router.post("/users", specialOwnerAccess, controller.createUser);
router.put("/users/:id", specialOwnerAccess, controller.updateUser);
router.delete(
	"/users/:id/soft-delete",
	specialOwnerAccess,
	controller.softDeleteUser
);
router.delete(
	"/users/:id/hard-delete",
	specialOwnerAccess,
	controller.hardDeleteUser
);

// Medication Routes
router.get("/medications", updateViewAccess, controller.getMedications);
router.get("/medications/:id", updateViewAccess, controller.getMedicationById);
router.post("/medications", specialOwnerAccess, controller.insertMedication);
router.put("/medications/:id", updateViewAccess, controller.updateMedication);
router.delete(
	"/medications/:id/soft-delete",
	softDeleteAccess,
	controller.softDeleteMedication
);
router.delete(
	"/medications/:id/hard-delete",
	specialOwnerAccess,
	controller.hardDeleteMedication
);

// Customer Routes
router.get("/customers", updateViewAccess, controller.getCustomers);
router.get("/customers/:id", updateViewAccess, controller.getCustomerById);
router.post("/customers", specialOwnerAccess, controller.insertCustomer);
router.put("/customers/:id", updateViewAccess, controller.updateCustomer);
router.delete(
	"/customers/:id/soft-delete",
	softDeleteAccess,
	controller.softDeleteCustomer
);
router.delete(
	"/customers/:id/hard-delete",
	specialOwnerAccess,
	controller.hardDeleteCustomer
);

module.exports = router;
