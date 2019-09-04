import React from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import './App.css'

const App = ({
  values,
  errors,
  touched,
  isSubmitting
  // handleChange,
  // handleSubmit
}) => {
  return (
    // <form onSubmit={handleSubmit}>
    //   <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
    //   <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
    //   <button type="submit">Submit</button>
    // </form>
    <Form>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>
      <label>
        <Field type="checkbox" name="remember" checked={values.remember} />
        Remember me
      </label>
      <Field component="select" name="plan">
        <option value="free">Free</option>
        <option value="premium">Premium</option>
      </Field>
      <button type="submit" disabled={isSubmitting}>Submit</button>
    </Form>
  );
}

const FormikApp = withFormik({
  mapPropsToValues ({email, password, remember, plan}) {
    return {
      email: email || '',
      password: password || '',
      remember: remember || true,
      plan: plan || 'premium'
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email is not valid').required('Email is a required field homie!'),
    password: Yup.string().min(10, 'Password must be bigger than a breadbox').required('Password is reqd')
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === 'justin@justin.guru') {
        // formik bag
        setErrors({ email: 'That is Justin email. Pick another.'})
      } else {
        resetForm()
      }
      setSubmitting(false)
    }, 1000)
    console.log(values)
  }
})(App)

export default FormikApp