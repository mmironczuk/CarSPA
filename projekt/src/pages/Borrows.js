import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/borrow";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import BorrowsForm from "../components/BorrowsForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { baseUrl } from "../actions/api";



const Borrows = () => {
    const [borrows, setBorrows] = useState([])
    const [selectData, setData] = useState({
        cars: [],
        clients: [],
    })

    useEffect(() => {
        const carsRequest = axios.get(baseUrl + 'Cars');
        const clientsRequest = axios.get(baseUrl + 'Clients');

        axios.all([carsRequest, clientsRequest])
            .then(resp => setData({
                cars: resp[0].data,
                clients: resp[1].data
            }))

    }, [])




    return (

        <Grid container>
            <Grid item xs={6}>
                <BorrowsForm clients={selectData.clients} cars={selectData.cars} />
            </Grid>
            <Grid item xs={6}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Car</TableCell>
                                <TableCell>Client</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                borrows.map((record, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{record.car.brand} {record.car.model}</TableCell>
                                            <TableCell>{record.client.name} {record.client.surname}</TableCell>
                                            <TableCell>{record.date}</TableCell>
                                            <TableCell>
                                                <ButtonGroup>
                                                    <Button><EditIcon color="primary" onClick={() => { }} /></Button>
                                                    <Button><DeleteIcon onClick={() => { }}></DeleteIcon></Button>
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

    );
}
export default Borrows;
