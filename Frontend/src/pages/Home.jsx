import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    
    <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-16">
      {products?.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  
  );
}