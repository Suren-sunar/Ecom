import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import http from "../../../http";
import { DataTable, Loading } from "../../../components";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";

export const List = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    http
      .get("/cms/reviews/")
      .then(({ data }) => setReviews(data))
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
              .delete(`/cms/Reviews/${id}`)
              .then(() => http.get("/cms/Reviews"))
              .then(({ data }) => setReviews(data))
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
            <h1>Reviews</h1>
          </Col>
          <Col xs="auto">
            
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
                data={reviews.map((review) => {
                  return {
                    User:'user' in review ?  review.user.name : 'Removed User',
                    Product: 'product' in review ?  review.product.name : 'Removed Product',

                   Comment: review.comment,
                   Rating: review.rating,
                    CreatedAt: moment(review.createdAt).format("lll"),
                    UpdateAt: moment(review.updateAt).format("lll"),
                    Action: (
                      <>
                     
                        <Button
                          variant="danger"
                          size="sm"
                          type="button"
                          onClick={() => handleDelete(review._id)}
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
