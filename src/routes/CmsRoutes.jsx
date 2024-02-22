import { Outlet, Route, Routes } from "react-router-dom";
import { Cms } from "../pages";
import { CmsLayout } from "../Layouts";
import { PrivateRoutes } from "./PrivateRoutes";
import { AdminRoutes } from "./AdminRoutes";



export const CmsRoutes = () => <Routes>

<Route path="/cms" element={<CmsLayout/>}>

<Route path="dashboard" element={< PrivateRoutes element={<Cms.Dashboard.List/>}/>}/>
<Route path="profile" element={<PrivateRoutes element={<Cms.Profile.Edit/>}/>}/>
<Route path="password" element={<PrivateRoutes element={<Cms.Profile.Password/>}/>}/>
<Route path="staffs" element={<PrivateRoutes element={<AdminRoutes element={<Outlet />}/>}/>}>
    <Route index element={<Cms.Staffs.List/>}/>
    <Route path="create" element={<Cms.Staffs.Create/>}/>
    <Route path=":id" element={<Cms.Staffs.Edit/>}/>
</Route>

<Route path="categories" element={<PrivateRoutes element={<Outlet/>}/>}>
<Route index element={<Cms.categories.List/>}/>
<Route path="create" element={<Cms.categories.Create/>}/>
<Route path=":id" element={<Cms.categories.Edit/>}/>
</Route>

<Route path="brands" element={<PrivateRoutes element={<Outlet/>}/>}>
<Route index element={<Cms.brands.List/>}/>
<Route path="create" element={<Cms.brands.Create/>}/>
<Route path=":id" element={<Cms.brands.Edit/>}/>
</Route>

<Route path="products" element={<PrivateRoutes element={<Outlet/>}/>}>
<Route index element={<Cms.products.List/>}/>
<Route path="create" element={<Cms.products.Create/>}/>
<Route path=":id" element={<Cms.products.Edit/>}/>
</Route>
<Route path="login" element={< Cms.Auth.Login/>}/>



</Route>

</Routes>