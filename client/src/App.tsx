import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import InnerPage from "./pages/InnerPage";

export default function App() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/services"><InnerPage page="services" /></Route>
    <Route path="/about"><InnerPage page="about" /></Route>
    <Route path="/insights"><InnerPage page="insights" /></Route>
    <Route path="/contact"><InnerPage page="contact" /></Route>
    <Route><InnerPage page="services" /></Route>
  </Switch>;
}
