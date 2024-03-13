import { useFormik } from "formik";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { InpField, SubmitBtn } from "@/components";
import http from "@/http";
import { config } from "@/lib";

export const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      phone: Yup.string().required().max(30),
      address: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(4)
        .max(16)
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(
          /[A-Z]/,
          "Password must contain at least one uppercase letter"
        ),
      confirm_password: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Password not confirmed"), 
    }),
    onSubmit: (values, { setSubmitting }) => {
      http
        .post("/register", values)
        .then(() => {
          navigate("/login");
        })
        .catch((err) => console.error(err))
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <Col
      lg={4}
      sm={8}
      xs={12}
      className="bg-white py-3 my-5 mx-auto rounded-3 shadow-sm"
    >
      <Row>
        <Col>
          <h1>{config("app_name")}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <InpField formik={formik} name="name" label="Name" />
            <InpField formik={formik} name="email" label="Email" type="email" />
            <InpField formik={formik} name="phone" label="Phone" />
            <InpField
              formik={formik}
              name="address"
              label="Address"
              isTextArea
            />
            <InpField
              formik={formik}
              name="password"
              label="Password"
              type="password"
            />
            <InpField
              formik={formik}
              name="confirm_password"
              label="Confirm Password"
              type="password"
            />{" "}
        
            <div className="mb-3"></div>
            <SubmitBtn loading={formik.isSubmitting} text="Register" />
          </Form>
        </Col>
      </Row>
    </Col>
  );
};
