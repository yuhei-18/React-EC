import React, { useCallback, useState } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import { HeaderMenu, ClosableDrawer } from "./index";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: "#fff",
    color: "#444",
  },
  toolBar: {
    margin: "0 auto",
    maxWidth: 1024,
    width: "100%"
  },
  logo: {
    width: "128px",
    height: "48px",
    backgroundColor: "#00F"
  },
  iconButtons: {
    margin: "0 0 0 auto"
  }
})

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback((event) => {
    if (
      event.type === "keydown" &&
      event.key === "Tab" ||
      event.key === "Shift"
    ) {
      return;
    }
    setOpen(!open);
  }, [setOpen, open]);

  return (
   <div className={classes.root}>
     <AppBar position={"fixed"} className={classes.menuBar}>
       <Toolbar className={classes.toolBar}>
         <div
           className={classes.logo}
           onClick={() => dispatch(push('/'))}
         />
         {isSignedIn && (
           <div className={classes.iconButtons}>
             <HeaderMenu handleDrawerToggle={handleDrawerToggle} />
           </div>
         )}
       </Toolbar>
     </AppBar>
     <ClosableDrawer open={open} onClose={handleDrawerToggle} />
   </div>
  )
}

export default Header;
