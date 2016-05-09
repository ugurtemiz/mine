(function (){
    var app = angular.module('mine',['ngMaterial']);
    app.config(function($mdIconProvider) {
        $mdIconProvider
            .defaultIconSet('./app/assets/vendor/mdi.svg')
    });
    
    
    app.controller('MineController', function($scope, $rootScope, $http, $interval) {
        
        $rootScope.$on("myEvent", function (event, args) {
            $http.get("http://localhost:9090" + '?s=' + args.minimumSupport + 
                                                '&m=' + args.minimumSupportPerItemSet + 
                                                '&q=' + args.sorts +
                                                '&f=' + args.filePath)
            .then(function(response) {
                $http.get("test1.csv")
                .then(function successCallback(response1) {
                    var tuple = CsvtoArray(response1.data, args.maxData);
                    $scope.table = tuple[2];
                    var ctx = document.getElementById("myChart");
                    var myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: tuple[0],
                            datasets: [{
                                label: 'Result of the Dataset',
                                backgroundColor: "rgba(54,162,235,0.2)",
                                borderColor: "rgba(54,162,235,1)",
                                borderWidth: 1,
                                hoverBackgroundColor: "rgba(54,162,235,0.4)",
                                hoverBorderColor: "rgba(54,162,235,1)",
                                data: tuple[1]
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero:true
                                    }
                                }]
                            }
                        }
                    });
                }, function errorCallback(response1) {
                    alert("Error while reading result csv.");
                });
            });
            
        });
        
    });
    
    app.controller('AddFileController', function($scope, $mdDialog, $mdMedia) {
        $scope.status = '  ';
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        
        $scope.showAdvanced = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: ActionController,
                templateUrl: './app/assets/html/dialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };
    });
    
    app.controller('DialogController', function($scope, $rootScope) {
        var mappedSort = 0;
        $scope.algorithms = [
          "FP Growth Algorithm"
        ];
        $scope.minimumSupport = 0.2;
        $scope.minimumSupportPerItemSet = 2;
        $scope.maxData = 20;
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
            mappedSort = sortMapping($scope.sort);
            if( $scope.maxData <= 500 && $scope.maxData > 0 &&
                $scope.minimumSupport > 0 &&
                $scope.minimumSupportPerItemSet > 0 &&
                $scope.filePath.path != undefined   
            ){
                
                $rootScope.$emit("myEvent", {   
                    minimumSupport           : $scope.minimumSupport,
                    minimumSupportPerItemSet : $scope.minimumSupportPerItemSet,
                    sorts                    : mappedSort,
                    maxData                  : $scope.maxData,
                    filePath                 : $scope.filePath.path
                });
                
                $scope.cancel();
            }
            
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
    
    
    function CsvtoArray(csvData, maxData) {
        var lines = csvData.split('\n');
        var result = [];
        var labels = [];
        var data = [];
        
        for(var line = 0; line < lines.length; line++){
           if(lines[line] != "" ){
                var tuple = lines[line].split(' (');
                if(tuple[0] != undefined && tuple[1] != undefined){
                    result.push(
                        {
                            "key": tuple[0], 
                            "value": tuple[1].substring(0, tuple[1].length - 1)
                        });
                }
                
           }
        }
        //result.sort(compareReverse);
        var obj;
        for(var i=0; i < maxData; i++){
            obj = result[i];
            
            labels.push(obj["key"]);
            data.push(obj["value"]);
        }
        
        return [labels, data, result];
    }
    
    function compareReverse(a,b) {
        if (a.value < b.value)
            return 1;
        else if (a.value > b.value)
            return -1;
        else 
            return 0;
    }
    
    function sortMapping(key) {
        if(key == "Ascending w.r.t. Item Frequency")
            return 1;
        else if (key == "Descending w.r.t. Item Frequency")
            return -1;
        else if (key == "Ascending w.r.t. Transaction Size Sum")
            return 2;
        else if (key == "Descending w.r.t. Transaction Size Sum")
            return -2;
        else 
            return 0;
    }
})();