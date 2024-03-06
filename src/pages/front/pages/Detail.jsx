import { Loading } from "@/components";
import http from "@/http";
import { imgUrl } from "@/lib";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const [product, setProduct] = useState({images:[]});
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = () => {
    setLoading(true);
    http
      .get(`products/${params.id}`)
      .then(({ data }) => {
        setProduct(data);
        return http.get(`products/${params.id}/similar`);
      })
      .then(({ data }) => {
        setSimilar(data);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  return (
    <div className="col-12">
     {loading ? <Loading/> : <main className="row">
        <div className="col-12 bg-white py-3 my-3">
          <div className="row">
            <div className="col-lg-5 col-md-12 mb-3">
              <div className="col-12 mb-3">
                <div
                  className="img-large border"
                  style={{backgroundImage: `url('${imgUrl(product.images[0])}')`}}
                ></div>
              </div>
              <div className="col-12">
                <div className="row">
                  {product.images.map((image,i)=> <div
                  className="col-sm-2 col-3" key={i}>
                    <div className="img-small border" style={{backgroundImage:`url('${imgUrl(image)}')`}}>

                    </div>

                  </div>)}
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-9">
              <div className="col-12 product-name large">
                Area 51M Gaming Laptop Welcome to A New ERA with 9TH GEN Intel
                CORE I9-9900K NVIDIA GEFORCE RTX 2080 8GB GDDR6 17.3" FHD 144HZ
                AG G-SYNC TOBII EYETRACKING (1TB SSD RAID|32GB RAM|10 PRO)
                <small>
                  By <a href="#">Dell</a>
                </small>
              </div>
              <div className="col-12 px-0">
                <hr />
              </div>
              <div className="col-12">
                <ul>
                  <li>
                    Processor 8th Generation Intel Core i9-8950HK (6-Core, 12MB
                    Cache, Overclocking up to 5.0GHz)
                  </li>
                  <li>
                    Memory 32GB DDR4-2666MHz, 2x16GB Ram Speed Gaming
                    Performance
                  </li>
                  <li>
                    Hard Drive 1TB SSD RAID 0 (2x 512GB PCIe NVME M.2 SSDs) +
                    1TB (+8GB SSHD) Hybrid Drive
                  </li>
                  <li>
                    17.3" Full HD display 1920 x 1080 resolution boasts
                    impressive color and clarity. IPS technology for wide
                    viewing angles.
                  </li>
                  <li>Video Card NVIDIA® GeForce® RTX 2080 with 8GB GDDR6</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 text-center">
              <div className="col-12 sidebar h-100">
                <div className="row">
                  <div className="col-12">
                    <span className="detail-price">$2,500</span>
                    <span className="detail-price-old">$2,800</span>
                  </div>
                  <div className="col-xl-5 col-md-9 col-sm-3 col-5 mx-auto mt-3">
                    <div className="mb-3">
                      <label htmlFor="qty">Quantity</label>
                      <input
                        type="number"
                        id="qty"
                        min="1"
                        value="1"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <button className="btn btn-outline-dark" type="button">
                      <i className="fas fa-cart-plus me-2"></i>Add to cart
                    </button>
                  </div>
                  <div className="col-12 mt-3">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      type="button"
                    >
                      <i className="fas fa-heart me-2"></i>Add to wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mb-3 py-3 bg-white text-justify">
          <div className="row">
            <div className="col-md-7">
              <div className="col-12">
                <div className="row">
                  <div className="col-12 text-uppercase">
                    <h2>
                      <u>Details</u>
                    </h2>
                  </div>
                  <div className="col-12" id="details">
                    <h4>OPERATING SYSTEM</h4>

                    <p>
                      <strong>Available with Windows 10 Home:</strong> Gaming is
                      better than ever on Windows 10, with games in 4K, DirectX
                      12, and streaming your gameplay*.
                    </p>
                    <hr />
                    <h4>CONSIDER THE GAME CHANGED</h4>

                    <p>
                      The Alienware Area-51m is unlike any mobile gaming machine
                      ever created. With unprecedented desktop-level processing
                      power, CPU and GPU upgradability, advanced cooling and a
                      premium, revolutionary design, a true desktop-gaming
                      experience is now available in the form of a laptop.
                    </p>
                    <hr />
                    <h4>DESKTOP POWER PACKED INTO A LAPTOP</h4>

                    <p>
                      The Area-51m features a host of firsts for peak
                      performance and power. It’s our first-ever Alienware
                      laptop to feature 8-core, 16-thread Intel® processors,
                      giving it a whole new level of compute power versus other
                      gaming laptops. Engineered with desktop processors, the
                      CPU is enabled with up to 125% rated power, allowing
                      high-end overclocking. This results in higher performance
                      for megatasking, CPU-intensive gaming, as well as
                      day-to-day applications.
                    </p>

                    <p>
                      Lose yourself in vivid, uninterrupted gaming thanks to
                      NVIDIA® GeForce RTX™ graphics with full-throttle power and
                      up to 30W of overclocking headroom—all on an immersive
                      144Hz G-SYNC 17" Full HD display. Users can overclock
                      their settings via the new Alienware Command Center.
                    </p>

                    <p>
                      The Area-51m is also our first-ever Alienware laptop to
                      support up to 64GB of DDR4 memory, ensuring you have
                      enough RAM for even the most performance-intensive tasks.
                    </p>
                    <hr />
                    <h4>UNPRECEDENTED UPGRADEABILITY</h4>

                    <p>
                      Gamers have made it clear that they’ve noticed a lack of
                      CPU and GPU upgradability in gaming laptops.
                    </p>

                    <p>
                      The Area-51m was engineered with this in mind, finally
                      allowing gamers to harness power comparable to even the
                      highest-performance desktop, and taking advantage of
                      latest technologies from NVIDIA® such as ray tracing,
                      DLSS, and AI enhanced graphics.
                    </p>

                    <p>
                      CPU upgrades can be done using standard desktop-className
                      processors, while GPU upgrades can be done via onboard
                      graphics module replacement or with the Alienware Graphics
                      Amplifier.
                    </p>
                    <hr />
                    <h4>ADVANCED ALIENWARE CRYO-TECH COOLING</h4>

                    <p>
                      Our thermal technology, Advanced Alienware Cryo-Tech v2.0,
                      optimizes component cooling, which maximizes overall
                      performance and keeps your laptop cool to the touch.
                      Here’s a closer look at our innovative cooling solution.
                    </p>

                    <p>
                      <strong>Dual-Intake, Dual-Exhaust Airflow Design:</strong>{" "}
                      The Area-51m chassis prioritizes performance with a dual
                      fan design that pulls in cool air from the bottom and top
                      vents, while exhaling exhaust out the rear and side vents
                      for optimal core component cooling. (The Intel® Core™
                      i7-8700 with NVIDIA® GeForce RTX™ 2060 configuration does
                      not have a side-exhaust)
                    </p>

                    <p>
                      <strong>High Voltage Driving Fan:</strong> The fire
                      resistant, liquid-crystal polymer fan is built with 0.2mm
                      blades, sleeve bearings and 3-phase fan control to create
                      less friction and circulate air more efficiently. The
                      Area-51m fans occupy an area of 95x105mm with a thickness
                      ranging from 19mm to 21.5mm and can push over 25 CFM in
                      open air conditions—something normally seen only in
                      desktops.
                    </p>

                    <p>
                      <strong>Load-balancing Heat Pipes:</strong> The dynamics
                      of thermal activity across critical components like the
                      GPU and the CPU are intelligently discharged across
                      various dedicated and shared 8mm and 6mm copper-composite
                      heat pipes.The highest-end configurations carry 7 total
                      heat pipes.
                    </p>

                    <p>
                      <strong>Copper Fin Stacks:</strong> The Area-51m features
                      best-in-className surface temperatures, largely due to a
                      thermal module, including four 0.15mm copper fins.Heat is
                      drawn away from the most critical components to prioritize
                      system performance and longevity.
                    </p>

                    <p>
                      <strong>Thermal Control:</strong> Cryo-Tech v2.0 ensures
                      that 100% of the system's GPU thermal design power is
                      enabled, while also ensuring CPU-intensive games benefit
                      from high performance.
                    </p>

                    <p>
                      <strong>Whisper-quiet:</strong> The cooling system of the
                      Area-51m is so powerful, virtually no noise is heard while
                      engaged in daily tasks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <div className="col-12 px-md-4 sidebar h-100">
                <div className="row">
                  <div className="col-12 mt-md-0 mt-3 text-uppercase">
                    <h2>
                      <u>Ratings & Reviews</u>
                    </h2>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-sm-4 text-center">
                        <div className="row">
                          <div className="col-12 average-rating">4.1</div>
                          <div className="col-12">of 100 reviews</div>
                        </div>
                      </div>
                      <div className="col">
                        <ul className="rating-list mt-3">
                          <li>
                            <div className="progress">
                              <div
                                className="progress-bar bg-dark"
                                role="progressbar"
                                style={{width: "45%"}}
                                aria-valuenow="45"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                45%
                              </div>
                            </div>
                            <div className="rating-progress-label">
                              5<i className="fas fa-star ms-1"></i>
                            </div>
                          </li>
                          <li>
                            <div className="progress">
                              <div
                                className="progress-bar bg-dark"
                                role="progressbar"
                                style={{width: "30%"}}
                                aria-valuenow="30"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                30%
                              </div>
                            </div>
                            <div className="rating-progress-label">
                              4<i className="fas fa-star ms-1"></i>
                            </div>
                          </li>
                          <li>
                            <div className="progress">
                              <div
                                className="progress-bar bg-dark"
                                role="progressbar"
                                style={{width: "15%"}}
                                aria-valuenow="15"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                15%
                              </div>
                            </div>
                            <div className="rating-progress-label">
                              3<i className="fas fa-star ms-1"></i>
                            </div>
                          </li>
                          <li>
                            <div className="progress">
                              <div
                                className="progress-bar bg-dark"
                                role="progressbar"
                                style={{width: "7%"}}
                                aria-valuenow="7"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                7%
                              </div>
                            </div>
                            <div className="rating-progress-label">
                              2<i className="fas fa-star ms-1"></i>
                            </div>
                          </li>
                          <li>
                            <div className="progress">
                              <div
                                className="progress-bar bg-dark"
                                role="progressbar"
                                style={{width:" 3%"}}
                                aria-valuenow="3"
                                aria-valuemin="3"
                                aria-valuemax="100"
                              >
                                3%
                              </div>
                            </div>
                            <div className="rating-progress-label">
                              1<i className="fas fa-star ms-1"></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 px-md-3 px-0">
                    <hr />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <h4>Add Review</h4>
                  </div>
                  <div className="col-12">
                    <form>
                      <div className="mb-3">
                        <textarea
                          className="form-control"
                          placeholder="Give your review"
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex ratings justify-content-end flex-row-reverse">
                          <input
                            type="radio"
                            value="5"
                            name="rating"
                            id="rating-5"
                          />
                          <label htmlFor="rating-5"></label>
                          <input
                            type="radio"
                            value="4"
                            name="rating"
                            id="rating-4"
                          />
                          <label htmlFor="rating-4"></label>
                          <input
                            type="radio"
                            value="3"
                            name="rating"
                            id="rating-3"
                          />
                          <label htmlFor="rating-3"></label>
                          <input
                            type="radio"
                            value="2"
                            name="rating"
                            id="rating-2"
                          />
                          <label htmlFor="rating-2"></label>
                          <input
                            type="radio"
                            value="1"
                            name="rating"
                            id="rating-1"
                            checked
                          />
                          <label htmlFor="rating-1"></label>
                        </div>
                      </div>
                      <div className="mb-3">
                        <button className="btn btn-outline-dark">
                          Add Review
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 px-md-3 px-0">
                    <hr />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="col-12 text-justify py-2 px-3 mb-3 bg-gray">
                      <div className="row">
                        <div className="col-12">
                          <strong className="me-2">Steve Rogers</strong>
                          <small>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                          </small>
                        </div>
                        <div className="col-12">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Fusce ut ullamcorper quam, non congue odio.
                          <br />
                          Fusce ligula augue, faucibus sed neque non, auctor
                          rhoncus enim. Sed nec molestie turpis. Nullam accumsan
                          porttitor rutrum. Curabitur eleifend venenatis
                          volutpat.
                          <br />
                          Aenean faucibus posuere vehicula.
                        </div>
                        <div className="col-12">
                          <small>
                            <i className="fas fa-clock me-2"></i>5 hours ago
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 text-justify py-2 px-3 mb-3 bg-gray">
                      <div className="row">
                        <div className="col-12">
                          <strong className="me-2">Bucky Barns</strong>
                          <small>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                          </small>
                        </div>
                        <div className="col-12">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Fusce ut ullamcorper quam, non congue odio.
                          <br />
                          Aenean faucibus posuere vehicula.
                        </div>
                        <div className="col-12">
                          <small>
                            <i className="fas fa-clock me-2"></i>5 hours ago
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-12 py-3">
              <div className="row">
                <div className="col-12 text-center text-uppercase">
                  <h2>Similar Products</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-sm-6 my-3">
                  <div className="col-12 bg-white text-center h-100 product-item">
                    <div className="row h-100">
                      <div className="col-12 p-0 mb-3">
                        <a href="product.html">
                          <img src="images/image-4.jpg" className="img-fluid" />
                        </a>
                      </div>
                      <div className="col-12 mb-3">
                        <a href="product.html" className="product-name">
                          Dell Alienware Area 51
                        </a>
                      </div>
                      <div className="col-12 mb-3">
                        <span className="product-price">$4,500</span>
                      </div>
                      <div className="col-12 mb-3 align-self-end">
                        <button className="btn btn-outline-dark" type="button">
                          <i className="fas fa-cart-plus me-2"></i>Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>}
    </div>
  );
};
