import { PageNotFound } from "components/commons";
import Product from "components/Product";
import ProductList from "components/ProductList";
import { Route, Switch, Redirect } from "react-router-dom";

const App = () => (
  <Switch>
    <Route exact component={ProductList} path="/products" />
    <Route exact component={Product} path="/product/:slug" />
    <Redirect exact from="/" to="/products" />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
