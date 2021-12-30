const express = require('express');
const app = express();

app.get('/get-settings', (req, res) => {
    var settings = {
        blockSize: 20
    }
    res.send(JSON.stringify(settings));
});

app.listen(4000, () => {
    console.log('Express server running on port 4000')
});