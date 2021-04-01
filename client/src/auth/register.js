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

const Register = (props) => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema:yup.object({
            name:yup.string()
            .required("Name is required")
            .strict()
            .trim()
            .min(5, "Minimum 5 characters required")
            .max(15, "Maximum 15 characters only"),
            email:yup.string()
            .email()
            .required("Email is required"),
            password:yup.string()
            .required("Password is required"),
            confirmPassword:yup.string()
            .oneOf([yup.ref('password'),null],"Password and confirm password must be same")
            .required("Confirm Password List is required")
        }),
        // validate,
        onSubmit:(data) => {
            console.log(data);
            axios.post('http://localhost:5000/api/register', data)
            .then(res => {
                toast.success("User Register successful");
                props.history.push('/login');
            })
            .catch(err => {
                    toast.error(err.response.data);
            })
        }
    })

    return(
        <div className="container">
            <div className="jumbotron">
                <h4>Register</h4>
                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            className="form-control" 
                            type="text" 
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                            {formik.errors.name ? 
                                <div className="text-danger">{formik.errors.name}</div>
                                : null
                            }
                    </div>
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
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            className="form-control" 
                            type="text" 
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                        />
                            {formik.errors.confirmPassword ? 
                                <div className="text-danger">{formik.errors.confirmPassword}</div>
                                : null
                            }
                    </div> 
                    <button className="btn btn-primary">Submit</button>
                    <a 
                        href="#"
                        onClick={() => {
                            window.location.href = 'login';
                        }}
                    >
                        Login
                    </a>     
                </form>
            </div>
        </div>
    )

}

export default Register;