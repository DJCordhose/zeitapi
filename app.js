"use strict";

var ZeitApp = angular.module('ZeitApp', ['ng']).config(['$httpProvider', function (http) {
        delete http.defaults.headers.common['X-Requested-With'];
    }]).factory('Content', function ($http) {
        var Content = {
            get:function (params, cb) {
                var url = 'http://api.zeit.de/content?q=*' + params.id.toLowerCase() + '*&limit=10';
                $http.get(url, {
                    headers:{'X-Authorization':'b56eb8f8068394f30c303747f837e46f6bf265c18b80d8dc0743'}
                }).success(function(data, status, headers, config) {
                        cb(data);
                    }).error(function(data, status, headers, config) {
                        cb(data);
                    });
            }
        };

        return Content;
    }).factory('Details', function ($http) {
        var Details = {
            get:function (uri, cb) {
                $http.get(uri, {
                    headers:{'X-Authorization':'b56eb8f8068394f30c303747f837e46f6bf265c18b80d8dc0743'}
                }).success(function(data, status, headers, config) {
                        cb(data);
                    }).error(function(data, status, headers, config) {
                        cb(data);
                    });
            }
        };

        return Details;
    });

ZeitApp.config(
    ['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl:'views/select.html', controller:ZeitCtrl})
            .when( '/articles', {templateUrl: "views/articles.html", controller:ArticlesCtrl})
            .when( '/article/details', {templateUrl: "views/details.html", controller: DetailsCtrl});
    }
    ])

function ZeitCtrl($scope, Content, Details, $location, $rootScope) {
    $scope.articleFind = function (keyword) {
      $scope.searchPerformed = true;
      $rootScope.taskPending = true;
      Content.get({id: keyword}, function(articleList) {
          $rootScope.taskPending = false;
          $rootScope.articles = articleList.matches;
          if ($scope.itemsFound()) {
//              localStorage["lastQuery"] = JSON.stringify($scope.$parent.articles);
              $location.path('/articles');
          }
      });
    }

    $scope.itemsFound = function () {
        return !$scope.searchPerformed || ($scope.$parent.articles && $scope.$parent.articles.length != 0);
    }

    $scope.details = function(article) {
        $rootScope.taskPending = true;
        var uri = article.uri;
        Details.get(uri, function(details) {
            $rootScope.taskPending = false;
            $rootScope.article = details;
            $location.path('/article/details');
        });
    }

    $scope.inprogress = function() {
        return $rootScope.taskPending;
    }
}

function ArticlesCtrl ($scope,$rootScope) {
    if (!$rootScope.articles) {
//        $rootScope.articles = JSON.parse(localStorage["lastQuery"]);
    }
}


function DetailsCtrl ($scope, $location, $rootScope) {

    $scope.$on('$viewContentLoaded', function(event) {
        var value = $rootScope.article.annotation;
        $('#annotation').val(value);
    });

    $scope.$watch("article.annotation", function(newVal,oldVal) {
        console.log( newVal )
    })

    $('.textarea').wysihtml5();

    $scope.save = function(article) {
        var value = $('#annotation').val();
        $rootScope.article.annotation = value;
//        localStorage["lastQuery"] = JSON.stringify($rootScope.articles);
        $location.path("/articles");
    }
}