import { useEffect } from "react";
import Layout from "./Layout";
import Row from "./Row";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../lib/state/selectors";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const total = useSelector(selectCartTotal);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("total", total);
  }, [items, total]);

  return (
    <Layout>
      {items ? (
        items.map((item) => <Row key={item.id} {...item} />)
      ) : (
        <p
          className="d-flex justify-content-center align-items-center"
          style={{ fontSize: 20 }}
        >
          Your Cart is Empty
        </p>
      )}
    </Layout>
  );
};
export default Cart;
