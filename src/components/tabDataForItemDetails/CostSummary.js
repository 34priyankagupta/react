import React, { Component } from 'react';
import './../../App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from './../pagination/TablePaginationActions'

export class CostSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 3,
        }
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

    render() {
        return (
            <Paper style={{ backgroundColor: '#f9f8f8' }}>
                <Table>
                    <TableHead>
                        <TableRow style={{ display: 'flex' }} >
                            <TableCell style={{ width: '33%' }} >Date</TableCell>
                            <TableCell style={{ width: '33%' }}>Cost</TableCell>
                            <TableCell style={{ width: '33%' }}>Featured</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.props.costSum.slice(this.state.page * this.state.rowsPerPage,
                            this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow key={index} style={{ display: 'flex' }} >
                                        <TableCell component="th" style={{ width: '33%' }}>{row.date}</TableCell>
                                        <TableCell style={{ width: '33%' }}>{row.cost}</TableCell>
                                        <TableCell style={{ width: '33%' }}>{row.featured.toString()}</TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[3, 5, 8, 10]}
                                colSpan={5}
                                count={this.props.costSum.length}
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
                </Table>
            </Paper>
        )
    }
}