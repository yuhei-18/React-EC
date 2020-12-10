import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton
} from "@material-ui/core";
import {
  ShoppingCart,
  FavoriteBorder
} from '@material-ui/icons'
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    height: 48,
    width: 48
  }
})

const SizeTable = (props) => {
  const classes = useStyles();
  const sizes = props.sizes;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 && (
            sizes.map(size => (
              <TableRow key={size.size}>
                <TableCell component={"th"} scope={"row"}>
                  {size.size}
                </TableCell>
                <TableCell>
                  残り{size.quantity}点
                </TableCell>
                <TableCell className={classes.iconCell}>
                  {size.quantity > 0 ? (
                    <IconButton onClick={() => props.addProduct(size.size)}>
                      <ShoppingCart />
                    </IconButton>
                  ) : (
                    <div>売り切れ</div>
                  )}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton>
                    <FavoriteBorder />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default SizeTable;
