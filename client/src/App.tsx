import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import InnerPage from "./pages/InnerPage";
import { ServiceDetailPage, ServiceGroupPage, ServicesIndex } from "./pages/ServicePages";

export default function App() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/services/:groupSlug/:serviceSlug">{(params) => <ServiceDetailPage groupSlug={params.groupSlug} serviceSlug={params.serviceSlug} />}</Route>
    <Route path="/services/:groupSlug">{(params) => <ServiceGroupPage groupSlug={params.groupSlug} />}</Route>
    <Route path="/services"><ServicesIndex /></Route>
    <Route path="/about"><InnerPage page="about" /></Route>
    <Route path="/industries"><InnerPage page="industries" /></Route>
    <Route path="/insights"><InnerPage page="insights" /></Route>
    <Route path="/contact"><InnerPage page="contact" /></Route>
    <Route><InnerPage page="services" /></Route>
  </Switch>;
}
