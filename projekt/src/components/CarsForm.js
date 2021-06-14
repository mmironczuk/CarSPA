import { Grid,TextField, Button} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, {useState, useEffect} from "react";
import useForm from "./useForm";
import * as actions from "../actions/car";
import { connect } from "react-redux";

const styles = theme =>({
    root:{
    '& .MuiTextField-root': {
        minWidth:200
        }
    },
})

const initialFieldValues={
    brand:'',
    model:'',
    color:'',
    year:'',
    kilometers:''
}

const CarsForm = ({classes,...props}) => {

    const validate = (fieldValues = values) =>{
        let temp={...errors}
        if('brand' in fieldValues) temp.brand=fieldValues.brand!=""?"":"This field is required."
        if('model' in fieldValues) temp.model=fieldValues.model!=""?"":"This field is required."
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
                props.createcar(values,()=>{window.alert('inserted')})
            }
            else
            props.updatecar(props.currentId,values,()=>{window.alert('updated')})
        }
    }

    useEffect(() => {
        if(props.currentId!=0){
            setValues({
                ...props.carList.find(x=>x.carId==props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])


    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField name="brand" variant="outlined" label="Brand" value={values.brand} onChange={handleInputChange} {...(errors.brand && {error: true, helperText: errors.brand})}/>
                    <TextField name="model" variant="outlined" label="Model" value={values.model} onChange={handleInputChange} {...(errors.model && {error: true, helperText: errors.model})}/>
                    <div>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                        <Button variant="contained" onClick={resetForm}>Reset</Button>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <TextField name="color" variant="outlined" label="Color" value={values.color} onChange={handleInputChange}/>
                    <TextField name="year" variant="outlined" label="Year" value={values.year} onChange={handleInputChange}/>
                    <TextField name="kilometers" variant="outlined" label="Kilometers" value={values.kilometers} onChange={handleInputChange}/>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps=state=>({
    carList: state.car.list
})

const mapActionToProps={
    createcar:actions.create,
    updatecar:actions.update
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(CarsForm));