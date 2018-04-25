import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './dashboard.html';

// added for functionality
import { Meteor } from 'meteor/meteor';
//import { UserStocks } from '../../api/UserStocks.js';
 
class DashboardCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      currentUser() {
        return Meteor.user();
      }/*,
      userStocks() {
        // Show newest tasks at the top
        return UserStocks.find({}, {
          sort: {
            value: -1
          }
        });
      }*/
      , tasks() {
        return [{
          text: 'This is task 1'
        }, {
          text: 'This is task 2'
        }, {
          text: 'This is task 3'
        }];
      },
      userStocks() {
        return [{
         name: 'Bitcoin',
         amt: '452',
         value: '9,000',
         owner: 'user',
         date: new Date() 
        }]
      }
  	})
  }

  sellStock(name, owner) { 
    console.log("Selling stock now..." + name + owner)
    // Insert a task into the collection
    //Meteor.call('userStocks.insert', stock);
  }
}
 
export default angular.module('DashboardApp', [
  angularMeteor
])
  .component('dashApp', {
    templateUrl: 'imports/components/dashboard/dashboard.html',
    controller: ['$scope', DashboardCtrl]
  });