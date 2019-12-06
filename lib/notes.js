module.exports = (app, db) => {
    const noteList = [{
        'id': 12414124,
        'date': "12/6/2019",
        'name': 'test note',
        'user': 'user'
    }];

    app.get('/notes', (req, res) => {
        res.end(JSON.stringify(noteList));
    })
};