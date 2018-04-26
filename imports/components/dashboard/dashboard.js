import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './dashboard.html';

// added for functionality
import { Meteor } from 'meteor/meteor';
import { UserStocks } from '../../api/UserStocks.js';
import { Stocks } from '../../api/Stocks.js';
import { UserHistory } from '../../api/UserHistory.js';
 
class DashboardCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe('stocks');
    this.subscribe('userStocks');
    this.subscribe('userHistory');

    this.helpers({
      currentUser() {
        return Meteor.user();
      },
      stocks() {
        return Stocks.find({});
      },
      userStocks() {
        return UserStocks.find({});
      },
      userHistory() {
        return UserHistory.find({});
      }
    })
  }

  buyStock(newTask) {
    // Insert a task into the collection
    //Meteor.call('tasks.insert', newTask);
 
    // Clear form
    this.newTask = '';
  }


  sellStock(newTask) {
    // Insert a task into the collection
    //Meteor.call('tasks.insert', newTask);
 
    // Clear form
    this.newTask = '';
  }
}
 
export default angular.module('DashboardApp', [
  angularMeteor
])
  .component('dashApp', {
    templateUrl: 'imports/components/dashboard/dashboard.html',
    controller: ['$scope', DashboardCtrl]
  });