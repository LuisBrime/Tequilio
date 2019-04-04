import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

import TequilioActions from '../actions/TequilioActions';

import HistorialDisplay from './HistorialDisplay';

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
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
        alignItems: 'center',
    },
    submit: {
        marginTop: 20,
        padding: theme.spacing.unit * 1.5,
        maxWidth: 200,
        display: 'flex',
        margin: 'auto',
    },
});

class MiHistorial extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            pwd: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var newState = { ...this.state };
        switch (event.target.name) {
            case 'user':
                newState.user = event.target.value;
                break;
            case 'pwd':
                newState.pwd = event.target.value;
                break;
            default:
                alert('Stop this');
        }
        this.setState(newState);
    }

    handleSubmit(event) {
        event.preventDefault();
        TequilioActions.getHistorial(this.state.user, this.state.pwd);
    }

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Typography variant="h5" color="inherit" className={classes.title}>
                        Ver tu historial de botellas
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <Typography variant="h6" color="inherit" className={classes.title}>
                            Por favor inicia sesión
                        </Typography>
                        <TextField
                            required
                            id="user"
                            label="Username"
                            className={classes.textField}
                            value={this.state.user}
                            onChange={this.handleChange}
                            name="user"
                        />
                        <TextField
                            required
                            id="pwd"
                            label="Password"
                            type="password"
                            className={classes.textField}
                            value={this.state.pwd}
                            onChange={this.handleChange}
                            name="pwd"
                        />
                        <Button type="submit" variant="contained" color="secondary" className={classes.submit}>
                            Ver Historial
                        </Button>
                    </form>
                    <HistorialDisplay />
                </div>
            </main>
        );
    }
}

MiHistorial.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(MiHistorial));