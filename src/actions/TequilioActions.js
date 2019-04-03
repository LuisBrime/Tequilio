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

    receiveSkuBotella(payload) {
        Dispatcher.dispatch({
            actionType: ActionTypes.API_SKU_RETURN,
            payload: payload
        });
    }
}

export default new TequilioActions();