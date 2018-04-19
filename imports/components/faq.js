import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './faq.html';
 
class FaqCtrl {
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
 
export default angular.module('FaqApp', [
  angularMeteor
])
  .component('faqApp', {
    templateUrl: 'imports/components/faq.html',
    controller: FaqCtrl
  });