import React, { useEffect, useReducer } from 'react'  
import axios from 'axios'  
  
const initialState = {  
    user: {},  
    loading: true,  
    error: ''  
}  
  
const reduce = (state, action) => {  
    switch (action.type) {  
        case 'OnSuccess':  
            return {  
                loading: false,  
                user: action.payload,  
                error: ''  
            }  
        case 'OnFailure':  
            return {  
                loading: false,  
                user: {},  
                error: 'Something went wrong'  
            }  
  
        default:  
            return state  
    }  
} 
function useReducerApp() {  
    const [state, dispatch] = useReducer(reduce, initialState)  
  
    useEffect(() => {  
        axios.get('https://reqres.in/api/users/3')  
            .then(response => {  
                dispatch({ type: 'OnSuccess', payload: response.data.data })  
            })  
            .catch(error => {  
                dispatch({ type: 'OnFailure' })  
            })  
    }, [])  
  
    return (  
        <div> 
           
            {state.loading ? 'Loading!! Please wait' : state.user.email}  
            {state.error ? state.error : null}  
        </div>  
    )  
}  
  
export default useReducerApp;   
  