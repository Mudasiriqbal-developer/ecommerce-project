import { Header } from "../../components/Header";
import { useSearchParams } from 'react-router';
import { ProductsGrid } from './productGrid';
import {useEffect, useState} from "react";
import axios from 'axios';



import "./HomePage.css";

export function HomePage({cart, loadCart}) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search ? `/api/products?search=
      ${search}` : '/api/products';
      const response = await axios.get(urlPath);
      setProducts(response.data)
    }
    getHomeData();
  }, [search]);


  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
