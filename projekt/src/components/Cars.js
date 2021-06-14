import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/car";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody , withStyles, ButtonGroup, Button} from "@material-ui/core";
import CarsForm from "./CarsForm";
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

const Cars = ({classes,...props})=>{

    const [currentId,setCurrentId] = useState(0)
    
    useEffect(()=>{
        props.fetchAllCars()
    },[])

    const onDelete = id => {
        if(window.confirm('Are you sure?'))
            props.deleteCar(id,()=>{window.alert('Deleted')})
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <CarsForm {...({currentId,setCurrentId})}/>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>Model</TableCell>
                                    <TableCell>Color</TableCell>
                                    <TableCell>Year</TableCell>
                                    <TableCell>Kilometers</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.carList.map((record,index)=>{
                                        return(
                                            <TableRow>
                                                <TableCell>{record.brand}</TableCell>
                                                <TableCell>{record.model}</TableCell>
                                                <TableCell>{record.color}</TableCell>
                                                <TableCell>{record.year}</TableCell>
                                                <TableCell>{record.kilometers}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup>
                                                        <Button><EditIcon color="primary" onClick={()=>{setCurrentId(record.carId)}}/></Button>
                                                        <Button><DeleteIcon onClick={()=>onDelete(record.carId)}></DeleteIcon></Button>
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
        carList: state.car.list
})

const mapActionToProps={
    fetchAllCars:actions.fetchAll,
    deleteCar: actions.Delete
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(Cars));