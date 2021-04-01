import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';


// validation method 1
// const validate = values =>{
//     var errors={}
//     if(!values.name){
//         errors.name = "Name is required"
//     }else if(values.name.length > 15){
//         errors.name = "Maximum 15 characters only"
//     }else if(values.name.length < 3){
//         errors.name = "Minimum 3 characters required"
//     }

//     return errors;
// }

const Login = (props) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema:yup.object({
            email:yup.string()
            .email()
            .required("Email is required"),
            password:yup.string()
            .required("Password is required")
        }),
        // validate,
        onSubmit:(data) => {
            console.log(data);
            axios.post('http://localhost:5000/api/login', data)
            .then(res => {
                localStorage.setItem('auth', JSON.stringify(res.data));
                props.history.push('/home');
            })
            .catch(err => {
                    toast.error(err.response.data)
            })
        }
    })

    return(
        <div className="container">
            <div className="jumbotron">
                <h4>Login</h4>
                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            className="form-control" 
                            type="text" 
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                            {formik.errors.email ? 
                                <div className="text-danger">{formik.errors.email}</div>
                                : null
                            }
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            className="form-control" 
                            type="text" 
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                            {formik.errors.password ? 
                                <div className="text-danger">{formik.errors.password}</div>
                                : null
                            }
                    </div>
                    <button className="btn btn-primary">Submit</button>
                    <a 
                        href="#"
                        onClick={() => {
                            window.location.href = 'register';
                        }}
                    >
                        Register
                    </a>     
                </form>
            </div>
        </div>
    )

}

export default Login;