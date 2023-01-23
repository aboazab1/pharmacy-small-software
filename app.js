const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

// Database of medication information
const medicationData = {
  aspirin: {
    name: "Aspirin",
    dosage: "500mg",
    price: 5.99,
    inStock: true
  },
  ibuprofen: {
    name: "Ibuprofen",
    dosage: "200mg",
    price: 6.99,
    inStock: true
  },
  paracetamol: {
    name: "Paracetamol",
    dosage: "500mg",
    price: 4.99,
    inStock: true
  }
}

// Service to retrieve information about all medications
app.get('/medication', (req, res) => {
  res.json(medicationData);
});

// Service to retrieve information about a specific medication
app.get('/medication/:id', (req, res) => {
  const medicationId = req.params.id;
  const medication = medicationData[medicationId];
  if (!medication) {
    return res.status(404).send({ error: "Medication not found" });
  }
  res.json(medication);
});

// Service to update the price of a specific medication
app.put('/medication/:id/price', (req, res) => {
  const medicationId = req.params.id;
  const medication = medicationData[medicationId];
  if (!medication) {
    return res.status(404).send({ error: "Medication not found" });
  }
  medication.price = req.body.price;
  res.json({ message: "Price updated successfully" });
});

// Service to update the availability of a specific medication
app.put('/medication/:id/availability', (req, res) => {
  const medicationId = req.params.id;
  const medication = medicationData[medicationId];
  if (!medication) {
    return res.status(404).send({ error: "Medication not found" });
  }
  medication.inStock = req.body.inStock;
  res.json({ message: "Availability updated successfully" });
});

// Serve the HTML file at the root URI
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
