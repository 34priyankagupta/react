import React, { Component } from 'react';
import './../../App.css';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

class ContactAdd extends Component {


    onSubmitingDataToAdd = (e) => {
        this.props.onSubmit(e);
        document.getElementById('phone').value = "";
        document.getElementById('mobile').value = "";
        document.getElementById('email').value = "";
        e.preventDefault();
    }


    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitingDataToAdd.bind(this)} style={{ marginTop: 0 }}>

                    <b>Add contact</b>

                    <div >

                        <TextField
                            id='phone'
                            className="sigupFielSpecific clearingShell"
                            fullWidth={true}
                            required={true}
                            label="Phone Number"
                            name={'phone'}
                            // value={'phone'}
                            // value={this.state.contactData.phone}
                            onChange={this.props.onChange}
                            margin="normal"
                            variant="standard"
                            // helperText={this.state.contactData.phone === "" ? 'Please provide your phone number' : ''}
                            inputProps={{
                                'aria-label': 'Phone',
                            }}
                        />
                    </div>

                    <div >

                        <TextField
                            id='mobile'
                            className="sigupFielSpecific clearingShell"
                            fullWidth={true}
                            required={true}
                            name={'mobile'}
                            // value={'mobile'}
                            label="Mobile Number"
                            // value={this.state.contactData.mobile}
                            onChange={this.props.onChange}
                            margin="normal"
                            variant="standard"
                            // helperText={this.state.contactData.mobile === "" ? 'Please provide your Mobile number' : ''}
                            inputProps={{
                                'aria-label': 'Mobile',
                            }}
                        />
                    </div>

                    <div >

                        <TextField
                            id='email'
                            className="sigupFielSpecific clearingShell"
                            fullWidth={true}
                            required={true}
                            label="Email"
                            name={'email'}
                            // value={'email'}
                            // value={this.state.contactData.email}
                            onChange={this.props.onChange}
                            margin="normal"
                            variant="standard"
                            // helperText={this.state.contactData.email === "" ? 'Please provide your Email' : ''}
                            inputProps={{
                                'aria-label': 'Email',
                            }}
                        />
                    </div>

                    <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button size="small" color="secondary" type="submit" variant="outlined" >
                            Add </Button>
                    </CardActions>

                </form>
            </div>
        )
    }
}

export default ContactAdd;