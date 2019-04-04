import TequilioActions from '../actions/TequilioActions';

var request = require('superagent');

class API {
    getTequileros() {
        request.get('http://localhost:5000/api/tequileros')
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) return console.error(err);

            //console.log(response.body.tequileros);
            var payload = {};
            payload.tequileros = response.body.tequileros;

            TequilioActions.receiveTequileros(payload);
        });
    }

    getTequileroTequilas(tequilero) {
        request.get('http://localhost:5000/api/tequileros/' + tequilero)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) return console.error(err);

            var payload = {};
            payload.tequilas = response.body.tequilas;

            TequilioActions.receiveTequilerosTequilas(payload);
        });
    }

    getBotella(sku, user, pwd) {
        request.get('http://localhost:5000/api/tequileros/tequila/' + sku + '/' + user + '/' + pwd)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) return console.error(err);

            var payload = {};
            payload.botella = response.body.tequila;

            TequilioActions.receiveSkuBotella(payload);
        });
    }

    getBotellaInsecure(sku) {
        request.get('http://localhost:5000/api/tequileros/tequila/' + sku)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) return console.error(err);

            console.log('botella insecure');
            var payload = {};
            payload.botella = response.body.tequila;

            TequilioActions.receiveSkuBotella(payload);
        });
    }

    getHistorial(user, pwd) {
        request.get('http://localhost:5000/api/users/historial/' + user + '/' + pwd)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) return console.error(err);

            var payload = {};
            payload.historial = response.body.historial;

            TequilioActions.receiveHistorial(payload);
        })
    }
}

export default new API();