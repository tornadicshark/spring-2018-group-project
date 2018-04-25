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

  buyStock(name, value, owner) {
    console.log("buy stock button clicked");
    console.log(name + ", " + value + ", " + owner);
  }

  sellStock(name, value, owner) {
    console.log("sell stock button clicked");
    console.log(name + ", " + value + ", " + owner);
  }
  
}
 
export default angular.module('CurrencyApp', [
  angularMeteor
])
  .component('currencyInfo', {
    templateUrl: 'imports/components/currencyInfo/currencyInfo.html',
    controller: ['$scope', CurrencyCtrl]
  });