const express = require('express');
const app = express();
const port = process.argv[2] || 4005;

// allow CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE, OPTIONS");
  // Locale.setLocale(req.headers.locale);
  next();
});

app.use((req, res) => {

  console.log(JSON.stringify(req.body));
  res.send('Hello World!');
})

app.get('/payment', (req, res) => {

  const method = req.query.method;
  const result = {
    "method": "wireTransfer",
    "wireTransfer": {
      "bankName": "My Bank",
      "bankAddress": "My Bank's Address",
      "accountName": "My Name",
      "accountNumber": "My Bank Account Number",
      "swiftCode": "ROYCAT",
    },
    "localBank": {
      "bankCode": "812",
      "bankBranchCode": "123",
      "accountName": "My Name",
      "accountNumber": "My Bank Account Number"
    },
    "paxum": {
      "email": "My Paxum email address"
    },
    "erc20": {
      "address": "ERC-20 wallet address"
    }
  };

  return res.json({
    method,
    [method]: result[method]
  });
})

app.put('/payment', (req, res) => {

  const body = req.query.body;
  console.log(JSON.stringify(body));
  return res.status(204).json();
})

const server = app.listen(port, () => {
  console.log(`access api at http://localhost:${server.address().port}`);
});
