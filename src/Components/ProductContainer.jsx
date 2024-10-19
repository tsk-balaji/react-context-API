import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import { jsonData } from "../App.jsx";

export default function ProductsContainer() {
  //Context API Consumer imported from the App.jsx components
  const products = useContext(jsonData);

  const [quantities, setQuantities] = useState();
  const [subtotals, setSubtotals] = useState([]);

  // Initialize quantities when products change
  useEffect(() => {
    const initialQuantities = products.map(() => 1); // Set default quantity to 1
    const initialSubtotals = products.map((product) => product.price); // Initial subtotals based on price
    setQuantities(initialQuantities);
    setSubtotals(initialSubtotals);
  }, [products]);

  // Render Ratings
  function renderRatings(rating = 0) {
    let ratingsNode = [];
    for (let i = 0; i < rating; i++) {
      ratingsNode.push(<div className="bi-star-fill"></div>);
    }
    return ratingsNode;
  }

  // Handle quantity change
  const handleQuantityChange = (index, value) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = parseInt(value); // Update the quantity for the specific product
    setQuantities(updatedQuantities);

    // Update the subtotal for this product
    const newQuantity = parseInt(value); //parseInt to ensure the value is Int
    const updatedSubtotals = [...subtotals];
    updatedSubtotals[index] = newQuantity * products[index].price; // Recalculate the subtotal
    setSubtotals(updatedSubtotals);
  };

  // Handle delete button click
  const handleDelete = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = 0; // Set the quantity to 0 for the specific product
    setQuantities(updatedQuantities);

    const updatedSubtotals = [...subtotals];
    updatedSubtotals[index] = 0; // Set subtotal to 0 as well
    setSubtotals(updatedSubtotals);
  };

  return (
    <section className="container d-flex" id="products-container">
      <div className="container-fluid">
        <h2
          style={{ textAlign: "left", marginBottom: "20px", fontSize: "2em" }}
        >
          Shopping Cart
        </h2>
        <div className="row" style={{ gap: "30px" }}>
          {products.map((data, index) => (
            <div key={index}>
              <div
                className="card"
                style={{
                  margin: "auto",
                  padding: "20px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "10px",
                  }}
                >
                  <div style={{ display: "flex", gap: "15px" }}>
                    <div>
                      <img
                        className="card-img-top"
                        src={data.image}
                        alt="Product"
                        style={{ width: "200px", height: "250px" }}
                      />
                      <div className="d-flex justify-content-center small text-warning mb-2">
                        {renderRatings(data.rating)}
                      </div>
                    </div>
                    <div style={{ textAlign: "left", marginBottom: "20px" }}>
                      <h6 style={{ fontSize: "1.5em" }}>{data.title}</h6>
                      <p style={{ fontSize: ".85em" }}>{data.description}</p>
                      <p style={{ color: "green" }}>In stock </p>
                    </div>
                  </div>

                  <div style={{ display: "inline-block", textAlign: "center" }}>
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: "1.15em",
                        fontWeight: "bold",
                      }}
                    >
                      {`MRP: ${data.price}`}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    padding: "10px 0",
                  }}
                >
                  <div>
                    <label htmlFor="quantity">Qty:</label>
                    <select
                      id="quantity"
                      name="quantity"
                      defaultValue={1}
                      value={quantities[index]}
                      style={{ marginLeft: "10px", padding: "5px" }}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button
                      style={{
                        marginLeft: "10px",
                        color: "blue",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(index)} // Call handleDelete when clicked
                    >
                      Delete
                    </button>
                    <button
                      style={{
                        color: "blue",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        alert(`${data.title} Added to Save Later`);
                      }}
                    >
                      Save for later
                    </button>
                  </div>

                  <div>
                    <p>
                      Subtotal ({quantities[index]} item):{" "}
                      <strong>
                        {quantities[index] * (parseFloat(data.price) || 0)}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>{subtotals}</div>
      </div>
    </section>
  );
}

ProductsContainer.propTypes = {
  products: PropTypes.array,
};