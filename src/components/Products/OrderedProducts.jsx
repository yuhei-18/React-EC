import React, {useCallback} from "react";
import { useDispatch } from "react-redux";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { push } from "connected-react-router";
import {PrimaryButton} from "../index";

const useStyles = makeStyles({
  list: {
    background: "#fff",
    height: "auto"
  },
  image: {
    objectFit: "cover",
    margin: "8px 16px 8px 0",
    height: 96,
    width: 96
  },
  text: {
    width: "100%"
  }
})

const OrderedProducts = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = props.products;

  const goToProductDetail = useCallback((id) => {
    dispatch(push("/product/" + id));
  }, []);

  return (
    <List>
      {products.map(product => (
        <>
          <ListItem className={classes.list} key={product.id}>
            <ListItemAvatar>
              <img
                className={classes.image}
                src={product.images[0].path}
                alt={"Ordered Product"}
              />
            </ListItemAvatar>
            <div className={classes.text}>
              <ListItemText
                primary={product.name}
                secondary={"サイズ：" + product.size}
              />
              <ListItemText
                primary={"¥" + product.price.toLocaleString()}
              />
            </div>
            <PrimaryButton
              label={"商品詳細を見る"}
              onClick={() => goToProductDetail(product.id)}
            />
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  )
};

export default OrderedProducts;