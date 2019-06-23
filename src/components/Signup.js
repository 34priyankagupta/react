import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './../App.css'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';


class Signup extends Component {

    constructor(props) {
        super()
        this.state = {
            type: 'signup',
            formData: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                about: '',
                newletterReceive: false

            },
            open: false
        }
    }

    componentDidMount() {
        if (!!window.localStorage.getItem('token')) {
            console.log("props", this.props);
            // this.props.history.block();
            this.setState({
                open: true
            })
            this.props.history.push('/home');
        } else {
            window.localStorage.removeItem('token');
        }
    }

    handleChange = (data, event) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [data]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
            }
        })

    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    submitForm = (e) => {
        console.log("this.state", this.state);
        e.preventDefault();
    }

    render() {
        return (
            <div className="signupSpecific">
                <Card style={{ width: '32%' }} raised={true}>
                    <CardMedia
                        component="img"
                        alt="Image for signup"
                        height="140" style={{ width: '100%', height: '100%' }}
                        image="assets/logo.jpg"
                        title="Front" />
                    <CardContent>

                        <b>SIGN UP</b>

                        {/* FORM */}
                        <form onSubmit={this.submitForm} style={{ marginTop: 0 }}>
                            <div className="namefieldSpecial">

                                <TextField
                                    className="sigupFielSpecific"
                                    required={true}
                                    label="First Name"
                                    value={this.state.formData.firstName}
                                    onChange={this.handleChange.bind(this, 'firstName')}
                                    margin="normal"
                                    variant="standard"
                                    helperText={this.state.formData.firstName === "" ? 'Please provide your first name' : ''}
                                    inputProps={{
                                        'aria-label': 'First Name',
                                    }}
                                />

                                <TextField
                                    className="sigupFielSpecific"
                                    label="Last Name"
                                    required={true}
                                    value={this.state.formData.lastName}
                                    onChange={this.handleChange.bind(this, 'lastName')}
                                    margin="normal"
                                    helperText={this.state.formData.lastName === "" ? 'Please provide your last name' : ''}
                                    variant="standard"
                                    inputProps={{
                                        'aria-label': 'Last Name',
                                    }}
                                />
                            </div>

                            <div className="namefieldSpecial">

                                <TextField
                                    className="sigupFielSpecific"
                                    required={true}
                                    label="Email"
                                    value={this.state.formData.email}
                                    onChange={this.handleChange.bind(this, 'email')}
                                    margin="normal"
                                    variant="standard"
                                    helperText={this.state.formData.email === "" ? 'Please provide your email' : ''}
                                    inputProps={{
                                        'aria-label': 'Email',
                                    }}
                                />

                                <TextField
                                    required={true}
                                    className="sigupFielSpecific"
                                    label="Password"
                                    value={this.state.formData.password}
                                    onChange={this.handleChange.bind(this, 'password')}
                                    margin="normal"
                                    helperText={this.state.formData.password === "" ? 'Please provide your password' : ''}
                                    variant="standard"
                                    inputProps={{
                                        'aria-label': 'Password',
                                    }}
                                />
                            </div>

                            <div>
                                <TextField
                                    label="About"
                                    multiline
                                    rowsMax="2"
                                    fullWidth={true}
                                    value={this.state.formData.about}
                                    onChange={this.handleChange.bind(this, 'about')}
                                    margin="normal"
                                    variant="outlined"
                                    inputProps={{
                                        'aria-label': 'About',
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={this.handleChange.bind(this, 'newletterReceive')}
                                        checked={this.state.formData.newletterReceive}
                                        color="secondary"
                                        inputProps={{
                                            'aria-label': 'primary checkbox',
                                        }}
                                    />}
                                    label={<span style={{ fontSize: '76%' }}> Would you like to receive our Newsletter
                                    for cool contents ?? </span>}
                                />
                            </div>


                            <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button size="small" color="secondary" type="submit" formtype={'signup'}>
                                    Signup</Button>
                                <Link to="/login" className="linkButtons">
                                    <Button size="small" color="primary" >
                                        Login</Button>
                                </Link>

                            </CardActions>

                        </form>
                    </CardContent>


                </Card>

            </div>
        )
    }

}

export default Signup;