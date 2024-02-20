import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import http from "../../../http";
import { DataTable, Loading } from "../../../components";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";

export const List = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    http
      .get("/cms/staffs/")
      .then(({ data }) => setStaffs(data))
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
              .delete(`/cms/staffs/${id}`)
              .then(() => http.get("/cms/staffs"))
              .then(({ data }) => setStaffs(data))
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
            <h1>Staff</h1>
          </Col>
          <Col xs="auto">
            <Link to="/cms/staffs/create" className="btn btn-dark">
              <i className="bi-plus-lg me-2"></i> Add Staff
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <Loading />
            ) : (
              <DataTable
                sortable={["Name", "Email","Address","Status","Phone","Created At","Updated At"]}
                searchable={["Name", "Email","Address","Status","Phone","Created At","Updated At"]}
                data={staffs.map((staff) => {
                  return {
                    Name: staff.name,
                    Email: staff.email,
                    Address: staff.address,
                    Phone: staff.phone,
                    Status: staff.status ? "Active" : "Inactive",
                    CreatedAt: moment(staff.createdAt).format("lll"),
                    UpdateAt: moment(staff.updateAt).format("lll"),
                    Action: (
                      <>
                        <Link
                          to={`/cms/staffs/${staff._id}`}
                          className="btn btn-dark btn-sm me-2"
                        >
                          <i className="bi-pencil-square me-2"></i> Edit
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          type="button"
                          onClick={() => handleDelete(staff._id)}
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
