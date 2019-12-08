import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Purchases from './Purchases';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ReloadIcon from '@material-ui/icons/Update';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {noteRequester} from 'data-requester';

export default class Notes extends Component {
    constructor() {
        super();
        this.state = {
            notes: [],
            isEditing: false,
            noteName: ''
        };
    }

    async componentWillMount() {
        this.refresh();
    }

    refresh = async () => {
        this.setState({notes: await noteRequester.getNotes()})
    };

    addNote = async () => {
        const name = this.state.noteName;
        const [{_id}] = await noteRequester.addNote(this.state.noteName, 1);
        this.setState({noteName: '', isEditing: '', notes: [{name, _id}, ...this.state.notes]});
    };

    removeNote = async (_id) => {
        await noteRequester.deleteNode(_id);
        this.setState({notes: this.state.notes.filter(item => item._id !== _id)});
    };

    editingRow = () => {
        return <>
            <TextField
                style={{color: '#fff'}}
                className='mr-2'
                variant='outlined'
                label='Название заметки'
                onChange={(event) => this.setState({noteName: event.target.value})}
                value={this.state.noteName}/>
            <IconButton className='mr-2' color="inherit" onClick={() => this.setState({isEditing: false, noteName: ''})}>
                <HighlightOffIcon/>
            </IconButton>
            <IconButton className='mr-2' color="inherit" onClick={this.addNote}>
                <CheckCircleOutlineIcon/>
            </IconButton>
        </>
    };

    itemRender = (item) => {
        return <ListItem style={{cursor: 'pointer'}} key={item._id} divider>
            <div style={{width: '100%'}} className='d-flex align-items-center'>
                <ListItemText style={{flexGrow: 1}} onClick={(event) => {
                    event.stopPropagation();
                    this.setState({note: item._id})
                }}>{item.name}</ListItemText>
                <IconButton onClick={() => this.removeNote(item._id)}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </ListItem>
    };

    headerRender = () => {
        return <>
            {!this.state.isEditing && <Button variant="contained" color="primary"
                                              onClick={() => this.setState({isEditing: true})}>Добавить</Button>}
            {this.state.isEditing && this.editingRow()}
        </>
    };

    dialogRender = () => {
        return <Dialog fullScreen open>
            <AppBar style={{position: 'relative'}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => this.setState({note: ''})}
                                aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography className="ml-2" variant="h6">
                        Покупки
                    </Typography>
                </Toolbar>
            </AppBar>
            <Purchases note_id={this.state.note}/>
        </Dialog>
    };

    render() {
        return <div>
            <AppBar style={{position: 'relative'}}>
                <Toolbar>
                    <div className='d-flex align-items-center'>

                        <Typography className="ml-2 mr-2" variant="h6">
                            Заметки
                        </Typography>
                        {!this.state.isEditing && <>
                            <IconButton color='inherit'>
                                <AddIcon onClick={() => this.setState({isEditing: true})}/>
                            </IconButton>
                            <IconButton color='inherit'>
                                <ReloadIcon onClick={() => this.refresh()}/>
                            </IconButton>
                        </>}
                        {this.state.isEditing && this.editingRow()}
                    </div>
                </Toolbar>
            </AppBar>
            <List>
                {this.state.notes.map(item => this.itemRender(item))}
            </List>
            {this.state.note && this.dialogRender()}
        </div>
    }
}