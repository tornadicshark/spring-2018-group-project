import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './sidebar.html';
 
class SidebarCtrl {
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
 
export default angular.module('SidebarApp', [
  angularMeteor
])
  .component('sideApp', {
    templateUrl: 'imports/components/sidebar.html',
    controller: SidebarCtrl
  });