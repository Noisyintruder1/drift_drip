import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "../App.css";
import { Card } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from './contexts/CartContext';

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const { addToCart } = useCart();

  const img_url = "https://Noisyintruder2.pythonanywhere.com/static/images/";

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://Noisyintruder2.pythonanywhere.com/api/get_products"
      );
      setProducts(response.data);
      // Initialize quantities and sizes
      const initialQuantities = {};
      const initialSizes = {};
      response.data.forEach(product => {
        initialQuantities[product.product_id] = 1;
        // Default to size 38 if it's a shoe product
        initialSizes[product.product_id] = product.category === 'shoes' ? 38 : null;
      });
      setQuantities(initialQuantities);
      setSelectedSizes(initialSizes);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      toast.info("Please login to add items to cart");
      navigate('/Login');
      return;
    }

    if (!product.product_id) {
      console.error("Product is missing ID:", product);
      toast.error("Product error - please try again");
      return;
    }

    const quantity = quantities[product.product_id] || 1;
    const size = selectedSizes[product.product_id];

    const cartItem = {
      product_id: product.product_id,
      product_name: product.product_name,
      product_description: product.product_description,
      product_cost: product.product_cost,
      product_photo: product.product_photo,
      quantity: quantity,
      ...(product.category === 'shoes' && { size: size }) // Only include size if it's a shoe
    };

    addToCart(cartItem);
    toast.success(`${product.product_name} (${quantity}x${size ? `, size ${size}` : ''}) added to cart!`);
  };

  const handlePurchase = (product) => {
    if (!isAuthenticated) {
      toast.info("Please login to make a purchase");
      navigate('/Login');
      return;
    }
    const size = selectedSizes[product.product_id];
    navigate("/MakePayments", { state: { product, size } });
  };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container text-center mt-5" style={{ backgroundColor: '#121212', minHeight: '100vh', paddingTop: '20vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ color: '#ffffff' }}>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container alert alert-danger mt-5" style={{ backgroundColor: '#121212', minHeight: '100vh', paddingTop: '20vh' }}>
        <div className="alert alert-danger">
          Error loading products: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: '#121212', minHeight: '100vh', padding: '20px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 py-3">
        <h3 style={{ color: '#ffffff' }}>Products Available</h3>
        <div style={{ width: "300px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ backgroundColor: '#FFFFFF' }}
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="alert alert-info text-center" style={{ backgroundColor: '#1a3a4a', color: '#ffffff', borderColor: '#2a4a5a' }}>
          {searchTerm
            ? "No products match your search."
            : "No products available."}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {filteredProducts.map((product) => (
            <div className="col" key={product.product_id}>
              <Card className="h-100 shadow-sm" style={{ backgroundColor: '#1e1e1e', color: '#ffffff', borderColor: '#333'}}>
                <div className="text-center p-3">
                  <Card.Img
                    variant="top"
                    src={img_url + product.product_photo}
                    className="img-fluid product-image"
                    alt={product.product_name}
                    style={{
                      maxHeight: "200px",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.product_name}</Card.Title>
                  <Card.Text className="small" style={{ color: '#aaa' }}>
                    {product.product_description}
                  </Card.Text>
                  <div className="mt-auto">
                    <h5 className="text-warning mb-3">
                      Ksh {parseFloat(product.product_cost).toFixed(2)}
                    </h5>
                    
                    {product.category === 'shoes' && (
                      <div className="col-md-4 ">
                        <label className="form-label text-light justify-content-center"><i>Size</i></label>
                        <select 
                          className="form-select bg-outline-primary text-dark"
                          value={selectedSizes[product.product_id] || 38}
                          onChange={(e) => handleSizeChange(product.product_id, parseInt(e.target.value))}
                        >
                          {Array.from({length: 15}, (_, i) => i + 32).map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    <section className="row">
                      <div className="col-md-6">
                        <button
                          className="btn btn-outline-primary mt-2 w-100 fw-semibold"
                          onClick={() => handleAddToCart(product)}
                        >
                          <i className="bi bi-cart-plus me-2"></i> Cart 📦
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button
                          className="btn btn-outline-success mt-2 w-100 fw-semibold"
                          onClick={() => handlePurchase(product)}
                        >
                          Purchase💰
                        </button>
                      </div>
                    </section>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetProducts;