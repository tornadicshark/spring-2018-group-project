import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './sidebar.html';

// added for ng-show support
import { Meteor } from 'meteor/meteor';


class SidebarCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      currentUser() {
        return Meteor.user();
      }
  	})
  }
}
 
export default angular.module('SidebarApp', [
  angularMeteor,
  'accounts.ui'
])
  .component('sideApp', {
    templateUrl: 'imports/components/sidebar/sidebar.html',
    controller: ['$scope', SidebarCtrl]
  });