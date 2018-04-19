import angular from 'angular';
import angularMeteor from 'angular-meteor';

import '../imports/startup/accounts-config.js';
import dashboardApp from '../imports/components/dashboard';
import sidebarApp from '../imports/components/sidebar';
 
angular.module('cryptodash', [
  angularMeteor,
  'accounts.ui',
  dashboardApp.name,
  sidebarApp.name
]);