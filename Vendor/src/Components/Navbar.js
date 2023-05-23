import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { LOGINPAGE } from "../config/config";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  function logout() {
    localStorage.removeItem("token");
    window.location.href = LOGINPAGE;
  }

  return (
    <>
      <Navbar id="navbar" variant="light" sticky="top">
        <Container fluid>
          <Button
            id="menu-collapse-button"
            variant="outlined"
            onClick={handleShow}
          >
            <MenuOutlinedIcon sx={{ color: "black" }} />
          </Button>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Navbar.Brand
              onMouseOver={(e) => (e.target.style.color = "blue")}
              onMouseOut={(e) => (e.target.style.color = "black")}
            >
              {" "}
              E-commerce{" "}
            </Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link> */}
          </Nav>
          <Link to={"/Profile"}>
            <Button variant="outlined" color="success">
              Welcome, {decodedToken.UserName}
            </Button>
          </Link>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="contained" sx={{ margin: "0 10px" }}>
              Search
            </Button>
          </Form>
          <Button color="error" variant="outlined" onClick={logout}>
            Log-out
          </Button>
        </Container>
      </Navbar>

      <Offcanvas
        style={{ background: "linear-gradient(#2e005f, #4e0353)" }}
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>Ecommerce</Offcanvas.Header>
        <Offcanvas.Body>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <Link
                  to={"/"}
                  onClick={handleClose}
                  style={{ textDecoration: "none" }}
                >
                  <ListItemText primary="Home" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link
                  to={"/Profile"}
                  onClick={handleClose}
                  style={{ textDecoration: "none" }}
                >
                  <ListItemText primary="Profile" />
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <Link
                  to={"/Listings"}
                  onClick={handleClose}
                  style={{ textDecoration: "none" }}
                >
                  Listings
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link
                  to={"/test"}
                  onClick={handleClose}
                  style={{ textDecoration: "none" }}
                >
                  <ListItemText primary="Test" />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

// import * as React from "react";
// import PropTypes from "prop-types";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MailIcon from "@mui/icons-material/Mail";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import { Outlet } from "react-router-dom";
// import Paper from "@mui/material/Paper";
// import DraftsIcon from "@mui/icons-material/Drafts";
// import {
//   Link as RouterLink,
//   Route,
//   Routes,
//   MemoryRouter,
//   useLocation,
// } from "react-router-dom";
// import { StaticRouter } from "react-router-dom/server";
// const drawerWidth = 240;

// const Link = React.forwardRef(function Link(itemProps, ref) {
//   return <RouterLink ref={ref} {...itemProps} role={undefined} />;
// });

// function ListItemLink(props) {
//   const { icon, primary, to } = props;

//   return (
//     <li>
//       <ListItem button component={Link} to={to}>
//         {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
//         <ListItemText primary={primary} />
//       </ListItem>
//     </li>
//   );
// }

// function ResponsiveDrawer(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <div>
//       <Toolbar />
//       <Divider />
//       <List>
//         <ListItemLink to="/" primary="Home" />
//         <ListItemLink to="/Profile" primary="Profile" />
//         <ListItemLink to="/Listings" primary="Listings" />
//         <ListItemLink to="/Test" primary="Test" />
//       </List>
//     </div>
//   );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>

//           <Typography variant="h6" noWrap component="div">
//             E-commerce
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"
//       >
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//         }}
//       >
//         <Toolbar />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }

// export default ResponsiveDrawer;
