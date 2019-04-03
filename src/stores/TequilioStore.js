import { EventEmitter } from 'events';
import Dispatcher from '../dispatchers';
import Constants from '../utils';

let botella = {};
let historial = [];
let tequilas = [];
let tequilerosNames = [];

class TequilioStore extends EventEmitter {
    constructor() {
        super();
        Dispatcher.register(this._registerToActions.bind(this));
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case Constants.API_CALL:
                this.apiCall();
                break;
            case Constants.API_TQ_RETURN:
                this.apiTqReturn(action.payload);
                break;
            case Constants.API_TT_RETURN:
                this.apiTtReturn(action.payload);
                break;
            case Constants.API_SKU_RETURN:
                this.apiSkuReturn(action.payload);
                break;
            case Constants.API_HS_RETURN:
                this.apiHsReturn(action.payload);
                break;
            default:
                return true;
        }
    }

    apiCall() {
        console.log('API was called');
    }
    
    apiTqReturn(names) {
        tequilerosNames = names;
        //this.emit(Constants.TEQUILEROS_CHANGE);
    }

    apiTtReturn(data) {
        tequilas = data;
        //this.emit(Constants.TEQUILEROS_CHANGE);
    }

    apiSkuReturn(result) {
        botella = result;
    }

    apiHsReturn(data) {
        historial = data;
    }
}

export default new TequilioStore();