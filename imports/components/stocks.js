import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './stocks.html';
 
class StocksCtrl {
  constructor() {
    this.tasks = [{
      text: 'This is task 1'
    }, {
      text: 'This is task 2'
    }, {
      text: 'This is task 3'
    }];
  }
}
 
export default angular.module('StocksApp', [
  angularMeteor
])
  .component('stocksApp', {
    templateUrl: 'imports/components/stocks.html',
    controller: StocksCtrl
  });