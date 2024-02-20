import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import http from "../../../http";
import { DataTable, Loading } from "../../../components";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";

export const List = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);   

    http
      .get("/cms/brands/")
      .then(({ data }) => setBrands(data))
      .catch((err) => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          className: "text-bg-danger",
          onClick: () => {
            setLoading(true);

            http
              .delete(`/cms/brands/${id}`)
              .then(() => http.get("/cms/brands"))
              .then(({ data }) => setBrands(data))
              .catch((err) => {})
              .finally(() => setLoading(false));
          },
        },
        {
          label: "no",
          className: "text-bg-secondary",
        },
      ],
    });
  };

  return (
    <>
      <Col xs={12} className="bg-white py-3 my-3 rounded-3 shadow-sm">
        <Row>
          <Col>
            <h1>Brands</h1>
          </Col>
          <Col xs="auto">
            <Link to="/cms/brands/create" className="btn btn-dark">
              <i className="bi-plus-lg me-2"></i> Add Brands
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <Loading />
            ) : (
              <DataTable
                sortable={["Name","Status","Phone","Created At","Updated At"]}
                searchable={["Name","Status","Phone","Created At","Updated At"]}
                data={brands.map((brands) => {
                  return {
                    Name: brands.name,
                    Status: brands.status ? "Active" : "Inactive",
                    CreatedAt: moment(brands.createdAt).format("lll"),
                    UpdateAt: moment(brands.updateAt).format("lll"),
                    Action: (
                      <>
                        <Link
                          to={`/cms/brands/${brands._id}`}
                          className="btn btn-dark btn-sm me-2"
                        >
                          <i className="bi-pencil-square me-2"></i> Edit
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          type="button"
                          onClick={() => handleDelete(brands._id)}
                        >
                          <i className="bi-trash me-2">Delete</i>
                        </Button>
                      </>
                    ),
                  };
                })}
              />
            )}
          </Col>
        </Row>
      </Col>
    </>
  );
};
