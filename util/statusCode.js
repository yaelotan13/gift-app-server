const information = {
    continue: 100,
    switchingProtocols: 101
};

const successful = {
    ok: 200,
    created: 201,
    accepted: 202
};

const redirection = {
    movedPermanetly: 301
};

const clientError = {
    badReques: 400,
    unauthorized: 401, 
    notFound: 404
};

const serverError = {
    internalServerError: 500, 
    serviceUnavailable: 503
};

module.exports = {
    information, 
    successful,
    redirection,
    clientError,
    serverError
}