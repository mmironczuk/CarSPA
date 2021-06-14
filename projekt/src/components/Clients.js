import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/client";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody , withStyles, ButtonGroup, Button} from "@material-ui/core";
import ClientsForm from "./ClientsForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from '@material-ui/data-grid';

const styles = theme => ({
    root:{
        "& .MuiTableCell-head":{
            fontSize:"1.25rem"
        }
    },
    paper:{
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        position: "absolute",
        top: "50px",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
})

const Clients = ({classes,...props})=>{

    const [currentId,setCurrentId] = useState(0)
    
    useEffect(()=>{
        props.fetchAllClients()
    },[])

    const onDelete = id => {
        if(window.confirm('Are you sure?'))
            props.deleteClient(id,()=>{window.alert('Deleted')})
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <ClientsForm {...({currentId,setCurrentId})}/>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Surname</TableCell>
                                    <TableCell>Mail</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.clientList.map((record,index)=>{
                                        return(
                                            <TableRow>
                                                <TableCell>{record.name}</TableCell>
                                                <TableCell>{record.surname}</TableCell>
                                                <TableCell>{record.mail}</TableCell>
                                                <TableCell>{record.age}</TableCell>
                                                <TableCell>{record.gender}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup>
                                                        <Button><EditIcon color="primary" onClick={()=>{setCurrentId(record.clientId)}}/></Button>
                                                        <Button><DeleteIcon onClick={()=>onDelete(record.clientId)}></DeleteIcon></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps=state=>({
        clientList: state.client.list
})

const mapActionToProps={
    fetchAllClients:actions.fetchAll,
    deleteClient: actions.Delete
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(Clients));