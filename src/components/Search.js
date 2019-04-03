import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

import TequilioActions from '../actions/TequilioActions';
import TequilioStore from '../stores/TequilioStore';

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
});

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sku: '',
        };
    }

    handleChange(event) {
        const newState = { ...this.state };
        newState.sku = event.target.value;
        this.setState(newState); 
    }

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Typography variant="h5" color="inherit" className={classes.title}>
                        Buscar botella por SKU
                    </Typography>
                    <TextField
                        id="search"
                        label="Search field"
                        type="search"
                        value={this.state.sku}
                        onChange={this.handleChange}
                        className={classes.textField}
                    />
                </div>
            </main>
        );
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Search));