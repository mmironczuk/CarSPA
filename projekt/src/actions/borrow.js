import api from "./api";

export const ACTION_TYPES={
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL:'FETCH_ALL'
}

const formateData = data =>({
    ...data,
    clientId:parseInt(data.clientId?data.clientId:0),
    carId:parseInt(data.carId?data.carId:0)
})

export const fetchAll = () => dispatch =>{
    api.borrows().fetchAll()
    .then(response=>{
        dispatch({
            type:ACTION_TYPES.FETCH_ALL,
            payload:response.data
        })
    }
    )
    .catch(err=>console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.borrows().create(data)
    .then(res=>{
        dispatch({
            type:ACTION_TYPES.CREATE,
            payload:res.data
        })
        onSuccess()
    })
    .catch(err=>console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    api.borrows().update(id, data)
    .then(res=>{
        dispatch({
            type:ACTION_TYPES.UPDATE,
            payload:{id, ...data}
        })
        onSuccess()
    })
    .catch(err=>console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.borrows().delete(id)
    .then(res=>{
        dispatch({
            type:ACTION_TYPES.DELETE,
            payload:id
        })
        onSuccess()
    })
    .catch(err=>console.log(err))
}