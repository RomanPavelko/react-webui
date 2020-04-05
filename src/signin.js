import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Button, Typography  } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import fetchFromApi from './js/helpers/fetch';
import { API_URL } from './js/constants/urls';

const styles = theme => ({
    leftAlignDialogActions: {
        justifyContent: 'center',
        marginTop: '20px',
        marginBottom: '20px',
    },
    error: {
        width: '100%',
        color: 'white',
        backgroundColor: '#f44336',
        textAlign: 'center',
        padding: '15px'
    }
});

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: {
                userName: '',
                password: ''
            },
            validation: {
                userName: '',
                password: '',
                general: ''
            }
        };
    }

    onChange(e) {
        let { user, validation } = this.state;
        user[e.target.name] = e.target.value;

        if(e.target.name === 'userName') {
            validation.userName = e.target.value === '' ? 'User Name must not be empty' : '';
        } else {
            validation.password = e.target.value === '' ? 'Password must not be empty' : '';
        }
        validation.general = '';
        
        this.setState({ user: user, validation: validation });
    }

    continue() {
        fetchFromApi({ url: API_URL + '/api/auth', method: 'POST', data: this.state.user })
        .then(rData => {
            if(rData.jwtToken) {
                this.props.auth.signIn(rData);
                this.props.history.push('/');
            } else {
                let validation = this.state.validation;
                validation.general = rData;
                this.setState({ validation: validation });
            }
        });
    }

    render(){
        const { validation } = this.state;
        const { classes } = this.props;

        return(
            <div>
                <Dialog open={true}>
                    <DialogTitle>
                        Sign In (u:test@test.com&nbsp;p:0000)
                    </DialogTitle>
                    <DialogContent>
                        <TextField 
                            label="User Name" 
                            name="userName" 
                            margin="dense" 
                            onChange={(e) => { this.onChange(e) }} 
                            fullWidth autoFocus 
                            error={(validation.userName ?? '') !== ''} 
                            helperText={validation.userName} 
                        />
                        <TextField 
                            label="Password" 
                            name="password" 
                            margin="dense"
                            type="password" 
                            onChange={(e) => { this.onChange(e) }} 
                            fullWidth 
                            error={(validation.password ?? '') !== ''} 
                            helperText={validation.password} 
                        />
                    </DialogContent>
                    <DialogActions className={classes.leftAlignDialogActions}>
                        <Button 
                            onClick={() => this.continue()}  
                            color="default"
                            variant="outlined"
                            disableElevation
                        >
                            Continue
                        </Button>
                    </DialogActions>
                        {validation.general !== '' 
                            ?
                                <Typography className={classes.error}>
                                    {validation.general}
                                </Typography>
                            :   '' 
                        }
                        
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(SignIn)