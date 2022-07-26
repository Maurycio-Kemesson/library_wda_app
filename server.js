const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(`${__dirname}/dist/library-wdaapp`));

app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/library-wdaapp/index.html`));
});

app.listen(process.env.PORT || 8080);
