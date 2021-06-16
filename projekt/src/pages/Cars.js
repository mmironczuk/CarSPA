import React, { useState, useEffect } from "react";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import { CarForm } from "../components/CarForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from '@material-ui/data-grid';
import axios from "axios";
import { baseUrl } from "../actions/api";

const Cars = () => {
    const [cars, setCars] = useState([])
    const [[brand, model, color, year, kilometers], setForm] = useState(['', '', '', '', ''])
    const [[updateId, index], setUpdateId] = useState([null, null]);

    useEffect(() => {
        axios.get(`${baseUrl}Cars`)
            .then(resp => resp.data)
            .then(res => setCars(res))
    }, [])

    const handleChange = (data) => setForm(data)

    const handleEdit = (car, index) => {
        setForm([car.brand, car.model, car.color, car.year, car.kilometers])
        setUpdateId([car.carId, index])
    }

    const handleDelete = (index, id) => {
        axios.delete(baseUrl + `Cars/${id}`)
            .then(res => {
                const tmp = [...cars]
                tmp.splice(index, 1);
                setCars(tmp)
            })
    }

    const handleSubmitCreate = () => {
        axios.post(baseUrl + 'Cars', {
            brand: brand,
            model: model,
            color: color,
            year: year,
            kilometers: kilometers,
        })
            .then((resp) => resp.data)
            .then(car => {
                setCars([...cars, car])
            })
        setForm(['', '', '', '', ''])
    }

    const handleSubmitUpdate = () => {
        const newCar = {
            carId: updateId,
            brand: brand,
            model: model,
            color: color,
            year: year,
            kilometers: kilometers,
        }
        axios.put(baseUrl + `Cars/${updateId}`, newCar)
            .then(car => {
                const tmp = [...cars]
                tmp[index] = newCar
                setCars(tmp)
            })
        setUpdateId([null, null]) // create
        setForm(['', '', '', '', ''])
    }

    return (

        <Grid container>
            <Grid item xs={6}>
                <CarForm
                    onChange={handleChange}
                    onSubmit={updateId ? handleSubmitUpdate : handleSubmitCreate}
                    initialValues={[brand, model, color, year, kilometers]} />
            </Grid>
            <Grid item xs={6}>
                <TableContainer>
                    <Table>
                        <TableHead >
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
                                        <TableRow key={record.carId}>
                                            <TableCell>{record.brand}</TableCell>
                                            <TableCell>{record.model}</TableCell>
                                            <TableCell>{record.color}</TableCell>
                                            <TableCell>{record.year}</TableCell>
                                            <TableCell>{record.kilometers}</TableCell>
                                            <TableCell>
                                                <ButtonGroup>
                                                    <Button><EditIcon color="primary" onClick={() => handleEdit(record, index)} /></Button>
                                                    <Button><DeleteIcon onClick={() => { handleDelete(index, record.carId) }}></DeleteIcon></Button>
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