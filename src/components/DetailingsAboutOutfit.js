import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../App.css';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import { CostSummary } from './tabDataForItemDetails/CostSummary';
import { GeneralItemData } from './tabDataForItemDetails/GeneralItemData';
import { TabContainer } from './tabContainer/TabContainer';

export class DetailingsAboutOutfit extends Component {


    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }



    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 20 }}>
                    <div><b>{this.props.data.item.name}</b></div>
                    {!!this.props.data.item.images.icon ?
                        <Avatar alt={this.props.data.item.name} src={this.props.data.item.images.icon}
                            style={{ width: 100, height: 100, border: '1px solid #e7e3e3', background: '#fff8eb' }} />
                        : ''}
                </div>

                <Paper square>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary">
                        <Tab icon={<Icon>explore</Icon>} aria-label="explore" />
                        {this.props.data.itemOccurrences.entries.length !== 0 ? <Tab icon={<Icon>euro_symbol</Icon>} aria-label="Cost" /> : ''}
                    </Tabs>
                    <Divider />
                    {this.state.value === 0 && <TabContainer>
                        <GeneralItemData generalData={this.props.data.item} />
                    </TabContainer>}
                    {this.props.data.itemOccurrences.entries.length !== 0 ?
                        this.state.value === 1 && <TabContainer>
                            <CostSummary costSum={this.props.data.itemOccurrences.entries} />
                        </TabContainer>
                        : ''}
                </Paper>
            </div>
        );
    }
}
