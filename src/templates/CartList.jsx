import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "@material-ui/core";
import { getProductsInCart } from "../reducks/users/selectors";
import { CartListItem } from "../components/Products";
import { PrimaryButton, GrayButton } from "../components";
import { push } from "connected-react-router";

const CartList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push("/order/confirm"));
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push("/"));
  }, []);

  return (
    <section>
      <h2>ショッピングカート</h2>
      <List>
        {productsInCart.length > 0 && (
          productsInCart.map(product => <CartListItem key={product.cartId} product={product} />)
        )}
      </List>
      <div>
        <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
        <GrayButton label={"ショッピングを続ける"} onClick={backToHome} />
      </div>
    </section>
  )
};

export default CartList;