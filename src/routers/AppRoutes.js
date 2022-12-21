import { Switch, Route } from "react-router-dom";
import Login from "../components/Views/Login";
import Register from "../components/Views/Register";
import Users from "../components/Views/Users";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = (props) => {

    const Projet = () => {
        return (
            <span>Home Project </span>
        )
    }

    return (
        <>
            <Switch>

                <PrivateRoutes path="/projects" component={Projet} />
                <PrivateRoutes path="/users" component={Users} />

                <Route exact path="/">
                    Home
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="*">
                    404 not found
                </Route>
            </Switch>
        </>
    )
}
export default AppRoutes;