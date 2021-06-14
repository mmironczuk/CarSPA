import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/borrow";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody , withStyles, ButtonGroup, Button} from "@material-ui/core";
import BorrowsForm from "./BorrowsForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BootstrapNavbar from "./BootstrapNavbar";

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

const Borrows = ({classes,...props})=>{

    const [currentId,setCurrentId] = useState(0)
    
    useEffect(()=>{
        props.fetchAllBorrows()
    },[])

    const onDelete = id => {
        if(window.confirm('Are you sure?'))
            props.deleteBorrow(id,()=>{window.alert('Deleted')})
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <BorrowsForm {...({currentId,setCurrentId})}/>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Car</TableCell>
                                    <TableCell>Client</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.borrowList.map((record,index)=>{
                                        return(
                                            <TableRow>
                                                <TableCell>{record.car.brand} {record.car.model}</TableCell>
                                                <TableCell>{record.client.name} {record.client.surname}</TableCell>
                                                <TableCell>{record.date}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup>
                                                        <Button><EditIcon color="primary" onClick={()=>{setCurrentId(record.borrowId)}}/></Button>
                                                        <Button><DeleteIcon onClick={()=>onDelete(record.borrowId)}></DeleteIcon></Button>
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
        borrowList: state.borrow.list
})

const mapActionToProps={
    fetchAllBorrows:actions.fetchAll,
    deleteBorrow: actions.Delete
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(Borrows));