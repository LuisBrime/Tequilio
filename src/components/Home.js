import React from 'react';
import PropTypes from 'prop-types';
import { autoPlay } from 'react-swipeable-views-utils';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const drawerWidth = 240;
const steps = [
    {
        label: 'Tres Generaciones Plata',
        imgPath: 'https://www.tresgeneraciones.com/sites/default/files/2018-04/TG750_09.png',
    },
    {
        label: 'Tres Generaciones Reposado',
        imgPath: 'https://www.tresgeneraciones.com/sites/default/files/2018-04/TG750_08.png',
    },
    {
        label: 'Tres Generaciones Añejo',
        imgPath: 'https://www.tresgeneraciones.com/sites/default/files/2018-04/TG750_10.png',
    }
]

const styles = theme => ({
    title: {
        textAlign: 'center',
        padding: theme.spacing.unit * 3,
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
    header: {
        margin: 'auto',
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing.unit * 25,
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 505,
        display: 'block',
        maxWidth: 300,
        overflow: 'hidden',
        width: '100%',
        margin: 'auto', 
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
        };
    }

    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }))
    };

    handleStepChange = activeStep => {
        this.setState({ activeStep });
    };

    render() {
        const { classes, theme } = this.props;
        const { activeStep } = this.state;
        const maxSteps = steps.length;

        return (
            <main className={classes.content}>
                <div className={classes.toolbar}>
                <Typography className={classes.title} variant="h3" color="inherit">
                    Tequila Tres Generaciones
                </Typography>
                <Typography variant="h5" color="inherit" className={classes.title}>
                    Welcome to Tequilio.
                </Typography>
                <Typography paragraph>
                    Busca tu botella de tequila a través de su código SKU para tener la seguridad de que tienes una botella original,
                    verifica su información, descripción, fecha de producción y de compra y verifica que tu botella no es una copia.
                    Gracias a la tecnología de Blockchain, toda tu información de compra será inmutable y siempre estará grabada la validez
                    de tu botella. Disfruta tu tequila.
                </Typography>
                <Paper square elevation={0} className={classes.header}>
                    <Typography>{steps[activeStep].label}</Typography>
                </Paper>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={this.handleStepChange}
                    enableMouseEvents
                >
                    {steps.map((step, index) => (
                        <div key={step.label}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <img className={classes.img} src={step.imgPath} alt={step.label} />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    className={classes.mobileStepper}
                    nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                        </Button>
                    }
                />
                </div>
            </main>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles, { withTheme: true })(Home));