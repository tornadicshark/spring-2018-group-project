import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './dashboard.html';

import { Meteor } from 'meteor/meteor';
 
class DashboardCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      currentUser() {
        return Meteor.user();
      },
      tasks() {
        return [{
          text: 'This is task 1'
        }, {
          text: 'This is task 2'
        }, {
          text: 'This is task 3'
        }];
      }
  	})
  }
}
 
export default angular.module('DashboardApp', [
  angularMeteor
])
  .component('dashApp', {
    templateUrl: 'imports/components/dashboard/dashboard.html',
    controller: ['$scope', DashboardCtrl]
  });