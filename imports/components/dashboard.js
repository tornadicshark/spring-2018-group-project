import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './dashboard.html';
 
class DashboardCtrl {
  constructor() {
    this.tasks = [{
      text: 'This is task 1'
    }, {
      text: 'This is task 2'
    }, {
      text: 'This is task 3'
    }];
  }
}
 
export default angular.module('DashboardApp', [
  angularMeteor
])
  .component('dashApp', {
    templateUrl: 'imports/components/dashboard.html',
    controller: DashboardCtrl
  });