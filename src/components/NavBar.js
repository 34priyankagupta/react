import React from 'react';
import Button from '@material-ui/core/Button';
import './../App.css';
import { NavLink } from 'react-router-dom'



const NavBar = (props) => {
    const activelink = {
        background: 'rgb(220, 220, 220)',
        padding: 9
    }
    return (
        <div className="namefieldSpecial borderingStyle" >
            <div className="titleSpace">
                {props.title}
            </div>
            <div className="justyingEndNavbar">
                <div>
                    <NavLink to="/home" className="linkButtons" activeStyle={activelink}>
                        <Button className="btnOverridingStyles" variant="outlined" size={"small"}>
                            <span className="btnText">Home</span>
                        </Button>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/contactTable" className="linkButtons" activeStyle={activelink}>
                        <Button className="btnOverridingStyles" variant="outlined" size={"small"}>
                            <span className="btnText">Contact List</span></Button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default NavBar;