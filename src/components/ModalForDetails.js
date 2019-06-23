import React, { Component } from 'react';
import './../App.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { DetailingsAboutOutfit } from './DetailingsAboutOutfit';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export class ModalForDetails extends Component {
    componentDidMount() {
        console.log("thisss", this.props.rowId);
    }
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.openModel}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth={true}>

                    <div>
                        {/* <DialogTitle id="alert-dialog-slide-title"> <b>{this.props.selectedRowDetails.item.name}</b></DialogTitle> */}
                        <DialogContent>
                        <DetailingsAboutOutfit data={this.props.selectedRowDetails} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.props.handleClose} color="primary">
                                got it </Button>
                        </DialogActions>
                    </div>

                </Dialog>
            </div>
        )
    }


}