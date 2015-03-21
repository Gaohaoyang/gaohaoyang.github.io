/**
* routerApp Module
*
* Description
* Just test ui-router
*/
angular.module('routerApp', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/index');
	$stateProvider
		.state('index',{
			url:'/index',
			views: {
				'':{
					templateUrl:'templates/index.html'
				},
				
			}
		});
});