import React, { Component } from 'react';
import './../../App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ContactListNumber from './ContactListNumber';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ContactAdd from './ContactAdd';
import TablePaginationActions from '../pagination/TablePaginationActions';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';


class ContactTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactData: {
                id: 0,
                phone: '',
                mobile: '',
                email: ''
            },
            showUpdateInputBox: false,
            destinedId: -1,
            updateWithTheseValues: {
                phone: '',
                mobile: '',
                email: ''
            },
            page: 0,
            rowsPerPage: 2

        }

        if ((window.localStorage.getItem('contactdata') !== null || undefined) || (window.localStorage.getItem('contactdata').length === 0)) {
            this.state.totalContacts = JSON.parse(window.localStorage.getItem('contactdata'));
            console.log("main", this.state);
        } else {
            this.state = {
                ...this.state,
                totalContacts: [
                    { id: 1, phone: '+6120 67654532', mobile: '9876543211', email: 'priviasy@gmail.com' },
                    { id: 2, phone: '+6120 90654532', mobile: '7777543211', email: 'qwertyqsy@gmail.com' },
                    { id: 3, phone: '+6120 43654532', mobile: '6767543211', email: 'wissuyi@gmail.com' },
                    { id: 4, phone: '+6120 32654532', mobile: '3434543211', email: 'mangsuke@gmail.com' },
                ]

            }
            console.log("else", this.state);
            window.localStorage.setItem('contactdata', JSON.stringify(this.state.totalContacts));
        }



    }

    componentDidMount() {
        this.props.authenticate(localStorage.getItem('token'));
        this.props.settingTitle('Contact Details');
    }

    /* Adding new data about contact info in the table */
    submitDataForTable = (e) => {
        this.setState((state) => {
            if (this.state.totalContacts.length !== 0) {
                this.state.contactData.id = Math.max.apply(Math, this.state.totalContacts.map(function (o) { return o.id; })) + 1;
            } else {
                this.state.contactData.id = 0;
            }
            state.totalContacts = state.totalContacts.concat(this.state.contactData);
            window.localStorage.setItem('contactdata', JSON.stringify(state.totalContacts));
            return state.totalContacts;
        })

        e.preventDefault();
    }

    /* Handling input data of add contact input   */
    handleChange = (event) => {
        this.setState({
            contactData: {
                ...this.state.contactData,
                [event.target.name]: event.target.value
            }
        })

    }

    /* Updating those contact with the new data, but as it it clicked we are first showing the input box
        and populating it with the existing data for a clean 2-way binding */
    updateContact = (id) => {
        console.log("id", this.state, id);
        this.setState({
            showUpdateInputBox: true,
            destinedId: id,
            updateWithTheseValues: {
                ...this.state.updateWithTheseValues
            }
        })
        this.setState((state) => {
            state.totalContacts.forEach((item, indx) => {
                if (id === item.id) {
                    state.updateWithTheseValues.phone = item.phone;
                    state.updateWithTheseValues.mobile = item.mobile;
                    state.updateWithTheseValues.email = item.email;
                }
            })
            return state.updateWithTheseValues;
        })
    }

    /* Here we are deleting the contact but alongside updating the localstorage as well */
    deleteContact = (id, event) => {
        this.setState((state) => {
            state.totalContacts.forEach((item, index) => {
                if (item.id === id) {
                    state.totalContacts.splice(index, 1);
                }
            })
            window.localStorage.setItem('contactdata', JSON.stringify(state.totalContacts));
            return state.totalContacts;
        })
    }

    /* Here we are handling changes in new input box which shows on press of Update button */
    handleUpdateValueChange = (data, event) => {

        this.setState({
            updateWithTheseValues: {
                ...this.state.updateWithTheseValues,
                [data]: event.target.value
            }
        })
    }

    /* Here we are updating the contact with the new data set and updating the localstorage alongside
           This function in final update from click of button 'Final??' */
    finalUpdateContact = (id, event) => {
        this.setState({
            showUpdateInputBox: false
        })
        this.setState((state) => {
            state.totalContacts.forEach((item, index) => {
                if (id === item.id) {
                    item.phone = state.updateWithTheseValues.phone;
                    item.mobile = state.updateWithTheseValues.mobile;
                    item.email = state.updateWithTheseValues.email;
                }
            })
            window.localStorage.setItem('contactdata', JSON.stringify(state.totalContacts));
            return state.totalContacts;


        })

    }

    /* Clearing all data from table or even localstorage and updating new state */
    clearAllData = () => {
        window.localStorage.removeItem('contactdata');
        this.setState({
            totalContacts: []
        })
    }

    /* Pagination: For changing pages */
    handleChangePage(event, newPage) {
        this.setState({
            ...this.state,
            page: newPage
        })
    }

    /* Pagination: For changing rows */
    handleChangeRowsPerPage(event) {
        this.setState({
            ...this.state,
            rowsPerPage: parseInt(event.target.value, 10)

        })
    }



    render() {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <Card style={{ width: '50%', margin: 10 }} >
                        <CardContent>
                            <ContactAdd onSubmit={this.submitDataForTable.bind(this)} onChange={this.handleChange.bind(this)} />
                        </CardContent>
                    </Card>

                    <Card style={{ width: '50%', margin: 10 }}>
                        <CardContent>
                            <ContactListNumber totalContacts={this.state.totalContacts} />
                        </CardContent>
                    </Card>
                </div>
                <Card style={{ margin: 10 }}>
                    <div style={{ margin: 10, display: 'flex', justifyContent: 'space-between' }}>
                        <b>Contact Details</b>
                        <Button size="small" color="primary" variant={'text'} onClick={this.clearAllData.bind(this)}>
                            Clear all </Button>
                    </div>
                    <CardContent>

                        <Table>
                            <TableHead>
                                <TableRow style={{ display: 'flex' }} >
                                    <TableCell style={{ width: '5%' }} >ID</TableCell>
                                    <TableCell style={{ width: '25%' }}>Phone</TableCell>
                                    <TableCell style={{ width: '25%' }}>Mobile</TableCell>
                                    <TableCell style={{ width: '25%' }}>Email</TableCell>
                                    <TableCell style={{ width: '20%' }} align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>



                            <TableBody>
                                {/* {this.state.totalContacts.sort((a, s) => s.id - a.id).map(row => { */}
                                {this.state.totalContacts.sort((a, s) => s.id - a.id).slice(this.state.page * this.state.rowsPerPage,
                                    this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row, index) => {

                                        return (
                                            <TableRow key={row.id} style={{ display: 'flex' }} >

                                                <TableCell component="th" style={{ width: '5%' }}>{row.id}</TableCell>


                                                {(this.state.showUpdateInputBox && this.state.destinedId === row.id) ?
                                                    <TableCell style={{ width: '25%' }}>
                                                        <input onChange={this.handleUpdateValueChange.bind(this, 'phone')}
                                                            value={this.state.updateWithTheseValues.phone} />
                                                    </TableCell> :
                                                    <TableCell style={{ width: '25%' }}>{row.phone}</TableCell>}

                                                {(this.state.showUpdateInputBox && this.state.destinedId === row.id) ?
                                                    <TableCell style={{ width: '25%' }}>
                                                        <input onChange={this.handleUpdateValueChange.bind(this, 'mobile')}
                                                            value={this.state.updateWithTheseValues.mobile} />
                                                    </TableCell> :
                                                    <TableCell style={{ width: '25%' }}>{row.mobile}</TableCell>}

                                                {(this.state.showUpdateInputBox && this.state.destinedId === row.id) ?
                                                    <TableCell style={{ width: '25%' }}>
                                                        <input onChange={this.handleUpdateValueChange.bind(this, 'email')}
                                                            value={this.state.updateWithTheseValues.email}
                                                        />
                                                    </TableCell> :
                                                    <TableCell style={{ width: '25%' }}>{row.email}</TableCell>}


                                                <TableCell style={{ width: '20%' }} align="center">

                                                    {(this.state.showUpdateInputBox && this.state.destinedId === row.id) ?
                                                        <Button size="small" color="primary" variant={'outlined'}
                                                            onClick={this.finalUpdateContact.bind(this, row.id)}>
                                                            Final??</Button> :
                                                        <Button size="small" color="primary" variant={'outlined'}
                                                            onClick={this.updateContact.bind(this, row.id)}>
                                                            Update</Button>
                                                    }
                                                    <Button size="small" color="secondary" variant={'outlined'}
                                                        onClick={this.deleteContact.bind(this, row.id)} >
                                                        Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[2, 3, 5, 10]}
                                        colSpan={3}
                                        count={this.state.totalContacts.length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'Rows per page' },
                                            native: true
                                        }}
                                        onChangePage={this.handleChangePage.bind(this)}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default ContactTable;