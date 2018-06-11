
function initAudio(app) {
    app.get('/', renderHome);
}


function renderHome(request, response) {
    response.render('home');
}

module.exports = initAudio;