import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './stocks.html';

class StocksCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    $scope.buyForm = function() {
     console.log("buy form button clicked");
     //todo make the user buy something here
     //todo pass on the data correctly
    }

    // Return the data mostly right now
    this.helpers({
      currentUser() {
        return Meteor.user();
      },
      stocks() {
        return [{
          name: 'Bitcoin',
          date: 'May 1, 2018',
          value: '422.50'
        }, {
          name: 'Bitcoin1',
          date: 'May 1, 2018',
          value: '422.50'
        }, {
          name: 'Bitcoin2',
          date: 'May 1, 2018',
          value: '422.50'
        }, {
          name: 'Bitcoin3',
          date: 'May 1, 2018',
          value: '422.50'
        }, {
          name: 'Bitcoin5',
          date: 'May 1, 2018',
          value: '422.50'
        }, {
          name: 'Bitcoin6',
          date: 'May 1, 2018',
          value: '422.50'
        }, {
          name: 'Bitcoin7',
          date: 'May 1, 2018',
          value: '422.50'
        }];
      }
    })
  }
}
 
export default angular.module('StocksApp', [
  angularMeteor
])
  .component('stocksApp', {
    templateUrl: 'imports/components/stocks/stocks.html',
    controller: ['$scope', StocksCtrl]
  });