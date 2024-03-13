import { imgUrl } from "@/lib";
import { products } from "@/pages/cms";
import { addToCart, clearCart } from "@/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const Cart = () => {
  const cart = useSelector((state) => state.cart.value);
  const user = useSelector((state) => state.user.value);

  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      let q = 0,
        p = 0;

      for (let k in cart) {
        let product = cart[k].product;

        q += cart[k].qty;
        p +=
          parseFloat(product.discounted_price || product.price) * cart[k].qty;
      }
      setQty(q);
      setPrice(p);
    } else {
      setQty(0);
      setPrice(0);
    }
  }, [cart]);

  const handleQtyChange = (product, qt) => {
    let temp = { ...cart };

    temp[product.id] = {
      product,
      qty: qt,
    };

    dispatch(addToCart(temp));
  };

  const handleDelete = (id) => {
    let temp = {};

    for (let k in cart) {
      if (k != id) {
        temp[k] = cart[k];
      }
    }
    if (Object.keys(temp).length > 0) {
      dispatch(addToCart(temp));
    } else {
      dispatch(clearCart());
    }
  };
  const handeCheckout = () => {
    if (Object.keys(user).length > 0) {
    } else {
      toast.error("Please login to place your order");
    }
  };
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
          <h2>Shopping Cart</h2>
        </div>
      </div>

      <main className="row">
        <div className="col-12 bg-white py-3 mb-3">
          {Object.keys(cart).length > 0 ? (
            <div className="row">
              <div className="col-lg-6 col-md-8 col-sm-10 mx-auto table-responsive">
                <div className="row">
                  <div className="col-12">
                    <table className="table table-striped table-hover table-sm">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Amount</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.values(cart).map((item) => (
                          <tr key={item.product._id}>
                            <td>
                              <img
                                src={imgUrl(item.product.images[0])}
                                className="img-fluid"
                              />
                              {item.product.name}
                            </td>
                            <td>
                              Rs.
                              {item.product.discounted_price ||
                                item.product.price}
                            </td>
                            <td>
                              <input
                                type="number"
                                min="1"
                                defaultValue={item.qty}
                                onChange={({ target }) =>
                                  handleQtyChange(
                                    item.product,
                                    parseInt(target.value)
                                  )
                                }
                              />
                            </td>
                            <td>
                              Rs.{" "}
                              {parseFloat(
                                item.product.discounted_price ||
                                  item.product.price
                              ) * item.qty}
                            </td>
                            <td>
                              <button
                                className="btn btn-link text-danger"
                                onClick={() => handleDelete(item.product._id)}
                                type="button"
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colspan="3" className="text-right">
                            Total
                          </th>
                          <th>Rs.{price}</th>
                          <th></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="col-12 text-right">
                    <button
                      className="btn btn-outline-secondary me-3"
                      type="submit"
                      onClick={() => dispatch(clearCart())}
                    >
                      Clear Cart
                    </button>
                    <button
                      className="btn btn-outline-success"
                      onClick={handeCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h4 className="textaligncenter">Shopping cart is empty</h4>
          )}
        </div>
      </main>
    </div>
  );
};
