import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {Redirect} from "react-router-dom";
import {loginTC} from "./auth-reducer";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    let dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Password should contain more than 2 characters';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    if (isLoggedIn) return <Redirect to={'/'}/>

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in, please get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or please use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="*Email"
                            margin="normal"
                            type="email"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email
                            ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                            : null}
                        <TextField
                            type="password"
                            label="*Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password
                            ? <div style={{color: 'red'}}>{formik.errors.password}</div>
                            : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox/>}
                            {...formik.getFieldProps('rememberMe')}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
