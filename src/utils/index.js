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
        var payload = {};
        payload.botella = {
            marca: 'Prueba1',
            description: {
                color: 'azul',
                aroma: 'rico',
                taste: 'fresa',
                text: 'es una cerveza bien buena',
            },
            image: '/utils/TG750_08.png',
            sku: 'skuprueba1',
        };
        TequilioActions.receiveSkuBotella(payload);
        /*
        request.get('http://localhost:5000/api/')
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) return console.error(err);

            var payload = {};

            TequilioActions.receiveSkuBotella(payload);
        })*/
    }
}

export default new API();