import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import http from "../../../http";
import { DataTable, Loading } from "../../../components";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";

export const List = () => {
  const [categorys, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    http
      .get("/cms/categories/")
      .then(({ data }) => setCategories(data))
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
              .delete(`/cms/Categories/${id}`)
              .then(() => http.get("/cms/Categories"))
              .then(({ data }) => setCategories(data))
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
            <h1>Categories</h1>
          </Col>
          <Col xs="auto">
            <Link to="/cms/Categories/create" className="btn btn-dark">
              <i className="bi-plus-lg me-2"></i> Add Category
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
                data={categorys.map((category) => {
                  return {
                    Name: category.name,
                    Status: category.status ? "Active" : "Inactive",
                    CreatedAt: moment(category.createdAt).format("lll"),
                    UpdateAt: moment(category.updateAt).format("lll"),
                    Action: (
                      <>
                        <Link
                          to={`/cms/categories/${category._id}`}
                          className="btn btn-dark btn-sm me-2"
                        >
                          <i className="bi-pencil-square me-2"></i> Edit
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          type="button"
                          onClick={() => handleDelete(category._id)}
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
