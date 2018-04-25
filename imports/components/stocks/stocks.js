import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './stocks.html';

import { Meteor } from 'meteor/meteor';
import { Stocks } from '../../api/Stocks';

class StocksCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    // Return the data mostly right now
    this.helpers({
      currentUser() {
        return Meteor.user();
      },
      stocks() {
        return Stocks.find({});
        /*
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
        }];*/
      }
    })
  }

  buyStock(name, value, owner) {
    console.log("buy form button clicked");
    console.log(name + ", " + value + ", " + owner);
  }

}
 
export default angular.module('StocksApp', [
  angularMeteor
])
  .component('stocksApp', {
    templateUrl: 'imports/components/stocks/stocks.html',
    controller: ['$scope', StocksCtrl]
  });