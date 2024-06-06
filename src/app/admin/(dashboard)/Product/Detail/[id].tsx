"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Product {
  _id: string;
  image: string;
  name: string;
  author: string;
  genre: string;
  description: string;
  time: string;
  price: number;
  discount: number;
  year: number;
  stock: number;
  language: string;
  pageCount: number;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isDiscount: boolean;
}

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/productAdmin?_id=${id}`, {
          method: "GET",
        });
        const data = await response.json();
        if (data.success) {
          setProduct(data.product as Product);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBackClick = () => {
    router.push("/admin/Product/List");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <h1>Product Detail</h1>
      <div>
        <label>Name:</label>
        <input type="text" value={product.name} readOnly />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" value={product.author} readOnly />
      </div>
      <div>
        <label>Genre:</label>
        <input type="text" value={product.genre} readOnly />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={product.description} readOnly />
      </div>
      <div>
        <label>Price:</label>
        <input type="text" value={product.price} readOnly />
      </div>
      <div>
        <label>Discount:</label>
        <input type="text" value={product.discount} readOnly />
      </div>
      <div>
        <label>Year:</label>
        <input type="text" value={product.year} readOnly />
      </div>
      <div>
        <label>Stock:</label>
        <input type="text" value={product.stock} readOnly />
      </div>
      <div>
        <label>Language:</label>
        <input type="text" value={product.language} readOnly />
      </div>
      <div>
        <label>Page Count:</label>
        <input type="text" value={product.pageCount} readOnly />
      </div>
      <div>
        <label>Best Seller:</label>
        <input
          type="text"
          value={product.isBestSeller ? "Yes" : "No"}
          readOnly
        />
      </div>
      <div>
        <label>New Arrival:</label>
        <input
          type="text"
          value={product.isNewArrival ? "Yes" : "No"}
          readOnly
        />
      </div>
      <div>
        <label>Discount:</label>
        <input type="text" value={product.isDiscount ? "Yes" : "No"} readOnly />
      </div>
      <div>
        <label>Image:</label>
        <img src={product.image} alt="image" style={{ maxWidth: "200px" }} />
      </div>
      <button onClick={handleBackClick}>Back to Product List</button>
    </div>
  );
};

export default ProductDetail;
