'use strict';
var app = angular.module('searchApp', ['naif.base64']);

app.controller('SearchController', searchController);
app.controller('DocumentController', documentController);

function searchController($scope, $http) {
    $scope.documents = [];
    $scope.searchtext = "";
    $scope.search = search;
    $scope.switchPage = switchPage;
    $scope.deleteDocument = deleteDocument;

    $scope.paging = {
        currentPage: 0,
        pages: new Array(1)
    }


    function search() {
        $scope.paging.currentPage = 0;
        performSearch();
    }

    function switchPage(index) {
        var pageCount = $scope.paging.pages.length;
        if (index >= 0 && index < pageCount) {
            console.log("switch to " + index);
            $scope.paging.currentPage = index;
            performSearch();
        }
    }

    function performSearch() {
        var page = $scope.paging.currentPage;
        var searchtext = $scope.searchtext;

        $http({
            method: 'GET',
            url: '/documents/search',
            params: {
                search: searchtext,
                page: page
            }
        }).then(function (response) {
            $scope.documents = response.data.documents;
            $scope.paging.currentPage = response.data.page;
            $scope.paging.pages = new Array(response.data.pageCount);
        });
    }
    
    function deleteDocument(id) {
        console.log('delete');
        $http({
            method: 'DELETE',
            url: '/documents/' + id
        }).then(function(){
            performSearch();
        });
    }
    //init
    performSearch();
}

function documentController($scope, $http) {
    $scope.newDocument = {};
    $scope.createDocument = createDocument;
    $scope.file = null;

    function createDocument() {
        console.log(JSON.stringify($scope.newDocument));

        $http({
            method: 'POST',
            url: '/documents',
            data: {
                title: $scope.newDocument.title,
                filename: $scope.newDocument.file.filename,
                type: $scope.newDocument.file.filetype,
                file: $scope.newDocument.file.base64
            }
        });
    }
}