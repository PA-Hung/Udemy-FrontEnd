import { Switch, Route } from "react-router-dom";
import Login from "../components/Views/Login";
import Register from "../components/Views/Register";
import Users from "../components/Views/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Views/Role";
import RoleGroup from "../components/Views/RoleGroup";

const AppRoutes = (props) => {

    const Projet = () => {
        return (
            <span>Home Project </span>
        )
    }

    return (
        <>
            <Switch>

                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/roles" component={Role} />
                <PrivateRoutes path="/rolebygroup" component={RoleGroup} />
                <PrivateRoutes path="/projects" component={Projet} />

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