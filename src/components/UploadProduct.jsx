import React, { useState } from 'react';
import axios from 'axios';

const UploadProduct = () => {
  const [Product_name, setProductname] = useState("");
  const [products_description, setProductdescription] = useState("");
  const [Product_cost, setProductcost] = useState("");
  const [product_photo, setProductphoto] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please be patient as we upload your product");

    try {
      const data = new FormData();
      data.append("product_name", Product_name);
      data.append("product_description", products_description);
      data.append("product_cost", Product_cost);
      data.append("product_photo", product_photo);

      const response = await axios.post(
        "https://noisyintruder2.pythonanywhere.com/api/add_products",
        data
      );

      setLoading("");
      setSuccess(response.data.Message);

      setProductname("");
      setProductdescription("");
      setProductcost("");
      setProductphoto("");
    } catch (error) {
      setLoading("");
      setError("Something went wrong");
    }
  };

  return (
    <div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 card shadow p-5 bg-secondary">
          <form onSubmit={submit} className="p-3">
            <h2><i>Upload products 📤</i></h2>

            {loading && <div className="alert alert-info">{loading}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <input
              type="text"
              placeholder="Enter Product_name"
              className="form-control mb-3"
              required
              value={Product_name}
              onChange={(e) => setProductname(e.target.value)}
            />

            <textarea
              placeholder="Enter Products description"
              className="form-control mb-3"
              required
              value={products_description}
              onChange={(e) => setProductdescription(e.target.value)}
            ></textarea>

            <input
              type="number"
              placeholder="Enter Product_cost"
              className="form-control mb-3"
              required
              value={Product_cost}
              onChange={(e) => setProductcost(e.target.value)}
            />

            <input
              type="file"
              className="form-control mb-3"
              required
              onChange={(e) => setProductphoto(e.target.files[0])}
            />

            <button type="submit" className="btn btn-success">
              Upload product 📤
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;