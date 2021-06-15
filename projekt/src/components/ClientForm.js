import { TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
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

export const ClientForm = ({ initialValues, onChange, onSubmit }) => {
    const [name, surname, age, mail, gender] = initialValues;

    const handleNameChange = (event) => {
        onChange([event.target.value, surname, age, mail, gender])
    }

    const handleSurnameChange = (event) => {
        onChange([name, event.target.value, age, mail, gender])
    }

    const handleAgeChange = (event) => {
        onChange([name, surname, event.target.value, mail, gender])
    }

    const handleMailChange = (event) => {
        onChange([name, surname, age, event.target.value, gender])
    }

    const handleGenderChange = (event) => {
        onChange([name, surname, age, mail, event.target.value])
    }

    const handleSubmitForm = (event) => {
        if (validate([name, surname, age, mail, gender])) {
            onSubmit()
        }
        event.preventDefault()
    }

    return (
        <>
            <Typography variant='h4'>New client</Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmitForm}>
                <Item>
                    <TextField onChange={handleNameChange} value={name} label="Name" variant="outlined" />
                </Item>
                <Item>
                    <TextField onChange={handleSurnameChange} value={surname} label="Surname" variant="outlined" />
                </Item>
                <Item>
                    <TextField onChange={handleAgeChange} value={age} label="Age" variant="outlined" />
                </Item>
                <Item>
                    <TextField onChange={handleMailChange} value={mail} label="Mail" variant="outlined" />
                </Item>
                <Item>
                    <FormControl style={{ width: '100%' }} variant="outlined">
                        <InputLabel>Gender</InputLabel>
                        <Select onChange={handleGenderChange} value={gender} label="Gnerder">
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </Item>
                <Button type='submit' variant="contained" color="secondary">
                    Submit
                </Button>
            </form>
        </>
    );
}