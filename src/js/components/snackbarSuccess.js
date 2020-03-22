import React, { Component } from "react";
import { connect } from "react-redux";
import { snackbarClear } from "../actions/index";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

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
        snackbarSuccessOpen: state.snackbarSuccessOpen,
        snackbarSuccessMessage: state.snackbarSuccessMessage
    };
}

export class ConnectedSuccessSnackbar extends Component{
    render(){
        const { snackbarSuccessOpen, snackbarSuccessMessage } = this.props;
        const { snackbarClear } = this.props;

        return(
            <Snackbar
                open={snackbarSuccessOpen}
                onClose={snackbarClear}
                autoHideDuration={1500}
                TransitionComponent={TransitionLeft} 
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                message={snackbarSuccessMessage}
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
            />
        );
    }
}

const SuccessSnackbar = connect(mapStateToProps, mapDispatchToProps)(ConnectedSuccessSnackbar);

export default SuccessSnackbar;