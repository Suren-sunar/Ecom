import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { InpField, Loading, SubmitBtn } from "../../../components";
import http from "../../../http";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      summary: "",
      discription: "",
      price: "",
      discounted_price: "",
      categorId: "",
      brandId: "",
      images: undefined,
      featured: "false",
      status: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      summary: Yup.string().required(),
      discription: Yup.string().required(),
      price: Yup.string().required(),
      discounted_price: Yup.string().required().nullable(),
      categorId: Yup.string().required("category is a required field."),
      brandId: Yup.string().required("Brand is a required field."),
      images: Yup.mixed()
        .required()
        .test("fileType", "images must be valid format", (files) => {
          for (let file of files) {
            if (!file.type.startsWith("/image")) {
              return false;
            }
            return true;
          }
        }),
      featured: Yup.string().required(),
      status: Yup.boolean().required(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      let fd = new FormData();

      for (let k in values) {
        if (k == "images") {
          for (let img in values[k]) {
            fd.append(k, img);
          }
        } else {
          fd.append(k, values[k]);
        }
      }

      http
        .post("/cms/products", fd, {
          "Content-Type": "Multipart/form-data",
        })
        .then(() => navigate("/cms/products"))
        .catch((err) => console.error(err))
        .finally(() => setSubmitting(false));
    },
  });

  useEffect(() => {
    setLoading(true);

    http
      .get("/cms/categories")
      .then((data) => {
        setCategories(data);

        return http.get("/cms/brands");
      })
      .then(({ data }) => setBrand(data))
      .catch((err) => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Col xs={12} className="bg-white py-3 my-3 rounded-3 shadow-sm">
      <Row>
        <Col>
          <h1>Add Products</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <Loading />
          ) : (
            <Form onSubmit={formik.handleSubmit}>
              <InpField formik={formik} name="name" label="Name" />
              <InpField
                formik={formik}
                name="summary"
                label="Summary"
                isTextArea
              />
              <InpField
                formik={formik}
                name="discription"
                label="Discription"
                isTextArea
              />
              <InpField
                formik={formik}
                name="price"
                label="Price"
                type="number"
              />
              <InpField
                formik={formik}
                name="discounted_price"
                label="Discounted Price"
                type="number"
              />
              <div className="mb-3">
                <Form.Label htmlFor="brandId">Brand</Form.Label>
                <Form.Select
                  id="brandId"
                  name="brandId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.brandId}
                  isInvalid={formik.touched.brandId && formik.errors.brandId}
                >
                  <option value="">Select a brand</option>
                  {brand.map((brand) => (
                    <option value={brand.id} key={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </Form.Select>
                {formik.touched.status && formik.errors.status && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.status}
                  </Form.Control.Feedback>
                )}
              </div>
              <div className="mb-3">
                <Form.Label htmlFor="categoryId">Category</Form.Label>
                <Form.Select
                  id="categoryId"
                  name="categoryId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.categoryId}
                  isInvalid={
                    formik.touched.categoryId && formik.errors.categoryId
                  }
                >
                  <option value="">Select a Category</option>
                  {brand.map((categories) => (
                    <option value={categories.id} key={categories._id}>
                      {categories.name}
                    </option>
                  ))}
                </Form.Select>
                {formik.touched.status && formik.errors.status && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.status}
                  </Form.Control.Feedback>
                )}
              </div>
              <div className="mb-3">
                <Form.Label htmlFor="status">Status</Form.Label>
                <Form.Select
                  id="status"
                  name="status"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                  isInvalid={formik.touched.status && formik.errors.status}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </Form.Select>
                {formik.touched.status && formik.errors.status && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.status}
                  </Form.Control.Feedback>
                )}
              </div>
              <div className="mb-3">
                <Form.Label htmlFor="featured">Featured</Form.Label>
                <Form.Select
                  id="featured"
                  name="featured"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.featured}
                  isInvalid={formik.touched.featured && formik.errors.featured}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Select>
                {formik.touched.featured && formik.errors.featured && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.featured}
                  </Form.Control.Feedback>
                )}
              </div>
              <div className="mb-3">
                <Form.Label htmlFor='images'>Images</Form.Label>
                <Form.Control 
                type='file'
                name='images'
                id='images'
                accept="image/*"
                multiple
                value={ formik.values[images]}
                onChange={formik.setFieldValue('images',target.files)} 
                onBlur={formik.handleBlur}
                isValid={formik.touched[images] && formik.values[images]}
                isInvalid={formik.touched[images] && formik.errors[images]} />

                {formik.touched[images] && formik.errors[images] && 
                <Form.Control.Feedback type="invalid">{formik.errors[images]}</Form.Control.Feedback>}
            </div>
              <SubmitBtn loading={formik.isSubmitting} />
            </Form>
          )}
        </Col>
      </Row>
    </Col>
  );
};
