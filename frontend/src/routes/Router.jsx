// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import MasterHome from "../modules/master/MasterHome";
// import CustomerList from "../modules/master/customer/CustomerList";
// import AddCustomer from "../modules/master/customer/AddCustomer";
// import ItemList from "../modules/master/item/ItemList";
// import AddItem from "../modules/master/item/AddItem";
// import DashboardHome from "../modules/dashboard/DashboardHome";
// import DashboardInvoiceDetails from "../modules/dashboard/DashboardInvoiceDetails";
// import BillingHome from "../modules/billing/BillingHome";
// import Sidebar from "../components/common/SideBar";

// const Router = () => {
//   const router = createBrowserRouter([
//     // {
//     //   path: "/",
//     //   element: <h1>Home</h1>,
//     // },
//     {
//      path:"/sidebar",
//      element:<Sidebar/>
//     },
//     // master module routes.
//     {
//       path: "/",
//       element: <MasterHome />,
//     },
//     {
//       path: "/master/customerlist",
//       element: <CustomerList />,
//     },
//     {
//       path: "/master/customeradd",
//       element: <AddCustomer />,
//     },
//     {
//       path: "/master/itemlist",
//       element: <ItemList />,
//     },
//     {
//       path: "/master/itemadd",
//       element: <AddItem />,
//     },
    
//     // dashboard module routes.

//     {
//       path:"/dashboard/home",
//       element: <DashboardHome />
//     },
//     {
//       path:"/dashboard/invoicedetails",
//       element:<DashboardInvoiceDetails />
//     }

//     // billing module routes.
// ,
//     {
//       path:"/billing/home",
//       element:<BillingHome/>
//     }
//   ]);

//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   );
// };

// export default Router;
