import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/client";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import { ClientForm } from "../components/ClientForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from '@material-ui/data-grid';
import axios from "axios";
import { baseUrl } from "../actions/api";

const Clients = () => {
    const [clients, setClients] = useState([])
    const [[name, surname, age, mail, gender], setForm] = useState(['', '', '', '', ''])
    const [[updateId, index], setUpdateId] = useState([null, null]);

    useEffect(() => {
        axios.get(`${baseUrl}Clients`)
            .then(resp => resp.data)
            .then(res => setClients(res))
    }, [])

    const handleChange = (data) => setForm(data)

    const handleEdit = (client, index) => {
        setForm([client.name, client.surname, client.age, client.mail, client.gender])
        setUpdateId([client.clientId, index])
    }

    const handleDelete = (index, id) => {
        axios.delete(baseUrl + `Clients/${id}`)
            .then(res => {
                const tmp = [...clients]
                tmp.splice(index, 1);
                setClients(tmp)
            })
    }

    const handleSubmitCreate = () => {
        axios.post(baseUrl + 'Clients', {
            name: name,
            surname: surname,
            age: age,
            mail: mail,
            gender: gender,
        })
            .then((resp) => resp.data)
            .then(client => {
                setClients([...clients, client])
            })
        setForm(['', '', '', '', ''])
    }

    const handleSubmitUpdate = () => {
        const newClient = {
            clientId: updateId,
            name: name,
            surname: surname,
            age: age,
            mail: mail,
            gender: gender,
        }
        axios.put(baseUrl + `Clients/${updateId}`, newClient)
            .then(client => {
                const tmp = [...clients]
                tmp[index] = newClient
                setClients(tmp)
            })
        setUpdateId([null, null]) // create
        setForm(['', '', '', '', ''])
    }


    return (

        <Grid container>
            <Grid item xs={6}>
                <ClientForm
                    onChange={handleChange}
                    onSubmit={updateId ? handleSubmitUpdate : handleSubmitCreate}
                    initialValues={[name, surname, age, mail, gender]} />
            </Grid>
            <Grid item xs={6}>
                <TableContainer>
                    <Table>
                        <TableHead >
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
                                clients.map((record, index) => {
                                    return (
                                        <TableRow key={record.clientId}>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{record.surname}</TableCell>
                                            <TableCell>{record.mail}</TableCell>
                                            <TableCell>{record.age}</TableCell>
                                            <TableCell>{record.gender}</TableCell>
                                            <TableCell>
                                                <ButtonGroup>
                                                    <Button><EditIcon color="primary" onClick={() => handleEdit(record, index)} /></Button>
                                                    <Button><DeleteIcon onClick={() => { handleDelete(index, record.clientId) }}></DeleteIcon></Button>
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

export default Clients