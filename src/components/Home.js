import React, { Component } from 'react';
import './../App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Spinner from './loaders/Spinner';
import Linear from './loaders/Linear';
import { MyServices } from '../service/service';
import { ModalForDetails } from './ModalForDetails';
import TablePaginationActions from './pagination/TablePaginationActions'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            dataReceived: [],
            test: 90,
            page: 0,
            rowsPerPage: 10,
            loadingDetails: false,
            selectedRow: -1,
            selectedRowDetails: '',
            showModelForShowingRowDetails: false
        }
    }

    rows = () => {
        var dataArray = [];
        if (this.state.dataReceived.length !== 0) {
            this.state.dataReceived.forEach((item) => {
                dataArray.push({
                    name: item.item.name,
                    cost: item.item.cost,
                    description: item.item.description,
                    rating: item.item.ratings.avgStars,
                    key: item.itemId,
                    image: item.item.images.icon,
                })

            })
        }
        return dataArray;
    }

    handleChangePage(event, newPage) {
        this.setState({
            ...this.state,
            page: newPage
        })
    }

    handleChangeRowsPerPage(event) {
        this.setState({
            ...this.state,
            rowsPerPage: parseInt(event.target.value, 10)
        })
    }



    componentDidMount = () => {
        this.props.authenticate(localStorage.getItem('token'));
        this.props.settingTitle('Marvel Creatures');
        MyServices.fetchAllOutfits()
            .then(json => {
                this.setState({
                    isLoaded: true,
                    dataReceived: json.data.data
                })
            })
            .catch((err) => {
                this.setState({
                    ...this.state,
                    isLoaded: false
                })
            });
        // console.log("state", this.state);
    }

    clickToOpenModalForDetails = (data, event) => {
        this.setState({
            ...this.state,
            selectedRow: data,
            loadingDetails: true
        })
        MyServices.fetchSingleOutFitDetails(data)
            .then((response) => {
                console.log("response", response)
                this.setState({
                    ...this.state,
                    loadingDetails: false,
                    selectedRowDetails: response.data.data,
                })
                this.setState({
                    ...this.state,
                    showModelForShowingRowDetails: true
                })
            })
            .catch((err) => {
                this.setState({
                    ...this.state,
                    loadingDetails: false,
                    showModelForShowingRowDetails: false
                })
            })
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            showModelForShowingRowDetails: false
        })
    }


    render() {
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.rows().length - this.state.page * this.state.rowsPerPage);
        return (
            <div>

                <Paper style={{ margin: 10 }} >
                    {(this.state.dataReceived.length > 0) ?
                        <div>
                            {this.state.loadingDetails ? <Linear /> : <div className="emptyDataLiner"> </div>}
                            <Table>
                                <TableHead>
                                    <TableRow >
                                        <TableCell style={{ width: '25%' }}>Name</TableCell>
                                        <TableCell style={{ width: '25%' }} >Cost</TableCell>
                                        <TableCell style={{ width: '25%' }}>Rating</TableCell>
                                        <TableCell style={{ width: '25%' }} align="right" >Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.rows().slice(this.state.page * this.state.rowsPerPage,
                                        this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => (
                                            <TableRow key={row.key} style={{ cursor: 'pointer' }} onClick={this.clickToOpenModalForDetails.bind(this, row.key)}>
                                                <TableCell style={{ width: '25%' }} component="th">{row.name}</TableCell>
                                                <TableCell style={{ width: '25%' }}>{row.cost}</TableCell>
                                                <TableCell style={{ width: '25%' }} >{row.rating}</TableCell>
                                                <TableCell style={{ width: '25%' }} align="right" >{row.description}</TableCell>
                                            </TableRow>
                                        ))}

                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 48 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[10, 15, 20, 25]}
                                            colSpan={3}
                                            count={this.rows().length}
                                            rowsPerPage={this.state.rowsPerPage}
                                            page={this.state.page}
                                            SelectProps={{
                                                inputProps: { 'aria-label': 'Rows per page' },
                                                native: true,
                                            }}
                                            onChangePage={this.handleChangePage.bind(this)}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>


                            </Table></div>
                        :
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                            <Spinner />
                        </div>

                    }
                </Paper>
                {this.state.showModelForShowingRowDetails ?
                    <ModalForDetails rowId={this.state.selectedRow}
                        selectedRowDetails={this.state.selectedRowDetails} openModel={this.state.showModelForShowingRowDetails}
                        handleClose={this.handleClose.bind(this)} />
                    : ''}

            </div>

        )
    }
}

export default Home;