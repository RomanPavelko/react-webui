import React from 'react';
import fetchFromApi from './js/helpers/fetch';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchRounded from '@material-ui/icons/SearchRounded';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Slide from '@material-ui/core/Slide';
import { connect } from "react-redux";
import { showSnackbarSuccess, showSnackbarError, progressbarShow, progressbarClear } from "./js/actions/index";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
function mapDispatchToProps(dispatch) {
    return {
        showSnackbarSuccess: message => dispatch(showSnackbarSuccess({message})),
        showSnackbarError: message => dispatch(showSnackbarError({message})),
        progressbarShow: () => dispatch(progressbarShow()),
        progressbarClear: () => dispatch(progressbarClear())
    };
}

const styles = theme => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    search: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
        width: '30vw',
        minWidth: 150
      },
    addIcon: {
        position: "absolute",
        right: 14,
        top: 20
    }
});

class ConnectedPage1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            apiUrl: 'http://localhost:5000',
            sort: 'LastName',
            dir: 'asc',
            page: 0,
            rows: 8,
            search: '',
            data: {
                totalRecords: 0,
                users: []
            },
            dialog: {
                open: false,
                type: 1, //1 - add. 2 - edit
                title: 'Add Record',
                id: 0, firstName: '', lastName: '', address: '', city: '', zip: '', phone: '', email: '',
                validation: { firstName: '', lastName: '', address: '', city: '', zip: '', phone: '', email: ''}
            },
            deleteDialog: {
                open: false,
                id: 0
            }
        }
    }
    
    componentDidMount(){
        this.refreshGrid();
    }

    refreshGrid(){        
        fetchFromApi({url: (this.state.apiUrl 
            + '/api/users'
            + '?page='
            + (this.state.page + 1)
            + '&rows=' + this.state.rows
            + '&sort=' + this.state.sort
            + '&dir=' + this.state.dir
            + '&search=' + this.state.search)
            , method: 'GET'})
        .then(rData => {
            this.setState({
                data : rData
            });
        });
    }

    handleLoading(value){
        if(value){
            this.props.progressbarShow();
        }
        else{
            this.props.progressbarClear();
        }
    }

    handleSort(id){
        let sort = this.state.sort;
        let dir = this.state.dir;

        if(sort === id){
            dir = dir === 'asc' ? 'desc' : 'asc';
        }
        else{
            sort = id;
            dir = 'asc';
        }

        this.setState({
            sort: sort,
            dir: dir
        }, () => this.refreshGrid());
    }

    handleChangePage(event, newPage){
        this.setState({ page: newPage }, () => this.refreshGrid());
    }

    handleSearch(event){
        this.setState({
            [event.target.name]: event.target.value,
            page: 0
        }, () => this.refreshGrid());
    }
   
    handleChangeRowsPerPage(event){
        this.setState({
            rows: event.target.value,
            page: 0
        }, () => this.refreshGrid());
    }

    handleDialog(show, type, row){
        let dialog = this.state.dialog;
        dialog.open = show;

        dialog.type = type ?? 1;
        dialog.title = (dialog.type === 1 ? 'Add' : 'Edit') + ' Record';

        dialog.id = row?.id ?? 0;
        dialog.firstName = row?.firstName ?? '';
        dialog.lastName = row?.lastName ?? '';
        dialog.address = row?.address ?? '';
        dialog.city = row?.city ?? '';
        dialog.zip = row?.zip ?? '';
        dialog.phone = row?.phone ?? '';
        dialog.email = row?.email ?? '';
        dialog.validation = { firstName: '', lastName: '', address: '', city: '', zip: '', phone: '', email: ''};

        this.setState({
            dialog: dialog
        });
    }

    handleDeleteDialog(show, id){
        let deleteDialog = this.state.deleteDialog;
        deleteDialog.open = show;
        deleteDialog.id = id ?? 0;

        this.setState({
            deleteDialog: deleteDialog
        });
    }

    handleDialogChange(event){
        let dialog = this.state.dialog; 
        dialog[event.target.name] = event.target.value; 
        this.setState( { dialog: dialog });
    }

    handleSave(){
        const { dialog } = this.state;
        
        fetchFromApi({ url: this.state.apiUrl + '/api/user', method: dialog.type === 1 ? 'POST' : 'PUT', data: dialog })
            .then(rData => {
                if(rData){
                    let dialog = this.state.dialog;
                    dialog.validation = rData;
                    this.setState( { dialog: dialog });
                    this.props.showSnackbarError('Save Failed!');
                }
                else{
                    this.refreshGrid();
                    this.props.showSnackbarSuccess('Saved!');
                    this.handleDialog(false);
                }
            });
    }

    handleDelete(){

        fetchFromApi({ url: this.state.apiUrl + '/api/user?id=' + this.state.deleteDialog.id, method: 'DELETE' })
            .then(data => {
                this.refreshGrid();
                this.props.showSnackbarSuccess('Deleted!');
        });

        this.handleDeleteDialog(false);
    }
              
    render(){
        const state = this.state;
        const { classes } = this.props;

        const headCells = [
            { id: 'Actions', label: '', align: 'left' },
            { id: 'FirstName', label: 'First Name', align: 'left' },
            { id: 'LastName', label: 'Last Name', align: 'left' },
            { id: 'Address', label: 'Address', align: 'right' },
            { id: 'City', label: 'City', align: 'right' },
            { id: 'Zip', label: 'Zip', align: 'right' },
            { id: 'Phone', label: 'Phone', align: 'right' },
            { id: 'Email', label: 'Email', align: 'right' },
          ];

        return(
            <Paper className={classes.paper}>
                <Toolbar>
                    <FormControl className={classes.search}>                        
                        <InputLabel htmlFor="input-search">Search</InputLabel>
                        <Input id="input-search" name="search" onChange={(event) => this.handleSearch(event)} startAdornment={
                            <InputAdornment position="start">
                                <SearchRounded />
                            </InputAdornment>
                        } />
                    </FormControl>
                    <div className={classes.addIcon}>
                        <IconButton  onClick={() => this.handleDialog(true, 1)} aria-label="add">
                            <AddIcon fontSize="large" />
                        </IconButton>
                    </div>
                        
                </Toolbar>
                <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        {
                            headCells.map(headCell => (
                                <TableCell 
                                    key={headCell.id}
                                    align={headCell.align} 
                                    sortDirection={state.sort === headCell.id ? state.dir : false}
                                >
                                    <TableSortLabel
                                        active={state.sort === headCell.id}
                                        direction={state.sort === headCell.id ? state.dir : 'asc' }
                                        onClick={() => this.handleSort(headCell.id)}    
                                    >
                                        {headCell.label}
                                        {
                                            state.sort === headCell.id ? (
                                                <span className={classes.visuallyHidden}>
                                                    {state.dir === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </span>
                                            ) : null
                                        }
                                    </TableSortLabel>
                                </TableCell>
                            ))   
                        }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.data.users.map(row => (
                            <TableRow key={row.id} hover>
                            <TableCell>
                                <IconButton onClick={() => this.handleDialog(true, 2, row)} aria-label="edit">
                                    <EditOutlinedIcon />
                                </IconButton>
                                <IconButton onClick={() => this.handleDeleteDialog(true, row.id)} aria-label="delete" >
                                    <DeleteForeverOutlinedIcon />
                                </IconButton>
                            </TableCell>    
                            <TableCell>{row.firstName}</TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell align="right">{row.address}</TableCell>
                            <TableCell align="right">{row.city}</TableCell>
                            <TableCell align="right">{row.zip}</TableCell>
                            <TableCell align="right">{row.phone}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 8, 12, 25, 50, 100]}
                    component="div"
                    count={state.data.totalRecords}
                    rowsPerPage={state.rows}
                    page={state.page}
                    onChangePage={(event, newPage) => this.handleChangePage(event, newPage)}
                    onChangeRowsPerPage={(event) => this.handleChangeRowsPerPage(event)}
                />
                <Dialog keepMounted open={state.dialog.open} onClose={() => this.handleDialog(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        {state.dialog.title}
                    </DialogTitle>
                    <DialogContent>
                        <TextField label="First Name" name="firstName" margin="dense" value={state.dialog.firstName} onChange={(e) => { this.handleDialogChange(e) }} fullWidth autoFocus error={(state.dialog.validation.firstName ?? '') !== ''} helperText={state.dialog.validation.firstName} />
                        <TextField label="Last Name" name="lastName" margin="dense" value={state.dialog.lastName} onChange={(e) => { this.handleDialogChange(e) }} fullWidth error={(state.dialog.validation.lastName ?? '') !== ''} helperText={state.dialog.validation.lastName} />
                        <TextField label="Address" name="address" margin="dense" value={state.dialog.address} onChange={(e) => { this.handleDialogChange(e) }} fullWidth error={(state.dialog.validation.address ?? '') !== ''} helperText={state.dialog.validation.address} />
                        <TextField label="City" name="city" margin="dense" value={state.dialog.city} onChange={(e) => { this.handleDialogChange(e) }} fullWidth error={(state.dialog.validation.city ?? '') !== ''} helperText={state.dialog.validation.city} />
                        <TextField label="Zip" name="zip" margin="dense" value={state.dialog.zip} onChange={(e) => { this.handleDialogChange(e) }} fullWidth error={(state.dialog.validation.zip ?? '') !== ''} helperText={state.dialog.validation.zip} />
                        <TextField label="Phone" name="phone" margin="dense" value={state.dialog.phone} onChange={(e) => { this.handleDialogChange(e) }} fullWidth error={(state.dialog.validation.phone ?? '') !== ''} helperText={state.dialog.validation.phone} />
                        <TextField label="Email" name="email" margin="dense" value={state.dialog.email} onChange={(e) => { this.handleDialogChange(e) }} fullWidth error={(state.dialog.validation.email ?? '') !== ''} helperText={state.dialog.validation.email} />                            
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleSave()} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={state.deleteDialog.open} TransitionComponent={Transition} onClose={() => this.handleDeleteDialog(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle>
                        Are you sure want to delete this user?
                     </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.handleDeleteDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleDelete()} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>            
        )
    }
}

const Page1 = connect(null, mapDispatchToProps)(ConnectedPage1);

export default withStyles(styles, { withTheme: true })(Page1)