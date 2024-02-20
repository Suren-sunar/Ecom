import { useFormik } from 'formik';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { InpField, SubmitBtn } from '../../../components';
import http from '../../../http';
import { useNavigate } from 'react-router-dom';

export const Create = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            status: true 
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            status: Yup.boolean().required()
        }),
        onSubmit: (values, { setSubmitting }) => {
            http.post('/cms/categories', values)
                .then(() => navigate('/cms/categories'))
                .catch(err => console.error(err))
                .finally(() => setSubmitting(false));
        }
    });

    return (
        <Col xs={12} className='bg-white py-3 my-3 rounded-3 shadow-sm'>
            <Row>
                <Col>
                    <h1>Add categories</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InpField formik={formik} name='name' label='Name' />
                            <div className='mb-3'>
                            <Form.Label htmlFor='status'>Status</Form.Label>
                            <Form.Select
                                id='status'
                                name='status'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.status}
                                isInvalid={formik.touched.status && formik.errors.status}
                            >
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </Form.Select>
                            {formik.touched.status && formik.errors.status && <Form.Control.Feedback type='invalid'>{formik.errors.status}</Form.Control.Feedback>}
                        </div>
                        <SubmitBtn loading={formik.isSubmitting} />
                    </Form>
                </Col>
            </Row>
        </Col>
    );
};
