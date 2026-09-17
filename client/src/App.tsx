import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import InnerPage from "./pages/InnerPage";
import { ServiceDetailPage, ServiceGroupPage, ServicesIndex } from "./pages/ServicePages";
import { AboutRouter } from "./pages/AboutPages";
import { IndustryRouter } from "./pages/IndustryPages";
import { StoriesRouter } from "./pages/SuccessStories";
import { InsightsRouter } from "./pages/InsightsPages";
import ContactPage from "./pages/ContactPage";
import { CareersPage, PrivacyPolicyPage } from "./pages/LegalAndCareersPages";

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
    <Route path="/success-stories/:slug"><StoriesRouter /></Route>
    <Route path="/success-stories"><StoriesRouter /></Route>
    <Route path="/insights/:slug"><InsightsRouter /></Route>
    <Route path="/insights"><InsightsRouter /></Route>
    <Route path="/privacy-policy"><PrivacyPolicyPage /></Route>
    <Route path="/about/privacy-notice"><PrivacyPolicyPage /></Route>
    <Route path="/careers"><CareersPage /></Route>
    <Route path="/about/careers"><CareersPage /></Route>
    <Route path="/contact"><ContactPage /></Route>
    <Route><InnerPage page="services" /></Route>
  </Switch>;
}
