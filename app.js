// require modules
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist/bitsy-frontend'));

app.get('/admin', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/bitsy-frontend/index.html'));
});


// Error handlor
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        status: error.status,
        message: error.message
    })
})

module.exports = app;