import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
    card: {
        padding: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 7,
        display: 'flex',
        margin: 'auto',
        maxWidth: 345,
        minHeight: 500,
    },
    media: {
        height: 300,
    },
});

class Botella extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            botella: {
                marca: '',
                description: {
                    color: '',
                    aroma: '',
                    taste: '',
                    text: '',
                },
                image: '',
                sku: '',
            },
        };

        this._onChange = this._onChange.bind(this);
    }

    _onChange() {
        var aux = TequilioStore.getBotella();
        const newState = { ...this.state };
        newState.botella = aux;
        this.setState(newState);
    }

    componentWillMount() {
        TequilioStore.addChangeListenerSku(this._onChange);
    }

    componentWillUnmount() {
        TequilioStore.removeChangeListenerSku(this._onChange);
    }

    render() {
        const { classes } = this.props;
        const { botella } = this.state;

        return (
            <main>
                <div className={classes.toolbar}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={botella.image}
                            title="Botella de tequila"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {botella.marca}
                                </Typography>
                                <Typography component="p">
                                    Descripción de la botella: Tiene un color {botella.description.color}, 
                                    un aroma {botella.description.aroma}, un sabor {botella.description.taste}.
                                    {botella.description.text}
                                    SKU: {botella.sku}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </main>
        );
    }
}

Botella.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Botella));