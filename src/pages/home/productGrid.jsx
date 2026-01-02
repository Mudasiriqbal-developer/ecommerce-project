import { Product } from "./Product";

export function ProductsGrid({ products, laodCart }) {

  return (
    <div className="products-grid">
      {products.map((product) => {

        return (
          <Product 
            key={product.id} 
            product={product} 
            laodCart={laodCart} 
          />
        );
      })}
    </div>
  );
}
