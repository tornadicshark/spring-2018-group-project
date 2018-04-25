import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './stocks.html';
 
class StocksCtrl {
  constructor() {

    this.stocks = [{
      name: 'Bitcoin',
      date: 'May 1, 2018',
      price: '422.50'
    }, {
      name: 'Bitcoin1',
      date: 'May 1, 2018',
      price: '422.50'
    }, {
      name: 'Bitcoin2',
      date: 'May 1, 2018',
      price: '422.50'
    }, {
      name: 'Bitcoin3',
      date: 'May 1, 2018',
      price: '422.50'
    }, {
      name: 'Bitcoin5',
      date: 'May 1, 2018',
      price: '422.50'
    }, {
      name: 'Bitcoin6',
      date: 'May 1, 2018',
      price: '422.50'
    }, {
      name: 'Bitcoin7',
      date: 'May 1, 2018',
      price: '422.50'
    }];
  }
}
 
export default angular.module('StocksApp', [
  angularMeteor
])
  .component('stocksApp', {
    templateUrl: 'imports/components/stocks/stocks.html',
    controller: StocksCtrl
  });