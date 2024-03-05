import { Loading, Product } from "@/components";
import http from "@/http";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Brand = () => {
  const [brand, setBrand] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    setLoading(true);

    http
      .get(`/brands/${params.id}`)
      .then(({ data }) => {
        setBrand(data);
        return http.get(`brands/${params.id}/products`);
      })
      .then(({ data }) => setProducts(data))
      .catch((err) => {})
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <div className="col-12">
      <main className="row">
        <div className="row">
          <div className="col-12 py-3">
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="row">
                  <div className="col-12 text-center text-uppercase">
                    <h2>{brand.name}</h2>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-sm-2 justify-content-center">
            {products.length > 0 ? (
              products.map((product) => (
                <Product product={product} key={product._id} />
              ))
            ) : (
              <h4 className="text-muted text-center">No Data</h4>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
