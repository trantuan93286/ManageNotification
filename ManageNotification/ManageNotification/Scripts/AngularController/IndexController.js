 MyApp.controller('IndexController', [
        '$scope', '$rootScope', '$filter', '$q', '$http', '$timeout', '$window',  '$log', '$location', 'BaseService',
        function ($scope, $rootScope, $filter, $q, $http, $timeout, $window,  $log, $location,  BaseService) {
    //variable
    $scope.data = {
        dataHuyen: [],
        dataKi: [
        { ID: 1, Text: "Ngày" },
        { ID: 2, Text: "Tuần" },
        { ID: 3, Text: "Tháng" },
        //{ ID: 4, Text: "Quý" },
        { ID: 5, Text: "Năm" }],
        dataThang: [{ ID: 1, Text: "Một" },
       { ID: 2, Text: "Hai" },
       { ID: 3, Text: "Ba" },
       { ID: 4, Text: "Bốn" },
       { ID: 5, Text: "Năm" },
       { ID: 6, Text: "Sáu" },
       { ID: 7, Text: "Bảy" },
       { ID: 8, Text: "Tám" },
       { ID: 9, Text: "Chín" },
       { ID: 10, Text: "Mười" },
       { ID: 11, Text: "Mười một" },
       { ID: 12, Text: "Mười hai" }],
        dataNam: [
            { ID: 2017, Text: "2017" },
            { ID: 2016, Text: "2016" },
            { ID: 2015, Text: "2015" },
            { ID: 2014, Text: "2014" },
            { ID: 2013, Text: "2013" },
            { ID: 2012, Text: "2012" },
            { ID: 2011, Text: "2011" },
            { ID: 2010, Text: "2010" },
        ],
        //
        dataBenh: [
            {ID: 40, Text: 'Tay - chân - miệng', so_mac: 0, so_chet: 0, status: 1},
            { ID: 42, Text: 'Viêm đường hô hấp Trung đông (MERS-CoV)', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 44, Text: 'Bệnh truyền nhiễm nguy hiểm và Bệnh chưa rõ tác nhân gây bệnh', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 25, Text: 'Bại liệt', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 43, Text: 'Viêm màng não do não mô cầu', so_mac: 0, so_chet: 0, status: 2},
            { ID: 26, Text: 'Bạch hầu', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 45, Text: 'Dại', so_mac: 0, so_chet: 0, status: 2},
            { ID: 46, Text: 'Ho gà', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 47, Text: 'Liệt mềm cấp nghi bại liệt', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 48, Text: 'Lao phổi', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 49, Text: 'Sốt rét', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 50, Text: 'Thương hàn', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 51, Text: 'Uốn ván sơ sinh', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 27, Text: 'Bệnh do liên cầu lợn ở người', so_mac: 0, so_chet: 0, status: 2},
            { ID: 29, Text: 'Cúm A(H7N9)', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 28, Text: 'Cúm A(H5N1)', so_mac: 0, so_chet: 0, status: 2},
             { ID: 30, Text: 'Dịch hạch', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 31, Text: 'Ê-bô-la (Ebolla)', so_mac: 0, so_chet: 0, status: 2},
            { ID: 32, Text: 'Lát-sa (Lassa)', so_mac: 0, so_chet: 0, status: 1},
            { ID: 33, Text: 'Mác-bớt (Marburg)', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 34, Text: 'Rubella (Rubeon)', so_mac: 0, so_chet: 0, status: 2},
            { ID: 35, Text: 'Sốt Tây sông Nin', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 36, Text: 'Sốt Vàng', so_mac: 0, so_chet: 0, status: 2},
            { ID: 37, Text: 'Sốt xuất huyết Dengue', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 38, Text: 'Sởi', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 39, Text: 'Tả', so_mac: 0, so_chet: 0, status: 2},
            { ID: 41, Text: 'Than', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 54, Text: 'Viêm gan vi rút B', so_mac: 0, so_chet: 0, status: 2},
            { ID: 52, Text: 'Uốn ván khác', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 53, Text: 'Viêm gan vi rút A', so_mac: 0, so_chet: 0, status: 2},
            { ID: 55, Text: 'Viêm gan vi rút C', so_mac: 0, so_chet: 0, status: 2},
            { ID: 56, Text: 'Viêm não Nhật bản', so_mac: 0, so_chet: 0, status: 1},
            { ID: 57, Text: 'Viêm não vi rút khác', so_mac: 0, so_chet: 0, status: 2},
            { ID: 58, Text: 'Xoắn khuẩn vàng da (Leptospira)', so_mac: 0, so_chet: 0, status: 1},
            { ID: 59, Text: 'Bệnh do vi rút Adeno', so_mac: 0, so_chet: 0, status: 2},
            { ID: 60, Text: 'Cúm', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 61, Text: 'Lỵ amíp', so_mac: 0, so_chet: 0, status: 2},
            { ID: 62, Text: 'Lỵ trực trùng', so_mac: 0, so_chet: 0, status: 2},
            { ID: 63, Text: 'Quai bị', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 64, Text: 'Thủy đậu', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 65, Text: 'Tiêu chảy', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 66, Text: 'Viêm gan vi rút khác', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 141, Text: 'Thay đổi chẩn đoán- Bệnh không thuộc danh mục', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 121, Text: 'Zika', so_mac: 0, so_chet: 0 },
            { ID: 161, Text: 'Đã điều tra nhưng không có ca bệnh trên địa bàn', so_mac: 0, so_chet: 0, status: 2},
        ],
        dataBenhInit: [
            { ID: 40, Text: 'Tay - chân - miệng', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 42, Text: 'Viêm đường hô hấp Trung đông (MERS-CoV)', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 44, Text: 'Bệnh truyền nhiễm nguy hiểm và Bệnh chưa rõ tác nhân gây bệnh', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 25, Text: 'Bại liệt', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 43, Text: 'Viêm màng não do não mô cầu', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 26, Text: 'Bạch hầu', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 45, Text: 'Dại', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 46, Text: 'Ho gà', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 47, Text: 'Liệt mềm cấp nghi bại liệt', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 48, Text: 'Lao phổi', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 49, Text: 'Sốt rét', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 50, Text: 'Thương hàn', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 51, Text: 'Uốn ván sơ sinh', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 27, Text: 'Bệnh do liên cầu lợn ở người', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 29, Text: 'Cúm A(H7N9)', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 28, Text: 'Cúm A(H5N1)', so_mac: 0, so_chet: 0, status: 2 },
             { ID: 30, Text: 'Dịch hạch', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 31, Text: 'Ê-bô-la (Ebolla)', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 32, Text: 'Lát-sa (Lassa)', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 33, Text: 'Mác-bớt (Marburg)', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 34, Text: 'Rubella (Rubeon)', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 35, Text: 'Sốt Tây sông Nin', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 36, Text: 'Sốt Vàng', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 37, Text: 'Sốt xuất huyết Dengue', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 38, Text: 'Sởi', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 39, Text: 'Tả', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 41, Text: 'Than', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 54, Text: 'Viêm gan vi rút B', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 52, Text: 'Uốn ván khác', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 53, Text: 'Viêm gan vi rút A', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 55, Text: 'Viêm gan vi rút C', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 56, Text: 'Viêm não Nhật bản', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 57, Text: 'Viêm não vi rút khác', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 58, Text: 'Xoắn khuẩn vàng da (Leptospira)', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 59, Text: 'Bệnh do vi rút Adeno', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 60, Text: 'Cúm', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 61, Text: 'Lỵ amíp', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 62, Text: 'Lỵ trực trùng', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 63, Text: 'Quai bị', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 64, Text: 'Thủy đậu', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 65, Text: 'Tiêu chảy', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 66, Text: 'Viêm gan vi rút khác', so_mac: 0, so_chet: 0, status: 2 },
            { ID: 141, Text: 'Thay đổi chẩn đoán- Bệnh không thuộc danh mục', so_mac: 0, so_chet: 0, status: 1 },
            { ID: 121, Text: 'Zika', so_mac: 0, so_chet: 0 },
            { ID: 161, Text: 'Đã điều tra nhưng không có ca bệnh trên địa bàn', so_mac: 0, so_chet: 0, status: 2 },
        ],
        dataThongTinMac: [],
        dataThongTinChet: [],
        dataTinNhan: [],
        showtable : false,
    }

    $scope.searchInfo = {
        thang: "0",
        nam: "",
        huyenID: "",
        xaphuongID: "",
        kiDuLieu: "",
    }
    $scope.searchInfo.thang = $scope.data.dataThang[0].ID;
    $scope.searchInfo.nam = $scope.data.dataNam[0].ID;
    $scope.searchInfo.kiDuLieu = $scope.data.dataKi[0].ID;
    //function
    
    
    
    $scope.DongBoDuLieu = function () {
        $scope.data.dataBenh = angular.copy($scope.data.dataBenhInit);
        console.log($scope.searchInfo, "$scope.searchInfo");
        $.ajax({
            type: "POST",
            url: '/Home/GetToken',
            contentType: "application/json",
            data: null,
            dataType: "json",
            success: function (response) {
                if ($scope.searchInfo.kiDuLieu == 1) {
                    var data = {
                        thoi_gian_bat_dau_thong_ke: 0,
                        thoi_gian_ket_thuc_thong_ke: 0,
                        nam_thong_ke: $scope.searchInfo.nam,
                        ky_thong_ke: 1,
                        pham_vi_thong_ke: 2,
                        khu_vuc_id: 305,
                    }
                }
                else if ($scope.searchInfo.kiDuLieu == 2) {
                    var data = {
                        thoi_gian_bat_dau_thong_ke: 35,
                        thoi_gian_ket_thuc_thong_ke: 41,
                        nam_thong_ke: $scope.searchInfo.nam,
                        ky_thong_ke: 2,
                        pham_vi_thong_ke: 2,
                        khu_vuc_id: 305,
                    }
                }
                else if ($scope.searchInfo.kiDuLieu == 3) {
                    var data = {
                        thoi_gian_bat_dau_thong_ke: 5,
                        thoi_gian_ket_thuc_thong_ke: 10,
                        nam_thong_ke: $scope.searchInfo.nam,
                        ky_thong_ke: 3,
                        pham_vi_thong_ke: 2,
                        khu_vuc_id: 305,
                    }
                }
                else if ($scope.searchInfo.kiDuLieu == 5) {
                    var data = {
                        thoi_gian_bat_dau_thong_ke: 2012,
                        thoi_gian_ket_thuc_thong_ke: 2017,
                        nam_thong_ke: $scope.searchInfo.nam,
                        ky_thong_ke: 5,
                        pham_vi_thong_ke: 2,
                        khu_vuc_id: 305,
                    }
                }
                
                BaseService.postDataFromAPI("http://Api.vncdc.gov.vn/so_mac", false, data, response).then(function (responseMac) {
                   
                    $scope.data.dataThongTinMac = responseMac.data;
                    $scope.data.dataCuocGoi = responseMac.data;
                    console.log($scope.data.dataThongTinMac, "$scope.data.dataThongTinMac");
                    console.log($scope.data.dataCuocGoi, "$scope.data.dataCuocGoi");

                    return BaseService.postDataFromAPI("http://Api.vncdc.gov.vn/so_chet", false, data, response);
                }).then(function (responseChet) {
                    
                    $scope.data.dataThongTinChet = responseChet.data;
                    console.log($scope.data.dataThongTinChet, "$scope.data.dataThongTinChet")

                    if ($scope.data.dataThongTinMac != undefined) {
                        for (i = 0; i < $scope.data.dataBenh.length; i++) {
                            for (j = 0; j < $scope.data.dataThongTinMac.length ; j++) {
                                for (k = 0; k < $scope.data.dataThongTinMac[j].so_mac.length; k++) {
                                    if ($scope.data.dataBenh[i].ID == $scope.data.dataThongTinMac[j].so_mac[k].benhchandoan_id) {
                                        $scope.data.dataBenh[i].so_mac += 1;
                                    }
                                }
                            }
                        }
                        $scope.data.showtable = true;
                    }
                    else {
                        $scope.data.showtable = false;
                    }
                    if ($scope.data.dataThongTinChet != undefined) {
                        for (i = 0; i < $scope.data.dataBenh.length; i++) {
                            for (j = 0; j < $scope.data.dataThongTinChet.length ; j++) {
                                for (k = 0; k < $scope.data.dataThongTinChet[j].so_chet.length; k++) {
                                    if ($scope.data.dataBenh[i].ID == $scope.data.dataThongTinChet[j].so_chet[k].benhchandoan_id) {
                                        $scope.data.dataBenh[i].so_chet += 1;
                                    }
                                }
                            }
                        }
                    }


                }).finally(function () {
                    myBlockUI.stop();
                }, function () { });
            },
            error: function () {
                console.log("Co loi xay ra");
            },
        });

        console.log($scope.data.dataBenh);
    }
    

    $scope.DongBoDuLieu();

    //$scope.setClickedRow = function (index, item) {
    //    console.log(item, "item");
    //    if ($scope.searchInfo.kiDuLieu == 1) {
    //        $scope.accountComparisonOptions = {
    //            series: $scope.chartAccountComparisonSeries1,
    //            tooltip: {
    //                visible: true,
    //            },
    //            legend: {
    //                position: "right",
    //                visible: true,
    //                labels: {
    //                    font: "18px sans-serif"
    //                }
    //            },
    //            axisDefaults: {
    //                color: "#333",

    //            },
    //            valueAxis: {
    //                crosshair: {
    //                    color: "#333",
    //                    width: 1,
    //                    visible: true,
    //                    tooltip: {
    //                        background: "#717272",
    //                        template: "Giá trị: #: value #",
    //                        visible: true
    //                    }
    //                }
    //            },
    //            categoryAxis: {
    //                categories: ["5", "6", "7", "8", "9", "10"],
    //                labels: {
    //                    font: "18px sans-serif",
    //                },
    //                majorGridLines: {
    //                    visible: false
    //                }
    //            },
    //            tooltip: {
    //                visible: true,
    //                template: "tháng #: category # : #: value  #"
    //            },
    //        }
    //    }
    //    if ($scope.searchInfo.kiDuLieu == 2) {
    //        $scope.accountComparisonOptions = {
    //            series: $scope.chartAccountComparisonSeries2,
    //            tooltip: {
    //                visible: true,
    //            },
    //            legend: {
    //                position: "right",
    //                visible: true,
    //                labels: {
    //                    font: "18px sans-serif"
    //                }
    //            },
    //            axisDefaults: {
    //                color: "#333",

    //            },
    //            valueAxis: {
    //                crosshair: {
    //                    color: "#333",
    //                    width: 1,
    //                    visible: true,
    //                    tooltip: {
    //                        background: "#717272",
    //                        template: "Giá trị: #: value #",
    //                        visible: true
    //                    }
    //                }
    //            },
    //            categoryAxis: {
    //                categories: ["5", "6", "7", "8", "9", "10"],
    //                labels: {
    //                    font: "18px sans-serif",
    //                },
    //                majorGridLines: {
    //                    visible: false
    //                }
    //            },
    //            tooltip: {
    //                visible: true,
    //                template: "tháng #: category # : #: value  #"
    //            },
    //        }
    //        $scope.chartAccountComparisonSeries2 = [
    //               { color: "#00a65a", data: [2, 4, 5, 4, 1, 5] },
    //               //{ color: "#41c4f4", data: 0 },
    //               // { color: "#f48342", data: 1 },
    //               //{ color: "#41c4f4", data: 0 },
    //               //{ color: "#f48342", data: 2 },
    //               //{ color: "#41c4f4", data: 0 }
    //        ]
            
    //    }
    //    if ($scope.searchInfo.kiDuLieu == 3) {
    //        $scope.accountComparisonOptions = {
    //            series: $scope.chartAccountComparisonSeries3,
    //            tooltip: {
    //                visible: true,
    //            },
    //            legend: {
    //                position: "right",
    //                visible: true,
    //                labels: {
    //                    font: "18px sans-serif"
    //                }
    //            },
    //            axisDefaults: {
    //                color: "#333",

    //            },
    //            valueAxis: {
    //                crosshair: {
    //                    color: "#333",
    //                    width: 1,
    //                    visible: true,
    //                    tooltip: {
    //                        background: "#717272",
    //                        template: "Giá trị: #: value #",
    //                        visible: true
    //                    }
    //                }
    //            },
    //            categoryAxis: {
    //                categories: ["5", "6", "7", "8", "9", "10"],
    //                labels: {
    //                    font: "18px sans-serif",
    //                },
    //                majorGridLines: {
    //                    visible: false
    //                }
    //            },
    //            tooltip: {
    //                visible: true,
    //                template: "tháng #: category # : #: value  #"
    //            },
    //        }
    //        $scope.chartAccountComparisonSeries3 = [
    //               { color: "#00a65a", data: [0, 3, 4, 6, 3, 5] },
    //               //{ color: "#41c4f4", data: 0 },
    //               // { color: "#f48342", data: 1 },
    //               //{ color: "#41c4f4", data: 0 },
    //               //{ color: "#f48342", data: 2 },
    //               //{ color: "#41c4f4", data: 0 }
    //        ]
            
    //    }
        
    //};
            //chart
    
    $scope.chartAccountComparisonSeries = [
       { color: "#00a65a", data: [36, 14, 5, 42, 14, 5] },
    ]
    $scope.chartAccountComparisonSeries1 = [
            { color: "#00a65a", data: [22, 14, 5, 42, 14, 5] },

    ]
    $scope.chartAccountComparisonSeries2 = [
            { color: "#00a65a", data: [22, 44, 55, 64, 21, 5] },

    ]
    $scope.chartAccountComparisonSeries3 = [
            { color: "#00a65a", data: [12, 44, 15, 24, 1, 5] },

    ]
    $scope.accountComparisonOptions = {
        series: null,
        tooltip: {
            visible: true,
        },
        legend: {
            position: "right",
            visible: true,
            labels: {
                font: "18px sans-serif"
            }
        },
        axisDefaults: {
            color: "#333",

        },
        valueAxis: {
            crosshair: {
                color: "#333",
                width: 1,
                visible: true,
                tooltip: {
                    background: "#717272",
                    template: "Giá trị: #: value #",
                    visible: true
                }
            }
        },
        categoryAxis: {
            categories: [],
            labels: {
                font: "18px sans-serif",
            },
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            template: "tháng #: category # : #: value  #"
        },
    }


    $scope.accountComparisonOptions1 = {
        series: $scope.chartAccountComparisonSeries1,
        tooltip: {
            visible: true,
        },
        legend: {
            position: "right",
            visible: true,
            labels: {
                font: "18px sans-serif"
            }
        },
        axisDefaults: {
            color: "#333",

        },
        valueAxis: {
            crosshair: {
                color: "#333",
                width: 1,
                visible: true,
                tooltip: {
                    background: "#717272",
                    template: "Giá trị: #: value #",
                    visible: true
                }
            }
        },
        categoryAxis: {
            categories: ["36", "37", "38", "39", "40", "41"],
            labels: {
                font: "18px sans-serif",
            },
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            template: " #: category # : #: value  #"
        },
    }
    $scope.accountComparisonOptions2 = {
        series: $scope.chartAccountComparisonSeries2,
        tooltip: {
            visible: true,
        },
        legend: {
            position: "right",
            visible: true,
            labels: {
                font: "18px sans-serif"
            }
        },
        axisDefaults: {
            color: "#333",

        },
        valueAxis: {
            crosshair: {
                color: "#333",
                width: 1,
                visible: true,
                tooltip: {
                    background: "#717272",
                    template: "Giá trị: #: value #",
                    visible: true
                }
            }
        },
        categoryAxis: {
            categories: ["5", "6", "7", "8", "9", "10"],
            labels: {
                font: "18px sans-serif",
            },
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            template: "#: category # : #: value  #"
        },
    }
    $scope.accountComparisonOptions3 = {
        series: $scope.chartAccountComparisonSeries3,
        tooltip: {
            visible: true,
        },
        legend: {
            position: "right",
            visible: true,
            labels: {
                font: "18px sans-serif"
            }
        },
        axisDefaults: {
            color: "#333",

        },
        valueAxis: {
            crosshair: {
                color: "#333",
                width: 1,
                visible: true,
                tooltip: {
                    background: "#717272",
                    template: "Giá trị: #: value #",
                    visible: true
                }
            }
        },
        categoryAxis: {
            categories: ["2012", "2013", "2014", "2015", "2016", "2017"],
            labels: {
                font: "18px sans-serif",
            },
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            template: " #: category # : #: value  #"
        },
    }

   
   }
]);
//});