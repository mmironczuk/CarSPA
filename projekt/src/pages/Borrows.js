import React, { useState, useEffect } from "react";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import { BorrowForm } from "../components/BorrowForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from '@material-ui/data-grid';
import axios from "axios";
import { baseUrl } from "../actions/api";
import Cars from "./Cars";

const Borrows = () => {
    const [borrows, setBorrows] = useState([])
    const [cars, setCars] = useState([])
    const [clients, setClients] = useState([])
    const [[carId, clientId, date], setForm] = useState(['', '', ''])
    const [[updateId, index], setUpdateId] = useState([null, null]);

    useEffect(() => {
        axios.get(`${baseUrl}Borrows`)
            .then(resp => resp.data)
            .then(res => setBorrows(res))
    }, [])

    useEffect(() => {
        axios.get(`${baseUrl}Cars`)
            .then(resp => resp.data)
            .then(res => setCars(res))
    }, [])

    useEffect(() => {
        axios.get(`${baseUrl}Clients`)
            .then(resp => resp.data)
            .then(res => setClients(res))
    }, [])

    const handleChange = (data) => setForm(data)

    const handleEdit = (borrow, index) => {
        setForm([borrow.carId, borrow.clientId, borrow.date])
        setUpdateId([borrow.borrowId, index])
    }

    const handleDelete = (index, id) => {
        axios.delete(baseUrl + `Borrows/${id}`)
            .then(res => {
                const tmp = [...borrows]
                tmp.splice(index, 1);
                setBorrows(tmp)
            })
    }

    const handleSubmitCreate = () => {
        axios.post(baseUrl + 'Borrows', {
            carId: carId,
            clientId: clientId,
            date:date
        })
            .then((resp) => resp.data)
            .then(borrow => {
                setBorrows([...borrows, borrow])
            })
        setForm(['', '', ''])
    }

    const handleSubmitUpdate = () => {
        const newBorrow = {
            borrowId: updateId,
            carId: carId,
            clientId: clientId,
            date:date
        }
        axios.put(baseUrl + `Borrows/${updateId}`, newBorrow)
            .then(borrow => {
                const tmp = [...borrows]
                tmp[index] = newBorrow
                setBorrows(tmp)
            })
        setUpdateId([null, null]) // create
        setForm(['', '', ''])
    }


    return (

        <Grid container>
            <Grid item xs={6}>
                <BorrowForm
                    cars={cars} clients={clients}
                    onChange={handleChange}
                    onSubmit={updateId ? handleSubmitUpdate : handleSubmitCreate}
                    initialValues={[carId, clientId, date]}/>
            </Grid>
            <Grid item xs={6}>
                <TableContainer>
                    <Table>
                        <TableHead >
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
                                        <TableRow key={record.carId}>
                                            <TableCell>{record.car.brand} {record.car.model}</TableCell>
                                            <TableCell>{record.client.name} {record.client.surname}</TableCell>
                                            <TableCell>{record.date}</TableCell>
                                            <TableCell>
                                                <ButtonGroup>
                                                    <Button><EditIcon color="primary" onClick={() => handleEdit(record, index)} /></Button>
                                                    <Button><DeleteIcon onClick={() => { handleDelete(index, record.borrowId) }}></DeleteIcon></Button>
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

export default Borrows