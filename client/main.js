// GENERIC IMPORTS
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import ngRoute from 'angular-route'; // routing import
import '../imports/startup/accounts-config.js'; // user account import

// SITEWIDE TOOLS
import sidebarApp from '../imports/components/sidebar';
import faqApp from '../imports/components/faq';
import stocksApp from '../imports/components/stocks';
//import lexApp from '../imports/components/lex';

// AUTHENTICATED USER TOOLS
import { Meteor } from 'meteor/meteor';
import dashboardApp from '../imports/components/dashboard';

// CRYPTODASH MODULE SET UP
var app = angular.module('cryptodash', [
  // GENERIC IMPORTS
  angularMeteor,
  'accounts.ui',
  ngRoute,

  // SITEWIDE IMPORTS
  sidebarApp.name,
  faqApp.name,
  stocksApp.name,
  //lexApp.name,

  // AUTHENTICATED USER IMPORTS
  dashboardApp.name
]);

// CRYPTODASH MODULE ROUTING CONFIGURATION
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    template: `<stocks-app></stocks-app>`
  })
  .when("/dashboard", {
    template: `<dash-app></dash-app>`
  })
  .when("/stocks", {
    redirectTo: '/'
  }) /*
  .when("/lex", {
    template: `<lex-app></lex-app>`
  }) */
  .when("/faq", {
    template: `<faq-app></faq-app>`
  })
  .when("/error", {
    template: `404. That page is not found.`
  })
  .otherwise({
    redirectTo: '/error'
  });
});