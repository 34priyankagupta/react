import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './../App.css'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Linear from './loaders/Linear';
import { MyServices } from '../service/service';


class Login extends Component {
    axios = require('axios');

    constructor(props) {
        super(props);
        this.state = {
            type: 'login',
            formData: {
                email: 'eve.holt@reqres.in',
                password: ''
            },
            isLoading: false
        }
    }
    
    componentDidMount(){
        if(!!window.localStorage.getItem('token')){
            this.props.history.push('\home');
        }else{
            window.localStorage.removeItem('token');
        }
    }



    handleChange = (data, event) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [data]: event.target.value
            }
        })

    }

    submitForm = (e) => {
        this.setState({
            ...this.state,
            isLoading: true
        })
        MyServices.authorizationFunc(this.state.formData).then((res) => {
            this.props.authenticate(res.data.token);
            window.localStorage.setItem('token', JSON.stringify(res.data.token));
            this.setState({
                ...this.state,
                isLoading: false
            })
            this.props.history.push("/home");
        }).catch((err) => {
            this.props.history.push("/login");
            window.localStorage.removeItem('token');
            this.setState({
                isLoading: false,
                formData: {
                    ...this.state.formData,
                    email: '',
                    password: ''
                }
            })
            console.log(err)
        })

        e.preventDefault();
    }

    render() {

        return (
            <div className="signupSpecific">
                <Card style={{ width: '27%' }} raised={true}>

                    <CardMedia
                        component="img"
                        alt="Image for signup"
                        height="140" style={{ width: '100%', height: '100%' }}
                        image="assets/logo.jpg"
                        title="Front" />
                    <CardContent>

                        <b>LOGIN</b>

                        {/* FORM */}
                        <form onSubmit={this.submitForm} style={{ marginTop: 0 }}>


                            <div >

                                <TextField
                                    className="sigupFielSpecific"
                                    fullWidth={true}
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
                            </div>
                            <div>


                                <TextField
                                    required={true}
                                    fullWidth={true}
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



                            <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>

                                <Button size="small" color="secondary" type="submit" disabled={this.state.isLoading}>
                                    Login</Button>
                                <Link to="/signup" className="linkButtons">
                                    <Button size="small" color="primary" >
                                        signup</Button>
                                </Link>

                            </CardActions>

                        </form>

                    </CardContent>
                    {this.state.isLoading && <Linear />}
                </Card>

            </div>
        )
    }

}

export default Login;