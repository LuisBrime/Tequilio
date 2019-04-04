import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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

class BotellaUrl extends React.Component {
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
        }

        this._onChange = this._onChange.bind(this)
    }

    _onChange() {
        var aux = TequilioStore.getBotella();
        var newState = { ...this.state };
        newState.botella = aux;
        this.setState(newState);
    }

    componentWillMount() {
        TequilioStore.addChangeListenerSku(this._onChange);
        var aux = "";
        if (this.props.match.params.sku) {
            aux = this.props.match.params.sku;
            TequilioActions.getSkuBotellaInsecure(aux);
        }
    }

    componentWillUnmount() {
        TequilioStore.removeChangeListenerSku(this._onChange);
    }

    render() {
        const { classes } = this.props;
        const { botella } = this.state;

        return(
            <main className={classes.content}>
                <div className={classes.toolbar}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={botella.image}
                                title="Botella de tequila"
                            />
                            { botella.marca ?
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
                            :
                            <CardContent>
                                <Typography variant="h6">
                                    EL TEQUILA NO EXISTE O NO FUE BIEN REGISTRADO
                                </Typography>
                            </CardContent>
                            }
                        </CardActionArea>
                    </Card>
                </div>
            </main>
        );
    }
}

BotellaUrl.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(BotellaUrl));