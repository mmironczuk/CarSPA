import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import useForm from "./useForm";
import * as actions from "../actions/borrow";
import * as actionsCars from "../actions/car";
import * as actionsClients from "../actions/client";
import { connect } from "react-redux";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            minWidth: 200
        }
    },
    formControl: {
        minWidth: 200
    }
})

const initialFieldValues = {
    carId: '',
    clientId: ''
}

const BorrowsForm = ({ clients, cars }) => {

    return (
        <form autoComplete="off" noValidate onSubmit={() => { }}>
            <Grid container>
                <Grid item xs={6}>
                    <FormControl variant="outlined">
                        <InputLabel>Clien</InputLabel>
                        <Select name="clientId" onChange={() => { }}>
                            {
                                clients.map((client, index) => {
                                    return (
                                        <MenuItem value={client.clientId} key={index}>{client.name} {client.surname}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel>Client</InputLabel>
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel>Cars</InputLabel>
                        <Select name="clientId" onChange={() => { }}>
                            {
                                cars.map((client, index) => {
                                    return (
                                        <MenuItem value={client.clientId} key={index}>{client.name} {client.surname}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <div>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                        <Button variant="contained" onClick={() => { }}>Reset</Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state => ({
    borrowList: state.borrow.list,
    carList: state.car.list,
    clientList: state.client.list
})

const mapActionToProps = {
    createborrow: actions.create,
    updateborrow: actions.update,
    fetachAllCars: actionsCars.fetchAll,
    fetachAllClients: actionsClients.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(BorrowsForm));