import React, { Component } from 'react';
import './../../App.css';
import { Paper, Divider } from '@material-ui/core';

export class GeneralItemData extends Component {
    render() {
        return (
            <div>
                <Paper square style={{ backgroundColor: '#f9f8f8', padding: 7 }}>
                    {this.props.generalData.obtained_type ? <div className="contentStyle">
                        <span className="titleStyles">Type</span>  : {this.props.generalData.obtained_type} </div> : ''}
                    <Divider />
                    {this.props.generalData.description ? <div className="contentStyle">
                        <span className="titleStyles">Description</span> : {this.props.generalData.description} </div> : ''}
                    <Divider />
                    {this.props.generalData.ratings.avgStars ? <div className="contentStyle">
                        <span className="titleStyles">Average Stars</span>  : {this.props.generalData.ratings.avgStars} </div> : ''}
                    <Divider />
                    {this.props.generalData.ratings.numberVotes ? <div className="contentStyle">
                        <span className="titleStyles">Number of Votes</span>  : {this.props.generalData.ratings.numberVotes} </div> : ''}
                    <Divider />
                    {this.props.generalData.ratings.totalPoints ? <div className="contentStyle">
                        <span className="titleStyles">Total Points</span> : {this.props.generalData.ratings.totalPoints} </div> : ''}
                    <Divider />
                    {this.props.generalData.costmeticId ? <div className="contentStyle">
                        <span className="titleStyles">Costmetic Id: </span> : {this.props.generalData.costmeticId} </div> : ''}
                </Paper>
            </div>
        )
    }
}