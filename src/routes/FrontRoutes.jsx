import { Route, Routes ,Navigate} from "react-router-dom";
import { FrontLayout } from "../Layouts";
import {Front} from '../pages'
export const FrontRoutes = () => <Routes>

<Route path="/" element={<FrontLayout/>}>

        <Route index element={<Front.Pages.Home/>}/>
        <Route path="category/:id" element={<Front.Pages.Category/>}/>
        <Route path="brand/:id" element={<Front.Pages.Brand/>}/>
        <Route path="product/:id" element={<Front.Pages.Detail/>}/>

</Route>


</Routes>