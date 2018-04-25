import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './currencyInfo.html';

import { Meteor } from 'meteor/meteor';

class CurrencyCtrl {
    constructor($scope) {
        $scope.viewModel(this);
    
        // Return the data mostly right now
        this.helpers({
          currentUser() {
            return Meteor.user();
          }
        })
    }
}
 
export default angular.module('CurrencyApp', [
  angularMeteor
])
  .component('currencyInfo', {
    templateUrl: 'imports/components/currencyInfo/currencyInfo.html',
    controller: ['$scope', CurrencyCtrl]
  });