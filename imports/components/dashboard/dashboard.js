import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './dashboard.html';

// added for functionality
import { Meteor } from 'meteor/meteor';
import { UserStocks } from '../../api/UserStocks.js';
import { Stocks } from '../../api/Stocks.js';
 
class DashboardCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      currentUser() {
        return Meteor.user();
      },
      stocks() {
        return Stocks.find({});
      },
      userStocks() {
        return UserStocks.find({});
      }
    })
  }

  sellStock(name, value) { 
    console.log("Selling stock now..." + name)

    alert("Success! You have sold one " + name + "!");
    // Insert a task into the collection
    //Meteor.call('userStocks.insert', name, value, owner);
  }
}
 
export default angular.module('DashboardApp', [
  angularMeteor
])
  .component('dashApp', {
    templateUrl: 'imports/components/dashboard/dashboard.html',
    controller: ['$scope', DashboardCtrl]
  });