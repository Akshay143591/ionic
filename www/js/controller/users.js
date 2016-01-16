angular.module('appTest.users', []).controller('UserController', function($scope, $http, $timeout, Upload, $cordovaCamera, $cordovaContacts, $ionicLoading , $cordovaSms, $cordovaMedia, $cordovaFlashlight, $location, $ionicModal, $timeout) {

    // var src = "img/SaiboMyMp3SongComRingtone.mp3";
    // var media = $cordovaMedia.newMedia(src);  
    // media.play();

    // var socket = io.connect(serverUrl);

    // $scope.userImage = [];
    // socket.on('getUploadImage', function(data) {
    //     $scope.userImage.push(data);
    //     $scope.$apply();
    // });


    $scope.sendSMS = function(){
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: ''  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        }

        $cordovaSms.send('', 'Hi Harilal (ionic)', options)
          .then(function() {
          }, function(error) {
        });
    }

    // $scope.getImage = function(){
    //     $http.get(serverUrl + '/files/get').success(function(result){
    //         if(result.length){
    //             for(var key in result){
    //                 $scope.userImage.push(result[key].image);
    //             }
    //         }
    //     });
    // }

    $scope.getCamera = function(){
        var options = {
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
        };

        $cordovaCamera.getPicture(options).then(function(imageURI) {
            $scope.userImage.push(imageURI);
        }, function(err) {      
        });
    }

    

    $scope.getContactList = function() {
        $ionicLoading.show({template: 'Loading...'});

        $cordovaContacts.find({filter: ''}).then(function(result) {
            $ionicLoading.hide();
            $scope.contacts = result;
        }, function(error) {
            console.log("ERROR: " + error);
        });
    }

    // for multiple files:
    $scope.uploadFiles = function(files) {  
        if (files && files.length) {
            $ionicLoading.show({template: 'Loading...'});
            setTimeout(function(){
                for (var i = 0; i < files.length; i++) {
                    Upload.upload({
                        url: serverUrl + '/files/upload',
                        data: {
                            file: files[i]
                        }
                    }).then(function(data) {
                        $ionicLoading.hide();
                    });
                }
            },4000);
        }
    }

    // for multiple files:
    // $scope.onFlashLight = function() {
        
    //     $cordovaFlashlight.available().then(function(availability) {
    //         var avail = availability; // is available
    //     }, function () {
    //         // unavailable
    //     });

    //     $cordovaFlashlight.switchOn()
    //         .then(
    //           function (success) { /* success */ },
    //           function (error) { /* error */ });
      
    // }
    
    // $scope.oFFlashLight = function() {  
    //     $cordovaFlashlight.switchOff()
    //     .then(
    //       function (success) { /* success */ },
    //       function (error) { /* error */ });
    // }

    $scope.toggleFlashLight = function() {
        $cordovaFlashlight.toggle()
        .then(function (success) { /* success */ },
        function (error) { /* error */ });
    }
    
    // --
    // Login
    $scope.signIn = function(fname, pass) {
        if (fname == pass) {
            $location.path('/home');
        }
    }

    // --
    //

    $scope.openModal = function() {
        $timeout(function() {
            $ionicModal.fromTemplateUrl('my-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
            });
            
            $scope.modal.show();
        }, 500);
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
    }

});