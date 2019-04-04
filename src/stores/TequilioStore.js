import { EventEmitter } from 'events';
import Dispatcher from '../dispatchers';
import Constants from '../utils';

let botella = {};
let historial = [];

let tequilerosNames = [];
let tequilera = '';
let tequilas = [];

class TequilioStore extends EventEmitter {
    constructor() {
        super();
        Dispatcher.register(this._registerToActions.bind(this));
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case 'API_CALL':
                this.apiCall();
                break;
            case 'API_TQ_RETURN':
                this.apiTqReturn(action.payload);
                break;
            case 'API_TT_RETURN':
                this.apiTtReturn(action.payload);
                break;
            case 'API_SKU_RETURN':
                this.apiSkuReturn(action.payload);
                break;
            case 'API_HS_RETURN':
                this.apiHsReturn(action.payload);
                break;
            case 'CHANGE_TEQUILERA':
                this.changeTequilera(action.payload);
                break;
            default:
                return true;
        }
    }

    apiCall() {
        console.log('API was called');
    }
    
    apiTqReturn(payload) {
        console.log('API TQ Returned');
        tequilerosNames = payload.tequileros;
        this.emit(Constants.TEQUILEROS_CHANGE);
    }

    getTequilerosNames() {
        return tequilerosNames;
    }

    changeTequilera(newTequilera) {
        console.log('Change Tequilera');
        tequilera = newTequilera;
        this.emit(Constants.TEQUILERA_CHANGE);
    }

    getTequilera() {
        return tequilera;
    }

    apiTtReturn(data) {
        console.log('API TT Returned');
        tequilas = data.tequilas;
        this.emit(Constants.BOTELLAS_CHANGE);
    }

    getTequilas() {
        return tequilas;
    }

    apiSkuReturn(result) {
        botella = result.botella;
        this.emit(Constants.ONE_BOTELLA_CHANGE);
    }
    
    getBotella() {
        return botella;
    }

    apiHsReturn(data) {
        historial = data.historial;
        this.emit(Constants.HISTORIAL_CHANGE);
    }

    getHistorial() {
        return historial;
    }

    addChangeListenerTequileros(callback) {
        this.on(Constants.TEQUILEROS_CHANGE, callback);
    }

    removeChangeListenerTequileros(callback) {
        this.removeListener(Constants.TEQUILEROS_CHANGE, callback);
    }

    addChangeListenerTequilera(callback) {
        this.on(Constants.TEQUILERA_CHANGE, callback);
    }

    removeChangeListenerTequilera(callback) {
        this.removeListener(Constants.TEQUILERA_CHANGE, callback);
    }

    addChangeListenerBotellas(callback) {
        this.on(Constants.BOTELLAS_CHANGE, callback);
    }

    removeChangeListenerBotellas(callback) {
        this.removeListener(Constants.BOTELLAS_CHANGE, callback);
    }

    addChangeListenerSku(callback) {
        this.on(Constants.ONE_BOTELLA_CHANGE, callback);
    }

    removeChangeListenerSku(callback) {
        this.removeListener(Constants.ONE_BOTELLA_CHANGE, callback);
    }

    addChangeListenerHistorial(callback) {
        this.on(Constants.HISTORIAL_CHANGE, callback);
    }

    removeChangeListenerHistorial(callback) {
        this.removeListener(Constants.HISTORIAL_CHANGE, callback);
    }
}

export default new TequilioStore();