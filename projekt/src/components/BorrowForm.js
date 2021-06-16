import { Grid,Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import useForm from "./useForm";
import styled from 'styled-components';

const Item = styled.div`
    margin: 5px 0 5px 0;
    max-width: 220px;
`;

function validate(values) {
    let validated = true;
    values.forEach(el => {
        if (el === '') {
            validated = false;
        }
    })
    return validated
}


export const BorrowForm = ({initialValues, onChange, onSubmit, clients, cars }) => {

    const [carId, clientId] = initialValues;

    const handleCarChange = (event) => {
        onChange([event.target.value, clientId])
    }

    const handleClientChange = (event) => {
        onChange([carId, event.target.value])
    }

    /*const handleDateChange = (event) => {
        onChange([carId, clientId, event.target.value])
    }*/

    const handleSubmitForm = (event) => {
        if (validate([carId, clientId])) {
            onSubmit()
        }
        event.preventDefault()
    }

    return (
        <>
            <Typography variant='h4'>New borrow</Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmitForm}>
                <Item>
                <FormControl style={{ width: '100%' }} variant="outlined">
                    <InputLabel>Client</InputLabel>
                        <Select onChange={handleClientChange} name="clientId" value={clientId} onChange={handleClientChange}>
                            {
                                clients.map((client, index) => {
                                    return (
                                        <MenuItem value={client.clientId} key={index}>{client.name} {client.surname}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                </FormControl>
                </Item>
                <Item>
                <FormControl style={{ width: '100%' }} variant="outlined">
                    <InputLabel>Cars</InputLabel>
                        <Select onChange={handleCarChange} name="carId" value={carId} onChange={handleCarChange}>
                            {
                                cars.map((car, index) => {
                                    return (
                                        <MenuItem value={car.carId} key={index}>{car.brand} {car.model}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                </FormControl>
                </Item>

                <Button type='submit' variant="contained" color="secondary">
                    Submit
                </Button>
            </form>
        </>
    );

    /*return (
        <form autoComplete="off" noValidate onSubmit={handleSubmitForm}>
            <Grid container>
                <Grid item xs={6}>
                    <FormControl variant="outlined">
                        <InputLabel>Client</InputLabel>
                        <Select onChange={handleClientChange} name="clientId" onChange={handleClientChange}>
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
                        <InputLabel>Cars</InputLabel>
                        <Select onChange={handleCarChange} name="carId" onChange={handleCarChange}>
                            {
                                cars.map((car, index) => {
                                    return (
                                        <MenuItem value={car.carId} key={index}>{car.brand} {car.model}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <div>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                        <Button variant="contained" onClick={onChange}>Reset</Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );*/
}