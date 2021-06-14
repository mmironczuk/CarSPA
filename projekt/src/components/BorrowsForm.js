import { Grid,TextField, Button, FormControl,InputLabel,Select, MenuItem} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, {useState, useEffect} from "react";
import useForm from "./useForm";
import * as actions from "../actions/borrow";
import * as actionsCars from "../actions/car";
import * as actionsClients from "../actions/client";
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
    carId:'',
    clientId:''
}

const BorrowsForm = ({classes,...props}) => {

    const [clients, setClients] = useState(0)
    const [cars, setCars] = useState(0)
    const [currentId,setCurrentId] = useState(0)

    const validate = (fieldValues = values) =>{
        let temp={...errors}
        if('clientId' in fieldValues) temp.clientId=fieldValues.clientId!=""?"":"This field is required."
        if('carId' in fieldValues) temp.carId=fieldValues.carId!=""?"":"This field is required."
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

    const handleSubmit = e => {
        e.preventDefault()
        if(validate())
        {
            if(props.currentId==0){
                resetForm()
                props.createborrow(values,()=>{window.alert('inserted')})
            }
            else
            props.updateborrow(props.currentId,values,()=>{window.alert('updated')})
        }
    }

    useEffect(() => {
        if(props.currentId!=0){
            setValues({
                ...props.borrowList.find(x=>x.borrowId==props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    useEffect(() => {
            setValues(
                props.fetachAllClients()
            )
    }, [])

    useEffect(() => {
            setValues(
                props.fetachAllCars()
            )
    }, [])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <FormControl variant="outlined">
                        <InputLabel>Clien</InputLabel>
                        <Select name="clientId" onChange={handleInputChange} className={classes.formControl}>
                            {
                            props.clientList.map((client, index) => {
                                return(
                                     <MenuItem value={client.clientId} key={index}>{client.name} {client.surname}</MenuItem>
                                 )
                            })
                        }
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel>Client</InputLabel>
                    </FormControl>
                    <div>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                        <Button variant="contained" onClick={resetForm}>Reset</Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps=state=>({
    borrowList: state.borrow.list,
    carList: state.car.list,
    clientList: state.client.list
})

const mapActionToProps={
    createborrow:actions.create,
    updateborrow:actions.update,
    fetachAllCars:actionsCars.fetchAll,
    fetachAllClients:actionsClients.fetchAll
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(BorrowsForm));