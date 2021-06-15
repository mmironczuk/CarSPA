import { TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { baseUrl } from '../actions/api';

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

export const CarForm = ({ initialValues, onChange, onSubmit }) => {
    const [brand, model, color, year, kilometers] = initialValues;

    const handleBrandChange = (event) => {
        onChange([event.target.value, model, color, year, kilometers])
    }

    const handleModelChange = (event) => {
        onChange([brand, event.target.value, color, year, kilometers])
    }

    const handleColorChange = (event) => {
        onChange([brand, model, event.target.value, year, kilometers])
    }

    const handleYearChange = (event) => {
        onChange([brand, model, color, event.target.value, kilometers])
    }

    const handleKilometersChange = (event) => {
        onChange([brand, model, color, year, event.target.value])
    }

    const handleSubmitForm = (event) => {
        if (validate([brand, model, color, year, kilometers])) {
            onSubmit()
        }
        event.preventDefault()
    }

    return (
        <>
            <Typography variant='h4'>New car</Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmitForm}>
                <Item>
                    <TextField onChange={handleBrandChange} value={brand} label="Brand" variant="outlined" />
                </Item>
                <Item>
                    <TextField onChange={handleModelChange} value={model} label="Model" variant="outlined" />
                </Item>
                <Item>
                    <TextField onChange={handleColorChange} value={color} label="Color" variant="outlined" />
                </Item>
                <Item>
                    <TextField onChange={handleYearChange} value={year} label="Year" variant="outlined" />
                </Item>
                <Item>
                    <TextField onChange={handleKilometersChange} value={kilometers} label="Kilometers" variant="outlined" />
                </Item>
                <Button type='submit' variant="contained" color="secondary">
                    Submit
                </Button>
            </form>
        </>
    );
}