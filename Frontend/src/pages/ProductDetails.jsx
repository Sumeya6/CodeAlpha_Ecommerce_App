import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useToast } from "../context/ToastContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        console.log("DATA:", res.data);
        setProduct(res.data);
      })
      .catch((err) => console.log("ERROR:", err));
  }, [id]);

  const { showToast } = useToast();

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login to add items to cart.", "error");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await API.post("/cart/add", {
        productId: id,
        quantity: 1,
      });
      showToast("Added to cart successfully!", "success");
      setMessage("Added to cart successfully!");
    } catch (err) {
      showToast("Failed to add to cart. Please try again.", "error");
      setMessage("Failed to add to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-8">
                {product.name}
              </h1>
              <p className="text-gray-600 text-md mb-6">
                {product.description}
              </p>

              <div className="mb-12">
                <span className="text-xl font-bold text-primary">
                  ${product.price}
                </span>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={addToCart}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Adding..." : "Add to Cart"}
              </button>

              {/* Message */}
              {message && (
                <p
                  className={`mt-4 text-center ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
