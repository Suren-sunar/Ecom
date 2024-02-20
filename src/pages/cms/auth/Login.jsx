import { Col, Form, Row, Spinner } from "react-bootstrap"
import { config, setStorage } from "../../../lib"
import { Formik, useFormik } from "formik"
import { InpField, SubmitBtn } from "../../../components"
import * as Yup from "yup"
import http from "../../../http"
import { useDispatch } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { setUser } from "../../../store"

export const Login=() =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues:{
            email:'',
            password:'',
            remember:false,

        },
        validationSchema:Yup.object({
            email:Yup.string().required().email(),
            password:Yup.string().required(),
        }),
        onSubmit:(values, {setSubmitting})=>{
            http.post('/login', values)
                .then(({data}) =>{
                    if(data.user.type !== 'Customer'){
                        dispatch(setUser(data.user))

                        setStorage('react_ecom_token', data.token , values.remember)
                        
                        navigate('/cms/dashboard')
                    }
                    else{
                        formik.setFieldError('email', 'invalid mail address')
                    }
                   
                })
                .catch(err =>{})
                .finally(()=>setSubmitting(false))


        }
    })

    const formSchema=[
        {
            name:'email',
            type:'email',
            label:'Email'
        },
        {
            name:'password',
            type:'password',
            label:'Password'
        },
    ]

    return <Col lg={4} sm={8} xs={12}  className='bg-white py-3 my-5 mx-auto rounded-3 shadow-sm'>
    <Row>
        <Col>
        <h1>{config('app_name')}</h1>
        </Col>
    </Row>
    <Row>
        <Col>
        <Form onSubmit={formik.handleSubmit}>
            
            {formSchema.map((item , i)=> <InpField key={i}
             type={item.email} 
             name={item.name} 
             label={item.label} 
             formik={formik}/>)}
             <Form.Check className="mb-3">
                <Form.Check.Input
                 name="remember" 
                 id="remember" 
                checked={formik.values.remember} 
                onClick={()=> formik.setFieldValue('remember', !formik.values.remember)}/>
                <Form.Check.Label htmlFor="remember" > Remember Me</Form.Check.Label>
             </Form.Check>
             <div className="mb-3 d-grid" >
                     <SubmitBtn text="Log In" icon="bi-box-arrow-in-right" loading={formik.isSubmitting}/>
             </div>

        </Form>
        </Col>
    </Row>
</Col>
    
   

}