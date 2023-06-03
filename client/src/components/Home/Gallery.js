import React, { useEffect } from "react";
import Product from "./Product";
import Pagination from "./Pagination";
import { fetchProducts } from "../../lib/state/actions";
import { useDispatch, useSelector } from "react-redux";

const Results = ({ items, pageIndex }) =>
  items &&
  !!items.length &&
  items[pageIndex].map((product) => <Product key={product.id} {...product} />);

const Empty = ({ isVisible }) =>
  !isVisible && (
    <p style={{ marginLeft: 18, fontSize: 18 }}>No Listing available ... </p>
  );

const Loading = ({ isLoading }) =>
  isLoading && <p style={{ marginLeft: 18, fontSize: 18 }}>Loading... </p>;

const Gallery = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { items, isLoading, pageIndex } = state.products;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <section className="mt-3 mb-5">
        <header className="section-heading mb-5">
          <h3 className="title-section">Products</h3>
        </header>
        <div className="row">
          <Loading isLoading={isLoading} />
          <Results items={items} pageIndex={pageIndex} />
          <Empty isVisible={!!items} />
        </div>
        <div className="clearfix"></div>
      </section>
      <Pagination />
    </>
  );
};
export default Gallery;
