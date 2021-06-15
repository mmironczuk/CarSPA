import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/car";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import CarsForm from "../components/CarsForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";



const Cars = () => {

    const [cars, setCars] = useState([])



    return (

        <Grid container>
            <Grid item xs={6}>
                <CarsForm />
            </Grid>
            <Grid item xs={6}>
                <TableContainer>
                    <Table>
                        <TableHead>
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
                                cars.map((record, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{record.brand}</TableCell>
                                            <TableCell>{record.model}</TableCell>
                                            <TableCell>{record.color}</TableCell>
                                            <TableCell>{record.year}</TableCell>
                                            <TableCell>{record.kilometers}</TableCell>
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

export default Cars