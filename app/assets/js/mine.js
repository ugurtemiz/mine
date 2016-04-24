(function (){
    var app = angular.module('mine',['ngMaterial', 'ngRoute', 'chart.js']);
    app.config(function($mdIconProvider) {
        $mdIconProvider
            .defaultIconSet('./app/assets/vendor/mdi.svg')
    });
    
    
    app.controller('MineController', function($scope) {
        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A', 'Series B'];

        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
    });
    
    
    app.controller('AddFileController', function($scope, $mdDialog, $mdMedia) {
        $scope.status = '  ';
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        $scope.showAlert = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('This is an alert title')
                .textContent('You can specify some description text in here.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );
        };
        
        $scope.showPrompt = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .title('What would you name your dog?')
                .textContent('Bowser is a common name.')
                .placeholder('dog name')
                .ariaLabel('Dog name')
                .targetEvent(ev)
                .ok('Okay!')
                .cancel('I\'m a cat person');
            $mdDialog.show(confirm).then(function(result) {
            $scope.status = 'You decided to name your dog ' + result + '.';
            }, function() {
            $scope.status = 'You didn\'t name your dog.';
            });
        };
        
        $scope.showAdvanced = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: ActionController,
                templateUrl: './app/assets/html/dialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };
    });
    
    app.controller('DialogController', function($scope, $http) {
        $scope.algorithms = [
          "FP Growth Algorithm"
        ];
        $scope.minimumSupport = 0.2;
        $scope.minimumSupportPerItemSet = 2;
        $scope.sorts = {
            0 : "Do not Sort",
            1 : "Ascending w.r.t. Item Frequency",
            2 : "Descending w.r.t. Item Frequency",
            3 : "Ascending w.r.t. Transaction Size Sum",
            4 : "Descending w.r.t. Transaction Size Sum"
        };
        
        $scope.file_changed = function(element) {

            $scope.filePath = element.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                $scope.$apply(function() {
                    $scope.prev_img = e.target.result;
                });
            };
            reader.readAsDataURL($scope.filePath);
        };
        
        $scope.start = function(){
            $http.get("http://localhost:8080" + '?s=' + $scope.minimumSupport + 
                                                '&m=' + $scope.minimumSupportPerItemSet + 
                                                '&q=-1')
            .then(function(response) {
                $scope.myWelcome = response.data;
            });
        }
        
    });
    
    function ActionController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }
    

})();
