"use strict";

var ZeitApp = angular.module('ZeitApp', ['ng']).config(['$httpProvider', function (http) {
    delete http.defaults.headers.common['X-Requested-With'];
}]).factory('Author', function ($http) {
        var Author = {
            get:function (params, cb) {
                $http.get('http://api.zeit.de/keyword/' + params.id + '', {
                    headers:{'X-Authorization':'602c992cc45dd61c013925c253777e31447df5b2ea6e83152283'}
                }).success(function (response) {
                        cb(response);
                    });
            }
        };

        return Author;
    });

ZeitApp.config(
    ['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl:'views/select.html', controller:ZeitCtrl})
            .when( '/articles', {templateUrl: "views/articles.html"});
    }
    ])


function ZeitCtrl($scope, Author, $location) {
    $scope.articleFind = function (keyword) {
      Author.get({id: keyword}, function(articles) {
          $scope.articles = articles.matches;
          $location.path('/articles');
      })
    }
}



function ArticlesCtrl ($scope ) {
    console.log("ping" );
}