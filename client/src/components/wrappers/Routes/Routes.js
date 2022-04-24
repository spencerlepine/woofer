import React from "react"
import { Route, Switch } from "react-router-dom"
import * as ROUTES from "config/routeConstants"
import * as PAGES from "components/pages"

const Routes = () => (
  <Switch>
    <Route exact path={ROUTES.HOME} component={PAGES.HomePage} />
    <Route exact path={ROUTES.LOGIN} component={PAGES.LoginPage} />
    <Route exact path={ROUTES.SIGNUP} component={PAGES.SignupPage} />
    <Route exact path={ROUTES.WELCOME} component={PAGES.WelcomePage} />
    <Route exact path={ROUTES.CHAT_LIST} component={PAGES.ChatListPage} />
    <Route exact path={ROUTES.CHAT} component={PAGES.ChatPage} />
    <Route exact path={ROUTES.PROFILE} component={PAGES.ProfilePage} />
    <Route path={"/"} component={PAGES.MissingPage} />
  </Switch>
)

export default Routes
