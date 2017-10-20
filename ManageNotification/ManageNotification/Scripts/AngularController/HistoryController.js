
MyApp.controller('HistoryController', [
        '$scope', '$rootScope', '$filter', '$q', '$http', '$timeout', '$window', '$log', '$location', 'BaseService',
        function ($scope, $rootScope, $filter, $q, $http, $timeout, $window, $log, $location, BaseService) {

            $scope.data = {
                lstLichSuTruyenThong: [],
                NoiDung: "",
                Mobile: [""],
                lstHinhThucTruyenThong: [],
                lstDoiTuongTruyenThong: [],
                lstHuyen: [],
                lstMobile: [],
                lstXa: [{ "TENXA": "", "XA_ID": "" }],
            }

            $scope.baseSaveUrl = $rootScope.baseUrl + 'Home/SaveFile';

            $scope.searchInfo = {
                TU_NGAY: new Date(),
                DEN_NGAY: new Date(),
                searchByStartDate: true,
                searchByEndDate: true,
                HINH_THUC_TRUYEN_THONG: 1,
                PHAM_VI: 2,
                KHU_VUC_ID: "",
                DOI_TUONG: 1,
                HUYEN_ID: "",
                XA_ID: "",
            };

            $scope.ChienDichTruyenThongInfo = {
                TEN_CHIEN_DICH: "",
                HINH_THUC_TRUYEN_THONG: 1,
                KHU_VUC_ID: "",
                PHAM_VI: 2,
                NGAY_THUC_HIEN: new Date(),
                GIO_THUC_HIEN_OBJ:"",
                GIO_THUC_HIEN: new Date(),
                SO_LUONG: 2000,
                NOI_DUNG: "", 
                DOI_TUONG: 1,
                TRANG_THAI: "0",
                SO_LUONG_THANH_CONG: 0,
                HUYEN_ID: "",
                XA_ID: "",
                TINH_ID: 305,
                Mobile: [],
            };

            $scope.ChienDichTruyenThongInfoOrg = angular.copy($scope.ChienDichTruyenThongInfo)

            $scope.searchHuyen = {
                TINH_ID: "305",
            };

            $scope.searchXa = {
                HUYEN_ID: "",
            };
             
            $scope.formatFullDateTime = function (date) {
                return BaseService.formatFullDateTime(date);
            }

            $scope.onRemove = function (e) {

            }

            $scope.onSuccess = function (e) {
                console.log(e);
                $scope.ChienDichTruyenThongInfo.Mobile = e.response.data;

                $scope.data.lstMobile = e.response.data;
                console.log($scope.ChienDichTruyenThongInfo.Mobile);
                $scope.$apply();
            }

            $scope.onSelect = function (e) {

            }

            $scope.onError = function (e) {

            }

            $scope.onUpload = function (e) {
                //e.data = { sZENGINHistoryID: $scope.currentZenginHistoryID };
            }

            $scope.searchChienDich = function () {
                console.log($scope.searchInfo);

                if (($scope.searchInfo.HUYEN_ID != undefined && $scope.searchInfo.HUYEN_ID != null && $scope.searchInfo.HUYEN_ID != "") || ($scope.searchInfo.XA_ID != undefined && $scope.searchInfo.XA_ID != null && $scope.searchInfo.XA_ID != "")) {
                    if ($scope.searchInfo.HUYEN_ID != undefined && $scope.searchInfo.HUYEN_ID != null && $scope.searchInfo.HUYEN_ID != "") {
                        if ($scope.searchInfo.XA_ID != undefined && $scope.searchInfo.XA_ID != null && $scope.searchInfo.XA_ID != "") {
                            $scope.searchInfo.PHAM_VI = 4;
                            $scope.searchInfo.KHU_VUC_ID = $scope.searchInfo.XA_ID;
                        }
                        else {
                            $scope.searchInfo.PHAM_VI = 3;
                            $scope.searchInfo.KHU_VUC_ID = $scope.searchInfo.HUYEN_ID;
                        }                      
                    }
                }
                else {
                    $scope.searchInfo.PHAM_VI = 2;
                    $scope.searchInfo.KHU_VUC_ID = 305;
                }

                BaseService.postData("Home", "LoadAllChienDichTruyenThong", false, $scope.searchInfo).then(function (response) {
                    if (response.code == "0") {
                        $scope.data.lstLichSuTruyenThong = response.data;
                    }
                    else {
                        BaseService.displayError(response.msgError);
                    }
                }).finally(function () {

                }, function () { });
            }

            $scope.searchAllXa = function () {
                
                $scope.searchXa.HUYEN_ID = $scope.searchInfo.HUYEN_ID;
                console.log($scope.searchXa);
                if ($scope.searchXa.HUYEN_ID != undefined && $scope.searchXa.HUYEN_ID != null && $scope.searchXa.HUYEN_ID != "") {
                    BaseService.postData("Home", "LoadAllXa", false, $scope.searchXa).then(function (response) {
                        if (response.code == "0") {
                            $scope.data.lstXa = response.data;
                        }
                        else {

                        }
                    }).finally(function () {

                    }, function () { });
                }
                else {
                    $scope.data.lstXa = [{ "TENXA": "", "XA_ID": "" }];

                }
            }

            $scope.searchAllXa2 = function () {

                $scope.searchXa.HUYEN_ID = $scope.ChienDichTruyenThongInfo.HUYEN_ID;
                console.log($scope.searchXa);
                if ($scope.searchXa.HUYEN_ID != undefined && $scope.searchXa.HUYEN_ID != null && $scope.searchXa.HUYEN_ID != "") {
                    BaseService.postData("Home", "LoadAllXa", false, $scope.searchXa).then(function (response) {
                        if (response.code == "0") {
                            $scope.data.lstXa2 = response.data;
                        }
                        else {

                        }
                    }).finally(function () {

                    }, function () { });
                }
                else {
                    $scope.data.lstXa = [{ "TENXA": "", "XA_ID": "" }];

                }
            }

            $scope.loadAllData = function () {

                BaseService.postData("Home", "LoadAllHinhThucTruyenThong", true, null).then(function (response) {

                    $scope.data.lstHinhThucTruyenThong = response.data;

                    $scope.ChienDichTruyenThongInfo.HINH_THUC_TRUYEN_THONG = $scope.data.lstHinhThucTruyenThong[0].ID;
                    
                    return BaseService.postData("Home", "LoadAllDoiTuongTruyenThong", true, null);

                }).then(function (response) {

                    $scope.data.lstDoiTuongTruyenThong = response.data;
                    $scope.ChienDichTruyenThongInfo.DOI_TUONG = $scope.data.lstDoiTuongTruyenThong[0].ID;
                    return BaseService.postData("Home", "LoadAllHuyen", true, $scope.searchHuyen);
                }).then(function (response) {

                    $scope.data.lstHuyen = response.data;

                    $scope.searchChienDich();
                }).finally(function () {

                }, function () { });

            }

            $scope.loadAllData();
             
            $scope.saveChienDich = function () {
                console.log($scope.ChienDichTruyenThongInfo);

                if (($scope.ChienDichTruyenThongInfo.HUYEN_ID != undefined && $scope.ChienDichTruyenThongInfo.HUYEN_ID != null && $scope.ChienDichTruyenThongInfo.HUYEN_ID != "") || ($scope.ChienDichTruyenThongInfo.XA_ID != undefined && $scope.ChienDichTruyenThongInfo.XA_ID != null && $scope.ChienDichTruyenThongInfo.XA_ID != "")) {
                    if ($scope.ChienDichTruyenThongInfo.HUYEN_ID != undefined && $scope.ChienDichTruyenThongInfo.HUYEN_ID != null && $scope.ChienDichTruyenThongInfo.HUYEN_ID != "") {
                        if ($scope.ChienDichTruyenThongInfo.XA_ID != undefined && $scope.ChienDichTruyenThongInfo.XA_ID != null && $scope.ChienDichTruyenThongInfo.XA_ID != "") {
                            $scope.ChienDichTruyenThongInfo.PHAM_VI = 4;
                            $scope.ChienDichTruyenThongInfo.KHU_VUC_ID = $scope.ChienDichTruyenThongInfo.XA_ID;
                        }
                        else {
                            $scope.ChienDichTruyenThongInfo.PHAM_VI = 3;
                            $scope.ChienDichTruyenThongInfo.KHU_VUC_ID = $scope.ChienDichTruyenThongInfo.HUYEN_ID;
                        }
                    }
                }
                else {
                    $scope.ChienDichTruyenThongInfo.PHAM_VI = 2;
                    $scope.ChienDichTruyenThongInfo.KHU_VUC_ID = 305;
                }

                BaseService.postData("Home", "AddNewChienDich", false, $scope.ChienDichTruyenThongInfo).then(function (response) {
                    if (response.code == "0") {
                        $scope.searchChienDich();
                        BaseService.displaySuccess(response.message);
                    }
                    else {
                        BaseService.displayError(response.message);
                    }
                }).finally(function () {

                }, function () { });
                 
            }


           

            $scope.openModal = function () {
                $scope.ChienDichTruyenThongInfo = angular.copy($scope.ChienDichTruyenThongInfoOrg);
                console.log($scope.ChienDichTruyenThongInfo);
            }


            $scope.editChienDich = function (AutoID) {
             
                //var data = {
                //    "AutoID": AutoID,
                //}
                //BaseService.postData("Home", "GetChienDichInfo", false, data).then(function (response) {
                //    if (response.code == "0") {
                //        $scope.ChienDichTruyenThongInfo = response.data;
                      
                //    }
                //    else {
                //        BaseService.displayError(response.message);
                //    }
                //}).finally(function () {

                //}, function () { });
                 
                $scope.sendChienDich = function () {
                    var data = {
                        "chienDichID": AutoID,
                        "Mobile": ["0979162224"],
                    }
                    BaseService.postData("Home", "SendChienDich", false, data).then(function (response) {
                        if (response.code == "0") {
                            $scope.searchChienDich();
                            BaseService.displaySuccess(response.message);
                        }
                        else {
                            BaseService.displayError(response.message);
                        }
                    }).finally(function () {

                    }, function () { });

                }

            }
        }
]);
