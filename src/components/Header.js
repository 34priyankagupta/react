import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './../App.css';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#ff0080' },
        secondary: { main: '#0c2a12' },
    },
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: false
        };
    }

    componentDidMount() {
        console.log("thie.props", this.props.checkAuth());
        this.setState({
            token: JSON.parse(localStorage.getItem('token'))
        });
    }


    signout = () => {
        window.localStorage.removeItem('token');
        this.props.handleLogout(false);
    }

    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <AppBar color="secondary" position="relative">
                        <ToolBar className="appBarSpecial">
                            <Typography variant="h6" component="h6">
                                My React App
                            </Typography>


                            <div>
                                {/* {button} */}
                                {/* Showing logour button on correct authentication else login button whole wrapped in a conditional operator */}
                                {/* Showing signup button on bad authentication */}
                                {(this.props.token) ?
                                    <Link to="/login" className="linkButtons">
                                        <Button size="small" style={{ color: 'white' }} onClick={this.signout.bind(this)} >
                                            Logout</Button>
                                    </Link> :
                                    <div>
                                        <Link to="/login" className="linkButtons"><Button size="small" style={{ color: 'white' }} >Login</Button></Link>
                                        <Link to="/signup" className="linkButtons"><Button size="small" style={{ color: 'white' }} >SIGNUP</Button></Link>
                                    </div>
                                }



                            </div>


                        </ToolBar>
                    </AppBar>
                </ThemeProvider>
            </div>
        )
    }
}

export default Header;