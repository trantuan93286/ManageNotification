var MyApp = angular.module('MyApp', ["kendo.directives"]);

var BaseService = function ($rootScope, $http, $q, $filter, $timeout,  $log) {
    var guestInfo = {};
    var isCompleteModalProgressBar = false;
    function postData(controller, action, isValidateToken, data) {
        var result = $q.defer();
        $http({
            method: 'POST',
            contentType: 'application/json',
            url: $rootScope.baseUrl + controller + "/" + action,
            data: data,
            headers: {
                'RequestVerificationToken': $(':input:hidden[id*="antiForgeryToken"]').val()
            }
        })
           .success(function (response) {
               result.resolve(response);
           })
           .error(function (response) {
               result.reject(response);
           });

        return result.promise;
    }

    function postDataFromAPI(link, isValidateToken, data, token) {
        var result = $q.defer();
        $http({
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            data: data,
            contentType: 'json',
            url: link,

        })
           .success(function (response) {
               result.resolve(response);
           })
           .error(function (response) {
               result.reject(response);
           });

        return result.promise;
    }
    function ValidatorForm(form) {
        $(form).formValidation({
            framework: 'bootstrap',
            icon: {

            },
            excluded: ':disabled',
            fields: {

            },
        })
        .off('success.form.fv')
        .on('success.form.fv', function (e) {
            var $form = $(e.target),
            fv = $(e.target).data('formValidation');
            fv.defaultSubmit();

        })
        .on('err.field.fv', function (e, data) {
            if (data.fv.getSubmitButton()) {
                data.fv.disableSubmitButtons(false);
            }

        })
        .on('success.field.fv', function (e, data) {
            if (data.fv.getSubmitButton()) {
                data.fv.disableSubmitButtons(false);
            }
        }).on('err.validator.fv', function (e, data) {
            // $(e.target)    --> The field element
            // data.fv        --> The FormValidation instance
            // data.field     --> The field name
            // data.element   --> The field element
            // data.validator --> The current validator name

            data.element
                .data('fv.messages')
                // Hide all the messages
                .find('.help-block[data-fv-for="' + data.field + '"]').hide()
                // Show only message associated with current validator
                .filter('[data-fv-validator="' + data.validator + '"]').show();
        });
    };


    var showCommonDialog = function (msgInfor) {

        var defer = $q.defer();
        var modalInstance = $modal.open({
            animation: true,
            size: msgInfor.size,
            backdrop: 'static',
            windowClass: 'center-modal',
            templateUrl: 'NotificationCommonModal.html',
            controller: "CommonDialogController",
            resolve: {
                items: function () {
                    return msgInfor;
                }
            }
        });
        modalInstance.result.then(function (response) {
            if (response == "Ok") {
                defer.resolve(modalInstance);
            }
        }, function () {
            modalInstance.close();
            defer.reject();
            $log.info('Modal dismissed at: ' + new Date());
        });
        return defer.promise;
    }

    function displaySuccess(message, timeOut) {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "onclick": null,
            "fadeIn": 300,
            "fadeOut": 1000,
            "timeOut": timeOut == null ? 3000 : timeOut,
            "extendedTimeOut": 1000,
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
        };
        toastr.success(message);
    }

    function displayError(error, timeOut) {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "onclick": null,
            "fadeIn": 300,
            "fadeOut": 1000,
            "timeOut": timeOut == null ? 5000 : timeOut,
            "extendedTimeOut": 1000,
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
        };
        if (Array.isArray(error)) {
            error.each(function (err) {
                toastr.error(err);
            });
        }
        else {
            toastr.error(error);
        }
    }

    function displayWarning(message, timeOut) {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "onclick": null,
            "fadeIn": 300,
            "fadeOut": 1000,
            "timeOut": timeOut == null ? 5000 : timeOut,
            "extendedTimeOut": 1000,
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
        };
        toastr.warning(message);
    }

    function displayInfo(message, timeOut) {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "onclick": null,
            "fadeIn": 300,
            "fadeOut": 1000,
            "timeOut": timeOut == null ? 3000 : timeOut,
            "extendedTimeOut": 1000,
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
        };
        toastr.info(message);
    }

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    function getJsonDateObj(jsonDate) {
        var dateObj = null;
        if (jsonDate == null) {
            return null;
        } else {
            d = new Date(jsonDate);
            if (d.valid()) {
                dateObj = new Date(jsonDate);
            } else {
                dateObj = new Date(parseInt(jsonDate.replace('/Date(', '')));
            }

        }
        return dateObj;

    }

    function calculateWordDimensions(text, size) {
        var font = "bold " + size + "px arial"
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        context.font = font;
        var metrics = context.measureText(text);
        return metrics.width;
    }
 
    function formatFullDateTime(sDate) {
        if (sDate != "" && sDate != undefined) {
            return $filter('jsDate')(sDate, $filter('uppercase')($rootScope.RootScopeDateFormat) + ' HH:mm');
        } else {
            return "";
        }
    }


    return {
        postData: postData,
        ValidatorForm: ValidatorForm,
        postDataFromAPI: postDataFromAPI,
        showCommonDialog: showCommonDialog,
        displaySuccess: displaySuccess,
        displayError: displayError,
        displayWarning: displayWarning,
        displayInfo: displayInfo,
        formatFullDateTime: formatFullDateTime,
    };
}
BaseService.$inject = ['$rootScope', '$http', '$q', '$filter', '$timeout',  '$log'];


MyApp.service('BaseService', BaseService);



MyApp.run(['$rootScope', 'BaseService', '$window', '$timeout', function ($rootScope, BaseService, $window, $timeout) {

    var baseUrl = $('baseurl').attr('value');
    $rootScope.baseUrl = baseUrl;
    $rootScope.RootScopeDateFormat = $('baseurl').attr('value');
    $rootScope.openErrorMessageModal = function (size, message) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: $rootScope.baseUrl + 'Template/errorMessageModal.html',
            controller: 'ModalErrorMessageController',
            size: null,
            resolve: {
                item: function () {
                    return message;
                }
            }
        });

        modalInstance.result.then(function (response) {
            //$scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $rootScope.$on('event:loginRequired', function () {
        if ($rootScope.RootScopeSessionExpiredShowing == false) {
            $rootScope.RootScopeSessionExpiredShowing = true;
            var msgInfor = {
                headerText: document.querySelector('#ResourceWarning').value,
                bodyMsg: document.querySelector('#ResourceSessionExpired').value,
                size: 'md',
                btnOK: document.querySelector('#ResourceOK').value,
                btnCancel: document.querySelector('#ResourceCancel').value,
                type: ENUMS.HeaderType.Warning,
                showBtnOK: false,
                showBtnCancel: false
            }
            BaseService.showCommonDialog(msgInfor).then(function (result) {
            });
            $timeout(function () {
                $window.location.href = $rootScope.baseUrl + "Home/LoginPage";
            }, 5000)
        }
         
    });
     
}]);
 
MyApp.filter("jsDate", function ($log) {
    return function (x, formatDate) {
        return moment(x).format(formatDate);

    };
});

MyApp.filter("formatDate", ['$log', '$filter', '$rootScope', function ($log, $filter, $rootScope) {
    return function (sDate) {
        if (sDate != "" && sDate != undefined) {
            var s = $rootScope.RootScopeDateFormat;
            if (s == '' || s == undefined || s == null) {
                s = "MM/dd/yyyy";
            }
            var s = $filter('uppercase')(s);
            s = s.replace("DDD", "ddd");
            return $filter('jsDate')(sDate, s);
        } else {
            return "";
        }
        return $filter('jsDate')(sDate, $filter('uppercase')($rootScope.RootScopeDateFormat));

    };
}]);


//var MyApp = angular.module('MyApp', ["kendo.directives"]);

 