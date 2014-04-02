define([
    //LIBRARIES
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "mustache",
    //TEMPLATES
    "text!tpl/app/Customize.mustache",
    "text!tpl/app/index/css.mustache",
    "scripts/views/validation/cookie.validation.amd"
], function(
    $, _, Backbone, Marionette, Mustache,
    tpl, CssTpl, cookie
) {
    var CustomizeView = Marionette.ItemView.extend({
        initialize: function(options) {
            this.lang = options.lang || {};
        },
        template: tpl,
        ui: {
            themeCell: ".customize-theme-cell",
            setCSS: "#hiddenCssComponents"
        },
        events: {
            "click a.customize-cancel": "customizeCancel",
            "click .customize-save": "customizeSave",
            // "click .customize-tab a": "customizeTab",
            "click .customize-theme-cell": "customizeThemeCell",
            "click .customize-theme-reset": "customizeThemeReset",
        },
        customizeCancel: function() {
            // console.log("asda");
            var self = this;
            $(".customize").hide();
            $(".colorCell").css({
                backgroundColor: self.deCode(cookie.read("bgCell"))
            });
            $(".colorA").css({
                backgroundColor: self.deCode(cookie.read("nuc-A"))
            });
            $(".colorG").css({
                backgroundColor: self.deCode(cookie.read("nuc-G"))
            });
            $(".colorC").css({
                backgroundColor: self.deCode(cookie.read("nuc-C"))
            });
            $(".colorT").css({
                backgroundColor: self.deCode(cookie.read("nuc-T"))
            });
        },
        customizeSave: function() {
            var bg = $(".colorCell").css("background-color");
            var A = $(".colorA").css("background-color");
            var G = $(".colorG").css("background-color");
            var C = $(".colorC").css("background-color");
            var T = $(".colorT").css("background-color");

            cookie.create("bgCell", bg, 365);
            cookie.create("nuc-A", A, 365);
            cookie.create("nuc-G", G, 365);
            cookie.create("nuc-C", C, 365);
            cookie.create("nuc-T", T, 365);

            this.ui.setCSS.html(Mustache.render(CssTpl, {
                backgroundColor: bg,
                A: A,
                G: G,
                C: C,
                T: T
            }));

            $(".customize").hide();
        },
        // customizeTab: function(e) {
        //     $(".customize-tab .row a").each(function() {
        //         $(this).removeClass("customize-tab-onselect");
        //     })
        //     // $(".customize-tab .row").
        //     $(e.target).addClass("customize-tab-onselect");
        //     if ($(e.target).hasClass("tag-theme")) {
        //         $(".customize-theme").show();
        //         $(".customize-music").hide();
        //     } else {
        //         $(".customize-theme").hide();
        //         $(".customize-music").show();
        //     }
        // },
        customizeThemeCell: function(e) {
            console.log(e.target);
            this.ui.themeCell.each(function() {
                $(this).removeClass("customize-theme-onpick");
            });
            $(e.target).addClass("customize-theme-onpick");
        },
        customizeThemeReset: function() {
            $(".colorCell").css({
                backgroundColor: "white"
            });
            $(".colorA").css({
                backgroundColor: "#71B2E2"
            });
            $(".colorG").css({
                backgroundColor: "#9932CC"
            });
            $(".colorC").css({
                backgroundColor: "#008000"
            });
            $(".colorT").css({
                backgroundColor: "#FFA500"
            });
            // this.ui.setCSS.html(Mustache.render(CssTpl, {
            //     backgroundColor : "#FFF",
            //     A : "#71B2E2",
            //     G : "#9932CC",
            //     C : "#008000",
            //     T : "#FFA500"
            // }));

        },
        customizeFnDump: function() {
            var self = this;
            if (cookie.read("bgCell")) {
                $(".colorBG").css({
                    backgroundColor: self.deCode(cookie.read("bgCell"))
                });
                $("#canvasBG").css({
                    backgroundColor: self.deCode(cookie.read("bgCell"))
                });
            } else {
                cookie.create("bgCell", "white", 365);
            }

            if (cookie.read("nuc-A")) {
                $(".nuc-A").css({
                    backgroundColor: self.deCode(cookie.read("nuc-A"))
                });
                $(".colorA").css({
                    backgroundColor: self.deCode(cookie.read("nuc-A"))
                });
            } else {
                cookie.create("nuc-A", "#71B2E2", 365);
            }
            if (cookie.read("nuc-G")) {
                $(".nuc-G").css({
                    backgroundColor: self.deCode(cookie.read("nuc-G"))
                });
                $(".colorG").css({
                    backgroundColor: self.deCode(cookie.read("nuc-G"))
                });
            } else {
                cookie.create("nuc-G", "#9932CC", 365);
            }
            if (cookie.read("nuc-C")) {
                $(".nuc-C").css({
                    backgroundColor: self.deCode(cookie.read("nuc-C"))
                });
                $(".colorC").css({
                    backgroundColor: self.deCode(cookie.read("nuc-C"))
                });
            } else {
                cookie.create("nuc-C", "#008000", 365);
            }
            if (cookie.read("nuc-T")) {
                $(".nuc-T").css({
                    backgroundColor: self.deCode(cookie.read("nuc-T"))
                });
                $(".colorT").css({
                    backgroundColor: self.deCode(cookie.read("nuc-T"))
                });
            } else {
                cookie.create("nuc-T", "#FFA500", 365);
            }
        },
        colorPadDump: function() {
            //color pad code from http://www.html5canvastutorials.com/labs/html5-canvas-color-picker/  ### modified to suit the requirements for this page
            function getMousePos(canvas, evt) {
                // get canvas position
                var obj = canvas;
                var top = 0;
                var left = 0;
                while (obj.tagName != 'BODY') {
                    top += obj.offsetTop;
                    left += obj.offsetLeft;
                    obj = obj.offsetParent;
                }

                // return relative mouse position
                var mouseX = evt.clientX - left + window.pageXOffset;
                var mouseY = evt.clientY - top + window.pageYOffset;
                return {
                    x: mouseX,
                    y: mouseY
                };
            }

            function drawColorSquare(canvas, color, imageObj) {
                var colorSquareSize = 100;
                var padding = 0;
                var context = canvas.getContext("2d");
                context.beginPath();
                context.fillStyle = color;
                var squareX = (canvas.width - colorSquareSize + imageObj.width) / 2;
                var squareY = (canvas.height - colorSquareSize) / 2;
                context.fillRect(squareX, squareY, colorSquareSize, colorSquareSize);
                context.strokeRect(squareX, squareY, colorSquareSize, colorSquareSize);
            }

            function init(imageObj) {
                var padding = 0;
                var canvas = document.getElementById("colorpad");
                var context = canvas.getContext("2d");
                var mouseDown = false;

                context.strokeStyle = "#444";
                context.lineWidth = 2;

                /*  canvas.addEventListener("mousedown", function(){
                    mouseDown = true;
                }, false);
                
                canvas.addEventListener("mouseup", function(){
                    mouseDown = false;
                }, false);

                
                canvas.addEventListener("mousemove", function(evt){
                    */
                canvas.addEventListener("mousedown", function(evt) {
                    var mousePos = getMousePos(canvas, evt);
                    var color = undefined;

                    //if (mouseDown &&
                    /*
                     if(
                        mousePos !== null &&
                        mousePos.x > padding &&
                        mousePos.x < padding + imageObj.width &&
                        mousePos.y > padding &&
                        mousePos.y < padding + imageObj.height) {
                        /*
                         * color picker image is 256x256 and is offset by 10px
                         * from top and bottom
                         */
                    var imageData = context.getImageData(padding, padding, imageObj.width, imageObj.width);
                    var data = imageData.data;
                    var x = mousePos.x - padding;
                    var y = mousePos.y - padding;
                    var red = data[((imageObj.width * y) + x) * 4];
                    var green = data[((imageObj.width * y) + x) * 4 + 1];
                    var blue = data[((imageObj.width * y) + x) * 4 + 2];
                    color = "rgb(" + red + "," + green + "," + blue + ")";
                    //   }
                    console.log(color);

                    if (color) {
                        // drawColorSquare(canvas, color, imageObj);
                        $(".customize-theme-onpick").css({
                            backgroundColor: color
                        });
                    }
                }, false);

                context.drawImage(imageObj, padding, padding);
                //drawColorSquare(canvas, "white", imageObj);
            }

            var imageObj = new Image();
            imageObj.onload = function() {
                init(this);
            };
            imageObj.src = "assets/img/color_picker.png";
        },
        setPlayerDefaultColor: function() {
            var self = this;
            this.ui.setCSS.html(Mustache.render(CssTpl, {
                backgroundColor: self.deCode(cookie.read("bgCell")) || "white",
                A: self.deCode(cookie.read("nuc-A")) || "#71B2E2",
                G: self.deCode(cookie.read("nuc-G")) || "#9932CC",
                C: self.deCode(cookie.read("nuc-C")) || "#008000",
                T: self.deCode(cookie.read("nuc-T")) || "#FFA500"
            }));
        },
        getSoundSettings: function() {
            var sounds = ["musicVol", "countdownVol", "redrawVol", "starVol", "fxOthersVol"];
            for (var i in sounds) {
                var id = "#customize-" + sounds[i].replace("Vol", "");

                if (parseInt(cookie.read(sounds[i])) === 0) {
                    $(id).addClass("musicDisabled");

                    //$(id).prop("checked",false);
                } else {
                    $(id).removeClass("musicDisabled");
                    //$(id).attr("checked",true);
                }
            }
        },
        deCode: function(code) {
            var arr = [
                ["%2C", ","],
                ["%28", "("],
                ["%20", " "],
                ["%29", ")"]
            ];

            for (var i in arr) {
                var pat = new RegExp(arr[i][0], "gi");
                code = code.replace(pat, arr[i][1]);
                // console.log(code);
            }

            return code;
        },
        onShow: function() {
            this.customizeFnDump();
            this.colorPadDump();
            this.setPlayerDefaultColor();

            // console.log(this.deCode("rgb%28255%2C%20255%2C%20255%29"));
        },
        templateHelpers: function() {
            return {
                lang: this.lang
            };
        },
    });
    return CustomizeView;
});