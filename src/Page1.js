import React from 'react';
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
        minWidth: 200
      },
});

class Page1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sort: 'LastName',
            dir: 'asc',
            page: 0,
            rows: 10,
            search: '',
            data: {
                totalRecords: 0,
                users: []
            }            
        }
    }
    
    componentDidMount(){
        this.refreshGrid();
    }

    refreshGrid(){
        fetch('https://react-api.azurewebsites.net/api/users' 
            + '?page=' + (this.state.page + 1)
            + '&rows=' + this.state.rows
            + '&sort=' + this.state.sort
            + '&dir=' + this.state.dir
            + '&search=' + this.state.search, {
            method: 'GET'
        })
        .then(results => {
            return results.json();
        })
        .then(data => {
            this.setState({
                data: data
            });
        });
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
            [event.target.name]: event.target.value
        }, () => this.refreshGrid());
    }
   
    handleChangeRowsPerPage(event){
        this.setState({
            rows: event.target.value,
            page: 0
        }, () => this.refreshGrid());
    }
              
    render(){
        const state = this.state;
        const { classes } = this.props;

        const headCells = [
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
                    rowsPerPageOptions={[2, 5, 10, 25, 50, 100]}
                    component="div"
                    count={state.data.totalRecords}
                    rowsPerPage={state.rows}
                    page={state.page}
                    onChangePage={(event, newPage) => this.handleChangePage(event, newPage)}
                    onChangeRowsPerPage={(event) => this.handleChangeRowsPerPage(event)}
                />
            </Paper>            
        )
    }
}

export default withStyles(styles, { withTheme: true })(Page1)