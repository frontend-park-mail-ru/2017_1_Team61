
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

// app.use(express.logger());
app.use(express.static(`${__dirname}`));

app.get('/tests', (req, res) => {
  res.sendFile(`${__dirname}/static/tests.html`);
});

app.get('/r/', (req, res) => {
  res.sendFile(`${__dirname}/static/router.html`);
});

app.get('^[^.]+$|\.(?!\w{2.4})', (req, res) => {
  res.sendFile(`${__dirname}/static/index.html`);
});


app.listen(port, () => {
  console.log(`Listen port: ${port} !`);
});
