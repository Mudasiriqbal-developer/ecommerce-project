import { it, expect, describe, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { Product } from './Product';

vi.mock('axios');

describe('Product Component', () => {
  it('displays the product detail correctly', async () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    }

    const loadCart = vi.fn();

    render(<Product product={product} loadCart={loadCart}/> );

    
    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId('add-to-cart-button')
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith(
      '/api/cart-items',
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1
      }
    )
    expect(loadCart).toHaveBeenCalled();
  });
});