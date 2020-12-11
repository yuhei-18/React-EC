import React, { useEffect } from "react";
import {
  IconButton,
  Badge
} from "@material-ui/core";
import {
  ShoppingCart,
  FavoriteBorder,
  Menu
} from "@material-ui/icons";
import { getProductsInCart, getUserId } from "../../reducks/users/selectors";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebase/index";
import { fetchProductsInCart } from "../../reducks/users/operations";
import { push } from "connected-react-router";

const HeaderMenu = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  let productsInCart = getProductsInCart(selector);

  useEffect(() => {
    const unsubscribe = db.collection("users").doc(uid)
      .collection("cart").onSnapshot(snapshots => {
        snapshots.docChanges().forEach(change => {
          const product = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case "added":
              productsInCart.push(product);
              break;
            case "modified":
              const index = productsInCart.findIndex(
                product => product.cartId === change.doc.id
              );
              productsInCart[index] = product;
              break;
            case "removed":
              productsInCart = productsInCart.filter(
                product => product.cartId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchProductsInCart(productsInCart));
      });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton onClick={() => dispatch(push("/cart"))}>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorder />
      </IconButton>
      <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
        <Menu />
      </IconButton>
    </>
  )
}

export default HeaderMenu;
