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
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

class Botellas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tequilera: TequilioStore.getTequilera(),
            tequilas: [],
            expanded: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onChangeBotellas = this._onChangeBotellas.bind(this);
    }

    handleChange = panel => (event, expanded) => {
        var newState = { ...this.state };
        newState.expanded = expanded ? panel : false;
        this.setState(newState);
    };

    _onChange() {
        var aux = TequilioStore.getTequilera();
        var newState = { ...this.state };
        newState.tequilera = aux;
        this.setState(newState);
    }

    _onChangeBotellas() {
        var aux = TequilioStore.getTequilas();
        const newState = { ...this.state };
        newState.tequilas = aux;
        this.setState(newState);
    }

    componentWillMount() {
        TequilioStore.addChangeListenerTequilera(this._onChange);
        TequilioStore.addChangeListenerBotellas(this._onChangeBotellas);
    }

    componentWillUnmount() {
        TequilioStore.removeChangeListenerTequilera(this._onChange);
        TequilioStore.removeChangeListenerBotellas(this._onChangeBotellas);
    }

    render() {
        const { classes } = this.props;
        const { tequilera, expanded, tequilas } = this.state;

        return (
            <main>
                <div className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        {tequilera}
                    </Typography>
                    {tequilas.map(tequila => (
                        <ExpansionPanel key={tequila.marca} expanded={expanded === tequila.marca} onChange={this.handleChange(tequila.marca)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography className={classes.heading}>{tequila.marca}</Typography>
                                <Typography className={classes.secondaryHeading}>{tequila.description.color}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>Color: {tequila.description.color}</Typography>
                                <Typography>Aroma: {tequila.description.aroma}</Typography>
                                <Typography>Taste: {tequila.description.taste}</Typography>
                                <Typography>Descripcion: {tequila.description.text}</Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                </div>
            </main>
        );
    }
}

Botellas.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Botellas));