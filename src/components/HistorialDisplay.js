import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

import TequilioStore from '../stores/TequilioStore';

const styles = theme => ({
    title: {
        textAlign: 'center',
        padding: theme.spacing.unit * 2,
    },
    toolbar: theme.mixins.toolbar,
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasics: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        paddingLeft: theme.spacing.unit * 15,
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

class HistorialDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            historial: [],
            expanded: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    handleChange = panel => (event, expanded) => {
        var newState = { ...this.state };
        newState.expanded = expanded ? panel : false;
        this.setState(newState);
    }

    _onChange() {
        var aux = TequilioStore.getHistorial();
        var newState = { ...this.setState };
        newState.historial = aux;
        this.setState(newState);
    }

    componentWillMount() {
        TequilioStore.addChangeListenerHistorial(this._onChange);
    }

    componentWillUnmount() {
        TequilioStore.removeChangeListenerHistorial(this._onChange);
    }

    render() {
        const { classes } = this.props;
        const { historial } = this.state;

        return(
            <main>
                <div className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        Historial
                    </Typography>
                    {historial.map(botella => (
                        <ExpansionPanel expandIcon={<ExpandMoreIcon/>} key={botella.sku}>
                            <ExpansionPanelSummary>
                                <Typography className={classes.heading}>{botella.sku}</Typography>
                                <Typography className={classes.secondaryHeading}>Comprada en: {botella.doc}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography component="p">
                                    La botella fue comprada en {botella.doc} y fue fabricada en {botella.fc}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                </div>
            </main>
        );
    }
}

HistorialDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(HistorialDisplay));