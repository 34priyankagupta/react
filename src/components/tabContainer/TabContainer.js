import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export class TabContainer extends Component {
    render() {
        return (
            <Typography component="div" style={{ padding: 8 * 3 }}>
                {this.props.children}
            </Typography>
        )
    }
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};