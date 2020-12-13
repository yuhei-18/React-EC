import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@material-ui/core';
import {
  Search,
  AddCircle,
  History,
  Person,
  ExitToApp
} from '@material-ui/icons';
import { TextInput } from "../../components";
import { push } from "connected-react-router";
import { signOut } from "../../reducks/users/operations";
import { db } from "../../firebase/index";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256
  },
  searchField: {
    alignItems: "center",
    display: "flex",
    marginLeft: 32
  }
}));

const ClosableDrawer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { container } = props;
  const [keyword, setKeyword] = useState("");

  const inputKeyword = useCallback((event) => {
    setKeyword(event.target.value);
  }, [setKeyword]);

  const selectMenu = (event, path) => {
    dispatch(push(path));
    props.onClose(event);
  };

  const [filters, setFilters] = useState([
    {func: selectMenu, label: "すべて", id: "all", value: "/"},
    {func: selectMenu, label: "メンズ", id: "male", value: "/?gender=male"},
    {func: selectMenu, label: "レディース", id: "female", value: "/?gender=female"},
  ]);

  const menus = [
    {
      func: selectMenu,
      label: "商品登録",
      icon: <AddCircle />,
      id: "register",
      value: "/product/edit"
    },
    {
      func: selectMenu,
      label: "注文履歴",
      icon: <History />,
      id: "history",
      value: "/order/history"
    },
    {
      func: selectMenu,
      label: "プロフィール",
      icon: <Person />,
      id: "profile",
      value: "/user/mypage"
    },
  ];

  useEffect(() => {
    db.collection("categories")
      .orderBy("order", "asc")
      .get()
      .then(snapshots => {
        const list = [];
        snapshots.forEach(snapshot => {
          const category = snapshot.data();
          list.push({
            func: selectMenu,
            label: category.name,
            id: category.id,
            value: `/?category=${category.id}`
          },)
        });
        setFilters(prevState => [...prevState, ...list])
      })
  }, []);

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant={"temporary"}
        anchor={"right"}
        open={props.open}
        onClose={(e) =>props.onClose(e)}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}
      >
      <div
        onClose={(e) => props.onClose(e)}
        onKeyDown={(e) => props.onClose(e)}
      >
        <div className={classes.searchField}>
          <TextInput
            fullwidth={false} label={"キーワードを入力"} multiline={false}
            onChange={inputKeyword} required={false} row={1} value={keyword} type={"text"}
          />
          <IconButton>
            <Search />
          </IconButton>
        </div>
        <Divider />
        <List>
          {menus.map(menu => (
            <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
              <ListItemIcon>
                {menu.icon}
              </ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          ))}
          <ListItem button key={"logout"} onClick={() => dispatch(signOut())}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {filters.map(filter => (
            <ListItem
              button
              key={filter.id}
              onClick={(e) => filter.func(e, filter.value)}
            >
              <ListItemText primary={filter.label} />
            </ListItem>
          ))}
        </List>
      </div>
      </Drawer>
    </nav>
  )
};

export default ClosableDrawer;