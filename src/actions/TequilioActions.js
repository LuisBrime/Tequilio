import Dispatcher from '../dispatchers';
import ActionTypes from '../constants';
import API from '../utils/index';

class TequilioActions {
    getTequileros() {
        Dispatcher.dispatch({
            actionType: ActionTypes.API_CALL
        });

        API.getTequileros();
    }

    receiveTequileros(payload) {
        Dispatcher.dispatch({
            actionType: ActionTypes.API_TQ_RETURN,
            payload: payload
        });
    }

    changeTequilera(newTequilera) {
        Dispatcher.dispatch({
            actionType: ActionTypes.CHANGE_TEQUILERA,
            payload: newTequilera
        });
    }

    getTequileroTequilas(tequilero) {
        Dispatcher.dispatch({
            actionType: ActionTypes.API_CALL
        });

        API.getTequileroTequilas(tequilero);
    }

    receiveTequilerosTequilas(payload) {
        Dispatcher.dispatch({
            actionType: ActionTypes.API_TT_RETURN,
            payload: payload
        });
    }

    getSkuBotella(sku, user, pwd) {
        Dispatcher.dispatch({
            actionType: ActionTypes.API_CALL
        });

        API.getBotella(sku, user, pwd);
    }

    getSkuBotellaInsecure(sku) {
        Dispatcher.dispatch({
            actionType: ActionTypes.API_CALL
        });

        API.getBotellaInsecure(sku);
    }

    receiveSkuBotella(payload) {
        Dispatcher.dispatch({
            actionType: ActionTypes.API_SKU_RETURN,
            payload: payload
        });
    }

    getHistorial(user, pwd) {
        Dispatcher.dispatch({
            actionType: ActionTypes.API_CALL
        });

        API.getHistorial(user, pwd);
    }

    receiveHistorial(payload) {
        Dispatcher.dispatch({
            actionType: ActionTypes.API_HS_RETURN,
            payload: payload
        });
    }
}

export default new TequilioActions();