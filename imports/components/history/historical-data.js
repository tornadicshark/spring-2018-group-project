import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './historical-data.html';

import { Meteor } from 'meteor/meteor';
import { UserHistory } from '../../api/UserHistory.js';
import { UserBalance } from '../../api/UserBalance.js';

class HistoryCtrl {

  constructor($scope) {
    $scope.viewModel(this);

    this.subscribe('userHistory');
    this.subscribe('userBalance');

    // Return the data mostly right now
    this.helpers({
      currentUser() {
        return Meteor.user();
      },
      userBalance() {
        return UserBalance.findOne({});
      },
      userHistory() {
        const selector = {};
        // Show newest tasks at the top
        return UserHistory.find(selector, {
          sort: {
            date: 1
          }
        });}
    })
  }

}
 
export default angular.module('HistoricalApp', [
  angularMeteor
])
.component('historicalApp', {
  templateUrl: 'imports/components/history/historical-data.html',
  controller: ['$scope', HistoryCtrl]
});