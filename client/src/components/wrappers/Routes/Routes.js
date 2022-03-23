import React from "react"
import { Route, Switch } from "react-router-dom"
import * as ROUTES from "config/routeConstants"
import * as PAGES from "components/pages"

const Routes = () => (
  <Switch>
    <Route path={ROUTES.HOME} exact component={PAGES.WelcomePage} />
    {/* <Route path={ROUTES.LOGIN} component={PAGES.LoginPage} /> */}
    {/* <Route path={ROUTES.SIGNUP} component={PAGES.SignupPage} /> */}
    {/* <Route path={ROUTES.WELCOME} component={PAGES.WelcomePage} /> */}
    {/* <Route path={ROUTES.SETTINGS} component={PAGES.SettingsPage} /> */}
    <Route path="/empty" component={PAGES.MissingPage} />
    <Route path="/" component={PAGES.MissingPage} />
  </Switch>
)

export default Routes
