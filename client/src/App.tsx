import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import InnerPage from "./pages/InnerPage";
import { ServiceDetailPage, ServiceGroupPage, ServicesIndex } from "./pages/ServicePages";
import { AboutRouter } from "./pages/AboutPages";
import { IndustryRouter } from "./pages/IndustryPages";

export default function App() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/services/:groupSlug/:serviceSlug">{(params) => <ServiceDetailPage groupSlug={params.groupSlug} serviceSlug={params.serviceSlug} />}</Route>
    <Route path="/services/:groupSlug">{(params) => <ServiceGroupPage groupSlug={params.groupSlug} />}</Route>
    <Route path="/services"><ServicesIndex /></Route>
    <Route path="/about/:slug"><AboutRouter /></Route>
    <Route path="/about"><AboutRouter /></Route>
    <Route path="/industries/:slug"><IndustryRouter /></Route>
    <Route path="/industries"><IndustryRouter /></Route>
    <Route path="/insights"><InnerPage page="insights" /></Route>
    <Route path="/contact"><InnerPage page="contact" /></Route>
    <Route><InnerPage page="services" /></Route>
  </Switch>;
}
