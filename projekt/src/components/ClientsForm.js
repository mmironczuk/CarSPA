import { Grid,TextField, Button, FormControl,InputLabel,Select, MenuItem} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, {useState, useEffect} from "react";
import useForm from "./useForm";
import * as actions from "../actions/client";
import { connect } from "react-redux";

const styles = theme =>({
    root:{
    '& .MuiTextField-root': {
        minWidth:200
        }
    },
    formControl:{
        minWidth:200
    }
})

const initialFieldValues={
    name:'',
    surname:'',
    mail:'',
    age:'',
    gender:''
}

const ClientsForm = ({classes,...props}) => {

    const validate = (fieldValues = values) =>{
        let temp={...errors}
        if('name' in fieldValues) temp.name=fieldValues.name!=""?"":"This field is required."
        if('surname' in fieldValues) temp.surname=fieldValues.surname!=""?"":"This field is required."
        if('mail' in fieldValues) temp.mail=fieldValues.mail!=""?"":"This field is required."
        setErrors({
            ...temp
        })
        if(fieldValues==values) return Object.values(temp).every(x=> x=="")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    /*const inputLabel=React.useRef(null);
    const [labelWidth, setLabelWidth]=React.useState(0);
    React.useEffect(()=>{
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);*/

    const handleSubmit = e => {
        e.preventDefault()
        if(validate())
        {
            if(props.currentId==0){
                resetForm()
                props.createclient(values,()=>{window.alert('inserted')})
            }
            else
            props.updateclient(props.currentId,values,()=>{window.alert('updated')})
        }
    }

    useEffect(() => {
        if(props.currentId!=0){
            setValues({
                ...props.clientList.find(x=>x.clientId==props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])


    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField name="name" variant="outlined" label="Name" value={values.name} onChange={handleInputChange} {...(errors.name && {error: true, helperText: errors.name})}/>
                    <TextField name="surname" variant="outlined" label="Surname" value={values.surname} onChange={handleInputChange} {...(errors.surname && {error: true, helperText: errors.surname})}/>
                    <div>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                        <Button variant="contained" onClick={resetForm}>Reset</Button>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <TextField name="mail" variant="outlined" label="Mail" value={values.mail} onChange={handleInputChange}/>
                    <TextField name="age" variant="outlined" label="Age" value={values.age} onChange={handleInputChange}/>
                    <FormControl variant="outlined">
                        <InputLabel>Gender</InputLabel>
                        <Select name="gender" value={values.gender} onChange={handleInputChange} className={classes.formControl}>
                            <MenuItem value="male">male</MenuItem>
                            <MenuItem value="female">female</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps=state=>({
    clientList: state.client.list
})

const mapActionToProps={
    createclient:actions.create,
    updateclient:actions.update
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(ClientsForm));