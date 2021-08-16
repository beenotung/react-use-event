import React, { useState } from 'react';
import './DemoApp.css';
import { dispatch, useEvent } from './use-event';

type AddProductEvent = {
  type: 'AddProduct';
  price: number;
};
type RemoveProductEvent = {
  type: 'RemoveProduct';
  price: number;
};
type RemoveAllProductEvent = {
  type: 'RemoveAllProduct';
};

function DemoApp() {
  return (
    <>
      <h1>
        <code>react-use-event</code> Demo
      </h1>
      <p>
        <a href="https://www.npmjs.com/package/react-use-event">
          <img
            src="https://img.shields.io/npm/v/react-use-event.svg"
            alt="npm package version badge"
          ></img>
        </a>{' '}
        <a href="https://github.com/beenotung/react-use-event">
          <svg
            height="32"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            data-view-component="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
        </a>
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <Product name="Apple" price={3} />
          <Product name="Banana" price={5} />
          <Product name="Cherry" price={10} />
        </tbody>
        <Report />
      </table>
    </>
  );
}

function Product({ name, price }: { name: string; price: number }) {
  const [quantity, setQuantity] = useState(0);
  const dispatchAdd = useEvent<AddProductEvent>('AddProduct');
  useEvent<RemoveAllProductEvent>('RemoveAllProduct', () => {
    setQuantity(0);
  });
  function add() {
    setQuantity(quantity + 1);
    dispatchAdd({ price });
  }
  function remove() {
    setQuantity(quantity - 1);
    dispatch<RemoveProductEvent>('RemoveProduct', { price });
  }
  return (
    <tr className="product">
      <td>
        <code>{'<Product> Component'}</code>
      </td>
      <td>{name}</td>
      <td>
        <span>${price}</span>
      </td>
      <td>{quantity}</td>
      <td>
        <button onClick={add}>add to cart</button>
        <button onClick={remove}>remove from cart</button>
      </td>
    </tr>
  );
}

function Report() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEvent<AddProductEvent>('AddProduct', (event) => {
    setTotalQuantity(totalQuantity + 1);
    setTotalPrice(totalPrice + event.price);
  });
  useEvent<RemoveProductEvent>('RemoveProduct', (event) => {
    setTotalQuantity(totalQuantity - 1);
    setTotalPrice(totalPrice - event.price);
  });
  useEvent<RemoveAllProductEvent>('RemoveAllProduct', () => {
    setTotalQuantity(0);
    setTotalPrice(0);
  });
  function removeAll() {
    dispatch<RemoveAllProductEvent>('RemoveAllProduct', {});
  }
  return (
    <tfoot className="report">
      <tr>
        <td></td>
        <th>Total Quantity</th>
        <th>Total Price</th>
      </tr>
      <tr>
        <td>
          <code>{'<Report> Component'}</code>
        </td>
        <td>{totalQuantity.toLocaleString()}</td>
        <td>${totalPrice.toLocaleString()}</td>
        <td>
          <button onClick={removeAll}>remove all</button>
        </td>
      </tr>
    </tfoot>
  );
}

export default DemoApp;
