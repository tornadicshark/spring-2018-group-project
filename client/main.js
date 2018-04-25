// GENERIC IMPORTS
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import ngRoute from 'angular-route'; // routing import
import '../imports/startup/accounts-config.js'; // user account import

// SITEWIDE TOOLS
import sidebarApp from '../imports/components/sidebar/sidebar';
import faqApp from '../imports/components/faq/faq';
import stocksApp from '../imports/components/stocks/stocks';

// AUTHENTICATED USER TOOLS
import { Meteor } from 'meteor/meteor';
import dashboardApp from '../imports/components/dashboard/dashboard';
import homeApp from '../imports/components/homepage/homepage';

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
  dashboardApp.name,
  homeApp.name
]);

// CRYPTODASH MODULE ROUTING CONFIGURATION
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    template: `<home-app></home-app>`
  })
  .when("/dashboard", {
    template: `<dash-app></dash-app>`
  })
  .when("/stocks", {
    template: `<stocks-app></stocks-app>`
  }) 
  .when("/faq", {
    template: `<faq-app></faq-app>`
  })
  .when("/help", {
    template: `<div ng-include="'lexbot.html'"></div>`
  })
  .when("/error", {
    template: `404. That page is not found.`
  })
  .otherwise({
    redirectTo: '/error'
  });
});