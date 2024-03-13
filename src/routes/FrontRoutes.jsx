import { Route, Routes ,Navigate} from "react-router-dom";
import { FrontLayout } from "../Layouts";
import {Front} from '../pages'
export const FrontRoutes = () => <Routes>

<Route path="/" element={<FrontLayout/>}>

        <Route index element={<Front.Pages.Home/>}/>
        <Route path="cart" element={<Front.Pages.Cart/>}/>
        <Route path="login" element={<Front.User.Login/>}/>
        <Route path="register" element={<Front.User.Register/>}/>
        <Route path="category/:id" element={<Front.Pages.Category/>}/>
        <Route path="brand/:id" element={<Front.Pages.Brand/>}/>
        <Route path="product/:id" element={<Front.Pages.Detail/>}/>

        {/* <Route path="*" element={<Front.Pages.Error/>}/> */}

</Route>


</Routes>