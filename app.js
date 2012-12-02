"use strict";

var ZeitApp = angular.module('ZeitApp', ['ng']).config(['$httpProvider', function (http) {
    delete http.defaults.headers.common['X-Requested-With'];
}]).factory('Author', function ($http) {
        var Author = {
            get:function (params, cb) {
                var url = 'http://api.zeit.de/content?q=*' + params.id.toLowerCase() + '*&limit=10';
                $http.get(url, {
                    headers:{'X-Authorization':'602c992cc45dd61c013925c253777e31447df5b2ea6e83152283'}
                }).success(function(data, status, headers, config) {
                        cb(data);
                    }).error(function(data, status, headers, config) {
                        cb(data);
                    });
            }
        };

        return Author;
    });

ZeitApp.config(
    ['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl:'views/select.html', controller:ZeitCtrl})
            .when( '/articles', {templateUrl: "views/articles.html", controller:ZeitCtrl})
            .when( '/article/details', {templateUrl: "views/articleDetails.html", controller: ZeitCtrl});
    }
    ])


function ZeitCtrl($scope, Author, $location) {
    $scope.articleFind = function (keyword) {
      $scope.searchPerformed = true;
      Author.get({id: keyword}, function(articleList) {
          $scope.$parent.articles = articleList.matches;
          if ($scope.itemsFound()) {
              $location.path('/articles');
          }
      })
    }

    $scope.itemsFound = function () {
        return !$scope.searchPerformed || ($scope.$parent.articles && $scope.$parent.articles.length != 0);
    }
}



function ArticlesCtrl ($scope ) {
}