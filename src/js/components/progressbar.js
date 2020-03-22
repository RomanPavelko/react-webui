import React, { Component } from "react";
import { connect } from "react-redux";
import { Fade, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    loading: {
        position: 'absolute',
        left: '50%',
        top: '10%'
    }
});

function mapStateToProps(state){
    return {
        progressbarOpen: state.progressbarOpen
    };
}

export class ConnectedProgressbar extends Component{
    render(){
        const { progressbarOpen, classes } = this.props;

        return(
            <Fade 
                in={progressbarOpen}  
                className={classes.loading}
                style={{transitionDelay: progressbarOpen ? '800ms' : '0ms'}} 
                unmountOnExit
            >                        
                <CircularProgress />
            </Fade>
        );
    }
    
}

const Progressbar = connect(mapStateToProps, null)(ConnectedProgressbar);

export default withStyles(styles, { withTheme: true })(Progressbar)