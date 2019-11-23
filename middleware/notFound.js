// Error handlers

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

// $ curl http://localhost:3000/notfound
// $ curl http://localhost:3000/notfound -H "Accept: application/json"
// $ curl http://localhost:3000/notfound -H "Accept: text/plain"

const notFound = function (req, res, next) {
    res.status(404);

    // res.format({
    //     html: function () {
    //         res.render('404', {url: req.url})
    //     },
    //     json: function () {
    //         res.json({msg: `${req.url} not found`})
    //     },
    //     default: function () {
    //         // res.type('txt').send('Not found')
    //         res.json({msg: `${req.url} not found`})
    //     }
    // })
    // respond with html page
    if (req.accepts('html')) {
        res.render('404', {url: req.url});
        return;
    }
    // respond with json
    if (req.accepts('json')) {
        res.send({message: `${req.url} not found`});
        return;
    }
    // default to plain-text. send()
    res.type('txt').send(`${req.url} not found`);
}

module.exports = notFound
