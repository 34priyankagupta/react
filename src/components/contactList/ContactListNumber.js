import React, { Component } from 'react';
import './../../App.css'

class ContactListNumber extends Component {

    render() {
        return (
            <div>
                <b>Total Contacts via another component</b>
                <div style={{ display: 'flex', height: 250, justifyContent: 'center', alignItems: 'center' }}>
                    <h1 className="circumingNumber">{this.props.totalContacts.length}</h1>
                </div>

            </div>
        )
    }
}

export default ContactListNumber;




