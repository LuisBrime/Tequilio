import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import TequilioActions from '../actions/TequilioActions';
import TequilioStore from '../stores/TequilioStore';
import Botellas from './Botellas';

const drawerWidth = 240;

const styles = theme => ({
    title: {
        textAlign: 'center',
        padding: theme.spacing.unit * 2,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 8,
        alignItems: 'center',
        alignText: 'center',
        marginLeft: `${drawerWidth}px`,
    },
    textField: {
        display: 'flex',
        width: '50%',
        margin: 'auto',
    },
    menu: {
        width: 400,
    },
});

class Tequileras extends React.Component {
    constructor(props) {
        super(props);
        TequilioActions.getTequileros();

        this.state = {
            tequileros: [],
            tequilera: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    handleChange(event) {
        const newState = { ...this.state };
        newState.tequilera = event.target.value;
        TequilioActions.changeTequilera(event.target.value);
        TequilioActions.getTequileroTequilas(event.target.value);
        this.setState(newState);
    };

    _onChange() {
        var aux = TequilioStore.getTequilerosNames();
        const newState = { ...this.state };
        newState.tequileros = aux;
        this.setState(newState);
    }

    componentWillMount() {
        TequilioStore.addChangeListenerTequileros(this._onChange);
    }

    componentWillUnmount() {
        TequilioStore.removeChangeListenerTequileros(this._onChange);
    }

    render() {
        const { classes } = this.props;
        const { tequileros } = this.state;

        return (
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Typography variant="h5" color="inherit" className={classes.title}>
                        Ver tequileras
                    </Typography>
                    <TextField
                        id="outlined-select-tequileras"
                        select
                        label="Select"
                        className={classes.textField}
                        value={this.state.tequilera}
                        onChange={this.handleChange}
                        SelectProps={{ MenuProps: { className: classes.menu, }, }}
                        helperText="Selecciona Tequilera"
                        variant="outlined"
                    >
                        {tequileros.map(value => (
                            <MenuItem key={value} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Botellas/>
                </div>
            </main>
        );
    }
}

Tequileras.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Tequileras));