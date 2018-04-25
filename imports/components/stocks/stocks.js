import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './stocks.html';

import ngAnimate from 'angular-animate';

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

  buyStock(name, value) {
    console.log(name + value);
    //Meteor.call('userStocks.buy', name, value);
    alert("Success! You have bought one " + name + "!");
  }

}
 
export default angular.module('StocksApp', [
  angularMeteor,
  ngAnimate
])
.component('stocksApp', {
  templateUrl: 'imports/components/stocks/stocks.html',
  controller: ['$scope', StocksCtrl]
});