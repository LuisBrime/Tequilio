import TequilioActions from '../actions/TequilioActions';

var request = require('superagent');

class API {
    getTequileros() {
        request.get('localhost:5000/api/tequileros')
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) return console.error(err);

            console.log(response.body);
            var payload = {};
            payload.tequileros = response.body.tequileros;

            //TequilioActions.receiveTequileros(payload);
        });
    }

    getTequileroTequilas(tequilero) {
        request.get('localhost:5000/api/tequileros/' + tequilero)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) return console.error(err);

            console.log(response.body);
            var payload = {};
            payload.tequilas = response.body.tequilas;

            TequilioActions.receiveTequilerosTequilas(payload);
        });
    }
}

export default new API();