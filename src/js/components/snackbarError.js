import React, { Component } from "react";
import { connect } from "react-redux";
import { snackbarClear } from "../actions/index";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import MuiAlert from '@material-ui/lab/Alert';

const TransitionLeft = function(props) {
    return <Slide {...props} direction="left" />;
}

function mapDispatchToProps(dispatch){
    return {
        snackbarClear: () => dispatch(snackbarClear())
    };
}
function mapStateToProps(state){
    return {
        snackbarErrorOpen: state.snackbarErrorOpen,
        snackbarErrorMessage: state.snackbarErrorMessage
    };
}

class ConnectedErrorSnackbar extends Component{
    render(){
        const { snackbarErrorOpen, snackbarErrorMessage } = this.props;
        const { snackbarClear } = this.props;

        return(
            <Snackbar
                open={snackbarErrorOpen}
                onClose={snackbarClear}
                autoHideDuration={1500}
                TransitionComponent={TransitionLeft} 
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                
                action={
                    <React.Fragment>                          
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        onClick={snackbarClear}
                      >
                        <CloseIcon />
                      </IconButton>
                    </React.Fragment>
                }
            >
                <MuiAlert onClose={snackbarClear} variant="filled" severity="error">
                    {snackbarErrorMessage}
                </MuiAlert >    
            </Snackbar>
        );
    }
}

const ErrorSnackbar = connect(mapStateToProps, mapDispatchToProps)(ConnectedErrorSnackbar);

export default ErrorSnackbar;