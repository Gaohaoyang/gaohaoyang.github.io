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
            .state('index', {
                url: '/index',
                views: {
                    '': {
                        templateUrl: 'templates/AllContent.html'
                    },
                    'navbar@index': {
                        templateUrl: 'templates/navbar.html'
                    },
                    'main@index': {
                        templateUrl: 'templates/home.html'
                    }
                }
            })
            .state('index.blog', {
                url: '/blog',
                views: {
                    'main@index': {
                        templateUrl: 'templates/blog.html'
                    }
                }
            })
            .state('index.blog.Jekyll', {
                url: '/Jekyll',
                templateUrl: 'templates/Jekyll.html'
            })
            .state('index.blog.GitHub', {
                url: '/GitHub',
                templateUrl: 'templates/GitHub.html'
            })
            .state('index.blog.Html', {
                url: '/Html',
                templateUrl: 'templates/Html.html'
            })
            .state('index.blog.CSS', {
                url: '/CSS',
                templateUrl: 'templates/CSS.html'
            })
            .state('index.demo', {
                url: '/demo',
                views: {
                    'main@index': {
                        templateUrl: 'templates/demo.html'
                    }
                }
            })
            .state('index.practice',{
                url:'/practice',
                views:{
                    'main@index':{
                        templateUrl:'templates/practice.html'
                    }
                }
            });
    });