import { Route, Routes ,Navigate} from "react-router-dom";

export const FrontRoutes = () => <Routes>

<Route path="/" element={<Navigate to="/cms/dashboard"/>}/>

</Routes>