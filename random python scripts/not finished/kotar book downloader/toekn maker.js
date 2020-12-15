/**  Minification & Merging Summary: 
     - kotarapp\resources\masterpage.js
     - kotarapp\resources\utilities.js
     - kotarapp\resources\jquery\jquery-ui-1.11.custom.min.js
     - kotarapp\resources\jquery\jquery.ui.touch-punch.min.js
     - common\modalwincolorbox\jquery.colorbox-min.js
     - common\modalwincolorbox\jquery.cetmodalwin.js
     - RichMultipleFilesUploader CET.Controls.MultipleFilesUploader.Resources.RichUploaderProxy.js
     - kotarapp\system\js\cet.wall\cetwall.js
     - kotarapp\system\js\miniscroll.js
     - kotarapp\viewer\js\onload\bookevents.js
     - kotarapp\viewer\js\onload\bookloader.js
     - kotarapp\viewer\js\onload\bookscroll.js
     - kotarapp\viewer\js\onload\bookviewer.js
     - kotarapp\viewer\js\onload\globals.js
     - kotarapp\viewer\js\onload\globals_postload.js
     - kotarapp\viewer\js\onload\hightlights.js
     - kotarapp\viewer\js\onload\markersmanager.js
     - kotarapp\viewer\js\onload\styleutils.js
     - kotarapp\viewer\js\onload\toc.js
     - kotarapp\viewer\js\onload\toolbar.js
     - kotarapp\viewer\js\onload\utils.js
     - kotarapp\viewer\js\onload\viewer.js
     - kotarapp\viewer\js\onload\zoom.js
     - kotarapp\viewer\js\onload\pages\bookpages.js
     - kotarapp\viewer\js\onload\pages\bookpagesinview.js
     - kotarapp\viewer\js\onload\pages\bookpagestate.js
     - kotarapp\viewer\js\onload\pages\content.js
     - kotarapp\viewer\js\onload\pages\events.js
     - kotarapp\viewer\js\onload\pages\gotopage.js
     - kotarapp\viewer\js\onload\pages\images.js
     - kotarapp\viewer\js\onload\pages\utils.js
**/

/** ========== kotarapp\resources\masterpage.js ========== **/
var MasterPage = MasterPage || {};
function MasterPage_OnLoad() {
    if (IsInViewer() || IsInHomePage()) {
        MasterPage_OnLoad_Viewer();
    } else {
        MasterPage.OnLoad();
    }
}
(function(j) {
    var n = "";
    var m = null;
    var a = null;
    function k() {
        var p = document.getElementById("linktohome");
        if (p) {
            p.href = c();
        }
        var q = document.getElementById("toolbarname");
        if (q) {
            q.innerHTML = TXT_Toolbar_Hello + " " + f();
        }
        m = document.getElementById("toolbarsubmenu");
        if (m) {
            a = $(m);
        }
        b();
        sendAllCetEventExited();
    }
    function c() {
        var p = window.location.host;
        return "//" + p;
    }
    function f() {
        var p = BaseMaster_sUserFullName;
        if (typeof Override_UserFullName !== "undefined") {
            var p = Override_UserFullName;
        }
        return p;
    }
    function b() {
        var p = document.getElementsByClassName("toolbarusermenu")[0];
        document.addEventListener("click", function(q) {
            var r = q.srcElement ? q.srcElement : q.target;
            if (r != p) {
                h();
            }
        });
        p.addEventListener("click", function(q) {
            o();
        });
        p.addEventListener("touchend", function(q) {
            q.preventDefault();
            o();
        });
        m.addEventListener("click", function(q) {
            g(q);
        });
        m.addEventListener("touchend", function(q) {
            q.preventDefault();
            g(q);
        });
    }
    function o() {
        if (n === "") {
            n = "<div id='knobb'></div><div id='knoba'></div>" + e(BaseMaster_bUserIsLoggedIn, Master_MybagLink, Master_OpenLmsTasks, false, Master_ItemsInCart);
        }
        m.innerHTML = n;
        a.toggleClass("hidden");
    }
    function h() {
        a.addClass("hidden");
    }
    function g(p) {
        var q = d(p);
        if (q != null) {
            switch (q.id) {
            case "login":
                if (BaseMaster_bUserIsLoggedIn) {
                    window.location.href = "/default.aspx?logout=true";
                } else {
                    if (typeof (ShowLoginTouchPage) != "undefined") {
                        var r = window.location;
                        if (window.location.href.toLowerCase().indexOf("autologout.aspx") > 0) {
                            r = "";
                        }
                        ShowLoginTouchPage(r);
                    }
                }
                break;
            case "mybag":
                SetWindowLocation(Master_MybagLink);
                break;
            case "myaccount":
                l("/KotarApp/Account.aspx");
                break;
            case "myshelf":
                l("/KotarApp/FavoriteBooks.aspx");
                break;
            case "myprojects":
                l("/KotarApp/Projects.aspx");
                break;
            case "cart":
                l("/KotarApp/Shop/Cart.aspx");
                break;
            case "help":
                window.location.href = TXT_UserMenu_Help;
                break;
            case "showminiscroll":
                ToggleMiniScroll();
                break;
            }
        }
    }
    function d(p) {
        var q = p.target;
        while (q.nodeName !== "LI") {
            if (q.nodeName === m.nodeName) {
                q = null;
                break;
            }
            q = q.parentElement;
        }
        return q;
    }
    function e(q, r, t, v, s, u) {
        var p = [];
        p.push("<ul><li id='login'><span>", (q ? TXT_Toolbar_Logout : TXT_Toolbar_Login), "</span></li>", "<div class='separetor'></div>");
        if (r !== "") {
            p.push("<li id='mybag'><span>", TXT_Toolbar_MyBag, "</span><span id='numOpenTasksInLMS'>", t, "</span></li>");
        }
        p.push("<li id='myaccount'><span>", TXT_Toolbar_MyAccount, "</span></li>");
        if (v) {
            p.push("<li id='addshelf'><span>", TXT_Toolbar_AddShelf, "</span></li>");
        }
        if (typeof BV_nBookID !== "undefined" && BV_nBookID > 0) {
            p.push("<li id='addtoprojects'><span>", TXT_Toolbar_AddToProjects, "</span></li>");
        }
        p.push("<div class='separetor'></div>", "<li id='myshelf'><span>", TXT_Toolbar_MyShelf, "</span></li>", "<li id='myprojects'><span>", TXT_Toolbar_MyProjects, "</span></li>", "<li id='cart'><div class='cartimg'></div><span>", TXT_Toolbar_Cart, "</span><span id='numItemsInShoppingCart'>", s, "</span></li>", "<div class='separetor'></div>", "<li id='help'><span>", TXT_Toolbar_Help, "</span></li>");
        if (u) {
            p.push("<div class='separetor'></div>", "<li id='showminiscroll'><span>", (i() ? TXT_Toolbar_HideMiniScroll : TXT_Toolbar_ShowMiniScroll), "</span></li>");
        }
        p.push("</ul>");
        return p.join("");
    }
    function l(p) {
        if (BaseMaster_bUserIsLoggedIn) {
            window.location.href = p;
        } else {
            Utils_OpenSmartLoginPapgeForRedirect(p);
        }
    }
    function i() {
        var p = false;
        if (typeof MiniScroll !== "undefined") {
            p = MiniScroll.IsVisible;
        }
        return p;
    }
    j.GetUserMenuHTML = e;
    j.OnLoad = k;
    j.IsMiniScrollVisible = i;
}
)(MasterPage);

/** ========== kotarapp\resources\utilities.js ========== **/
function getElement(a) {
    return document.getElementById(a);
}
var isIE = document.all ? true : false;
var isOpera = navigator.userAgent.toLowerCase().indexOf("opera") != -1;
var isChrome = /chrome/.test(navigator.userAgent.toLowerCase());
var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
var isIE10 = !!navigator.userAgent.match(/Trident\/6\./);
var is_mobile = /mobile|android/i.test(navigator.userAgent);
var is_phone = (function(b) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) {
        return true;
    }
    return false;
}
)(navigator.userAgent || navigator.vendor || window.opera);
var is_IOS = navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS/);
var is_IOS8 = navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 8_\d/i);
var ieVer = (function() {
    var c, d = 3, b = document.createElement("div"), a = b.getElementsByTagName("i");
    while (b.innerHTML = "<!--[if gt IE " + (++d) + "]><i></i><![endif]-->",
    a[0]) {}
    return d > 4 ? d : c;
}());
function LoadJS(a) {
    LoadResourceFile(a, "js");
}
function LoadCSS(a) {
    LoadResourceFile(a, "css");
}
function LoadResourceFile(a, c) {
    if (c == "js") {
        var b = document.createElement("script");
        b.setAttribute("type", "text/javascript");
        b.setAttribute("src", a);
    } else {
        if (c == "css") {
            var b = document.createElement("link");
            b.setAttribute("rel", "stylesheet");
            b.setAttribute("type", "text/css");
            b.setAttribute("href", a);
        }
    }
    if (typeof b != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(b);
    }
}
function isUrl(d) {
    var e = d.split("?");
    var a = new RegExp();
    var b = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    var c = /(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    a.compile("^[A-Za-z,]+://[A-Za-z0-9-_,]+\\.[A-Za-z0-9-_%&?/.=,]+$");
    if (e.length == 1) {
        return (a.test(e[0]) && b.test(e[0]));
    }
    return (c.test(e[0]) && c.test(e[1]));
}
function getLocalizedAppDir() {
    var a = (typeof (BaseMaster_sLanguageCode) == "undefined" ? "he" : BaseMaster_sLanguageCode.toLowerCase());
    var b = (a == "he" ? "/KotarApp" : "/KotarApp/Loc/" + BaseMaster_sLanguageCode);
    return b;
}
function isRTL() {
    var a = (typeof (BaseMaster_sLanguageCode) == "undefined" ? "he" : BaseMaster_sLanguageCode.toLowerCase());
    return (a == "he" || a == "ar" ? true : false);
}
function getHostname(b) {
    var a;
    if (b.indexOf("://") > -1) {
        a = b.split("/")[2];
    } else {
        a = b.split("/")[0];
    }
    a = a.split(":")[0];
    a = a.split("?")[0];
    return a;
}
var nHideAjaxMessageBoxTimeout = 0;
var oAjaxMessageContent = null;
var oAjaxMessageContainer = null;
var oAjaxMessageContainerBG = null;
var oAjaxMessageBox = null;
var bAjaxMessageIsImportant = false;
var nAjaxMessageWidth = 0;
var nAjaxMessageCustomContainerLeft = 0;
var nAjaxMessageCustomContainerWidth = 0;
var nAjaxMessageCustomContainerTop = 0;
function SetAjaxAjaxMessageCustomContainerLeft(a) {
    nAjaxMessageCustomContainerLeft = a;
}
function SetAjaxAjaxMessageCustomContainerWidth(a) {
    nAjaxMessageCustomContainerWidth = a;
}
function SetAjaxAjaxMessageCustomContainerTop(a) {
    nAjaxMessageCustomContainerTop = a;
}
function ShowAjaxImportantMessageBox(b, a) {
    if (typeof (a) == "undefined") {
        a = 3000;
    }
    bAjaxMessageIsImportant = true;
    ShowAjaxMessage(b, a);
}
function ShowAjaxNotification(b, a) {
    if (typeof (a) == "undefined") {
        a = 2000;
    }
    bAjaxMessageIsImportant = true;
    ShowAjaxMessage(b, a);
}
function ShowAjaxMessageBox(b, a) {
    if (bAjaxMessageIsImportant == true) {
        return;
    }
    if (typeof (a) == "undefined") {
        a = 1200;
    }
    ShowAjaxMessage(b, a);
}
function ShowAjaxMessage(b, a) {
    VerifyAjaxMessageBoxControls();
    b = SetAjaxMessageBoxDimensions(b);
    oAjaxMessageContent.innerHTML = b;
    SetAjaxMessageBoxVisibility(true);
    window.clearTimeout(nHideAjaxMessageBoxTimeout);
    nHideAjaxMessageBoxTimeout = window.setTimeout("HideAjaxMessageBox()", a);
}
function VerifyAjaxMessageBoxControls() {
    if (oAjaxMessageContent == null) {
        oAjaxMessageContent = document.getElementById("ajaxMessageContent");
        oAjaxMessageContainer = document.getElementById("ajaxMessageContainer");
        oAjaxMessageContainerBG = document.getElementById("ajaxMessageContainerBG");
        oAjaxMessageBox = document.getElementById("ajaxMessageBox");
        CalcClientSize();
    }
}
function HideAjaxMessageBox() {
    bAjaxMessageIsImportant = false;
    SetAjaxMessageBoxVisibility(false);
}
function SetAjaxMessageBoxDimensions(b) {
    b = ReplaceAll(b, "[A]", "'");
    var a = b.length;
    if (BaseMaster_sLanguageCode == "zh") {
        a = a * 1.5;
    }
    if (a < 15) {
        SetAjaxMessageBoxWidth(170);
    } else {
        if (a < 20) {
            SetAjaxMessageBoxWidth(210);
        } else {
            if (a < 30) {
                SetAjaxMessageBoxWidth(300);
            } else {
                if (a < 35) {
                    SetAjaxMessageBoxWidth(330);
                } else {
                    if (a < 40) {
                        SetAjaxMessageBoxWidth(370);
                    } else {
                        if (a < 45) {
                            SetAjaxMessageBoxWidth(390);
                        } else {
                            if (a < 50) {
                                SetAjaxMessageBoxWidth(420);
                            } else {
                                if (a < 55) {
                                    SetAjaxMessageBoxWidth(500);
                                } else {
                                    if (a < 60) {
                                        SetAjaxMessageBoxWidth(540);
                                    } else {
                                        if (a < 65) {
                                            SetAjaxMessageBoxWidth(550);
                                        } else {
                                            SetAjaxMessageBoxWidth(590);
                                            b = b.substr(0, 65) + "...";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return b;
}
function SetAjaxMessageBoxWidth(a) {
    nAjaxMessageWidth = a;
    oAjaxMessageContainer.style.width = a + "px";
    oAjaxMessageContainerBG.style.width = (a - 2) + "px";
    oAjaxMessageBox.style.width = a + "px";
}
function SetAjaxMessageBoxVisibility(a) {
    var d = (nAjaxMessageCustomContainerTop > 0 ? nAjaxMessageCustomContainerTop : 150);
    var b = (nAjaxMessageCustomContainerWidth > 0 ? nAjaxMessageCustomContainerWidth : clientDimensions.width);
    var c = (b - nAjaxMessageWidth) / 2 + nAjaxMessageCustomContainerLeft;
    if (typeof (MasterDrawer) !== "undefined") {
        if (MasterDrawer.IsOpen() && !is_IOS) {
            var e = document.getElementById("BV_oPage_0");
            if (e !== null) {
                b = e.offsetWidth;
                rect = e.getBoundingClientRect();
                var c = rect.left + (b - nAjaxMessageWidth) / 2;
                oAjaxMessageContainer.style.zIndex = 1;
                oAjaxMessageBox.style.zIndex = 2;
            }
        } else {
            oAjaxMessageContainer.style.zIndex = 32765;
            oAjaxMessageBox.style.zIndex = 32766;
        }
    }
    oAjaxMessageContainer.style.left = c + "px";
    oAjaxMessageContainer.style.top = d + "px";
    oAjaxMessageBox.style.left = c + "px";
    oAjaxMessageBox.style.top = d + "px";
    oAjaxMessageContainer.style.display = (a ? "block" : "none");
    oAjaxMessageBox.style.display = (a ? "block" : "none");
    oAjaxMessageBox.style.direction = BV_BookDirection;
}
var PopupDimensions = [{
    name: "Login",
    width: 550,
    height: 290
}, {
    name: "TaskForm",
    width: "80%",
    height: "80%"
}, {
    name: "LoginWithAutoLine",
    width: 550,
    height: 324
}, {
    name: "LoginFromIPSubscriptionTerminal",
    width: 550,
    height: 400
}, {
    name: "PasswordRecovery",
    width: 496,
    height: 227
}, {
    name: "AdditionalInfo",
    width: 580,
    height: 412
}, {
    name: "WhyRegister",
    width: 580,
    height: 420
}, {
    name: "ExpireNotice",
    width: 496,
    height: 350
}, {
    name: "SiteSubscriptionInMonthlyMode",
    width: 496,
    height: 250
}, {
    name: "SiteSubscriptionStillActive",
    width: 496,
    height: 250
}, {
    name: "ActiveProductsInCartWarning",
    width: 496,
    height: 250
}, {
    name: "SiteSubscriptionActiveByProxy",
    width: 496,
    height: 250
}, {
    name: "AddBookToProject",
    width: 560,
    height: 240
}, {
    name: "AddBookToCart",
    width: 320,
    height: 250
}, {
    name: "UserHasNoBooks",
    width: 550,
    height: 500
}, {
    name: "WelcomeToFreeSite",
    width: 550,
    height: 420
}, {
    name: "WelcomeToCartSite",
    width: 550,
    height: 420
}, {
    name: "WelcomeToSubscriptionSite",
    width: 550,
    height: 420
}, {
    name: "UserHasNoSubscription",
    width: 550,
    height: 300
}, {
    name: "MessageBox",
    width: 350,
    height: 190
}, {
    name: "SyncBox",
    width: 350,
    height: 150
}, {
    name: "AddLink",
    width: 420,
    height: 177
}, {
    name: "CopyToClipboard",
    width: 410,
    height: 207
}, {
    name: "IAmTheWalrus",
    width: 700,
    height: 500
}, {
    name: "GoToCheckout",
    width: 350,
    height: 152
}, {
    name: "ClipboardInaccessible",
    width: 350,
    height: 150
}, {
    name: "ManualCopyToClipboard",
    width: 350,
    height: 250
}, {
    name: "ViewerHelp",
    width: 400,
    height: 350
}, {
    name: "UploadAvatar",
    width: 400,
    height: 150
}, {
    name: "TechnicalRequirements",
    width: 500,
    height: 500
}, {
    name: "Print",
    width: 400,
    height: 150
}, {
    name: "SendMail",
    width: 480,
    height: 150
}, {
    name: "CuponExplain",
    width: 480,
    height: 150
}, {
    name: "ShowAddToCartExplainPopup",
    width: 480,
    height: 150
}, {
    name: "ConfirmTransferProducts",
    width: 370,
    height: 210
}, {
    name: "TTS",
    width: 870,
    height: 480
}, {
    name: "Embeded",
    width: 650,
    height: 535
}, {
    name: "TransactionFailedMessage",
    width: 450,
    height: 210
}];
function ShowUploadAvatar() {
    ChangeIFrameSource("/Account/Popups/UploadAvatar.aspx", false);
    ShowModalPopup("UploadAvatar");
}
function ShowTTS() {
    var c = BV_nTopPageInView;
    gPageToken = BookPageState_GetPageGuid(c);
    sPageLabel = BookPageState_GetPageLabel(c);
    var e = "/KotarApp/Viewer/Popups/TTS.aspx?nBookID=" + BV_nBookID + "&gPageToken=" + gPageToken + "&sPageLabel=" + sPageLabel;
    var b = "850";
    var a = "535";
    if ($(window).width() < 850) {
        e += "&Width=550";
        b = "592";
    }
    var f = "TTS";
    for (var d = 0; d < PopupDimensions.length; d++) {
        if (PopupDimensions[d].name.toLowerCase() == f.toLowerCase()) {
            PopupDimensions[d].width = b;
            PopupDimensions[d].height = a;
        }
    }
    ChangeIFrameSource(e, false);
    ShowModalPopup("TTS");
    AddUsageLog("ShowTTS");
}
function SetLoginIFrameURL(a, b) {
    ChangeIFrameSource(a + "?bPopup=true&sReturnUrl=" + b, false);
}
function SetLoginIFrameURLForIncompleteRegistration(a) {
    ChangeIFrameSource(a + "?bClear=true&bSubscriptionExpired=true", false);
}
function ShowManualCopyToClipboardPopup() {
    var j = "ManualCopyToClipboard";
    var g = BV_GetLastSelection();
    var b = 380;
    var a = 300;
    var f = b;
    var e = a;
    var h = 140;
    if (g.nSelectWidthPx + 40 > b && g.nSelectWidthPx + 40 < clientDimensions.width * 0.8) {
        f = g.nSelectWidthPx + 40;
    } else {
        if (g.nSelectWidthPx + 40 > clientDimensions.width * 0.8) {
            f = clientDimensions.width * 0.8;
        }
    }
    if (g.nSelectHeightPx + h > a && g.nSelectHeightPx + h < clientDimensions.height * 0.8) {
        e = g.nSelectHeightPx + h;
    } else {
        if (g.nSelectHeightPx + h > clientDimensions.height * 0.8) {
            e = clientDimensions.height * 0.8;
        }
    }
    f = Math.ceil(f);
    e = Math.ceil(e);
    for (var d = 0; d < PopupDimensions.length; d++) {
        if (PopupDimensions[d].name.toLowerCase() == j.toLowerCase()) {
            PopupDimensions[d].width = f;
            PopupDimensions[d].height = e;
        }
    }
    var c = ChangeIFrameSource("/KotarApp/Viewer/Popups/ManualCopyToClipboard.aspx?height=" + e, false);
    ShowModalPopup(j);
    return c;
}
function ShowGotoCheckout_OnLoad() {
    AddOpenWindowCommand("ShowGotoCheckout()");
}
function ShowGotoCheckout() {
    $(".scrollonwhite").css("max-height", 320);
    if (!is_mobile && !is_phone && document.querySelector(".scroll.scrollonwhite") && document.querySelector(".scroll.scrollonwhite").scrollHeight > ($(".scroll.scrollonwhite").height() + 25)) {
        $(".product_info.container").addClass("margin-right");
        $(".scroll.scrollonwhite").css("overflow-y", "scroll");
    }
    ChangeIFrameSource("/KotarApp/Shop/Popups/GoToCheckout.aspx", false);
    ShowModalPopup("GoToCheckout");
}
function TransactionFailedMessage() {
    ChangeIFrameSource("/KotarApp/Shop/Popups/TransactionFailedMessage.aspx", true);
    ShowModalPopup("TransactionFailedMessage");
}
function ShowCuponMessage() {
    ChangeIFrameSource("/KotarApp/Shop/Popups/ShowCuponMessage.aspx", false);
    ShowModalPopup("ShowCuponMessage");
}
function ShowIAmTheWalrusPopup(a) {
    ChangeIFrameSource("/KotarApp/Account/Popups/IAmTheWalrus.aspx?nBookID=" + a, false);
    ShowModalPopup("IAmTheWalrus");
}
function ShowWelcomePopup_OnLoad(a) {
    AddOpenWindowCommand("ShowWelcomePopup('" + a + "')");
}
function ShowWelcomePopup(a) {
    ChangeIFrameSource(MainMaster_AccountPopupsFolder + "WelcomeTo" + a + "Site.aspx", false);
    ShowModalPopup("WelcomeTo" + a + "Site");
}
function ShowUserHasNoSubscriptionPopup_OnLoad() {
    AddOpenWindowCommand("ShowUserHasNoSubscriptionPopup()");
}
function ShowUserHasNoSubscriptionPopup() {
    ChangeIFrameSource("/KotarApp/Account/Popups/UserHasNoSubscription.aspx", true);
    ShowModalPopup("UserHasNoSubscription");
}
function ShowUserHasNoBooksPopup_OnLoad() {
    AddOpenWindowCommand("ShowUserHasNoBooksPopup()");
}
function ShowUserHasNoBooksPopup() {
    ChangeIFrameSource("/KotarApp/Account/Popups/UserHasNoBooks.aspx", true);
    ShowModalPopup("UserHasNoBooks");
}
function ShowMailPopup(a) {
    ChangeIFrameSource("/KotarApp/Viewer/Popups/SendMail.aspx?" + a, false);
    ShowModalPopup("SendMail");
    if (typeof (BV_SmartHideMarkerBubble) != "undefined") {}
}
function ShowPrintPopup(a) {
    ChangeIFrameSource("/KotarApp/Viewer/Popups/Print.aspx?" + a, false);
    ShowModalPopup("Print");
    AddUsageLog("ShowPrintPopup");
}
function ShowLoginPopup(b, d, a) {
    if (typeof (BaseMaster_bUserIsLoggedIn) != "undefined" && BaseMaster_bUserIsLoggedIn) {
        return;
    }
    if (typeof (a) == "undefined") {
        a = false;
    }
    var e = (a ? "LoginWithAutoLine" : "Login");
    var f = MainMaster_AccountPopupsFolder + "Login.aspx";
    if (typeof (BaseMaster_bIsClientInIpSubscriptionRange) != "undefined" && BaseMaster_bIsClientInIpSubscriptionRange == true) {
        e = "LoginFromIPSubscriptionTerminal";
        f = MainMaster_AccountPopupsFolder + "LoginFromIPSubscriptionTerminal.aspx";
    }
    if (b == true) {
        var c = (typeof (d) != "undefined" ? "bAuto=" + a + "&bSmartLogin=true&sCallback=" + d : "bPopup=true") + "&tmp=" + getTimestamp();
        ChangeIFrameSource(f + "?" + c, false);
    }
    if (IsInViewer()) {
        BV_SmartHideMarkerBubble("ShowLoginPopup", false);
    }
    ShowModalPopup(e);
}
function ShowLoginTouchPopup(d, b) {
    if (BaseMaster_bUserIsLoggedIn) {
        return;
    }
    b = b || false;
    var a = new Array();
    a.push(MainMaster_AccountTouchPopupsFolder, "login.aspx?");
    if (typeof (d) !== "undefined") {
        a.push("bAuto=", b, "&bSmartLogin=true&sCallback=", d);
    } else {
        a.push("bPopup=true");
    }
    a.push("&tmp=", getTimestamp());
    var e = a.join("");
    var c = ChangeTouchIFrameSource(e, false);
    if (IsInViewer()) {
        BV_SmartHideMarkerBubble("ShowLoginTouchPopup", false);
    }
    ShowTouchModalPopup(c, "logintouch");
}
function ShowLoginTouchPage(c, a) {
    if (BaseMaster_bUserIsLoggedIn) {
        return;
    }
    var b = new Array();
    b.push(MainMaster_AccountTouchPopupsFolder, "login.aspx?sReturnUrl=", encodeURIComponent(c));
    if (typeof (a) !== "undefined") {
        b.push("&action=", a);
    }
    b.push("&tmp=", getTimestamp());
    var d = b.join("");
    window.location = d;
}
function ShowAdditionalInfoPopup() {
    ChangeIFrameSource("/KotarApp/Account/Popups/AdditionalInfo.aspx", false);
    ShowModalPopup("AdditionalInfo");
}
function ShowWhyRegisterPopup() {
    ChangeIFrameSource(MainMaster_AccountPopupsFolder + "WhyRegister.aspx", false);
    ShowModalPopup("WhyRegister");
}
function ShowPasswordRecoveryPopup() {
    ChangeIFrameSource("/KotarApp/Account/Popups/PasswordRecovery.aspx", false);
    ShowModalPopup("PasswordRecovery");
}
function ShowHasActiveProductsInCartWarningPopup() {}
function ShowSiteSubscriptionInMonthlyModeWarningPopup_OnLoad() {
    AddOpenWindowCommand("ShowSiteSubscriptionInMonthlyModeWarningPopup()");
}
function ShowSiteSubscriptionInMonthlyModeWarningPopup() {
    ChangeIFrameSource("/KotarApp/Account/Popups/SiteSubscriptionInMonthlyModeWarning.aspx", false);
    ShowModalPopup("SiteSubscriptionInMonthlyMode");
}
function ConfirmTransferProducts() {
    ChangeIFrameSource("/KotarApp/Account/Popups/ConfirmTransferProducts.aspx", false);
    ShowModalPopup("ConfirmTransferProducts");
}
function TransferProductsMessage() {
    ChangeIFrameSource("/KotarApp/Account/Popups/TransferProductsMessage.aspx", false);
    ShowModalPopup("ConfirmTransferProducts");
}
function ShowSiteSubscriptionStillActiveWarningPopup_OnLoad() {
    AddOpenWindowCommand("ShowSiteSubscriptionStillActiveWarningPopup()");
}
function ShowSiteSubscriptionStillActiveWarningPopup() {
    ChangeIFrameSource("/KotarApp/Account/Popups/SiteSubscriptionStillActiveWarning.aspx", false);
    ShowModalPopup("SiteSubscriptionStillActive");
}
function ShowSiteSubscriptionActiveByProxyWarningPopup() {
    ChangeIFrameSource("/KotarApp/Account/Popups/SiteSubscriptionActiveByProxyWarning.aspx", false);
    ShowModalPopup("SiteSubscriptionActiveByProxy");
}
function ShowSiteSubscriptionAboutToExpirePopup_OnLoad() {
    AddOpenWindowCommand("ShowSiteSubscriptionAboutToExpirePopup()");
}
function ShowSiteSubscriptionAboutToExpirePopup() {
    ChangeIFrameSource("/KotarApp/Account/Popups/SiteSubscriptionExpiresSoon.aspx", false);
    ShowModalPopup("ExpireNotice");
}
function ShowBookSubscriptionAboutToExpirePopup_OnLoad(a) {
    AddOpenWindowCommand("ShowBookSubscriptionAboutToExpirePopup(" + a + ")");
}
function ShowBookSubscriptionAboutToExpirePopup(a) {
    ChangeIFrameSource("/KotarApp/Account/Popups/BookSubscriptionExpiresSoon.aspx?nBookID=" + a, false);
    ShowModalPopup("ExpireNotice");
}
function ShowExpireNoticePopup() {
    ChangeIFrameSource("/KotarApp/Account/Popups/ExpireNotice.aspx", false);
    ShowModalPopup("ExpireNotice");
}
function ShowCuponExplainPopup() {
    var a = ChangeIFrameSource("/KotarApp/Shop/Popups/CuponExplain.aspx", false);
    ShowModalPopup("CuponExplain");
    return a;
}
function ShowAddTaskFormPopup() {
    ClearIframeSource();
    var a = getElement("dvModalDialogBackground");
    a.className = "modalDialog-groups";
    ShowModalPopup("TaskForm");
}
function ClearAddTaskFormPopup() {
    ClearModalPopupContainer();
    HideModalPopup();
}
function ShowAddToCartExplainPopup(b) {
    var a = ChangeIFrameSource("/KotarApp/Shop/Popups/AddToCartExplain.aspx?type=" + b, false);
    ShowModalPopup("ShowAddToCartExplainPopup");
    return a;
}
function Open_AddBookToProjectPopup(c, b, a, d) {
    if (typeof (d) == "undefined") {
        d = 0;
    }
    ChangeIFrameSource("/KotarApp/Projects/Popups/AddBookToProject.aspx?nBookID=" + c + "&nPageID=" + d + "&bRefreshProjectList=" + b + "&bRefreshPage=" + a, false);
    ShowModalPopup("AddBookToProject");
}
function Utils_ShowErrorMessageDialog(b, c, a) {
    Utils_ShowMessageDialog(b, "שגיאת מערכת", true, c, a);
}
function Utils_ShowDelayedMessageDialog(c, d, a, b) {
    window.setTimeout("Utils_ShowMessageDialog('" + c + "', '" + d + "', " + a + ", '')", b);
}
function Utils_ShowMessageDialog(d, e, a, f, c, b) {
    if (typeof (e) == "undefined") {
        e = "שימו לב";
    }
    if (typeof (f) == "undefined") {
        f = "";
    }
    if (typeof (c) == "undefined") {
        c = "";
    }
    if (typeof (b) == "undefined") {
        b = false;
    }
    if (typeof (a) == "undefined") {
        a = false;
    }
    ChangeIFrameSource("/KotarApp/System/MessageBoxNew.aspx?sTitle=" + escape(e) + "&sMessage=" + escape(d) + "&bError=" + a + "&sUrl=" + f + "&sHrefText=" + escape(c) + "&bShowWait=" + b, false);
    ShowModalPopup("MessageBox");
}
var _openedWindowName = "";
var _reopenWindowName = "";
var _lastIFrameSource = "";
function ChangeIFrameSource(c, a) {
    if (typeof (a) == "undefined") {
        a = false;
    }
    if (_openedWindowName == "") {
        _lastIFrameSource = c;
    }
    var d = document.getElementById("modalDialogIFrame");
    if (d == null) {
        Utils_ShowErrorMessageDialog("בעייה בפתיחת החלונית");
        return;
    }
    d.style.display = "";
    var b = (typeof (BaseMaster_gUserID) == "undefined" ? "00000000-0000-0000-0000-000000000000" : BaseMaster_gUserID);
    c += (c.indexOf("?") > 0 ? "&" : "?") + "bShowResourceFieldName=" + bShowResourceFieldName + "&gUserID=" + b + (a ? "&tmp=" + getTimestamp() : "");
    if (isIE) {
        var e = document.getElementById("modalDialogIFrame");
        e.contentWindow.location.replace(c);
        return e;
    } else {
        d.src = c;
        return d;
    }
}
function ClearIframeSource() {
    var a = document.getElementById("modalDialogIFrame");
    if (a == null) {
        Utils_ShowErrorMessageDialog("בעייה בפתיחת החלונית");
        return;
    }
    a.style.display = "none";
    a.style.width = "0";
    a.style.height = "0";
    a.src = "";
}
function ClearModalPopupContainer() {
    var b = getElement("dvModalDialogIFrameContainer");
    for (var c = 0; c < b.childElementCount; c++) {
        var a = b.children[c];
        if (a.id !== "modalDialogIFrame" && a.id !== "taskFormIframe") {
            $(a).empty().remove();
        }
        if (a.id === "taskFormIframe") {
            a.style.display = "none";
            a.contentWindow.location.replace("about:blank");
        }
    }
}
function ChangeTouchIFrameSource(d, a) {
    a = a || false;
    var b = document.getElementById("modalTouchDialogIFrame");
    if (b === null) {
        Utils_ShowErrorMessageDialog("בעייה בפתיחת החלונית");
    } else {
        var c = (typeof (BaseMaster_gUserID) === "undefined" ? "00000000-0000-0000-0000-000000000000" : BaseMaster_gUserID);
        var e = new Array();
        e.push((d.indexOf("?") > 0 ? "&" : "?"));
        e.push("bShowResourceFieldName=", bShowResourceFieldName, "&gUserID=", c);
        d += e.join("");
        b.src = d;
    }
    return b;
}
function SetPleaseWaitIFrame() {
    var c = "/KotarApp/System/MessageBoxNew.aspx?bShowLoading=true&sLang=" + BaseMaster_sLanguageCode;
    if (isIE) {
        var b = document.getElementById("modalDialogIFrame");
        b.contentWindow.location.replace(c);
    } else {
        var a = document.getElementById("modalDialogIFrame");
        a.src = c;
    }
}
var _overflow = "";
var bModalPopupIsVisible = false;
function ModalPopupIsVisible() {
    return bModalPopupIsVisible;
}
var modalPopupListners = new Array();
function AddModalPopupListner(b, a) {
    modalPopupListners[modalPopupListners.length] = [b, a];
}
function ExecModalPopup(bOpen) {
    for (var l = 0; l < modalPopupListners.length; l++) {
        if (bOpen) {
            eval(modalPopupListners[l][0]);
        } else {
            eval(modalPopupListners[l][1]);
        }
    }
}
function ShowModalPopup(a) {
    if (_openedWindowName == a) {
        return;
    }
    if (_openedWindowName != "") {
        _reopenWindowName = _openedWindowName;
    } else {
        _reopenWindowName = "";
    }
    bModalPopupIsVisible = true;
    SetBodyOverlayState(true);
    _openedWindowName = a;
    SetPopupDimensions();
}
function ShowTouchModalPopup(a, b) {
    if (_openedWindowName === b) {
        return;
    }
    _openedWindowName = b;
    a.style.width = window.innerWidth + "px";
    a.style.height = window.innerHeight + "px";
    a.style.top = window.pageYOffset + "px";
    a.style.left = 0;
    a.style.display = "";
}
var HideModalPopupCallback = null;
function HideModalPopup() {
    if (HideModalPopupCallback != null) {
        eval(HideModalPopupCallback);
        HideModalPopupCallback = null;
    }
    var now = new Date();
    _openedWindowName = "";
    if (_reopenWindowName == "") {
        SetPleaseWaitIFrame();
        SetBodyOverlayState(false);
        bModalPopupIsVisible = false;
    } else {
        ChangeIFrameSource(_lastIFrameSource);
        ShowModalPopup(_reopenWindowName);
    }
    if (IsInViewer()) {
        window.focus();
        document.body.style.overflow = "scroll";
        BV_SmartShowMarkerBubble(false);
    }
}
function HideTouchModalPopup() {
    var a = document.getElementById("modalTouchDialogIFrame");
    if (a != null) {
        a.style.display = "none";
    }
    _openedWindowName = "";
    if (IsInViewer()) {
        window.focus();
        BV_SmartShowMarkerBubble(false);
    }
}
function SetBodyOverlayState(a) {
    ExecModalPopup(a);
    getElement("dvModalDialogBackground").style.display = (a ? "block" : "none");
    if (isIE) {
        SetElementOverlayState("tblContentContainer", a);
        SetElementOverlayState("tblHomePage", a);
    }
    if (a) {
        _overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = _overflow;
    }
}
function SetElementOverlayState(c, a) {
    var b = getElement(c);
    if (b == null) {
        return;
    }
    if (a) {
        b.style.filter = "alpha(opacity=40)";
    } else {
        b.style.removeAttribute("filter");
    }
}
function IsInViewer() {
    var a = window.location.href.replace("https://", "").toLowerCase();
    return (a.indexOf("/viewer.aspx") > 0) || (a.indexOf("/bareboneviewer.aspx") > 0);
}
function IsInHomePage() {
    return (window.location.pathname === "/" || window.location.pathname === "/default.aspx");
}
function SetPopupDimensions() {
    var b = 0
      , a = 0;
    for (var c = 0; c < PopupDimensions.length && b == 0; c++) {
        if (PopupDimensions[c].name.toLowerCase() == _openedWindowName.toLowerCase()) {
            b = PopupDimensions[c].width;
            a = PopupDimensions[c].height;
        }
    }
    if (b > 0 && a > 0) {
        AdjustModalPopupHeight(b, a);
    } else {
        if (typeof b === "string" && typeof a === "string") {
            AdjustModalPopupStringDimensiosns(b, a);
        }
    }
}
function AdjustModalPopupToTrueDimensions(b, a) {
    for (var c = 0; c < PopupDimensions.length; c++) {
        if (PopupDimensions[c].name.toLowerCase() == _openedWindowName.toLowerCase()) {
            PopupDimensions[c].width = b;
            PopupDimensions[c].height = a;
        }
    }
    AdjustModalPopupHeight(b, a);
}
function AdjustModalPopupHeight(g, d) {
    var b = getElement("dvModalDialogIFrameContainer");
    var c = getElement("modalDialogIFrame");
    var h = getElement("pleaseWaitIFrame");
    b.style.width = g + "px";
    b.style.height = d + "px";
    c.style.width = g + "px";
    c.style.height = d + "px";
    if (clientDimensions == null) {
        CalcClientSize();
    }
    var a = getElement("dvModalDialogBackground");
    var f = (clientDimensions.height - d) / 2;
    if (f < 0) {
        f = 0;
    }
    var e = (clientDimensions.width - g) / 2;
    if (e < 0) {
        e = 0;
    }
    b.style.top = f + "px";
    b.style.left = e + "px";
}
function AdjustModalPopupStringDimensiosns(f, c) {
    var b = getElement("dvModalDialogIFrameContainer");
    b.style.width = f;
    b.style.height = c;
    if (clientDimensions == null) {
        CalcClientSize();
    }
    containerRec = b.getBoundingClientRect();
    var a = getElement("dvModalDialogBackground");
    var e = (clientDimensions.height - containerRec.height) / 2;
    if (e < 0) {
        e = 0;
    }
    var d = (clientDimensions.width - containerRec.width) / 2;
    if (d < 0) {
        d = 0;
    }
    b.style.top = e + "px";
    b.style.left = d + "px";
}
function Utils_ShowMessageDialog_OnLoad(a) {
    AddOpenWindowCommand("Utils_ShowMessageDialog('" + a + "')");
}
var openWindowsQueue = new Array();
function AddOpenWindowCommand(a) {
    openWindowsQueue[openWindowsQueue.length] = a;
}
var windowResizeListners = new Array();
function AddWindowResizeListner(a) {
    windowResizeListners[windowResizeListners.length] = a;
}
var postLoadScripts = new Array();
function AddPostLoadScript(a) {
    postLoadScripts[postLoadScripts.length] = a;
}
function LoadPendingScripts() {
    for (var a = 0; a < postLoadScripts.length; a++) {
        LoadJS(postLoadScripts[a]);
    }
}
var MasterPage_OnLoadFlag = false;
function MasterPage_SetOnLoadFlag() {
    MasterPage_OnLoadFlag = true;
    ExecWindowOnResizeEventHandlers();
}
function MasterPage_OnLoadFlagIsSet() {
    return MasterPage_OnLoadFlag;
}
function MasterPage_OnLoad_Viewer() {
    AddWindowResizeListner("Page_OnResize()");
    AddWindowResizeListner("Document_OnResize()");
    CalcClientSize();
    if (_openedWindowName == "") {
        if (!IsInViewer()) {
            SetPleaseWaitIFrame();
        }
    }
    window.onresize = ExecWindowOnResizeEventHandlers;
    ExecWindowOnResizeEventHandlers();
    window.setTimeout("OpenWindowsInQueue()", 250);
    if (isChrome) {
        var b = document.getElementById("hrefRSSFeed");
        if (b != null) {
            b.style.display = "none";
        }
    }
    var a = $(document);
    a.dblclick(function(c) {
        mouseDblclick(c);
    });
}
function OpenWindowsInQueue() {
    for (var l = 0; l < openWindowsQueue.length; l++) {
        eval(openWindowsQueue[l]);
    }
}
function ExecWindowOnResizeEventHandlers() {
    setTimeout(function() {
        for (var l = 0; l < windowResizeListners.length; l++) {
            eval(windowResizeListners[l]);
        }
    }, is_IOS8 ? 500 : 0);
}
function Page_OnResize() {
    CalcClientSize();
    var a = getElement("dvModalDialogBackground");
    a.style.width = clientDimensions.width;
    a.style.height = clientDimensions.height;
    if (a.style.display != "none") {
        SetPopupDimensions();
    }
}
function Document_OnResize() {
    var a = document.getElementById("modalTouchDialogIFrame");
    if (a !== null) {
        a.style.width = window.innerWidth + "px";
        a.style.height = window.innerHeight + "px";
        a.style.top = window.pageYOffset + "px";
    }
    if (typeof (kmobj) !== "undefined") {
        setTimeout(function() {
            kmobj.Reposition();
        }, 1000);
    }
    if (typeof (BookScroll) !== "undefined") {
        BookScroll.Refresh();
    }
    if (typeof (MasterDrawer) !== "undefined") {
        MasterDrawer.Resize();
    }
}
function footerHeight() {
    return (getElementHeight("trFooterContainer") + getElementHeight("trFooterContainer2") + getElementHeight("trFooterContainer3") + getElementHeight("trNoFrofitContainer"));
}
function toolbarHeight() {
    return (getElementHeight("mytoolbar"));
}
function getElementHeight(b) {
    var a = getElement(b);
    if (a == null) {
        return 0;
    }
    return a.offsetHeight;
}
function setStageHeight(d, a) {
    var c = getElement(d);
    var b = clientHeight() - nWebsiteHeaderHeight - footerHeight() - (a ? 25 : 0);
    if (b > 30) {
        c.style.height = b + "px";
        c.style.display = "";
        c.style.overflow = "auto";
    } else {
        c.style.display = "none";
    }
}
var qsParm = new Array();
function qs() {
    var e = window.location.search.substring(1);
    var c = e.split("&");
    for (var a = 0; a < c.length; a++) {
        var d = c[a].indexOf("=");
        if (d > 0) {
            var b = c[a].substring(0, d);
            var f = c[a].substring(d + 1);
            qsParm[b] = f;
        }
    }
}
function cancelEvent() {
    if (window.event) {
        window.event.returnValue = false;
        window.event.cancelBubble = true;
    }
}
function ReplaceAll(a, d, b) {
    d = d + "";
    b = b + "";
    if (b.indexOf(d) != -1) {
        Utils_ShowErrorMessageDialog("ReplaceAll  - worng syntax");
        return;
    }
    var c = a.indexOf(d);
    while (c != -1) {
        a = a.replace(d, b);
        c = a.indexOf(d);
    }
    return a;
}
function encodeKotar(a) {
    a = encodeURIComponent(a);
    a = ReplaceAll(a, "'", "[A]");
    a = ReplaceAll(a, '"', "[Q]");
    return a;
}
function decodeKotar(a) {
    a = ReplaceAll(a, "%", "[S]");
    a = decodeURIComponent(a);
    a = ReplaceAll(a, "[S]", "%");
    a = ReplaceAll(a, "[A]", "'");
    a = ReplaceAll(a, "[Q]", '"');
    return a;
}
function DoSiteSearch(c) {
    var b = "/KotarApp/Search.aspx";
    var a = new RegExp("<[^>]*>","g");
    c = c.replace(a, "");
    c = encodeKotar(c);
    var d = b + "?sSearchText=" + c;
    window.setTimeout("SetWindowLocation('" + d + "', false)", 500);
}
function ShowAddButtons(a) {
    document.getElementById(a + "_AddButtons").style.display = "";
}
function HideAddButtons(a) {
    document.getElementById(a + "_AddButtons").style.display = "none";
}
function AddBookToFavorites(c, a) {
    var b = (typeof (BaseMaster_gUserID) == "undefined" ? "00000000-0000-0000-0000-000000000000" : BaseMaster_gUserID);
    var d = new Array({
        name: "nBookID",
        value: c
    },{
        name: "gUserID",
        value: b
    });
    callAppKotarCommand("UserBooks.Add", d, {
        onSuccessFunction: AddBookToFavorites_OnComplete,
        onFailureFunction: AddBookToFavorites_OnError,
        bRefreshPage: a,
        nBookID: c
    }, false);
    cancelEvent();
}
function AddBookToFavorites_OnError() {
    Utils_ShowErrorMessageDialog(UTXT_ActionFailed);
}
function AddBookToFavorites_OnComplete(c, a) {
    var b = document.getElementById("dvAddToFavorites_" + a.nBookID);
    if (b != null) {
        b.style.display = "none";
    }
    SetPleaseWaitIFrame();
    Utils_ShowMessageDialog(UTXT_BookAddedToFavorites, UTXT_ActionCompleted, false, (a.bRefreshPage == false ? "" : "javascript:parent.location.reload()"));
    setTimeout(function() {
        HideModalPopup();
        AutoHideAll();
    }, 750);
}
var sUtils_sJSAction = "";
var bUtils_bInPlaceLogin = false;
var bCancelTabRefresh = false;
function Utils_OpenSmartLoginPopup(sJSAction, bCancelRefresh) {
    if (typeof (bCancelRefresh) != "undefined") {
        bCancelTabRefresh = bCancelRefresh;
    }
    sJSAction = ReplaceAll(sJSAction, "[A]", "'");
    if (bUtils_bInPlaceLogin == true) {
        eval(sJSAction);
        return true;
    }
    cancelEvent();
    sUtils_sJSAction = sJSAction;
    ShowLoginPopup(true, "Utils_SmartLogin_OnSuccess", true);
    return false;
}
function Utils_OpenInPlaceLoginPopup() {
    cancelEvent();
    sUtils_sJSAction = "";
    bCancelTabRefresh = false;
    ShowLoginPopup(true, "Utils_SmartLogin_OnSuccess", false);
}
function Utils_OpenLoginPopupAndRefreshAfterLogin() {
    ShowLoginPopup(true, "Utils_RefreshAfterLogin", false);
}
function Utils_OpenSmartLoginPapgeForRedirect(a) {
    if (bUtils_bInPlaceLogin == false) {
        ShowLoginTouchPage(a);
    } else {
        window.location = a;
    }
}
var _nVerifiedLoginStatusInterval = 0;
var _dtVerifiedLoginStatusIsReal = new Date();
_dtVerifiedLoginStatusIsReal.setFullYear(1970, 1, 1);
function changeLanguage(c, a) {
    var b = new Array({
        name: "tmp",
        value: Date()
    },{
        name: "url",
        value: c
    },{
        name: "lang",
        value: a
    });
    executeWebRequest("Users.ChangeLanguage", b, {
        onSuccessFunction: ChangeLanguage_OnComplete,
        onFailureFunction: ChangeLanguage_OnFailure
    });
}
function ChangeLanguage_OnComplete(a) {
    ssoRedirect(a);
}
function ChangeLanguage_OnFailure() {}
function ssoRedirect(a) {
    if (typeof (a) != "undefined") {
        if (document.all) {
            $("#SSOredirect").attr("href", a);
            ($("#SSOredirect")[0]).click();
        } else {
            document.location.href = a;
        }
    }
}
function VerifyActiveUserStatusResponse() {
    GetActiveUserStatus_Refresh();
}
function GetActiveUserStatus_OnFailure() {
    GetActiveUserStatus_Refresh();
}
function GetActiveUserStatus_OnComplete(a) {
    if (a == "Refresh" || BaseMaster_bUserIsLoggedIn != a.bIsLoggedIn) {
        GetActiveUserStatus_Refresh();
    }
}
function GetActiveUserStatus_Refresh() {
    if (IsInViewer()) {
        location.reload(true);
    } else {
        Refresh("GetActiveUserStatus_OnComplete");
    }
}
function Refresh(c) {
    var a = window.location.hash;
    var d = window.location.href.replace(a, "");
    var b;
    b = new Date();
    if (d.indexOf("?") > 0) {
        d += "&ts=" + b.getTime();
    } else {
        d += "?ts=" + b.getTime();
    }
    window.location.replace(d + a);
}
function executeCombinedWebRequest(d, e, a, f, b) {
    var g = d[0];
    for (var c = 1; c < d.length; c++) {
        g = g + "," + d[c];
    }
    executeWebRequest(g, e, a, f, b);
}
function executeWebRequest(c, d, a, e, b) {
    var f = buildRequestURL(c, {}, e);
    f += addTimestampParameter(d);
    webRequest = new Sys.Net.WebRequest();
    webRequest.set_url(f);
    if (typeof (a) != "undefined") {
        webRequest.set_userContext(a);
    }
    addParameters(webRequest, d);
    webRequest.set_httpVerb("POST");
    if (typeof (b) == "undefined") {
        webRequest.add_completed(callback);
    } else {
        webRequest.set_userContext({
            callbackFunc: b
        });
        webRequest.add_completed(callbackBridge);
    }
    webRequest.invoke();
}
function callbackBridge(executor, eventArgs) {
    if (executor.get_responseData() == "Refresh") {
        Refresh("callbackBridge");
    }
    var callbackData = executor.get_webRequest().get_userContext();
    oHandler = eval(callbackData.callbackFunc);
    oHandler(executor);
}
function adjustCdnPattern(c) {
    if (c == "") {
        return "";
    }
    var d = window.location.host;
    d = d.replace(".cotar.co.il", ".kotar.co.il");
    var b = c.split(".")[0];
    var e = c.replace(b + ".", "");
    var a = d.toLowerCase().indexOf(e);
    return c;
}
var sAdjustedCdn = "";
function buildRequestURL(a, b, d) {
    if (d == undefined) {
        if (sAdjustedCdn == "") {
            var e = window.location.host;
            sAdjustedCdn = adjustCdnPattern(e);
        }
        var c = location.protocol;
        d = c + "//" + sAdjustedCdn + "/KotarApp/System/ApiBroker.aspx";
    }
    if (d.indexOf("?") == -1) {
        d += "?";
    } else {
        if (d.charAt(d.length - 1) != "&") {
            d += "&";
        }
    }
    var f = d + "sMethod=" + a;
    if (b.length > 0) {
        for (i = 0; i < b.length; i++) {
            f += "&" + b[i].name + "=" + b[i].value;
        }
    }
    return f;
}
function addTimestampParameter(a) {
    if (a.length > 0) {
        for (i = 0; i < a.length; i++) {
            if (a[i].name == "tmp") {
                return "&" + a[i].name + "=" + getTimestamp();
            }
        }
    }
    return "";
}
function getTimestamp() {
    var a = new Date();
    return a.getFullYear() + "." + a.getMonth() + "." + a.getDate() + "." + a.getHours() + "." + a.getMinutes() + "." + a.getSeconds() + "." + a.getMilliseconds();
}
function addParameters(d, b) {
    var c = "";
    if (b.length > 0) {
        for (i = 0; i < b.length; i++) {
            if (b[i].name != "tmp") {
                c += (c != "" ? "&" : "") + b[i].name + "=" + b[i].value;
            }
        }
    }
    var a = (typeof (BaseMaster_gUserID) == "undefined" ? "00000000-0000-0000-0000-000000000000" : BaseMaster_gUserID);
    c += (c != "" ? "&" : "") + "gUserID=" + a;
    d.set_body(c);
}
function callback(executor, eventArgs) {
    if (executor.get_responseAvailable()) {
        var callbackData = executor.get_webRequest().get_userContext();
        if (executor.get_statusCode() == 200) {
            try {
                if (executor.get_responseData() == "Refresh") {
                    Refresh("callback");
                    return;
                }
                eval("var recievedData = " + executor.get_responseData());
            } catch (Error) {
                callbackData.onFailureFunction(callbackData);
                return;
            }
            callbackData.onSuccessFunction(recievedData, callbackData);
        } else {
            callbackData.onFailureFunction(callbackData);
        }
    } else {
        if (executor.get_timedOut()) {} else {
            if (executor.get_aborted()) {}
        }
    }
}
function callbackXml(d, c) {
    if (d.get_responseAvailable()) {
        var a = d.get_webRequest().get_userContext();
        if (d.get_statusCode() == 200) {
            try {
                var e = getXMLDoc(d.get_responseData());
            } catch (b) {
                a.onFailureFunction(a);
                return;
            }
            a.onSuccessFunction(e, a);
        } else {
            a.onFailureFunction(a);
        }
    } else {
        if (d.get_timedOut()) {} else {
            if (d.get_aborted()) {}
        }
    }
}
var oBreakPoints = new Array();
function Dbg(a) {
    if (typeof (oBreakPoints[a]) == "undefined") {
        oBreakPoints[a] = true;
    }
}
function AddDebugMessage(a) {
    if (BaseMaster_bIsInDevMode) {
        var b = new Date();
        document.title = b.toLocaleTimeString() + ":" + b.getMilliseconds() + " - " + a;
    }
}
var mousePos = null;
function mouseDblclick(a) {
    mousePos = mouseCoords(a);
    if (typeof (Page_OnMouseDblclick) != "undefined") {
        Page_OnMouseDblclick(a);
    }
}
function mouseCoords(b) {
    try {
        if (b.clientX || b.clientY) {
            return {
                x: b.clientX,
                y: b.clientY
            };
        }
    } catch (a) {}
    return null;
}
function XBrowserAddHandler(c, a, b) {
    if (a.indexOf("on") == 0) {
        a = a.substring(2);
    }
    if (c.addEventListener) {
        c.addEventListener(a, b, false);
    } else {
        if (c.attachEvent) {
            c.attachEvent("on" + a, b);
        } else {
            c["on" + a] = b;
        }
    }
}
var clientDimensions = null;
function clientWidth() {
    CalcClientSize();
    return clientDimensions.width;
}
function clientHeight() {
    CalcClientSize();
    return clientDimensions.height;
}
function CalcClientSize() {
    var b = 0
      , a = 0;
    if (typeof (window.innerWidth) == "number") {
        b = window.innerWidth;
        a = window.innerHeight;
    } else {
        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            b = document.documentElement.clientWidth;
            a = document.documentElement.clientHeight;
        } else {
            if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                b = document.body.clientWidth;
                a = document.body.clientHeight;
            }
        }
    }
    clientDimensions = {
        width: b,
        height: a
    };
}
function f_scrollTop() {
    return f_filterResults(window.pageYOffset ? window.pageYOffset : 0, document.documentElement ? document.documentElement.scrollTop : 0, document.body ? document.body.scrollTop : 0);
}
function f_filterResults(d, b, a) {
    var c = d ? d : 0;
    if (b && (!c || (c > b))) {
        c = b;
    }
    return a && (!c || (c > a)) ? a : c;
}
function addListener(b, d, c, a) {
    a = a || false;
    if (window.addEventListener) {
        b.addEventListener(d, c, a);
        return true;
    } else {
        if (window.attachEvent) {
            b.attachEvent("on" + d, c);
            return true;
        } else {
            return false;
        }
    }
}
var MultipleImageLoader = function(f, b) {
    var d = new Array(f.length);
    var e = 0;
    for (var c = 0; c < f.length; c++) {
        d[c] = new ImageLoader(f[c]);
        d[c].loadEvent = a;
        d[c].load();
    }
    function a() {
        e++;
        if (d.length === e) {
            b();
        }
    }
};
var ImageLoader = function(a) {
    this.url = a;
    this.image = null;
    this.loadEvent = null;
};
ImageLoader.prototype = {
    load: function() {
        this.image = document.createElement("img");
        var c = this.url;
        var a = this.image;
        var b = this.loadEvent;
        addListener(this.image, "load", function(d) {
            if (b != null) {
                b(c, a);
            }
        }, false);
        this.image.src = this.url;
    },
    getImage: function() {
        return this.image;
    }
};
function OptionallySetInnerTextByID(b, c) {
    var a = getElement(b);
    if (a != null) {
        SetInnerText(a, c);
    }
}
function SetInnerTextByID(a, b) {
    SetInnerText(getElement(a), b);
}
function SetInnerText(a, b) {
    if (isIE) {
        a.innerText = b;
    } else {
        if (a.tagName.toLowerCase() == "div" || a.tagName.toLowerCase() == "span") {
            a.innerHTML = b;
        } else {
            a.text = b;
        }
    }
}
function GetInnerText(a) {
    if (isIE) {
        return a.innerText;
    } else {
        return a.text;
    }
}
function SetWindowLocation(c, a) {
    if (typeof (a) == "undefined") {
        a = true;
    }
    if (a) {
        if (isIE == false && !isIE11) {
            window.open(c);
        } else {
            var b = document.createElement("a");
            b.target = "_blank";
            b.href = c;
            document.body.appendChild(b);
            b.click();
        }
    } else {
        if (isIE) {
            location.href = c;
        } else {
            window.location.replace(c);
        }
    }
}
var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
    },
    searchString: function(a) {
        for (var d = 0; d < a.length; d++) {
            var c = a[d].string;
            var b = a[d].prop;
            this.versionSearchString = a[d].versionSearch || a[d].identity;
            if (c) {
                if (c.indexOf(a[d].subString) != -1) {
                    return a[d].identity;
                }
            } else {
                if (b) {
                    return a[d].identity;
                }
            }
        }
    },
    searchVersion: function(a) {
        var b = a.indexOf(this.versionSearchString);
        if (b == -1) {
            return;
        }
        return parseFloat(a.substring(b + this.versionSearchString.length + 1));
    },
    dataBrowser: [{
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    }, {
        prop: window.opera,
        identity: "Opera"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    }]
};
BrowserDetect.init();
function IsFirefox() {
    return (BrowserDetect.browser == "Firefox");
}
function RectangleIsInRange(d, c, b) {
    var f = d.x * 1;
    var g = d.y * 1;
    var e = d.width * 1;
    var a = d.height * 1;
    return (f > 0 && g > 0 && e > 0 && a > 0 && f + e < c && g + a < b);
}
function Utilities_SetCtrlDisplay(c, a) {
    if (typeof (c) == "undefined" || c == "") {
        return;
    }
    var b = document.getElementById(c);
    if (b == null) {
        return;
    }
    b.style.display = (a ? "block" : "none");
}
function Utilities_SetCtrlClass(c, b) {
    if (typeof (c) == "undefined" || c == "") {
        return;
    }
    var a = document.getElementById(c);
    if (a == null) {
        return;
    }
    a.className = b;
}
function OpenMembersPage(a) {
    var b = "/Misc/Members.aspx?nSort=" + a;
    Utils_ShowMessageDialog(UTXT_Searching, UTXT_PleaseWait, false, "", "", true);
    window.setTimeout("SetWindowLocation('" + b + "', false)", 500);
}
function ShowTechnicalRequirementsPopup() {
    ChangeIFrameSource("/Item/TechnicalReq.aspx", true);
    ShowModalPopup("TechnicalRequirements");
}
function ZeroPad(b, a) {
    var c = b + "";
    while (c.length < a) {
        c = "0" + c;
    }
    return c;
}
function GetQueryParameterByName(a) {
    a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var c = "[\\?&]" + a + "=([^&#]*)";
    var b = new RegExp(c);
    var d = b.exec(window.location.href);
    if (d == null) {
        return "";
    } else {
        return unescape(decodeURIComponent(d[1]).replace(/\+/g, " "));
    }
}
function GetQueryParameterByNameAndDefaultValue(b, a) {
    b = b.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var d = "[\\?&]" + b + "=([^&#]*)";
    var c = new RegExp(d);
    var e = c.exec(window.location.href);
    if (e == null) {
        return a;
    } else {
        return unescape(decodeURIComponent(e[1]).replace(/\+/g, " "));
    }
}
function callAppKotarCommandReadOnlySession(b, e, a, d, c) {
    var f = buildKotarCommandBaseUrl("CommandHandlerReadOnlySession", b);
    callAppKotarCommandBase(f, b, e, a, d, c);
}
function callAppKotarCommandNoSession(b, e, a, d, c) {
    var f = buildKotarCommandBaseUrl("CommandHandlerNoSession", b);
    callAppKotarCommandBase(f, b, e, a, d, c);
}
function callAppKotarCommand(b, d, a, c) {
    var e = buildKotarCommandBaseUrl("CommandHandler", b);
    callAppKotarCommandBase(e, b, d, a, c, true);
    if (AppSettingsIsEnableCetEvent) {
        sendLearningEvent(b);
    }
}
function getEnvCookieName(a, d) {
    var b = window.location.host.toLowerCase();
    var c = "";
    if (b.indexOf(".dev.") > -1 && d) {
        c = "dev_";
    } else {
        if (b.indexOf(".dev.") > -1 || b.indexOf(".testing.") > -1) {
            c = "testing_";
        } else {
            if (b.indexOf(".staging.") > -1) {
                c = "staging_";
            } else {
                if (b.indexOf(".preprod.") > -1) {
                    c = "preprod_";
                } else {
                    c = "";
                }
            }
        }
    }
    return c + a;
}
function getCetEventParameters() {
    var b = window.location + "";
    b = encodeKotar(b);
    var a = {
        SessionID: getCookie(getEnvCookieName("CetSession", false)),
        nPageID: BV_GetCurrentPageID(),
        sCurrentBookUrl: b,
        nBookID: BV_nBookID,
        nPageNum: (BV_nTopPageInView + 1),
        objectName: BV_nGotoPageNum,
        contentLanguage: BV_LanguageCode
    };
    return a;
}
function printAllBooksParams() {
    var a = {
        BV_nBookID: BV_nBookID,
        BV_InitElementRefs: BV_InitElementRefs(),
        MarkersMgr_Init: MarkersMgr_Init(),
        BV_InitToolbar: BV_InitToolbar(),
        BV_sBookDisplayName: BV_sBookDisplayName,
        BV_bSomePagesAreClosed: BV_bSomePagesAreClosed,
        BV_nTotalPages: BV_nTotalPages,
        BV_dPageRatio: BV_dPageRatio,
        BV_nPageDefaultImageWidth: BV_nPageDefaultImageWidth,
        BV_nPageDefaultImageHeight: BV_nPageDefaultImageHeight,
        BV_nCurrentSizeStep: BV_nCurrentSizeStep,
        BV_sAutoFitMode: BV_sAutoFitMode,
        BV_sSearchText: BV_sSearchText,
        BV_nGotoPageNum: BV_nGotoPageNum,
        BV_nTopPageInView: BV_nTopPageInView,
        BV_nGotoPageOffset: BV_nGotoPageOffset,
        BV_sViewerFilesPath: BV_sViewerFilesPath,
        BV_nScrollbarWidth: BV_nScrollbarWidth,
        BV_bAdminUser: BV_bAdminUser,
        BV_bIsTeacher: BV_bIsTeacher,
        BV_bIsStudent: BV_bIsStudent,
        BV_bIsAutherizedMember: BV_bIsAutherizedMember,
        BV_nCdnServers: BV_nCdnServers,
        BV_sCdnDomain: BV_sCdnDomain,
        BV_bHasTOC: BV_bHasTOC,
        BV_bSupportsLayersInViewer: BV_bSupportsLayersInViewer,
        BV_bShowLayersFilter: BV_bShowLayersFilter,
        BV_bShowLayerIcons: BV_bShowLayerIcons,
        BV_BookDirection: BV_BookDirection,
        BV_IsBookDirectionRTL: BV_IsBookDirectionRTL,
        BV_LanguageCode: BV_LanguageCode,
        LMS_IsLMSable: LMS_IsLMSable,
        BV_CetSubject: BV_CetSubject,
        BV_projectKey: BV_projectKey,
        BV_projectSectionKey: BV_projectSectionKey,
        BV_DefaultProjectID: BV_DefaultProjectID,
        BV_gSiteID: BV_gSiteID,
        BV_SessionID: BV_SessionID,
        BV_gInstituteID: BV_gInstituteID,
        BV_nSchoolID: BV_nSchoolID,
        BV_Platform: BV_Platform,
        BV_ViewerClosefunction: BV_ViewerClosefunction,
        BV_BookAppHasFiller: BV_BookAppHasFiller,
        BV_BookVersionText: BV_BookVersionText,
        BV_CanCloneNote: BV_CanCloneNote,
        BV_HasAdminOrderInMarkers: BV_HasAdminOrderInMarkers,
        BV_HasKeybaord: BV_HasKeybaord,
        cetSession: getCookie(getEnvCookieName("CetSession", false))
    };
    console.log(JSON.stringify(a));
}
function sendLearningEvent(b) {
    if (b == "Statistics.RegisterCurrentPageView") {
        var d = false;
        var e = getCetEventParameters();
        var a = "kotar_cet_event_exited_" + e.SessionID;
        var c = getReferrer(a);
        sendExited(a);
        if (!d) {
            sendLaunched(c);
        } else {
            d = true;
        }
    }
}
function getReferrer(a) {
    return sessionStorage.getItem(a) ? JSON.parse(sessionStorage.getItem(a)).optional.currentHyperlink : document.referrer;
}
function sendLaunched(e) {
    var p = getCetEventParameters();
    var b = "kotar_cet_event_exited_" + p.SessionID;
    var v = window.cet.microservices.bigData.enums.verbs.launched;
    var k = p.nPageNum.toString();
    var l = document.getElementById("scrollpagesindicatorWrapper").innerText;
    var m = window.cet.microservices.bigData.enums.objectTypes.book;
    var g = window.location.host.split(".");
    var q = g[2] === "kotar" ? g[0] + "." + g[1] + ".kotar" : g[1] === "kotar" ? g[0] + ".kotar" : "kotar";
    var h = cet.uiServices.authentication.getLoggedUser();
    var u = h && h.actualUserRole ? h.actualUserRole : "guest";
    var t = h && h.userID ? h.userID : "00000000-0000-0000-0000-000000000000";
    var j = {
        verb: v,
        objectId: k,
        objectName: l,
        objectType: m,
        product: q,
        contextReferrer: e,
        userRole: u,
        userId: t
    };
    var c = p.nBookID.toString() || location.search.split("nBookID=")[1].match(/\d+/g)[0].toString();
    var d = p.contentLanguage;
    var s = p.SessionID;
    var f = p.sCurrentBookUrl || window.location.href;
    var o = p.nPageID.toString() || "";
    var r = h && h.schoolID ? h.schoolID : "00000000-0000-0000-0000-000000000000";
    var n = {
        contentGroupingId: c,
        contentLanguage: d,
        sessionId: s,
        currentHyperlink: f,
        pageId: o,
        schoolId: r
    };
    window.cet.microservices.bigData.messages.sendLearningEvent(j.verb, j.objectId, j.objectName, j.objectType, j.product, j.contextReferrer, j.userRole, j.userId, n);
    j.verb = window.cet.microservices.bigData.enums.verbs.exited;
    var a = new Object();
    a.mandatory = j;
    a.optional = n;
    sessionStorage.setItem(b, JSON.stringify(a));
}
function sendExited(b) {
    var a = sessionStorage.getItem(b) ? JSON.parse(sessionStorage.getItem(b)) : null;
    if (a) {
        window.cet.microservices.bigData.messages.sendLearningEvent(a.mandatory.verb, a.mandatory.objectId, a.mandatory.objectName, a.mandatory.objectType, a.mandatory.product, a.mandatory.contextReferrer, a.mandatory.userRole, a.mandatory.userId, a.optional);
        sessionStorage.removeItem(b);
    }
}
function sendAllCetEventExited() {
    $(document).ready(function() {
        var b = "kotar_cet_event_exited_";
        for (var c = 0; c < sessionStorage.length; c++) {
            var a = sessionStorage.key(c);
            if (a != null && b.indexOf(a)) {
                sendExited(a);
            }
        }
    });
}
function callAppKotarCommandSync(b, e, a, d, c) {
    var f = buildKotarCommandBaseUrl("CommandHandler", b);
    c = c || "";
    callAppKotarCommandBase(f, b, e, a, d, false, c);
}
function callAppKotarCommandPost(b, d, a, c) {
    var e = buildKotarCommandBaseUrl("CommandHandler", b);
    callAppKotarCommandBase(e, b, d, a, c, true, "text", "POST");
}
function callAppKotarCommandBase(l, b, k, a, h, g, d, j) {
    if (h === undefined) {
        h = false;
    }
    if (g === undefined) {
        g = true;
    }
    d = d || "";
    j = j || "GET";
    var c = null;
    if (j === "GET") {
        if (k && k.length > 0) {
            for (var f = 0; f < k.length; f++) {
                l += encodeURI("&" + k[f].name + "=" + k[f].value);
            }
        }
    } else {
        c = k;
    }
    $.ajax({
        url: l,
        cache: h,
        async: g,
        method: j,
        dataType: d,
        data: c,
        success: function(m) {
            if (m) {
                if (m === "Refresh") {
                    Refresh("callbackBridge");
                    return;
                }
                if (a && a.onSuccessFunction) {
                    a.onSuccessFunction(m, a);
                }
            } else {
                if (a && a.onFailureFunction) {
                    a.onFailureFunction();
                }
            }
        },
        fail: function e(o, m, n) {
            alert(m);
        }
    });
}
var kotarcommandBaseUrl = "";
function buildKotarCommandBaseUrl(b, a) {
    if (kotarcommandBaseUrl === "") {
        var d = window.location.host;
        kotarcommandBaseUrl = adjustCdnPattern(d);
    }
    var c = new Array();
    c.push("//", kotarcommandBaseUrl, "/KotarApp/System/", b, ".aspx?command=", a);
    return c.join("");
}
function AddUsageLog(b) {
    var a = new Array({
        name: "UsageName",
        value: b
    });
    callAppKotarCommand("addusageLog", a, {
        onSuccessFunction: AddUsageLog_OnComplete,
        onFailureFunction: AddUsageLog_OnError
    }, false);
}
function AddUsageLog_OnComplete() {}
function AddUsageLog_OnError() {}
var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
};
function escapeHtml(a) {
    return String(a).replace(/[&<>"'\/]/g, function(b) {
        return entityMap[b];
    });
}
function getCookie(a) {
    var c = "; " + document.cookie;
    var b = c.split("; " + a + "=");
    if (b.length == 2) {
        return b.pop().split(";").shift();
    }
}
function removeCookie(a) {
    if (getCookie(a)) {
        document.cookie = a + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

/** ========== kotarapp\resources\jquery\jquery-ui-1.11.custom.min.js ========== **/
/*! jQuery UI - v1.11.0 - 2014-07-14
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, draggable.js, resizable.js, button.js, dialog.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}
)(function(e) {
    function t(t, s) {
        var a, n, o, r = t.nodeName.toLowerCase();
        return "area" === r ? (a = t.parentNode,
        n = a.name,
        t.href && n && "map" === a.nodeName.toLowerCase() ? (o = e("img[usemap=#" + n + "]")[0],
        !!o && i(o)) : !1) : (/input|select|textarea|button|object/.test(r) ? !t.disabled : "a" === r ? t.href || s : s) && i(t)
    }
    function i(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
            return "hidden" === e.css(this, "visibility")
        }).length
    }
    e.ui = e.ui || {},
    e.extend(e.ui, {
        version: "1.11.0",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }),
    e.fn.extend({
        scrollParent: function() {
            var t = this.css("position")
              , i = "absolute" === t
              , s = this.parents().filter(function() {
                var t = e(this);
                return i && "static" === t.css("position") ? !1 : /(auto|scroll)/.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
            }).eq(0);
            return "fixed" !== t && s.length ? s : e(this[0].ownerDocument || document)
        },
        uniqueId: function() {
            var e = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++e)
                })
            }
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
            })
        }
    }),
    e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(i) {
                return !!e.data(i, t)
            }
        }) : function(t, i, s) {
            return !!e.data(t, s[3])
        }
        ,
        focusable: function(i) {
            return t(i, !isNaN(e.attr(i, "tabindex")))
        },
        tabbable: function(i) {
            var s = e.attr(i, "tabindex")
              , a = isNaN(s);
            return (a || s >= 0) && t(i, !a)
        }
    }),
    e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(t, i) {
        function s(t, i, s, n) {
            return e.each(a, function() {
                i -= parseFloat(e.css(t, "padding" + this)) || 0,
                s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0),
                n && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
            }),
            i
        }
        var a = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"]
          , n = i.toLowerCase()
          , o = {
            innerWidth: e.fn.innerWidth,
            innerHeight: e.fn.innerHeight,
            outerWidth: e.fn.outerWidth,
            outerHeight: e.fn.outerHeight
        };
        e.fn["inner" + i] = function(t) {
            return void 0 === t ? o["inner" + i].call(this) : this.each(function() {
                e(this).css(n, s(this, t) + "px")
            })
        }
        ,
        e.fn["outer" + i] = function(t, a) {
            return "number" != typeof t ? o["outer" + i].call(this, t) : this.each(function() {
                e(this).css(n, s(this, t, !0, a) + "px")
            })
        }
    }),
    e.fn.addBack || (e.fn.addBack = function(e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
    ),
    e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
        }
    }(e.fn.removeData)),
    e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
    e.fn.extend({
        focus: function(t) {
            return function(i, s) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        e(t).focus(),
                        s && s.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus),
        disableSelection: function() {
            var e = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.bind(e + ".ui-disableSelection", function(e) {
                    e.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function(t) {
            if (void 0 !== t)
                return this.css("zIndex", t);
            if (this.length)
                for (var i, s, a = e(this[0]); a.length && a[0] !== document; ) {
                    if (i = a.css("position"),
                    ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(a.css("zIndex"), 10),
                    !isNaN(s) && 0 !== s))
                        return s;
                    a = a.parent()
                }
            return 0
        }
    }),
    e.ui.plugin = {
        add: function(t, i, s) {
            var a, n = e.ui[t].prototype;
            for (a in s)
                n.plugins[a] = n.plugins[a] || [],
                n.plugins[a].push([i, s[a]])
        },
        call: function(e, t, i, s) {
            var a, n = e.plugins[t];
            if (n && (s || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
                for (a = 0; n.length > a; a++)
                    e.options[n[a][0]] && n[a][1].apply(e.element, i)
        }
    };
    var s = 0
      , a = Array.prototype.slice;
    e.cleanData = function(t) {
        return function(i) {
            for (var s, a = 0; null != (s = i[a]); a++)
                try {
                    e(s).triggerHandler("remove")
                } catch (n) {}
            t(i)
        }
    }(e.cleanData),
    e.widget = function(t, i, s) {
        var a, n, o, r, h = {}, l = t.split(".")[0];
        return t = t.split(".")[1],
        a = l + "-" + t,
        s || (s = i,
        i = e.Widget),
        e.expr[":"][a.toLowerCase()] = function(t) {
            return !!e.data(t, a)
        }
        ,
        e[l] = e[l] || {},
        n = e[l][t],
        o = e[l][t] = function(e, t) {
            return this._createWidget ? (arguments.length && this._createWidget(e, t),
            void 0) : new o(e,t)
        }
        ,
        e.extend(o, n, {
            version: s.version,
            _proto: e.extend({}, s),
            _childConstructors: []
        }),
        r = new i,
        r.options = e.widget.extend({}, r.options),
        e.each(s, function(t, s) {
            return e.isFunction(s) ? (h[t] = function() {
                var e = function() {
                    return i.prototype[t].apply(this, arguments)
                }
                  , a = function(e) {
                    return i.prototype[t].apply(this, e)
                };
                return function() {
                    var t, i = this._super, n = this._superApply;
                    return this._super = e,
                    this._superApply = a,
                    t = s.apply(this, arguments),
                    this._super = i,
                    this._superApply = n,
                    t
                }
            }(),
            void 0) : (h[t] = s,
            void 0)
        }),
        o.prototype = e.widget.extend(r, {
            widgetEventPrefix: n ? r.widgetEventPrefix || t : t
        }, h, {
            constructor: o,
            namespace: l,
            widgetName: t,
            widgetFullName: a
        }),
        n ? (e.each(n._childConstructors, function(t, i) {
            var s = i.prototype;
            e.widget(s.namespace + "." + s.widgetName, o, i._proto)
        }),
        delete n._childConstructors) : i._childConstructors.push(o),
        e.widget.bridge(t, o),
        o
    }
    ,
    e.widget.extend = function(t) {
        for (var i, s, n = a.call(arguments, 1), o = 0, r = n.length; r > o; o++)
            for (i in n[o])
                s = n[o][i],
                n[o].hasOwnProperty(i) && void 0 !== s && (t[i] = e.isPlainObject(s) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], s) : e.widget.extend({}, s) : s);
        return t
    }
    ,
    e.widget.bridge = function(t, i) {
        var s = i.prototype.widgetFullName || t;
        e.fn[t] = function(n) {
            var o = "string" == typeof n
              , r = a.call(arguments, 1)
              , h = this;
            return n = !o && r.length ? e.widget.extend.apply(null, [n].concat(r)) : n,
            o ? this.each(function() {
                var i, a = e.data(this, s);
                return "instance" === n ? (h = a,
                !1) : a ? e.isFunction(a[n]) && "_" !== n.charAt(0) ? (i = a[n].apply(a, r),
                i !== a && void 0 !== i ? (h = i && i.jquery ? h.pushStack(i.get()) : i,
                !1) : void 0) : e.error("no such method '" + n + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; " + "attempted to call method '" + n + "'")
            }) : this.each(function() {
                var t = e.data(this, s);
                t ? (t.option(n || {}),
                t._init && t._init()) : e.data(this, s, new i(n,this))
            }),
            h
        }
    }
    ,
    e.Widget = function() {}
    ,
    e.Widget._childConstructors = [],
    e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, i) {
            i = e(i || this.defaultElement || this)[0],
            this.element = e(i),
            this.uuid = s++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t),
            this.bindings = e(),
            this.hoverable = e(),
            this.focusable = e(),
            i !== this && (e.data(i, this.widgetFullName, this),
            this._on(!0, this.element, {
                remove: function(e) {
                    e.target === i && this.destroy()
                }
            }),
            this.document = e(i.style ? i.ownerDocument : i.document || i),
            this.window = e(this.document[0].defaultView || this.document[0].parentWindow)),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() {
            this._destroy(),
            this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function() {
            return this.element
        },
        option: function(t, i) {
            var s, a, n, o = t;
            if (0 === arguments.length)
                return e.widget.extend({}, this.options);
            if ("string" == typeof t)
                if (o = {},
                s = t.split("."),
                t = s.shift(),
                s.length) {
                    for (a = o[t] = e.widget.extend({}, this.options[t]),
                    n = 0; s.length - 1 > n; n++)
                        a[s[n]] = a[s[n]] || {},
                        a = a[s[n]];
                    if (t = s.pop(),
                    1 === arguments.length)
                        return void 0 === a[t] ? null : a[t];
                    a[t] = i
                } else {
                    if (1 === arguments.length)
                        return void 0 === this.options[t] ? null : this.options[t];
                    o[t] = i
                }
            return this._setOptions(o),
            this
        },
        _setOptions: function(e) {
            var t;
            for (t in e)
                this._setOption(t, e[t]);
            return this
        },
        _setOption: function(e, t) {
            return this.options[e] = t,
            "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t),
            t && (this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus"))),
            this
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function(t, i, s) {
            var a, n = this;
            "boolean" != typeof t && (s = i,
            i = t,
            t = !1),
            s ? (i = a = e(i),
            this.bindings = this.bindings.add(i)) : (s = i,
            i = this.element,
            a = this.widget()),
            e.each(s, function(s, o) {
                function r() {
                    return t || n.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? n[o] : o).apply(n, arguments) : void 0
                }
                "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
                var h = s.match(/^([\w:-]*)\s*(.*)$/)
                  , l = h[1] + n.eventNamespace
                  , u = h[2];
                u ? a.delegate(u, l, r) : i.bind(l, r)
            })
        },
        _off: function(e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            e.unbind(t).undelegate(t)
        },
        _delay: function(e, t) {
            function i() {
                return ("string" == typeof e ? s[e] : e).apply(s, arguments)
            }
            var s = this;
            return setTimeout(i, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t),
            this._on(t, {
                mouseenter: function(t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t),
            this._on(t, {
                focusin: function(t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, i, s) {
            var a, n, o = this.options[t];
            if (s = s || {},
            i = e.Event(i),
            i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(),
            i.target = this.element[0],
            n = i.originalEvent)
                for (a in n)
                    a in i || (i[a] = n[a]);
            return this.element.trigger(i, s),
            !(e.isFunction(o) && o.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    },
    e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, i) {
        e.Widget.prototype["_" + t] = function(s, a, n) {
            "string" == typeof a && (a = {
                effect: a
            });
            var o, r = a ? a === !0 || "number" == typeof a ? i : a.effect || i : t;
            a = a || {},
            "number" == typeof a && (a = {
                duration: a
            }),
            o = !e.isEmptyObject(a),
            a.complete = n,
            a.delay && s.delay(a.delay),
            o && e.effects && e.effects.effect[r] ? s[t](a) : r !== t && s[r] ? s[r](a.duration, a.easing, n) : s.queue(function(i) {
                e(this)[t](),
                n && n.call(s[0]),
                i()
            })
        }
    }),
    e.widget;
    var n = !1;
    e(document).mouseup(function() {
        n = !1
    }),
    e.widget("ui.mouse", {
        version: "1.11.0",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function(e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function(i) {
                return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"),
                i.stopImmediatePropagation(),
                !1) : void 0
            }),
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName),
            this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(t) {
            if (!n) {
                this._mouseStarted && this._mouseUp(t),
                this._mouseDownEvent = t;
                var i = this
                  , s = 1 === t.which
                  , a = "string" == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
                return s && !a && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay,
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    i.mouseDelayMet = !0
                }, this.options.delay)),
                this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1,
                !this._mouseStarted) ? (t.preventDefault(),
                !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"),
                this._mouseMoveDelegate = function(e) {
                    return i._mouseMove(e)
                }
                ,
                this._mouseUpDelegate = function(e) {
                    return i._mouseUp(e)
                }
                ,
                this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                t.preventDefault(),
                n = !0,
                !0)) : !0
            }
        },
        _mouseMove: function(t) {
            return e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : t.which ? this._mouseStarted ? (this._mouseDrag(t),
            t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1,
            this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
            !this._mouseStarted) : this._mouseUp(t)
        },
        _mouseUp: function(t) {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted && (this._mouseStarted = !1,
            t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(t)),
            n = !1,
            !1
        },
        _mouseDistanceMet: function(e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    }),
    function() {
        function t(e, t, i) {
            return [parseFloat(e[0]) * (p.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (p.test(e[1]) ? i / 100 : 1)]
        }
        function i(t, i) {
            return parseInt(e.css(t, i), 10) || 0
        }
        function s(t) {
            var i = t[0];
            return 9 === i.nodeType ? {
                width: t.width(),
                height: t.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : e.isWindow(i) ? {
                width: t.width(),
                height: t.height(),
                offset: {
                    top: t.scrollTop(),
                    left: t.scrollLeft()
                }
            } : i.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: i.pageY,
                    left: i.pageX
                }
            } : {
                width: t.outerWidth(),
                height: t.outerHeight(),
                offset: t.offset()
            }
        }
        e.ui = e.ui || {};
        var a, n, o = Math.max, r = Math.abs, h = Math.round, l = /left|center|right/, u = /top|center|bottom/, d = /[\+\-]\d+(\.[\d]+)?%?/, c = /^\w+/, p = /%$/, f = e.fn.position;
        e.position = {
            scrollbarWidth: function() {
                if (void 0 !== a)
                    return a;
                var t, i, s = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), n = s.children()[0];
                return e("body").append(s),
                t = n.offsetWidth,
                s.css("overflow", "scroll"),
                i = n.offsetWidth,
                t === i && (i = s[0].clientWidth),
                s.remove(),
                a = t - i
            },
            getScrollInfo: function(t) {
                var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x")
                  , s = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y")
                  , a = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth
                  , n = "scroll" === s || "auto" === s && t.height < t.element[0].scrollHeight;
                return {
                    width: n ? e.position.scrollbarWidth() : 0,
                    height: a ? e.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function(t) {
                var i = e(t || window)
                  , s = e.isWindow(i[0])
                  , a = !!i[0] && 9 === i[0].nodeType;
                return {
                    element: i,
                    isWindow: s,
                    isDocument: a,
                    offset: i.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: i.scrollLeft(),
                    scrollTop: i.scrollTop(),
                    width: s ? i.width() : i.outerWidth(),
                    height: s ? i.height() : i.outerHeight()
                }
            }
        },
        e.fn.position = function(a) {
            if (!a || !a.of)
                return f.apply(this, arguments);
            a = e.extend({}, a);
            var p, m, g, v, y, b, _ = e(a.of), x = e.position.getWithinInfo(a.within), w = e.position.getScrollInfo(x), k = (a.collision || "flip").split(" "), T = {};
            return b = s(_),
            _[0].preventDefault && (a.at = "left top"),
            m = b.width,
            g = b.height,
            v = b.offset,
            y = e.extend({}, v),
            e.each(["my", "at"], function() {
                var e, t, i = (a[this] || "").split(" ");
                1 === i.length && (i = l.test(i[0]) ? i.concat(["center"]) : u.test(i[0]) ? ["center"].concat(i) : ["center", "center"]),
                i[0] = l.test(i[0]) ? i[0] : "center",
                i[1] = u.test(i[1]) ? i[1] : "center",
                e = d.exec(i[0]),
                t = d.exec(i[1]),
                T[this] = [e ? e[0] : 0, t ? t[0] : 0],
                a[this] = [c.exec(i[0])[0], c.exec(i[1])[0]]
            }),
            1 === k.length && (k[1] = k[0]),
            "right" === a.at[0] ? y.left += m : "center" === a.at[0] && (y.left += m / 2),
            "bottom" === a.at[1] ? y.top += g : "center" === a.at[1] && (y.top += g / 2),
            p = t(T.at, m, g),
            y.left += p[0],
            y.top += p[1],
            this.each(function() {
                var s, l, u = e(this), d = u.outerWidth(), c = u.outerHeight(), f = i(this, "marginLeft"), b = i(this, "marginTop"), D = d + f + i(this, "marginRight") + w.width, S = c + b + i(this, "marginBottom") + w.height, N = e.extend({}, y), M = t(T.my, u.outerWidth(), u.outerHeight());
                "right" === a.my[0] ? N.left -= d : "center" === a.my[0] && (N.left -= d / 2),
                "bottom" === a.my[1] ? N.top -= c : "center" === a.my[1] && (N.top -= c / 2),
                N.left += M[0],
                N.top += M[1],
                n || (N.left = h(N.left),
                N.top = h(N.top)),
                s = {
                    marginLeft: f,
                    marginTop: b
                },
                e.each(["left", "top"], function(t, i) {
                    e.ui.position[k[t]] && e.ui.position[k[t]][i](N, {
                        targetWidth: m,
                        targetHeight: g,
                        elemWidth: d,
                        elemHeight: c,
                        collisionPosition: s,
                        collisionWidth: D,
                        collisionHeight: S,
                        offset: [p[0] + M[0], p[1] + M[1]],
                        my: a.my,
                        at: a.at,
                        within: x,
                        elem: u
                    })
                }),
                a.using && (l = function(e) {
                    var t = v.left - N.left
                      , i = t + m - d
                      , s = v.top - N.top
                      , n = s + g - c
                      , h = {
                        target: {
                            element: _,
                            left: v.left,
                            top: v.top,
                            width: m,
                            height: g
                        },
                        element: {
                            element: u,
                            left: N.left,
                            top: N.top,
                            width: d,
                            height: c
                        },
                        horizontal: 0 > i ? "left" : t > 0 ? "right" : "center",
                        vertical: 0 > n ? "top" : s > 0 ? "bottom" : "middle"
                    };
                    d > m && m > r(t + i) && (h.horizontal = "center"),
                    c > g && g > r(s + n) && (h.vertical = "middle"),
                    h.important = o(r(t), r(i)) > o(r(s), r(n)) ? "horizontal" : "vertical",
                    a.using.call(this, e, h)
                }
                ),
                u.offset(e.extend(N, {
                    using: l
                }))
            })
        }
        ,
        e.ui.position = {
            fit: {
                left: function(e, t) {
                    var i, s = t.within, a = s.isWindow ? s.scrollLeft : s.offset.left, n = s.width, r = e.left - t.collisionPosition.marginLeft, h = a - r, l = r + t.collisionWidth - n - a;
                    t.collisionWidth > n ? h > 0 && 0 >= l ? (i = e.left + h + t.collisionWidth - n - a,
                    e.left += h - i) : e.left = l > 0 && 0 >= h ? a : h > l ? a + n - t.collisionWidth : a : h > 0 ? e.left += h : l > 0 ? e.left -= l : e.left = o(e.left - r, e.left)
                },
                top: function(e, t) {
                    var i, s = t.within, a = s.isWindow ? s.scrollTop : s.offset.top, n = t.within.height, r = e.top - t.collisionPosition.marginTop, h = a - r, l = r + t.collisionHeight - n - a;
                    t.collisionHeight > n ? h > 0 && 0 >= l ? (i = e.top + h + t.collisionHeight - n - a,
                    e.top += h - i) : e.top = l > 0 && 0 >= h ? a : h > l ? a + n - t.collisionHeight : a : h > 0 ? e.top += h : l > 0 ? e.top -= l : e.top = o(e.top - r, e.top)
                }
            },
            flip: {
                left: function(e, t) {
                    var i, s, a = t.within, n = a.offset.left + a.scrollLeft, o = a.width, h = a.isWindow ? a.scrollLeft : a.offset.left, l = e.left - t.collisionPosition.marginLeft, u = l - h, d = l + t.collisionWidth - o - h, c = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0, p = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0, f = -2 * t.offset[0];
                    0 > u ? (i = e.left + c + p + f + t.collisionWidth - o - n,
                    (0 > i || r(u) > i) && (e.left += c + p + f)) : d > 0 && (s = e.left - t.collisionPosition.marginLeft + c + p + f - h,
                    (s > 0 || d > r(s)) && (e.left += c + p + f))
                },
                top: function(e, t) {
                    var i, s, a = t.within, n = a.offset.top + a.scrollTop, o = a.height, h = a.isWindow ? a.scrollTop : a.offset.top, l = e.top - t.collisionPosition.marginTop, u = l - h, d = l + t.collisionHeight - o - h, c = "top" === t.my[1], p = c ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0, f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0, m = -2 * t.offset[1];
                    0 > u ? (s = e.top + p + f + m + t.collisionHeight - o - n,
                    e.top + p + f + m > u && (0 > s || r(u) > s) && (e.top += p + f + m)) : d > 0 && (i = e.top - t.collisionPosition.marginTop + p + f + m - h,
                    e.top + p + f + m > d && (i > 0 || d > r(i)) && (e.top += p + f + m))
                }
            },
            flipfit: {
                left: function() {
                    e.ui.position.flip.left.apply(this, arguments),
                    e.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    e.ui.position.flip.top.apply(this, arguments),
                    e.ui.position.fit.top.apply(this, arguments)
                }
            }
        },
        function() {
            var t, i, s, a, o, r = document.getElementsByTagName("body")[0], h = document.createElement("div");
            t = document.createElement(r ? "div" : "body"),
            s = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            },
            r && e.extend(s, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (o in s)
                t.style[o] = s[o];
            t.appendChild(h),
            i = r || document.documentElement,
            i.insertBefore(t, i.firstChild),
            h.style.cssText = "position: absolute; left: 10.7432222px;",
            a = e(h).offset().left,
            n = a > 10 && 11 > a,
            t.innerHTML = "",
            i.removeChild(t)
        }()
    }(),
    e.ui.position,
    e.widget("ui.draggable", e.ui.mouse, {
        version: "1.11.0",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"),
            this.options.addClasses && this.element.addClass("ui-draggable"),
            this.options.disabled && this.element.addClass("ui-draggable-disabled"),
            this._setHandleClassName(),
            this._mouseInit()
        },
        _setOption: function(e, t) {
            this._super(e, t),
            "handle" === e && this._setHandleClassName()
        },
        _destroy: function() {
            return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0,
            void 0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),
            this._removeHandleClassName(),
            this._mouseDestroy(),
            void 0)
        },
        _mouseCapture: function(t) {
            var i = this.document[0]
              , s = this.options;
            try {
                i.activeElement && "body" !== i.activeElement.nodeName.toLowerCase() && e(i.activeElement).blur()
            } catch (a) {}
            return this.helper || s.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t),
            this.handle ? (e(s.iframeFix === !0 ? "iframe" : s.iframeFix).each(function() {
                e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(e(this).offset()).appendTo("body")
            }),
            !0) : !1)
        },
        _mouseStart: function(t) {
            var i = this.options;
            return this.helper = this._createHelper(t),
            this.helper.addClass("ui-draggable-dragging"),
            this._cacheHelperProportions(),
            e.ui.ddmanager && (e.ui.ddmanager.current = this),
            this._cacheMargins(),
            this.cssPosition = this.helper.css("position"),
            this.scrollParent = this.helper.scrollParent(),
            this.offsetParent = this.helper.offsetParent(),
            this.offsetParentCssPosition = this.offsetParent.css("position"),
            this.offset = this.positionAbs = this.element.offset(),
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            this.offset.scroll = !1,
            e.extend(this.offset, {
                click: {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }),
            this.originalPosition = this.position = this._generatePosition(t, !1),
            this.originalPageX = t.pageX,
            this.originalPageY = t.pageY,
            i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
            this._setContainment(),
            this._trigger("start", t) === !1 ? (this._clear(),
            !1) : (this._cacheHelperProportions(),
            e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t),
            this._mouseDrag(t, !0),
            e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t),
            !0)
        },
        _mouseDrag: function(t, i) {
            if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()),
            this.position = this._generatePosition(t, !0),
            this.positionAbs = this._convertPositionTo("absolute"),
            !i) {
                var s = this._uiHash();
                if (this._trigger("drag", t, s) === !1)
                    return this._mouseUp({}),
                    !1;
                this.position = s.position
            }
            return this.helper[0].style.left = this.position.left + "px",
            this.helper[0].style.top = this.position.top + "px",
            e.ui.ddmanager && e.ui.ddmanager.drag(this, t),
            !1
        },
        _mouseStop: function(t) {
            var i = this
              , s = !1;
            return e.ui.ddmanager && !this.options.dropBehaviour && (s = e.ui.ddmanager.drop(this, t)),
            this.dropped && (s = this.dropped,
            this.dropped = !1),
            "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                i._trigger("stop", t) !== !1 && i._clear()
            }) : this._trigger("stop", t) !== !1 && this._clear(),
            !1
        },
        _mouseUp: function(t) {
            return e("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }),
            e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t),
            this.element.focus(),
            e.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(),
            this
        },
        _getHandle: function(t) {
            return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _setHandleClassName: function() {
            this._removeHandleClassName(),
            e(this.options.handle || this.element).addClass("ui-draggable-handle")
        },
        _removeHandleClassName: function() {
            this.element.find(".ui-draggable-handle").addBack().removeClass("ui-draggable-handle")
        },
        _createHelper: function(t) {
            var i = this.options
              , s = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [t])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo),
            s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"),
            s
        },
        _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" ")),
            e.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }),
            "left"in t && (this.offset.click.left = t.left + this.margins.left),
            "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left),
            "top"in t && (this.offset.click.top = t.top + this.margins.top),
            "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _isRootNode: function(e) {
            return /(html|body)/i.test(e.tagName) || e === this.document[0]
        },
        _getParentOffset: function() {
            var t = this.offsetParent.offset()
              , i = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== i && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(),
            t.top += this.scrollParent.scrollTop()),
            this._isRootNode(this.offsetParent[0]) && (t = {
                top: 0,
                left: 0
            }),
            {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition)
                return {
                    top: 0,
                    left: 0
                };
            var e = this.element.position()
              , t = this._isRootNode(this.scrollParent[0]);
            return {
                top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + (t ? 0 : this.scrollParent.scrollTop()),
                left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + (t ? 0 : this.scrollParent.scrollLeft())
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var t, i, s, a = this.options, n = this.document[0];
            return this.relative_container = null,
            a.containment ? "window" === a.containment ? (this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || n.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top],
            void 0) : "document" === a.containment ? (this.containment = [0, 0, e(n).width() - this.helperProportions.width - this.margins.left, (e(n).height() || n.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top],
            void 0) : a.containment.constructor === Array ? (this.containment = a.containment,
            void 0) : ("parent" === a.containment && (a.containment = this.helper[0].parentNode),
            i = e(a.containment),
            s = i[0],
            s && (t = "hidden" !== i.css("overflow"),
            this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (t ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
            this.relative_container = i),
            void 0) : (this.containment = null,
            void 0)
        },
        _convertPositionTo: function(e, t) {
            t || (t = this.position);
            var i = "absolute" === e ? 1 : -1
              , s = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
                left: t.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i
            }
        },
        _generatePosition: function(e, t) {
            var i, s, a, n, o = this.options, r = this._isRootNode(this.scrollParent[0]), h = e.pageX, l = e.pageY;
            return r && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }),
            t && (this.containment && (this.relative_container ? (s = this.relative_container.offset(),
            i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment,
            e.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left),
            e.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top),
            e.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left),
            e.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)),
            o.grid && (a = o.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY,
            l = i ? a - this.offset.click.top >= i[1] || a - this.offset.click.top > i[3] ? a : a - this.offset.click.top >= i[1] ? a - o.grid[1] : a + o.grid[1] : a,
            n = o.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX,
            h = i ? n - this.offset.click.left >= i[0] || n - this.offset.click.left > i[2] ? n : n - this.offset.click.left >= i[0] ? n - o.grid[0] : n + o.grid[0] : n),
            "y" === o.axis && (h = this.originalPageX),
            "x" === o.axis && (l = this.originalPageY)),
            {
                top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top),
                left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"),
            this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
            this.helper = null,
            this.cancelHelperRemoval = !1,
            this.destroyOnClear && this.destroy()
        },
        _trigger: function(t, i, s) {
            return s = s || this._uiHash(),
            e.ui.plugin.call(this, t, [i, s, this], !0),
            "drag" === t && (this.positionAbs = this._convertPositionTo("absolute")),
            e.Widget.prototype._trigger.call(this, t, i, s)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }),
    e.ui.plugin.add("draggable", "connectToSortable", {
        start: function(t, i, s) {
            var a = s.options
              , n = e.extend({}, i, {
                item: s.element
            });
            s.sortables = [],
            e(a.connectToSortable).each(function() {
                var i = e(this).sortable("instance");
                i && !i.options.disabled && (s.sortables.push({
                    instance: i,
                    shouldRevert: i.options.revert
                }),
                i.refreshPositions(),
                i._trigger("activate", t, n))
            })
        },
        stop: function(t, i, s) {
            var a = e.extend({}, i, {
                item: s.element
            });
            e.each(s.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0,
                s.cancelHelperRemoval = !0,
                this.instance.cancelHelperRemoval = !1,
                this.shouldRevert && (this.instance.options.revert = this.shouldRevert),
                this.instance._mouseStop(t),
                this.instance.options.helper = this.instance.options._helper,
                "original" === s.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1,
                this.instance._trigger("deactivate", t, a))
            })
        },
        drag: function(t, i, s) {
            var a = this;
            e.each(s.sortables, function() {
                var n = !1
                  , o = this;
                this.instance.positionAbs = s.positionAbs,
                this.instance.helperProportions = s.helperProportions,
                this.instance.offset.click = s.offset.click,
                this.instance._intersectsWith(this.instance.containerCache) && (n = !0,
                e.each(s.sortables, function() {
                    return this.instance.positionAbs = s.positionAbs,
                    this.instance.helperProportions = s.helperProportions,
                    this.instance.offset.click = s.offset.click,
                    this !== o && this.instance._intersectsWith(this.instance.containerCache) && e.contains(o.instance.element[0], this.instance.element[0]) && (n = !1),
                    n
                })),
                n ? (this.instance.isOver || (this.instance.isOver = 1,
                this.instance.currentItem = e(a).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0),
                this.instance.options._helper = this.instance.options.helper,
                this.instance.options.helper = function() {
                    return i.helper[0]
                }
                ,
                t.target = this.instance.currentItem[0],
                this.instance._mouseCapture(t, !0),
                this.instance._mouseStart(t, !0, !0),
                this.instance.offset.click.top = s.offset.click.top,
                this.instance.offset.click.left = s.offset.click.left,
                this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left,
                this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top,
                s._trigger("toSortable", t),
                s.dropped = this.instance.element,
                s.currentItem = s.element,
                this.instance.fromOutside = s),
                this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0,
                this.instance.cancelHelperRemoval = !0,
                this.instance.options.revert = !1,
                this.instance._trigger("out", t, this.instance._uiHash(this.instance)),
                this.instance._mouseStop(t, !0),
                this.instance.options.helper = this.instance.options._helper,
                this.instance.currentItem.remove(),
                this.instance.placeholder && this.instance.placeholder.remove(),
                s._trigger("fromSortable", t),
                s.dropped = !1)
            })
        }
    }),
    e.ui.plugin.add("draggable", "cursor", {
        start: function(t, i, s) {
            var a = e("body")
              , n = s.options;
            a.css("cursor") && (n._cursor = a.css("cursor")),
            a.css("cursor", n.cursor)
        },
        stop: function(t, i, s) {
            var a = s.options;
            a._cursor && e("body").css("cursor", a._cursor)
        }
    }),
    e.ui.plugin.add("draggable", "opacity", {
        start: function(t, i, s) {
            var a = e(i.helper)
              , n = s.options;
            a.css("opacity") && (n._opacity = a.css("opacity")),
            a.css("opacity", n.opacity)
        },
        stop: function(t, i, s) {
            var a = s.options;
            a._opacity && e(i.helper).css("opacity", a._opacity)
        }
    }),
    e.ui.plugin.add("draggable", "scroll", {
        start: function(e, t, i) {
            i.scrollParent[0] !== i.document[0] && "HTML" !== i.scrollParent[0].tagName && (i.overflowOffset = i.scrollParent.offset())
        },
        drag: function(t, i, s) {
            var a = s.options
              , n = !1
              , o = s.document[0];
            s.scrollParent[0] !== o && "HTML" !== s.scrollParent[0].tagName ? (a.axis && "x" === a.axis || (s.overflowOffset.top + s.scrollParent[0].offsetHeight - t.pageY < a.scrollSensitivity ? s.scrollParent[0].scrollTop = n = s.scrollParent[0].scrollTop + a.scrollSpeed : t.pageY - s.overflowOffset.top < a.scrollSensitivity && (s.scrollParent[0].scrollTop = n = s.scrollParent[0].scrollTop - a.scrollSpeed)),
            a.axis && "y" === a.axis || (s.overflowOffset.left + s.scrollParent[0].offsetWidth - t.pageX < a.scrollSensitivity ? s.scrollParent[0].scrollLeft = n = s.scrollParent[0].scrollLeft + a.scrollSpeed : t.pageX - s.overflowOffset.left < a.scrollSensitivity && (s.scrollParent[0].scrollLeft = n = s.scrollParent[0].scrollLeft - a.scrollSpeed))) : (a.axis && "x" === a.axis || (t.pageY - e(o).scrollTop() < a.scrollSensitivity ? n = e(o).scrollTop(e(o).scrollTop() - a.scrollSpeed) : e(window).height() - (t.pageY - e(o).scrollTop()) < a.scrollSensitivity && (n = e(o).scrollTop(e(o).scrollTop() + a.scrollSpeed))),
            a.axis && "y" === a.axis || (t.pageX - e(o).scrollLeft() < a.scrollSensitivity ? n = e(o).scrollLeft(e(o).scrollLeft() - a.scrollSpeed) : e(window).width() - (t.pageX - e(o).scrollLeft()) < a.scrollSensitivity && (n = e(o).scrollLeft(e(o).scrollLeft() + a.scrollSpeed)))),
            n !== !1 && e.ui.ddmanager && !a.dropBehaviour && e.ui.ddmanager.prepareOffsets(s, t)
        }
    }),
    e.ui.plugin.add("draggable", "snap", {
        start: function(t, i, s) {
            var a = s.options;
            s.snapElements = [],
            e(a.snap.constructor !== String ? a.snap.items || ":data(ui-draggable)" : a.snap).each(function() {
                var t = e(this)
                  , i = t.offset();
                this !== s.element[0] && s.snapElements.push({
                    item: this,
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    top: i.top,
                    left: i.left
                })
            })
        },
        drag: function(t, i, s) {
            var a, n, o, r, h, l, u, d, c, p, f = s.options, m = f.snapTolerance, g = i.offset.left, v = g + s.helperProportions.width, y = i.offset.top, b = y + s.helperProportions.height;
            for (c = s.snapElements.length - 1; c >= 0; c--)
                h = s.snapElements[c].left,
                l = h + s.snapElements[c].width,
                u = s.snapElements[c].top,
                d = u + s.snapElements[c].height,
                h - m > v || g > l + m || u - m > b || y > d + m || !e.contains(s.snapElements[c].item.ownerDocument, s.snapElements[c].item) ? (s.snapElements[c].snapping && s.options.snap.release && s.options.snap.release.call(s.element, t, e.extend(s._uiHash(), {
                    snapItem: s.snapElements[c].item
                })),
                s.snapElements[c].snapping = !1) : ("inner" !== f.snapMode && (a = m >= Math.abs(u - b),
                n = m >= Math.abs(d - y),
                o = m >= Math.abs(h - v),
                r = m >= Math.abs(l - g),
                a && (i.position.top = s._convertPositionTo("relative", {
                    top: u - s.helperProportions.height,
                    left: 0
                }).top - s.margins.top),
                n && (i.position.top = s._convertPositionTo("relative", {
                    top: d,
                    left: 0
                }).top - s.margins.top),
                o && (i.position.left = s._convertPositionTo("relative", {
                    top: 0,
                    left: h - s.helperProportions.width
                }).left - s.margins.left),
                r && (i.position.left = s._convertPositionTo("relative", {
                    top: 0,
                    left: l
                }).left - s.margins.left)),
                p = a || n || o || r,
                "outer" !== f.snapMode && (a = m >= Math.abs(u - y),
                n = m >= Math.abs(d - b),
                o = m >= Math.abs(h - g),
                r = m >= Math.abs(l - v),
                a && (i.position.top = s._convertPositionTo("relative", {
                    top: u,
                    left: 0
                }).top - s.margins.top),
                n && (i.position.top = s._convertPositionTo("relative", {
                    top: d - s.helperProportions.height,
                    left: 0
                }).top - s.margins.top),
                o && (i.position.left = s._convertPositionTo("relative", {
                    top: 0,
                    left: h
                }).left - s.margins.left),
                r && (i.position.left = s._convertPositionTo("relative", {
                    top: 0,
                    left: l - s.helperProportions.width
                }).left - s.margins.left)),
                !s.snapElements[c].snapping && (a || n || o || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, t, e.extend(s._uiHash(), {
                    snapItem: s.snapElements[c].item
                })),
                s.snapElements[c].snapping = a || n || o || r || p)
        }
    }),
    e.ui.plugin.add("draggable", "stack", {
        start: function(t, i, s) {
            var a, n = s.options, o = e.makeArray(e(n.stack)).sort(function(t, i) {
                return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0)
            });
            o.length && (a = parseInt(e(o[0]).css("zIndex"), 10) || 0,
            e(o).each(function(t) {
                e(this).css("zIndex", a + t)
            }),
            this.css("zIndex", a + o.length))
        }
    }),
    e.ui.plugin.add("draggable", "zIndex", {
        start: function(t, i, s) {
            var a = e(i.helper)
              , n = s.options;
            a.css("zIndex") && (n._zIndex = a.css("zIndex")),
            a.css("zIndex", n.zIndex)
        },
        stop: function(t, i, s) {
            var a = s.options;
            a._zIndex && e(i.helper).css("zIndex", a._zIndex)
        }
    }),
    e.ui.draggable,
    e.widget("ui.resizable", e.ui.mouse, {
        version: "1.11.0",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function(e) {
            return parseInt(e, 10) || 0
        },
        _isNumber: function(e) {
            return !isNaN(parseInt(e, 10))
        },
        _hasScroll: function(t, i) {
            if ("hidden" === e(t).css("overflow"))
                return !1;
            var s = i && "left" === i ? "scrollLeft" : "scrollTop"
              , a = !1;
            return t[s] > 0 ? !0 : (t[s] = 1,
            a = t[s] > 0,
            t[s] = 0,
            a)
        },
        _create: function() {
            var t, i, s, a, n, o = this, r = this.options;
            if (this.element.addClass("ui-resizable"),
            e.extend(this, {
                _aspectRatio: !!r.aspectRatio,
                aspectRatio: r.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null
            }),
            this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })),
            this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")),
            this.elementIsWrapper = !0,
            this.element.css({
                marginLeft: this.originalElement.css("marginLeft"),
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom")
            }),
            this.originalElement.css({
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0
            }),
            this.originalResizeStyle = this.originalElement.css("resize"),
            this.originalElement.css("resize", "none"),
            this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })),
            this.originalElement.css({
                margin: this.originalElement.css("margin")
            }),
            this._proportionallyResize()),
            this.handles = r.handles || (e(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se"),
            this.handles.constructor === String)
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
                t = this.handles.split(","),
                this.handles = {},
                i = 0; t.length > i; i++)
                    s = e.trim(t[i]),
                    n = "ui-resizable-" + s,
                    a = e("<div class='ui-resizable-handle " + n + "'></div>"),
                    a.css({
                        zIndex: r.zIndex
                    }),
                    "se" === s && a.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),
                    this.handles[s] = ".ui-resizable-" + s,
                    this.element.append(a);
            this._renderAxis = function(t) {
                var i, s, a, n;
                t = t || this.element;
                for (i in this.handles)
                    this.handles[i].constructor === String && (this.handles[i] = this.element.children(this.handles[i]).first().show()),
                    this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (s = e(this.handles[i], this.element),
                    n = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(),
                    a = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""),
                    t.css(a, n),
                    this._proportionallyResize()),
                    e(this.handles[i]).length
            }
            ,
            this._renderAxis(this.element),
            this._handles = e(".ui-resizable-handle", this.element).disableSelection(),
            this._handles.mouseover(function() {
                o.resizing || (this.className && (a = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),
                o.axis = a && a[1] ? a[1] : "se")
            }),
            r.autoHide && (this._handles.hide(),
            e(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                r.disabled || (e(this).removeClass("ui-resizable-autohide"),
                o._handles.show())
            }).mouseleave(function() {
                r.disabled || o.resizing || (e(this).addClass("ui-resizable-autohide"),
                o._handles.hide())
            })),
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var t, i = function(t) {
                e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (i(this.element),
            t = this.element,
            this.originalElement.css({
                position: t.css("position"),
                width: t.outerWidth(),
                height: t.outerHeight(),
                top: t.css("top"),
                left: t.css("left")
            }).insertAfter(t),
            t.remove()),
            this.originalElement.css("resize", this.originalResizeStyle),
            i(this.originalElement),
            this
        },
        _mouseCapture: function(t) {
            var i, s, a = !1;
            for (i in this.handles)
                s = e(this.handles[i])[0],
                (s === t.target || e.contains(s, t.target)) && (a = !0);
            return !this.options.disabled && a
        },
        _mouseStart: function(t) {
            var i, s, a, n = this.options, o = this.element;
            return this.resizing = !0,
            this._renderProxy(),
            i = this._num(this.helper.css("left")),
            s = this._num(this.helper.css("top")),
            n.containment && (i += e(n.containment).scrollLeft() || 0,
            s += e(n.containment).scrollTop() || 0),
            this.offset = this.helper.offset(),
            this.position = {
                left: i,
                top: s
            },
            this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: o.width(),
                height: o.height()
            },
            this.originalSize = this._helper ? {
                width: o.outerWidth(),
                height: o.outerHeight()
            } : {
                width: o.width(),
                height: o.height()
            },
            this.originalPosition = {
                left: i,
                top: s
            },
            this.sizeDiff = {
                width: o.outerWidth() - o.width(),
                height: o.outerHeight() - o.height()
            },
            this.originalMousePosition = {
                left: t.pageX,
                top: t.pageY
            },
            this.aspectRatio = "number" == typeof n.aspectRatio ? n.aspectRatio : this.originalSize.width / this.originalSize.height || 1,
            a = e(".ui-resizable-" + this.axis).css("cursor"),
            e("body").css("cursor", "auto" === a ? this.axis + "-resize" : a),
            o.addClass("ui-resizable-resizing"),
            this._propagate("start", t),
            !0
        },
        _mouseDrag: function(t) {
            var i, s = this.helper, a = {}, n = this.originalMousePosition, o = this.axis, r = t.pageX - n.left || 0, h = t.pageY - n.top || 0, l = this._change[o];
            return this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            },
            this.prevSize = {
                width: this.size.width,
                height: this.size.height
            },
            l ? (i = l.apply(this, [t, r, h]),
            this._updateVirtualBoundaries(t.shiftKey),
            (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)),
            i = this._respectSize(i, t),
            this._updateCache(i),
            this._propagate("resize", t),
            this.position.top !== this.prevPosition.top && (a.top = this.position.top + "px"),
            this.position.left !== this.prevPosition.left && (a.left = this.position.left + "px"),
            this.size.width !== this.prevSize.width && (a.width = this.size.width + "px"),
            this.size.height !== this.prevSize.height && (a.height = this.size.height + "px"),
            s.css(a),
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(),
            e.isEmptyObject(a) || this._trigger("resize", t, this.ui()),
            !1) : !1
        },
        _mouseStop: function(t) {
            this.resizing = !1;
            var i, s, a, n, o, r, h, l = this.options, u = this;
            return this._helper && (i = this._proportionallyResizeElements,
            s = i.length && /textarea/i.test(i[0].nodeName),
            a = s && this._hasScroll(i[0], "left") ? 0 : u.sizeDiff.height,
            n = s ? 0 : u.sizeDiff.width,
            o = {
                width: u.helper.width() - n,
                height: u.helper.height() - a
            },
            r = parseInt(u.element.css("left"), 10) + (u.position.left - u.originalPosition.left) || null,
            h = parseInt(u.element.css("top"), 10) + (u.position.top - u.originalPosition.top) || null,
            l.animate || this.element.css(e.extend(o, {
                top: h,
                left: r
            })),
            u.helper.height(u.size.height),
            u.helper.width(u.size.width),
            this._helper && !l.animate && this._proportionallyResize()),
            e("body").css("cursor", "auto"),
            this.element.removeClass("ui-resizable-resizing"),
            this._propagate("stop", t),
            this._helper && this.helper.remove(),
            !1
        },
        _updateVirtualBoundaries: function(e) {
            var t, i, s, a, n, o = this.options;
            n = {
                minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
                maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : 1 / 0,
                minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
                maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : 1 / 0
            },
            (this._aspectRatio || e) && (t = n.minHeight * this.aspectRatio,
            s = n.minWidth / this.aspectRatio,
            i = n.maxHeight * this.aspectRatio,
            a = n.maxWidth / this.aspectRatio,
            t > n.minWidth && (n.minWidth = t),
            s > n.minHeight && (n.minHeight = s),
            n.maxWidth > i && (n.maxWidth = i),
            n.maxHeight > a && (n.maxHeight = a)),
            this._vBoundaries = n
        },
        _updateCache: function(e) {
            this.offset = this.helper.offset(),
            this._isNumber(e.left) && (this.position.left = e.left),
            this._isNumber(e.top) && (this.position.top = e.top),
            this._isNumber(e.height) && (this.size.height = e.height),
            this._isNumber(e.width) && (this.size.width = e.width)
        },
        _updateRatio: function(e) {
            var t = this.position
              , i = this.size
              , s = this.axis;
            return this._isNumber(e.height) ? e.width = e.height * this.aspectRatio : this._isNumber(e.width) && (e.height = e.width / this.aspectRatio),
            "sw" === s && (e.left = t.left + (i.width - e.width),
            e.top = null),
            "nw" === s && (e.top = t.top + (i.height - e.height),
            e.left = t.left + (i.width - e.width)),
            e
        },
        _respectSize: function(e) {
            var t = this._vBoundaries
              , i = this.axis
              , s = this._isNumber(e.width) && t.maxWidth && t.maxWidth < e.width
              , a = this._isNumber(e.height) && t.maxHeight && t.maxHeight < e.height
              , n = this._isNumber(e.width) && t.minWidth && t.minWidth > e.width
              , o = this._isNumber(e.height) && t.minHeight && t.minHeight > e.height
              , r = this.originalPosition.left + this.originalSize.width
              , h = this.position.top + this.size.height
              , l = /sw|nw|w/.test(i)
              , u = /nw|ne|n/.test(i);
            return n && (e.width = t.minWidth),
            o && (e.height = t.minHeight),
            s && (e.width = t.maxWidth),
            a && (e.height = t.maxHeight),
            n && l && (e.left = r - t.minWidth),
            s && l && (e.left = r - t.maxWidth),
            o && u && (e.top = h - t.minHeight),
            a && u && (e.top = h - t.maxHeight),
            e.width || e.height || e.left || !e.top ? e.width || e.height || e.top || !e.left || (e.left = null) : e.top = null,
            e
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length) {
                var e, t, i, s, a, n = this.helper || this.element;
                for (e = 0; this._proportionallyResizeElements.length > e; e++) {
                    if (a = this._proportionallyResizeElements[e],
                    !this.borderDif)
                        for (this.borderDif = [],
                        i = [a.css("borderTopWidth"), a.css("borderRightWidth"), a.css("borderBottomWidth"), a.css("borderLeftWidth")],
                        s = [a.css("paddingTop"), a.css("paddingRight"), a.css("paddingBottom"), a.css("paddingLeft")],
                        t = 0; i.length > t; t++)
                            this.borderDif[t] = (parseInt(i[t], 10) || 0) + (parseInt(s[t], 10) || 0);
                    a.css({
                        height: n.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: n.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
            }
        },
        _renderProxy: function() {
            var t = this.element
              , i = this.options;
            this.elementOffset = t.offset(),
            this._helper ? (this.helper = this.helper || e("<div style='overflow:hidden;'></div>"),
            this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex
            }),
            this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(e, t) {
                return {
                    width: this.originalSize.width + t
                }
            },
            w: function(e, t) {
                var i = this.originalSize
                  , s = this.originalPosition;
                return {
                    left: s.left + t,
                    width: i.width - t
                }
            },
            n: function(e, t, i) {
                var s = this.originalSize
                  , a = this.originalPosition;
                return {
                    top: a.top + i,
                    height: s.height - i
                }
            },
            s: function(e, t, i) {
                return {
                    height: this.originalSize.height + i
                }
            },
            se: function(t, i, s) {
                return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, s]))
            },
            sw: function(t, i, s) {
                return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, s]))
            },
            ne: function(t, i, s) {
                return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, s]))
            },
            nw: function(t, i, s) {
                return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, s]))
            }
        },
        _propagate: function(t, i) {
            e.ui.plugin.call(this, t, [i, this.ui()]),
            "resize" !== t && this._trigger(t, i, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition,
                prevSize: this.prevSize,
                prevPosition: this.prevPosition
            }
        }
    }),
    e.ui.plugin.add("resizable", "animate", {
        stop: function(t) {
            var i = e(this).resizable("instance")
              , s = i.options
              , a = i._proportionallyResizeElements
              , n = a.length && /textarea/i.test(a[0].nodeName)
              , o = n && i._hasScroll(a[0], "left") ? 0 : i.sizeDiff.height
              , r = n ? 0 : i.sizeDiff.width
              , h = {
                width: i.size.width - r,
                height: i.size.height - o
            }
              , l = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null
              , u = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(e.extend(h, u && l ? {
                top: u,
                left: l
            } : {}), {
                duration: s.animateDuration,
                easing: s.animateEasing,
                step: function() {
                    var s = {
                        width: parseInt(i.element.css("width"), 10),
                        height: parseInt(i.element.css("height"), 10),
                        top: parseInt(i.element.css("top"), 10),
                        left: parseInt(i.element.css("left"), 10)
                    };
                    a && a.length && e(a[0]).css({
                        width: s.width,
                        height: s.height
                    }),
                    i._updateCache(s),
                    i._propagate("resize", t)
                }
            })
        }
    }),
    e.ui.plugin.add("resizable", "containment", {
        start: function() {
            var t, i, s, a, n, o, r, h = e(this).resizable("instance"), l = h.options, u = h.element, d = l.containment, c = d instanceof e ? d.get(0) : /parent/.test(d) ? u.parent().get(0) : d;
            c && (h.containerElement = e(c),
            /document/.test(d) || d === document ? (h.containerOffset = {
                left: 0,
                top: 0
            },
            h.containerPosition = {
                left: 0,
                top: 0
            },
            h.parentData = {
                element: e(document),
                left: 0,
                top: 0,
                width: e(document).width(),
                height: e(document).height() || document.body.parentNode.scrollHeight
            }) : (t = e(c),
            i = [],
            e(["Top", "Right", "Left", "Bottom"]).each(function(e, s) {
                i[e] = h._num(t.css("padding" + s))
            }),
            h.containerOffset = t.offset(),
            h.containerPosition = t.position(),
            h.containerSize = {
                height: t.innerHeight() - i[3],
                width: t.innerWidth() - i[1]
            },
            s = h.containerOffset,
            a = h.containerSize.height,
            n = h.containerSize.width,
            o = h._hasScroll(c, "left") ? c.scrollWidth : n,
            r = h._hasScroll(c) ? c.scrollHeight : a,
            h.parentData = {
                element: c,
                left: s.left,
                top: s.top,
                width: o,
                height: r
            }))
        },
        resize: function(t, i) {
            var s, a, n, o, r = e(this).resizable("instance"), h = r.options, l = r.containerOffset, u = r.position, d = r._aspectRatio || t.shiftKey, c = {
                top: 0,
                left: 0
            }, p = r.containerElement, f = !0;
            p[0] !== document && /static/.test(p.css("position")) && (c = l),
            u.left < (r._helper ? l.left : 0) && (r.size.width = r.size.width + (r._helper ? r.position.left - l.left : r.position.left - c.left),
            d && (r.size.height = r.size.width / r.aspectRatio,
            f = !1),
            r.position.left = h.helper ? l.left : 0),
            u.top < (r._helper ? l.top : 0) && (r.size.height = r.size.height + (r._helper ? r.position.top - l.top : r.position.top),
            d && (r.size.width = r.size.height * r.aspectRatio,
            f = !1),
            r.position.top = r._helper ? l.top : 0),
            r.offset.left = r.parentData.left + r.position.left,
            r.offset.top = r.parentData.top + r.position.top,
            s = Math.abs((r._helper ? r.offset.left - c.left : r.offset.left - l.left) + r.sizeDiff.width),
            a = Math.abs((r._helper ? r.offset.top - c.top : r.offset.top - l.top) + r.sizeDiff.height),
            n = r.containerElement.get(0) === r.element.parent().get(0),
            o = /relative|absolute/.test(r.containerElement.css("position")),
            n && o && (s -= Math.abs(r.parentData.left)),
            s + r.size.width >= r.parentData.width && (r.size.width = r.parentData.width - s,
            d && (r.size.height = r.size.width / r.aspectRatio,
            f = !1)),
            a + r.size.height >= r.parentData.height && (r.size.height = r.parentData.height - a,
            d && (r.size.width = r.size.height * r.aspectRatio,
            f = !1)),
            f || (r.position.left = i.prevPosition.left,
            r.position.top = i.prevPosition.top,
            r.size.width = i.prevSize.width,
            r.size.height = i.prevSize.height)
        },
        stop: function() {
            var t = e(this).resizable("instance")
              , i = t.options
              , s = t.containerOffset
              , a = t.containerPosition
              , n = t.containerElement
              , o = e(t.helper)
              , r = o.offset()
              , h = o.outerWidth() - t.sizeDiff.width
              , l = o.outerHeight() - t.sizeDiff.height;
            t._helper && !i.animate && /relative/.test(n.css("position")) && e(this).css({
                left: r.left - a.left - s.left,
                width: h,
                height: l
            }),
            t._helper && !i.animate && /static/.test(n.css("position")) && e(this).css({
                left: r.left - a.left - s.left,
                width: h,
                height: l
            })
        }
    }),
    e.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var t = e(this).resizable("instance")
              , i = t.options
              , s = function(t) {
                e(t).each(function() {
                    var t = e(this);
                    t.data("ui-resizable-alsoresize", {
                        width: parseInt(t.width(), 10),
                        height: parseInt(t.height(), 10),
                        left: parseInt(t.css("left"), 10),
                        top: parseInt(t.css("top"), 10)
                    })
                })
            };
            "object" != typeof i.alsoResize || i.alsoResize.parentNode ? s(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0],
            s(i.alsoResize)) : e.each(i.alsoResize, function(e) {
                s(e)
            })
        },
        resize: function(t, i) {
            var s = e(this).resizable("instance")
              , a = s.options
              , n = s.originalSize
              , o = s.originalPosition
              , r = {
                height: s.size.height - n.height || 0,
                width: s.size.width - n.width || 0,
                top: s.position.top - o.top || 0,
                left: s.position.left - o.left || 0
            }
              , h = function(t, s) {
                e(t).each(function() {
                    var t = e(this)
                      , a = e(this).data("ui-resizable-alsoresize")
                      , n = {}
                      , o = s && s.length ? s : t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    e.each(o, function(e, t) {
                        var i = (a[t] || 0) + (r[t] || 0);
                        i && i >= 0 && (n[t] = i || null)
                    }),
                    t.css(n)
                })
            };
            "object" != typeof a.alsoResize || a.alsoResize.nodeType ? h(a.alsoResize) : e.each(a.alsoResize, function(e, t) {
                h(e, t)
            })
        },
        stop: function() {
            e(this).removeData("resizable-alsoresize")
        }
    }),
    e.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var t = e(this).resizable("instance")
              , i = t.options
              , s = t.size;
            t.ghost = t.originalElement.clone(),
            t.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: s.height,
                width: s.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""),
            t.ghost.appendTo(t.helper)
        },
        resize: function() {
            var t = e(this).resizable("instance");
            t.ghost && t.ghost.css({
                position: "relative",
                height: t.size.height,
                width: t.size.width
            })
        },
        stop: function() {
            var t = e(this).resizable("instance");
            t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
        }
    }),
    e.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var t = e(this).resizable("instance")
              , i = t.options
              , s = t.size
              , a = t.originalSize
              , n = t.originalPosition
              , o = t.axis
              , r = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid
              , h = r[0] || 1
              , l = r[1] || 1
              , u = Math.round((s.width - a.width) / h) * h
              , d = Math.round((s.height - a.height) / l) * l
              , c = a.width + u
              , p = a.height + d
              , f = i.maxWidth && c > i.maxWidth
              , m = i.maxHeight && p > i.maxHeight
              , g = i.minWidth && i.minWidth > c
              , v = i.minHeight && i.minHeight > p;
            i.grid = r,
            g && (c += h),
            v && (p += l),
            f && (c -= h),
            m && (p -= l),
            /^(se|s|e)$/.test(o) ? (t.size.width = c,
            t.size.height = p) : /^(ne)$/.test(o) ? (t.size.width = c,
            t.size.height = p,
            t.position.top = n.top - d) : /^(sw)$/.test(o) ? (t.size.width = c,
            t.size.height = p,
            t.position.left = n.left - u) : (p - l > 0 ? (t.size.height = p,
            t.position.top = n.top - d) : (t.size.height = l,
            t.position.top = n.top + a.height - l),
            c - h > 0 ? (t.size.width = c,
            t.position.left = n.left - u) : (t.size.width = h,
            t.position.left = n.left + a.width - h))
        }
    }),
    e.ui.resizable;
    var o, r = "ui-button ui-widget ui-state-default ui-corner-all", h = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", l = function() {
        var t = e(this);
        setTimeout(function() {
            t.find(":ui-button").button("refresh")
        }, 1)
    }, u = function(t) {
        var i = t.name
          , s = t.form
          , a = e([]);
        return i && (i = i.replace(/'/g, "\\'"),
        a = s ? e(s).find("[name='" + i + "'][type=radio]") : e("[name='" + i + "'][type=radio]", t.ownerDocument).filter(function() {
            return !this.form
        })),
        a
    };
    e.widget("ui.button", {
        version: "1.11.0",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, l),
            "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled),
            this._determineButtonType(),
            this.hasTitle = !!this.buttonElement.attr("title");
            var t = this
              , i = this.options
              , s = "checkbox" === this.type || "radio" === this.type
              , a = s ? "" : "ui-state-active";
            null === i.label && (i.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()),
            this._hoverable(this.buttonElement),
            this.buttonElement.addClass(r).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                i.disabled || this === o && e(this).addClass("ui-state-active")
            }).bind("mouseleave" + this.eventNamespace, function() {
                i.disabled || e(this).removeClass(a)
            }).bind("click" + this.eventNamespace, function(e) {
                i.disabled && (e.preventDefault(),
                e.stopImmediatePropagation())
            }),
            this._on({
                focus: function() {
                    this.buttonElement.addClass("ui-state-focus")
                },
                blur: function() {
                    this.buttonElement.removeClass("ui-state-focus")
                }
            }),
            s && this.element.bind("change" + this.eventNamespace, function() {
                t.refresh()
            }),
            "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                return i.disabled ? !1 : void 0
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (i.disabled)
                    return !1;
                e(this).addClass("ui-state-active"),
                t.buttonElement.attr("aria-pressed", "true");
                var s = t.element[0];
                u(s).not(s).map(function() {
                    return e(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                return i.disabled ? !1 : (e(this).addClass("ui-state-active"),
                o = this,
                t.document.one("mouseup", function() {
                    o = null
                }),
                void 0)
            }).bind("mouseup" + this.eventNamespace, function() {
                return i.disabled ? !1 : (e(this).removeClass("ui-state-active"),
                void 0)
            }).bind("keydown" + this.eventNamespace, function(t) {
                return i.disabled ? !1 : ((t.keyCode === e.ui.keyCode.SPACE || t.keyCode === e.ui.keyCode.ENTER) && e(this).addClass("ui-state-active"),
                void 0)
            }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                e(this).removeClass("ui-state-active")
            }),
            this.buttonElement.is("a") && this.buttonElement.keyup(function(t) {
                t.keyCode === e.ui.keyCode.SPACE && e(this).click()
            })),
            this._setOption("disabled", i.disabled),
            this._resetButton()
        },
        _determineButtonType: function() {
            var e, t, i;
            this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button",
            "checkbox" === this.type || "radio" === this.type ? (e = this.element.parents().last(),
            t = "label[for='" + this.element.attr("id") + "']",
            this.buttonElement = e.find(t),
            this.buttonElement.length || (e = e.length ? e.siblings() : this.element.siblings(),
            this.buttonElement = e.filter(t),
            this.buttonElement.length || (this.buttonElement = e.find(t))),
            this.element.addClass("ui-helper-hidden-accessible"),
            i = this.element.is(":checked"),
            i && this.buttonElement.addClass("ui-state-active"),
            this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
        },
        widget: function() {
            return this.buttonElement
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible"),
            this.buttonElement.removeClass(r + " ui-state-active " + h).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),
            this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function(e, t) {
            return this._super(e, t),
            "disabled" === e ? (this.widget().toggleClass("ui-state-disabled", !!t),
            this.element.prop("disabled", !!t),
            t && ("checkbox" === this.type || "radio" === this.type ? this.buttonElement.removeClass("ui-state-focus") : this.buttonElement.removeClass("ui-state-focus ui-state-active")),
            void 0) : (this._resetButton(),
            void 0)
        },
        refresh: function() {
            var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            t !== this.options.disabled && this._setOption("disabled", t),
            "radio" === this.type ? u(this.element[0]).each(function() {
                e(this).is(":checked") ? e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function() {
            if ("input" === this.type)
                return this.options.label && this.element.val(this.options.label),
                void 0;
            var t = this.buttonElement.removeClass(h)
              , i = e("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text()
              , s = this.options.icons
              , a = s.primary && s.secondary
              , n = [];
            s.primary || s.secondary ? (this.options.text && n.push("ui-button-text-icon" + (a ? "s" : s.primary ? "-primary" : "-secondary")),
            s.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + s.primary + "'></span>"),
            s.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + s.secondary + "'></span>"),
            this.options.text || (n.push(a ? "ui-button-icons-only" : "ui-button-icon-only"),
            this.hasTitle || t.attr("title", e.trim(i)))) : n.push("ui-button-text-only"),
            t.addClass(n.join(" "))
        }
    }),
    e.widget("ui.buttonset", {
        version: "1.11.0",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(e, t) {
            "disabled" === e && this.buttons.button("option", e, t),
            this._super(e, t)
        },
        refresh: function() {
            var t = "rtl" === this.element.css("direction")
              , i = this.element.find(this.options.items)
              , s = i.filter(":ui-button");
            i.not(":ui-button").button(),
            s.button("refresh"),
            this.buttons = i.map(function() {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset"),
            this.buttons.map(function() {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    }),
    e.ui.button,
    e.widget("ui.dialog", {
        version: "1.11.0",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            closeOnEscape: !0,
            closeText: "Close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(t) {
                    var i = e(this).css(t).offset().top;
                    0 > i && e(this).css("top", t.top - i)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        sizeRelatedOptions: {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        resizableRelatedOptions: {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            },
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            },
            this.originalTitle = this.element.attr("title"),
            this.options.title = this.options.title || this.originalTitle,
            this._createWrapper(),
            this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),
            this._createTitlebar(),
            this._createButtonPane(),
            this.options.draggable && e.fn.draggable && this._makeDraggable(),
            this.options.resizable && e.fn.resizable && this._makeResizable(),
            this._isOpen = !1,
            this._trackFocus()
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t.jquery || t.nodeType) ? e(t) : this.document.find(t || "body").eq(0)
        },
        _destroy: function() {
            var e, t = this.originalPosition;
            this._destroyOverlay(),
            this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),
            this.uiDialog.stop(!0, !0).remove(),
            this.originalTitle && this.element.attr("title", this.originalTitle),
            e = t.parent.children().eq(t.index),
            e.length && e[0] !== this.element[0] ? e.before(this.element) : t.parent.append(this.element)
        },
        widget: function() {
            return this.uiDialog
        },
        disable: e.noop,
        enable: e.noop,
        close: function(t) {
            var i, s = this;
            if (this._isOpen && this._trigger("beforeClose", t) !== !1) {
                if (this._isOpen = !1,
                this._focusedElement = null,
                this._destroyOverlay(),
                this._untrackInstance(),
                !this.opener.filter(":focusable").focus().length)
                    try {
                        i = this.document[0].activeElement,
                        i && "body" !== i.nodeName.toLowerCase() && e(i).blur()
                    } catch (a) {}
                this._hide(this.uiDialog, this.options.hide, function() {
                    s._trigger("close", t)
                })
            }
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function() {
            this._moveToTop()
        },
        _moveToTop: function(t, i) {
            var s = !1
              , a = this.uiDialog.siblings(".ui-front:visible").map(function() {
                return +e(this).css("z-index")
            }).get()
              , n = Math.max.apply(null, a);
            return n >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", n + 1),
            s = !0),
            s && !i && this._trigger("focus", t),
            s
        },
        open: function() {
            var t = this;
            return this._isOpen ? (this._moveToTop() && this._focusTabbable(),
            void 0) : (this._isOpen = !0,
            this.opener = e(this.document[0].activeElement),
            this._size(),
            this._position(),
            this._createOverlay(),
            this._moveToTop(null, !0),
            this._show(this.uiDialog, this.options.show, function() {
                t._focusTabbable(),
                t._trigger("focus")
            }),
            this._trigger("open"),
            void 0)
        },
        _focusTabbable: function() {
            var e = this._focusedElement;
            e || (e = this.element.find("[autofocus]")),
            e.length || (e = this.element.find(":tabbable")),
            e.length || (e = this.uiDialogButtonPane.find(":tabbable")),
            e.length || (e = this.uiDialogTitlebarClose.filter(":tabbable")),
            e.length || (e = this.uiDialog),
            e.eq(0).focus()
        },
        _keepFocus: function(t) {
            function i() {
                var t = this.document[0].activeElement
                  , i = this.uiDialog[0] === t || e.contains(this.uiDialog[0], t);
                i || this._focusTabbable()
            }
            t.preventDefault(),
            i.call(this),
            this._delay(i)
        },
        _createWrapper: function() {
            this.uiDialog = e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()),
            this._on(this.uiDialog, {
                keydown: function(t) {
                    if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === e.ui.keyCode.ESCAPE)
                        return t.preventDefault(),
                        this.close(t),
                        void 0;
                    if (t.keyCode === e.ui.keyCode.TAB && !t.isDefaultPrevented()) {
                        var i = this.uiDialog.find(":tabbable")
                          , s = i.filter(":first")
                          , a = i.filter(":last");
                        t.target !== a[0] && t.target !== this.uiDialog[0] || t.shiftKey ? t.target !== s[0] && t.target !== this.uiDialog[0] || !t.shiftKey || (this._delay(function() {
                            a.focus()
                        }),
                        t.preventDefault()) : (this._delay(function() {
                            s.focus()
                        }),
                        t.preventDefault())
                    }
                },
                mousedown: function(e) {
                    this._moveToTop(e) && this._focusTabbable()
                }
            }),
            this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            })
        },
        _createTitlebar: function() {
            var t;
            this.uiDialogTitlebar = e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),
            this._on(this.uiDialogTitlebar, {
                mousedown: function(t) {
                    e(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                }
            }),
            this.uiDialogTitlebarClose = e("<button type='button'></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: !1
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),
            this._on(this.uiDialogTitlebarClose, {
                click: function(e) {
                    e.preventDefault(),
                    this.close(e)
                }
            }),
            t = e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),
            this._title(t),
            this.uiDialog.attr({
                "aria-labelledby": t.attr("id")
            })
        },
        _title: function(e) {
            this.options.title || e.html("&#160;"),
            e.text(this.options.title)
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
            this.uiButtonSet = e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),
            this._createButtons()
        },
        _createButtons: function() {
            var t = this
              , i = this.options.buttons;
            return this.uiDialogButtonPane.remove(),
            this.uiButtonSet.empty(),
            e.isEmptyObject(i) || e.isArray(i) && !i.length ? (this.uiDialog.removeClass("ui-dialog-buttons"),
            void 0) : (e.each(i, function(i, s) {
                var a, n;
                s = e.isFunction(s) ? {
                    click: s,
                    text: i
                } : s,
                s = e.extend({
                    type: "button"
                }, s),
                a = s.click,
                s.click = function() {
                    a.apply(t.element[0], arguments)
                }
                ,
                n = {
                    icons: s.icons,
                    text: s.showText
                },
                delete s.icons,
                delete s.showText,
                e("<button></button>", s).button(n).appendTo(t.uiButtonSet)
            }),
            this.uiDialog.addClass("ui-dialog-buttons"),
            this.uiDialogButtonPane.appendTo(this.uiDialog),
            void 0)
        },
        _makeDraggable: function() {
            function t(e) {
                return {
                    position: e.position,
                    offset: e.offset
                }
            }
            var i = this
              , s = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(s, a) {
                    e(this).addClass("ui-dialog-dragging"),
                    i._blockFrames(),
                    i._trigger("dragStart", s, t(a))
                },
                drag: function(e, s) {
                    i._trigger("drag", e, t(s))
                },
                stop: function(a, n) {
                    var o = n.offset.left - i.document.scrollLeft()
                      , r = n.offset.top - i.document.scrollTop();
                    s.position = {
                        my: "left top",
                        at: "left" + (o >= 0 ? "+" : "") + o + " " + "top" + (r >= 0 ? "+" : "") + r,
                        of: i.window
                    },
                    e(this).removeClass("ui-dialog-dragging"),
                    i._unblockFrames(),
                    i._trigger("dragStop", a, t(n))
                }
            })
        },
        _makeResizable: function() {
            function t(e) {
                return {
                    originalPosition: e.originalPosition,
                    originalSize: e.originalSize,
                    position: e.position,
                    size: e.size
                }
            }
            var i = this
              , s = this.options
              , a = s.resizable
              , n = this.uiDialog.css("position")
              , o = "string" == typeof a ? a : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: s.maxWidth,
                maxHeight: s.maxHeight,
                minWidth: s.minWidth,
                minHeight: this._minHeight(),
                handles: o,
                start: function(s, a) {
                    e(this).addClass("ui-dialog-resizing"),
                    i._blockFrames(),
                    i._trigger("resizeStart", s, t(a))
                },
                resize: function(e, s) {
                    i._trigger("resize", e, t(s))
                },
                stop: function(a, n) {
                    var o = i.uiDialog.offset()
                      , r = o.left - i.document.scrollLeft()
                      , h = o.top - i.document.scrollTop();
                    s.height = i.uiDialog.height(),
                    s.width = i.uiDialog.width(),
                    s.position = {
                        my: "left top",
                        at: "left" + (r >= 0 ? "+" : "") + r + " " + "top" + (h >= 0 ? "+" : "") + h,
                        of: i.window
                    },
                    e(this).removeClass("ui-dialog-resizing"),
                    i._unblockFrames(),
                    i._trigger("resizeStop", a, t(n))
                }
            }).css("position", n)
        },
        _trackFocus: function() {
            this._on(this.widget(), {
                focusin: function(t) {
                    this._untrackInstance(),
                    this._trackingInstances().unshift(this),
                    this._focusedElement = e(t.target)
                }
            })
        },
        _untrackInstance: function() {
            var t = this._trackingInstances()
              , i = e.inArray(this, t);
            -1 !== i && t.splice(i, 1)
        },
        _trackingInstances: function() {
            var e = this.document.data("ui-dialog-instances");
            return e || (e = [],
            this.document.data("ui-dialog-instances", e)),
            e
        },
        _minHeight: function() {
            var e = this.options;
            return "auto" === e.height ? e.minHeight : Math.min(e.minHeight, e.height)
        },
        _position: function() {
            var e = this.uiDialog.is(":visible");
            e || this.uiDialog.show(),
            this.uiDialog.position(this.options.position),
            e || this.uiDialog.hide()
        },
        _setOptions: function(t) {
            var i = this
              , s = !1
              , a = {};
            e.each(t, function(e, t) {
                i._setOption(e, t),
                e in i.sizeRelatedOptions && (s = !0),
                e in i.resizableRelatedOptions && (a[e] = t)
            }),
            s && (this._size(),
            this._position()),
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", a)
        },
        _setOption: function(e, t) {
            var i, s, a = this.uiDialog;
            "dialogClass" === e && a.removeClass(this.options.dialogClass).addClass(t),
            "disabled" !== e && (this._super(e, t),
            "appendTo" === e && this.uiDialog.appendTo(this._appendTo()),
            "buttons" === e && this._createButtons(),
            "closeText" === e && this.uiDialogTitlebarClose.button({
                label: "" + t
            }),
            "draggable" === e && (i = a.is(":data(ui-draggable)"),
            i && !t && a.draggable("destroy"),
            !i && t && this._makeDraggable()),
            "position" === e && this._position(),
            "resizable" === e && (s = a.is(":data(ui-resizable)"),
            s && !t && a.resizable("destroy"),
            s && "string" == typeof t && a.resizable("option", "handles", t),
            s || t === !1 || this._makeResizable()),
            "title" === e && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function() {
            var e, t, i, s = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }),
            s.minWidth > s.width && (s.width = s.minWidth),
            e = this.uiDialog.css({
                height: "auto",
                width: s.width
            }).outerHeight(),
            t = Math.max(0, s.minHeight - e),
            i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - e) : "none",
            "auto" === s.height ? this.element.css({
                minHeight: t,
                maxHeight: i,
                height: "auto"
            }) : this.element.height(Math.max(0, s.height - e)),
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var t = e(this);
                return e("<div>").css({
                    position: "absolute",
                    width: t.outerWidth(),
                    height: t.outerHeight()
                }).appendTo(t.parent()).offset(t.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(),
            delete this.iframeBlocks)
        },
        _allowInteraction: function(t) {
            return e(t.target).closest(".ui-dialog").length ? !0 : !!e(t.target).closest(".ui-datepicker").length
        },
        _createOverlay: function() {
            if (this.options.modal) {
                var t = !0;
                this._delay(function() {
                    t = !1
                }),
                this.document.data("ui-dialog-overlays") || this._on(this.document, {
                    focusin: function(e) {
                        t || this._allowInteraction(e) || (e.preventDefault(),
                        this._trackingInstances()[0]._focusTabbable())
                    }
                }),
                this.overlay = e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),
                this._on(this.overlay, {
                    mousedown: "_keepFocus"
                }),
                this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
            }
        },
        _destroyOverlay: function() {
            if (this.options.modal && this.overlay) {
                var e = this.document.data("ui-dialog-overlays") - 1;
                e ? this.document.data("ui-dialog-overlays", e) : this.document.unbind("focusin").removeData("ui-dialog-overlays"),
                this.overlay.remove(),
                this.overlay = null
            }
        }
    })
});

/** ========== kotarapp\resources\jquery\jquery.ui.touch-punch.min.js ========== **/
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a) {
    function f(a, b) {
        if (!(a.originalEvent.touches.length > 1)) {
            a.preventDefault();
            var c = a.originalEvent.changedTouches[0]
              , d = document.createEvent("MouseEvents");
            d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null),
            a.target.dispatchEvent(d)
        }
    }
    if (a.support.touch = "ontouchend"in document,
    a.support.touch) {
        var e, b = a.ui.mouse.prototype, c = b._mouseInit, d = b._mouseDestroy;
        b._touchStart = function(a) {
            var b = this;
            !e && b._mouseCapture(a.originalEvent.changedTouches[0]) && (e = !0,
            b._touchMoved = !1,
            f(a, "mouseover"),
            f(a, "mousemove"),
            f(a, "mousedown"))
        }
        ,
        b._touchMove = function(a) {
            e && (this._touchMoved = !0,
            f(a, "mousemove"))
        }
        ,
        b._touchEnd = function(a) {
            e && (f(a, "mouseup"),
            f(a, "mouseout"),
            this._touchMoved || f(a, "click"),
            e = !1)
        }
        ,
        b._mouseInit = function() {
            var b = this;
            b.element.bind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }),
            c.call(b)
        }
        ,
        b._mouseDestroy = function() {
            var b = this;
            b.element.unbind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }),
            d.call(b)
        }
    }
}(jQuery);

/** ========== common\modalwincolorbox\jquery.colorbox-min.js ========== **/
/*
    Colorbox v1.5.9 - 2014-04-25
    jQuery lightbox and modal window plugin
    (c) 2014 Jack Moore - http://www.jacklmoore.com/colorbox
    license: http://www.opensource.org/licenses/mit-license.php
*/
(function(a1, ao, az) {
    function aL(a, b, c) {
        var d = ao.createElement(a);
        return b && (d.id = bf + b),
        c && (d.style.cssText = c),
        a1(d);
    }
    function aO() {
        return az.innerHeight ? az.innerHeight : a1(az).height();
    }
    function aV(a, b) {
        b !== Object(b) && (b = {}),
        this.cache = {},
        this.el = a,
        this.value = function(c) {
            var d;
            return void 0 === this.cache[c] && (d = a1(this.el).attr("data-cbox-" + c),
            void 0 !== d ? this.cache[c] = d : void 0 !== b[c] ? this.cache[c] = b[c] : void 0 !== bb[c] && (this.cache[c] = bb[c])),
            this.cache[c];
        }
        ,
        this.get = function(c) {
            var d = this.value(c);
            return a1.isFunction(d) ? d.call(this.el, this) : d;
        }
        ;
    }
    function aw(c) {
        var a = a9.length
          , b = (be + c) % a;
        return 0 > b ? a + b : b;
    }
    function ac(b, a) {
        return Math.round((/%/.test(b) ? ("x" === a ? ap.width() : aO()) / 100 : 1) * parseInt(b, 10));
    }
    function aY(b, a) {
        return b.get("photo") || b.get("photoRegex").test(a);
    }
    function aG(b, a) {
        return b.get("retinaUrl") && az.devicePixelRatio > 1 ? a.replace(b.get("photoRegex"), b.get("retinaSuffix")) : a;
    }
    function al(a) {
        "contains"in ba[0] && !ba[0].contains(a.target) && a.target !== a6[0] && (a.stopPropagation(),
        ba.focus());
    }
    function ai(a) {
        ai.str !== a && (ba.add(a6).removeClass(ai.str).addClass(a),
        ai.str = a);
    }
    function au(a) {
        be = 0,
        a && a !== !1 ? (a9 = a1("." + a3).filter(function() {
            var b = a1.data(this, bd)
              , c = new aV(this,b);
            return c.get("rel") === a;
        }),
        be = a9.index(ab.el),
        -1 === be && (a9 = a9.add(ab.el),
        be = a9.length - 1)) : a9 = a1(ab.el);
    }
    function a4(a) {
        a1(ao).trigger(a),
        af.triggerHandler(a);
    }
    function ar(c) {
        var e;
        if (!av) {
            if (e = a1(c).data("colorbox"),
            ab = new aV(c,e),
            au(ab.get("rel")),
            !aa) {
                aa = aT = !0,
                ai(ab.get("className")),
                ba.css({
                    visibility: "hidden",
                    display: "block",
                    opacity: ""
                }),
                aH = aL(a0, "LoadedContent", "width:0; height:0; overflow:hidden; visibility:hidden"),
                ag.css({
                    width: "",
                    height: ""
                }).append(aH),
                am = a2.height() + aE.height() + ag.outerHeight(!0) - ag.height(),
                aC = aj.width() + ax.width() + ag.outerWidth(!0) - ag.width(),
                ad = aH.outerHeight(!0),
                aM = aH.outerWidth(!0);
                var b = ac(ab.get("initialWidth"), "x")
                  , g = ac(ab.get("initialHeight"), "y")
                  , d = ab.get("maxWidth")
                  , a = ab.get("maxHeight");
                ab.w = (d !== !1 ? Math.min(b, ac(d, "x")) : b) - aM - aC,
                ab.h = (a !== !1 ? Math.min(g, ac(a, "y")) : g) - ad - am,
                aH.css({
                    width: "",
                    height: ab.h
                }),
                aD.position(),
                a4(aq),
                ab.get("onOpen"),
                aP.add(aA).hide(),
                ba.focus(),
                ab.get("trapFocus") && ao.addEventListener && (ao.addEventListener("focus", al, !0),
                af.one(aX, function() {
                    ao.removeEventListener("focus", al, !0);
                })),
                ab.get("returnFocus") && af.one(aX, function() {
                    a1(ab.el).focus();
                });
            }
            a6.css({
                opacity: parseFloat(ab.get("opacity")) || "",
                cursor: ab.get("overlayClose") ? "pointer" : "",
                visibility: "visible"
            }).show(),
            ab.get("closeButton") ? ah.html(ab.get("close")).appendTo(ag) : ah.appendTo("<div/>"),
            a8();
        }
    }
    function aR() {
        !ba && ao.body && (a7 = !1,
        ap = a1(az),
        ba = aL(a0).attr({
            id: bd,
            "class": a1.support.opacity === !1 ? bf + "IE" : "",
            role: "dialog",
            tabindex: "-1"
        }).hide(),
        a6 = aL(a0, "Overlay").hide(),
        aZ = a1([aL(a0, "LoadingOverlay")[0], aL(a0, "LoadingGraphic")[0]]),
        bc = aL(a0, "Wrapper"),
        ag = aL(a0, "Content").append(aA = aL(a0, "Title"), aW = aL(a0, "Current"), aS = a1('<button type="button"/>').attr({
            id: bf + "Previous"
        }), aF = a1('<button type="button"/>').attr({
            id: bf + "Next"
        }), at = aL("button", "Slideshow"), aZ),
        ah = a1('<button type="button"/>').attr({
            id: bf + "Close"
        }),
        bc.append(aL(a0).append(aL(a0, "TopLeft"), a2 = aL(a0, "TopCenter"), aL(a0, "TopRight")), aL(a0, !1, "clear:left").append(aj = aL(a0, "MiddleLeft"), ag, ax = aL(a0, "MiddleRight")), aL(a0, !1, "clear:left").append(aL(a0, "BottomLeft"), aE = aL(a0, "BottomCenter"), aL(a0, "BottomRight"))).find("div div").css({
            "float": "left"
        }),
        aK = aL(a0, !1, "position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),
        aP = aF.add(aS).add(aW).add(at),
        a1(ao.body).append(a6, ba.append(bc, aK)));
    }
    function aJ() {
        function a(b) {
            b.which > 1 || b.shiftKey || b.altKey || b.metaKey || b.ctrlKey || (b.preventDefault(),
            ar(this));
        }
        return ba ? (a7 || (a7 = !0,
        aF.click(function() {
            aD.next();
        }),
        aS.click(function() {
            aD.prev();
        }),
        ah.click(function() {
            aD.close();
        }),
        a6.click(function() {
            ab.get("overlayClose") && aD.close();
        }),
        a1(ao).bind("keydown." + bf, function(c) {
            var b = c.keyCode;
            aa && ab.get("escKey") && 27 === b && (c.preventDefault(),
            aD.close()),
            aa && ab.get("arrowKey") && a9[1] && !c.altKey && (37 === b ? (c.preventDefault(),
            aS.click()) : 39 === b && (c.preventDefault(),
            aF.click()));
        }),
        a1.isFunction(a1.fn.on) ? a1(ao).on("click." + bf, "." + a3, a) : a1("." + a3).live("click." + bf, a)),
        !0) : !1;
    }
    function a8() {
        var f, i, j, g = aD.prep, b = ++aI;
        if (aT = !0,
        a5 = !1,
        a4(ay),
        a4(aB),
        ab.get("onLoad"),
        ab.h = ab.get("height") ? ac(ab.get("height"), "y") - ad - am : ab.get("innerHeight") && ac(ab.get("innerHeight"), "y"),
        ab.w = ab.get("width") ? ac(ab.get("width"), "x") - aM - aC : ab.get("innerWidth") && ac(ab.get("innerWidth"), "x"),
        ab.mw = ab.w,
        ab.mh = ab.h,
        ab.get("maxWidth") && (ab.mw = ac(ab.get("maxWidth"), "x") - aM - aC,
        ab.mw = ab.w && ab.w < ab.mw ? ab.w : ab.mw),
        ab.get("maxHeight") && (ab.mh = ac(ab.get("maxHeight"), "y") - ad - am,
        ab.mh = ab.h && ab.h < ab.mh ? ab.h : ab.mh),
        f = ab.get("href"),
        aU = setTimeout(function() {
            aZ.show();
        }, 100),
        ab.get("inline")) {
            var a = a1(f);
            j = a1("<div>").hide().insertBefore(a),
            af.one(ay, function() {
                j.replaceWith(a);
            }),
            g(a);
        } else {
            ab.get("iframe") ? g(" ") : ab.get("html") ? g(ab.get("html")) : aY(ab, f) ? (f = aG(ab, f),
            a5 = new Image,
            a1(a5).addClass(bf + "Photo").bind("error", function() {
                g(aL(a0, "Error").html(ab.get("imgError")));
            }).one("load", function() {
                b === aI && setTimeout(function() {
                    var c;
                    a1.each(["alt", "longdesc", "aria-describedby"], function(d, h) {
                        var k = a1(ab.el).attr(h) || a1(ab.el).attr("data-" + h);
                        k && a5.setAttribute(h, k);
                    }),
                    ab.get("retinaImage") && az.devicePixelRatio > 1 && (a5.height = a5.height / az.devicePixelRatio,
                    a5.width = a5.width / az.devicePixelRatio),
                    ab.get("scalePhotos") && (i = function() {
                        a5.height -= a5.height * c,
                        a5.width -= a5.width * c;
                    }
                    ,
                    ab.mw && a5.width > ab.mw && (c = (a5.width - ab.mw) / a5.width,
                    i()),
                    ab.mh && a5.height > ab.mh && (c = (a5.height - ab.mh) / a5.height,
                    i())),
                    ab.h && (a5.style.marginTop = Math.max(ab.mh - a5.height, 0) / 2 + "px"),
                    a9[1] && (ab.get("loop") || a9[be + 1]) && (a5.style.cursor = "pointer",
                    a5.onclick = function() {
                        aD.next();
                    }
                    ),
                    a5.style.width = a5.width + "px",
                    a5.style.height = a5.height + "px",
                    g(a5);
                }, 1);
            }),
            a5.src = f) : f && aK.load(f, ab.get("data"), function(c, d) {
                b === aI && g("error" === d ? aL(a0, "Error").html(ab.get("xhrError")) : a1(this).contents());
            });
        }
    }
    var a6, ba, bc, ag, a2, aj, ax, aE, a9, ap, aH, aK, aZ, aA, aW, at, aF, aS, ah, aP, ab, am, aC, ad, aM, be, a5, aa, aT, av, aU, aD, a7, bb = {
        html: !1,
        photo: !1,
        iframe: !1,
        inline: !1,
        transition: "elastic",
        speed: 300,
        fadeOut: 300,
        width: !1,
        initialWidth: "600",
        innerWidth: !1,
        maxWidth: !1,
        height: !1,
        initialHeight: "450",
        innerHeight: !1,
        maxHeight: !1,
        scalePhotos: !0,
        scrolling: !0,
        opacity: 0.9,
        preloading: !0,
        className: !1,
        overlayClose: !0,
        escKey: !0,
        arrowKey: !0,
        top: !1,
        bottom: !1,
        left: !1,
        right: !1,
        fixed: !1,
        data: void 0,
        closeButton: !0,
        fastIframe: !0,
        open: !1,
        reposition: !0,
        loop: !0,
        slideshow: !1,
        slideshowAuto: !0,
        slideshowSpeed: 2500,
        slideshowStart: "start slideshow",
        slideshowStop: "stop slideshow",
        photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
        retinaImage: !1,
        retinaUrl: !1,
        retinaSuffix: "@2x.$1",
        current: "image {current} of {total}",
        previous: "previous",
        next: "next",
        close: "close",
        xhrError: "This content failed to load.",
        imgError: "This image failed to load.",
        returnFocus: !0,
        trapFocus: !0,
        onOpen: !1,
        onLoad: !1,
        onComplete: !1,
        onCleanup: !1,
        onClosed: !1,
        rel: function() {
            return this.rel;
        },
        href: function() {
            return a1(this).attr("href");
        },
        title: function() {
            return this.title;
        }
    }, bd = "colorbox", bf = "cbox", a3 = bf + "Element", aq = bf + "_open", aB = bf + "_load", aN = bf + "_complete", aQ = bf + "_cleanup", aX = bf + "_closed", ay = bf + "_purge", af = a1("<a/>"), a0 = "div", aI = 0, an = {}, ak = function() {
        function m() {
            clearTimeout(d);
        }
        function c() {
            (ab.get("loop") || a9[be + 1]) && (m(),
            d = setTimeout(aD.next, ab.get("slideshowSpeed")));
        }
        function f() {
            at.html(ab.get("slideshowStop")).unbind(l).one(l, g),
            af.bind(aN, c).bind(aB, m),
            ba.removeClass(b + "off").addClass(b + "on");
        }
        function g() {
            m(),
            af.unbind(aN, c).unbind(aB, m),
            at.html(ab.get("slideshowStart")).unbind(l).one(l, function() {
                aD.next(),
                f();
            }),
            ba.removeClass(b + "on").addClass(b + "off");
        }
        function j() {
            k = !1,
            at.hide(),
            m(),
            af.unbind(aN, c).unbind(aB, m),
            ba.removeClass(b + "off " + b + "on");
        }
        var k, d, b = bf + "Slideshow_", l = "click." + bf;
        return function() {
            k ? ab.get("slideshow") || (af.unbind(aQ, j),
            j()) : ab.get("slideshow") && a9[1] && (k = !0,
            af.one(aQ, j),
            ab.get("slideshowAuto") ? f() : g(),
            at.show());
        }
        ;
    }();
    a1.colorbox || (a1(aR),
    aD = a1.fn[bd] = a1[bd] = function(a, b) {
        var c, d = this;
        if (a = a || {},
        a1.isFunction(d)) {
            d = a1("<a/>"),
            a.open = !0;
        } else {
            if (!d[0]) {
                return d;
            }
        }
        return d[0] ? (aR(),
        aJ() && (b && (a.onComplete = b),
        d.each(function() {
            var e = a1.data(this, bd) || {};
            a1.data(this, bd, a1.extend(e, a));
        }).addClass(a3),
        c = new aV(d[0],a),
        c.get("open") && ar(d[0])),
        d) : d;
    }
    ,
    aD.position = function(f, m) {
        function p() {
            a2[0].style.width = aE[0].style.width = ag[0].style.width = parseInt(ba[0].style.width, 10) - aC + "px",
            ag[0].style.height = aj[0].style.height = ax[0].style.height = parseInt(ba[0].style.height, 10) - am + "px";
        }
        var q, k, t, o = 0, b = 0, a = ba.offset();
        if (ap.unbind("resize." + bf),
        ba.css({
            top: -90000,
            left: -90000
        }),
        k = ap.scrollTop(),
        t = ap.scrollLeft(),
        ab.get("fixed") ? (a.top -= k,
        a.left -= t,
        ba.css({
            position: "fixed"
        })) : (o = k,
        b = t,
        ba.css({
            position: "absolute"
        })),
        b += ab.get("right") !== !1 ? Math.max(ap.width() - ab.w - aM - aC - ac(ab.get("right"), "x"), 0) : ab.get("left") !== !1 ? ac(ab.get("left"), "x") : Math.round(Math.max(ap.width() - ab.w - aM - aC, 0) / 2),
        o += ab.get("bottom") !== !1 ? Math.max(aO() - ab.h - ad - am - ac(ab.get("bottom"), "y"), 0) : ab.get("top") !== !1 ? ac(ab.get("top"), "y") : Math.round(Math.max(aO() - ab.h - ad - am, 0) / 2),
        ba.css({
            top: a.top,
            left: a.left,
            visibility: "visible"
        }),
        bc[0].style.width = bc[0].style.height = "9999px",
        q = {
            width: ab.w + aM + aC,
            height: ab.h + ad + am,
            top: o,
            left: b
        },
        f) {
            var j = 0;
            a1.each(q, function(c) {
                return q[c] !== an[c] ? (j = f,
                void 0) : void 0;
            }),
            f = j;
        }
        an = q,
        f || ba.css(q),
        ba.dequeue().animate(q, {
            duration: f || 0,
            complete: function() {
                p(),
                aT = !1,
                bc[0].style.width = ab.w + aM + aC + "px",
                bc[0].style.height = ab.h + ad + am + "px",
                ab.get("reposition") && setTimeout(function() {
                    ap.bind("resize." + bf, aD.position);
                }, 1),
                m && m();
            },
            step: p
        });
    }
    ,
    aD.resize = function(b) {
        var a;
        aa && (b = b || {},
        b.width && (ab.w = ac(b.width, "x") - aM - aC),
        b.innerWidth && (ab.w = ac(b.innerWidth, "x")),
        aH.css({
            width: ab.w
        }),
        b.height && (ab.h = ac(b.height, "y") - ad - am),
        b.innerHeight && (ab.h = ac(b.innerHeight, "y")),
        b.innerHeight || b.height || (a = aH.scrollTop(),
        aH.css({
            height: "auto"
        }),
        ab.h = aH.height()),
        aH.css({
            height: ab.h
        }),
        a && aH.scrollTop(a),
        aD.position("none" === ab.get("transition") ? 0 : ab.get("speed")));
    }
    ,
    aD.prep = function(f) {
        function h() {
            return ab.w = ab.w || aH.width(),
            ab.w = ab.mw && ab.mw < ab.w ? ab.mw : ab.w,
            ab.w;
        }
        function b() {
            return ab.h = ab.h || aH.height(),
            ab.h = ab.mh && ab.mh < ab.h ? ab.mh : ab.h,
            ab.h;
        }
        if (aa) {
            var c, e = "none" === ab.get("transition") ? 0 : ab.get("speed");
            aH.remove(),
            aH = aL(a0, "LoadedContent").append(f),
            aH.hide().appendTo(aK.show()).css({
                width: h(),
                overflow: ab.get("scrolling") ? "auto" : "hidden"
            }).css({
                height: b()
            }).prependTo(ag),
            aK.hide(),
            a1(a5).css({
                "float": "none"
            }),
            ai(ab.get("className")),
            c = function() {
                function g() {
                    a1.support.opacity === !1 && ba[0].style.removeAttribute("filter");
                }
                var j, k, d = a9.length;
                aa && (k = function() {
                    clearTimeout(aU),
                    aZ.hide(),
                    a4(aN),
                    ab.get("onComplete");
                }
                ,
                aA.html(ab.get("title")).show(),
                aH.show(),
                d > 1 ? ("string" == typeof ab.get("current") && aW.html(ab.get("current").replace("{current}", be + 1).replace("{total}", d)).show(),
                aF[ab.get("loop") || d - 1 > be ? "show" : "hide"]().html(ab.get("next")),
                aS[ab.get("loop") || be ? "show" : "hide"]().html(ab.get("previous")),
                ak(),
                ab.get("preloading") && a1.each([aw(-1), aw(1)], function() {
                    var l, m = a9[this], p = new aV(m,a1.data(m, bd)), a = p.get("href");
                    a && aY(p, a) && (a = aG(p, a),
                    l = ao.createElement("img"),
                    l.src = a);
                })) : aP.hide(),
                ab.get("iframe") ? (j = ao.createElement("iframe"),
                "frameBorder"in j && (j.frameBorder = 0),
                "allowTransparency"in j && (j.allowTransparency = "true"),
                ab.get("scrolling") || (j.scrolling = "no"),
                a1(j).attr({
                    src: ab.get("href"),
                    name: (new Date).getTime(),
                    "class": bf + "Iframe",
                    allowFullScreen: !0
                }).one("load", k).appendTo(aH),
                af.one(ay, function() {
                    j.src = "//about:blank";
                }),
                ab.get("fastIframe") && a1(j).trigger("load")) : k(),
                "fade" === ab.get("transition") ? ba.fadeTo(e, 1, g) : g());
            }
            ,
            "fade" === ab.get("transition") ? ba.fadeTo(e, 0, function() {
                aD.position(0, c);
            }) : aD.position(e, c);
        }
    }
    ,
    aD.next = function() {
        !aT && a9[1] && (ab.get("loop") || a9[be + 1]) && (be = aw(1),
        ar(a9[be]));
    }
    ,
    aD.prev = function() {
        !aT && a9[1] && (ab.get("loop") || be) && (be = aw(-1),
        ar(a9[be]));
    }
    ,
    aD.close = function() {
        aa && !av && (av = !0,
        aa = !1,
        a4(aQ),
        ab.get("onCleanup"),
        ap.unbind("." + bf),
        a6.fadeTo(ab.get("fadeOut") || 0, 0),
        ba.stop().fadeTo(ab.get("fadeOut") || 0, 0, function() {
            ba.hide(),
            a6.hide(),
            a4(ay),
            aH.remove(),
            setTimeout(function() {
                av = !1,
                a4(aX),
                ab.get("onClosed");
            }, 1);
        }));
    }
    ,
    aD.remove = function() {
        ba && (ba.stop(),
        a1.colorbox.close(),
        ba.stop().remove(),
        a6.remove(),
        av = !1,
        ba = null,
        a1("." + a3).removeData(bd).removeClass(a3),
        a1(ao).unbind("click." + bf));
    }
    ,
    aD.element = function() {
        return a1(ab.el);
    }
    ,
    aD.settings = bb);
}
)(jQuery, document, window);

/** ========== common\modalwincolorbox\jquery.cetmodalwin.js ========== **/
function cetModalClose() {
    $("#modalWin").remove();
}
function cetModalOpen(a) {
    var b = "/common/modalwincolorbox/host.aspx";
    b += "?url=" + encodeURI(a.url);
    b += "&top=" + (typeof (a.top) !== "undefined" ? encodeURI(a.top) : "false");
    b += "&height=" + encodeURI(a.height);
    b += "&width=" + encodeURI(a.width);
    b += "&title=" + encodeURI(a.title);
    b += "&overlayClose=" + encodeURI(a.overlayClose);
    b += "&onCloseCallback=" + encodeURI(a.onCloseCallback);
    var c = getVerticalScrollPosition() + "px";
    $("body").append('<iframe src="' + b + '" frameborder="0" allowtransparency="true" id="modalWin"></iframe>');
    $("#modalWin").css({
        position: "absolute",
        top: c,
        left: "0px",
        height: "100%",
        width: "100%",
        margin: "0px"
    });
    $("#modalWin").css("z-index", "9999");
}
function getVerticalScrollPosition() {
    var a = $("html").scrollTop();
    if (a == 0) {
        a = $("body").scrollTop();
    }
    return a;
}
$(function() {
    var a = navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS/);
    if (!a) {
        $(window).scroll(function() {
            var b = getVerticalScrollPosition() + "px";
            $("#modalWin").css({
                top: b
            });
        });
    }
});
(function(a) {
    a.fn.cetModalWin = function(c) {
        var b = {
            url: "http://www.google.com",
            height: "500px",
            width: "800px",
            title: "Google inc.",
            overlayClose: false,
            onCloseCallback: ""
        };
        var c = a.extend(b, c);
        return this.each(function() {
            var d = a(this);
            d.click(function() {
                cetModalOpen(c);
            });
        });
    }
    ;
}
)(jQuery);

/** ========== RichMultipleFilesUploader CET.Controls.MultipleFilesUploader.Resources.RichUploaderProxy.js ========== **/
var RichUploader = new function() {
    var a;
    this.ping = function() {
        return true;
    }
    ;
    this.OpenAddUrlModal = function(b) {
        a = b;
        var c = CETHandler.BuildUrlByID("1a7292a9-8b2b-4449-a665-e6b0c680158c", "ModalType=AddUrl");
        cetModalOpen({
            url: escape(c),
            iframe: true,
            overlayClose: false,
            width: "400px",
            height: "200px",
            title: uploaderResources.attach + " " + uploaderResources.urls,
            onCloseCallback: "RichUploader.CloseModal"
        });
    }
    ;
    this.SaveUrl = function(c, b) {
        if (a != null) {
            a.addUrl(c, b);
            cetModalClose();
            a = null;
        }
    }
    ;
    this.OpenAddVideoModal = function(b) {
        a = b;
        var c = CETHandler.BuildUrlByID("1a7292a9-8b2b-4449-a665-e6b0c680158c", "ModalType=AddVideo");
        cetModalOpen({
            url: escape(c),
            iframe: true,
            overlayClose: false,
            width: "400px",
            height: "170px",
            title: uploaderResources.attach + " " + uploaderResources.videos,
            onCloseCallback: "RichUploader.CloseModal"
        });
    }
    ;
    this.SaveVideo = function(b) {
        if (a != null) {
            a.addVideo(b);
            cetModalClose();
            a = null;
        }
    }
    ;
    this.OpenShowYouTubeVideoModal = function(c) {
        var b = CETHandler.BuildUrlByID("1a7292a9-8b2b-4449-a665-e6b0c680158c", "ModalType=ShowVideo&VideoType=YouTube&VideoId=" + c);
        cetModalOpen({
            url: escape(b),
            iframe: true,
            overlayClose: false,
            width: "570px",
            height: "490px",
            title: uploaderResources.videos,
            onCloseCallback: "RichUploader.CloseModal"
        });
    }
    ;
    this.OpenShowVideoModal = function(d, e) {
        var c = CETHandler.BuildUrlByID("1a7292a9-8b2b-4449-a665-e6b0c680158c", "ModalType=ShowVideo&VideoType=" + e + "&VideoId=" + d);
        var f = "570px";
        var b = "490px";
        if (e == "CETVedio") {
            f = "700px";
            b = "500px";
        }
        cetModalOpen({
            url: escape(c),
            iframe: true,
            overlayClose: false,
            width: f,
            height: b,
            title: uploaderResources.videos,
            onCloseCallback: "RichUploader.CloseModal"
        });
    }
    ;
    this.OpenShowImageModal = function(b, c) {
        var d = CETHandler.BuildUrlByID("1a7292a9-8b2b-4449-a665-e6b0c680158c", "ModalType=ShowImage&FileID=" + b + "&Provider=" + encodeURI(c));
        cetModalOpen({
            url: escape(d),
            iframe: true,
            overlayClose: false,
            width: "570px",
            height: "490px",
            title: uploaderResources.images,
            onCloseCallback: "RichUploader.CloseModal"
        });
    }
    ;
    this.FindTopmostProxy = function() {
        var d = self;
        var e = d;
        for (var c = 0; c < 10; c++) {
            try {
                if (e.parent.RichUploader.ping() == true) {
                    d = e.parent;
                }
            } catch (b) {}
            e = e.parent;
        }
        return d.RichUploader;
    }
    ;
    this.CloseModal = function() {}
    ;
}
();

/** ========== kotarapp\system\js\cet.wall\cetwall.js ========== **/
/* echo.js v1.7.0 | (c) 2015 @toddmotto | https://github.com/toddmotto/echo */
(function(b, a) {
    if (typeof define === "function" && define.amd) {
        define(function() {
            return a(b);
        });
    } else {
        if (typeof exports === "object") {
            module.exports = a;
        } else {
            b.echo = a(b);
        }
    }
}
)(this, function(i) {
    var d = {};
    var a = function() {};
    var g, h, c, k, j;
    var f = function(l) {
        return (l.offsetParent === null);
    };
    var e = function(m, n) {
        if (f(m)) {
            return false;
        }
        var l = m.getBoundingClientRect();
        return (l.right >= n.l && l.bottom >= n.t && l.left <= n.r && l.top <= n.b);
    };
    var b = function() {
        if (!k && !!h) {
            return;
        }
        clearTimeout(h);
        h = setTimeout(function() {
            d.render();
            h = null;
        }, c);
    };
    d.myrender = function() {
        b();
    }
    ;
    d.init = function(p) {
        p = p || {};
        i = p.element;
        var l = p.offset || 0;
        var n = p.offsetVertical || l;
        var m = p.offsetHorizontal || l;
        var o = function(r, q) {
            return parseInt(r || q, 10);
        };
        g = {
            t: o(p.offsetTop, n),
            b: o(p.offsetBottom, n),
            l: o(p.offsetLeft, m),
            r: o(p.offsetRight, m)
        };
        c = o(p.throttle, 250);
        k = p.debounce !== false;
        j = !!p.unload;
        a = p.callback || a;
        d.render();
        if (document.addEventListener) {
            i.addEventListener("scroll", b, false);
            i.addEventListener("load", b, false);
        } else {
            i.attachEvent("onscroll", b);
            i.attachEvent("onload", b);
        }
    }
    ;
    d.render = function() {
        var o = document.querySelectorAll("[data-echo-pid],[data-echo-talkbackid]");
        var n = o.length;
        var p, l;
        var q = {
            l: 0 - g.l,
            t: 0 - g.t,
            b: (i.innerHeight || document.documentElement.clientHeight) + g.b,
            r: (i.innerWidth || document.documentElement.clientWidth) + g.r
        };
        for (var m = 0; m < n; m++) {
            l = o[m];
            if (e(l, q)) {
                if (j) {
                    l.setAttribute("data-echo-placeholder", l.src);
                }
                if (l.getAttribute("data-echo-pid") !== null && l.getAttribute("data-loaded") !== "true") {
                    MarkerPostManager.getTask(l.getAttribute("data-echo-pid"));
                } else {
                    if (l.getAttribute("data-echo-talkbackid") !== null && l.getAttribute("data-loaded") !== "true") {
                        cet.talkbacksui.loadConversation(l, l.getAttribute("data-echo-talkbackid"));
                        l.setAttribute("data-loaded", "true");
                    } else {
                        l.src = l.getAttribute("data-echo");
                    }
                }
                if (!j) {
                    l.removeAttribute("data-echo");
                    l.removeAttribute("data-echo-background");
                }
                a(l, "load");
            } else {
                if (j && !!(p = l.getAttribute("data-echo-placeholder"))) {
                    if (l.getAttribute("data-echo-background") !== null) {
                        l.style.backgroundImage = "url(" + p + ")";
                    } else {
                        l.src = p;
                    }
                    l.removeAttribute("data-echo-placeholder");
                    a(l, "unload");
                }
            }
        }
        if (!n) {
            d.detach();
        }
    }
    ;
    d.detach = function() {
        if (document.removeEventListener) {
            i.removeEventListener("scroll", b);
        } else {
            i.detachEvent("onscroll", b);
        }
        clearTimeout(h);
    }
    ;
    return d;
});
var EmbedPost = (function() {
    function a(b) {
        this.id = b.id;
        this.filterby = b.filterby;
        this.groupby = b.groupby;
        this.orderby = b.orderby;
        this.manager = b.manager;
        this.pagenum = b.pagenum;
        this.offsettop = b.offsettop;
        this.type = b.type;
        this.date = b.date;
        this.owner = b.owner;
        this.iconclass = b.iconclass;
        this.title = b.title;
        this.content = b.content;
        this.order = b.order;
        this.showorder = b.showorder;
        this.priority = b.priority;
        this.show = b.show;
        this.popup = b.popup;
        this.url = b.url;
        this.imgurl = b.imgurl;
        this.audiourl = b.audiourl;
        this.imagewidth = b.imagewidth;
        this.imageheight = b.imageheight;
        this.islink = b.islink;
        this.externalpublisherid = b.externalpublisherid;
        this.framewidth = b.framewidth;
        this.frameheight = b.frameheight;
        this.forceminwidth = b.forceminwidth;
        this.askonclose = b.askonclose;
        this.openitemtype = b.openitemtype;
    }
    a.prototype.Render = function(b) {
        var c = [];
        if (this.show) {
            var d = this.manager.postprefix + this.id;
            c.push("<div id='", d, "' class='cetwall-post", (b ? " post-alternate" : ""), " cetwall-post-embed'>", (this.islink ? "<a href='" + this.url + "' target = '_blank' class='cetwall-post-embed-link'>" : ""), "<div class='cetwall-post-embed-icon ", this.iconclass, "'></div>", "<div class='cetwall-post-metadata'>", "<div class='cetwall-post-date'>", this.formatdate(this.date), "</div>", "<div class='cetwall-post-owner'>", this.owner, "</div>", "<div class='cetwall-clear'></div>", "<div class='cetwall-post-title'>", this.title, "</div>", "</div>", (this.islink ? "</a>" : ""), "</div>");
        }
        return c.join("");
    }
    ;
    a.prototype.formatdate = function(b) {
        b = b || new Date();
        return ZeroPad(b.getDate(), 2) + "." + ZeroPad(b.getMonth() + 1, 2) + "." + b.getFullYear();
    }
    ;
    a.prototype.ResetCache = function() {}
    ;
    return a;
}
)();
var EmbedPostManager;
(function(m) {
    var a = null;
    m.postprefix = "postembed";
    m.hasPosts = false;
    var c = {
        image: 0,
        video: 1,
        item: 2,
        audio: 3,
        linkedItem: 4,
        link: 5
    };
    function l() {
        return (EmbededMgr_bLoaded);
    }
    function g() {
        var A = [];
        var v = [];
        var y = "";
        for (var x = 0; x < BV_nTotalPages; x++) {
            y = TXT_Page + " " + BookPageState_GetPageLabel(x);
            v = EmbededMgr_GetPageEmbededParts(x);
            for (var w = 0; w < v.length; w++) {
                var z = f(v[w], x, y);
                if (z != null) {
                    A.push(z);
                }
            }
        }
        m.hasPosts = (A.length > 0);
        return A;
    }
    function t(v, x) {
        var z = 1;
        var w = v.priority;
        var y = x.priority;
        if (w < y) {
            z = -1;
        } else {
            if (w == y) {
                if (v.order < x.order) {
                    z = -1;
                } else {
                    if (v.order > x.order) {
                        z = 1;
                    } else {
                        if (v.date < x.date) {
                            z = -1;
                        }
                    }
                }
            }
        }
        return z;
    }
    function s(v, w) {
        if (m.wall) {
            document.addEventListener("draweritemloaded", function(x) {
                if (w) {
                    m.wall.ShowPost();
                } else {
                    m.wall.ShowPost(m.postprefix, v);
                }
                document.removeEventListener("draweritemloaded", arguments.callee);
                setTimeout(function(y) {
                    if (y.id === undefined) {
                        m.wall.SyncToCurrentPage();
                    } else {
                        if (y.isnew) {
                            m.wall.refreshGroup(BV_oBubbledMarker.nPageIndex);
                            m.wall.ShowPost(m.postprefix, y.id);
                            q(y.id);
                        }
                    }
                }, 250, {
                    id: v,
                    isnew: w
                });
            });
            MasterDrawer.Open({
                html: "<div id='bookwall' style='height: 100%'></div>",
                minwidth: 200,
                title: "",
                tabclass: "bookwall",
                resizecallback: m.wall.resize,
                closecallback: m.wall.closing
            });
        }
    }
    function n(v, w, x) {
        r(w, x.id);
        i(w);
        o(v, w);
    }
    function u() {
        var w = document.querySelectorAll(".cetwall-post-selected");
        for (var v = 0; v < w.length; v++) {
            w[v].classList.remove("cetwall-post-selected");
        }
        return true;
    }
    function p(w, y) {
        var v = null;
        var x = document.getElementById(y);
        if (x) {
            x.classList.add("cetwall-post-selected");
        }
    }
    function r(v, w) {
        if (!m.wall.UnSelectPosts()) {
            return false;
        }
        p(v, w);
        setTimeout(function(y) {
            if (y.type !== "selection") {
                var x = BV_GetMarkerByID(y.id);
                if (x != null) {
                    BV_SetMarkerBackgroundImage_Active(x);
                    BV_oBubbledMarker = x;
                    if ((x.sType == BV_PUSHPIN && x.bIsOwned) || (x.sType == BV_LMS_TASK && LMSTasks_HasAdminRole(x))) {
                        SetMarkerDraggable(x);
                    }
                }
            }
        }, 250, v);
        a = v;
        return true;
    }
    function b() {}
    function j(v) {
        if (!m.wall.UnSelectPosts()) {
            return false;
        }
        var w = parseInt(v.dataset.order);
        BV_GotoPage(w + 1, 0);
        return true;
    }
    function d() {}
    function e() {
        if (a != null) {
            return document.getElementById(m.postprefix + a.id);
        }
    }
    function q(v) {
        setTimeout(function(y) {
            var z = document.querySelector("#" + m.postprefix + y);
            if (z) {
                var w = z.querySelector(".postmenu-edit");
                if (w) {
                    var x = document.createEvent("Event");
                    x.initEvent(TouchUtils.EventEnd[0], true, true);
                    x.button = 0;
                    w.dispatchEvent(x);
                }
            }
        }, 500, v);
    }
    function f(v, y, z) {
        var A = null;
        var x = Layers_GetAdmin();
        var w = "embededIcon" + EmbededMgr_GetsIcontype(v.nType) + EmbededMgr_GetIconTypeSuffix(v.nType, v.nIconType);
        A = new EmbedPost({
            id: v.nID,
            pagenum: y,
            offsettop: v.nTop,
            date: v.dtUpdateDate,
            owner: v.sOwnerFullName,
            type: v.nType,
            iconclass: w,
            title: v.sTitle,
            filterby: {
                text: x.Name,
                order: x.Index
            },
            groupby: {
                text: z,
                order: y
            },
            orderby: "date",
            manager: m,
            order: parseInt(v.nOrder),
            priority: 4,
            show: ((v.nType !== 0 || v.bPopup) && v.bShowInLayers),
            popup: v.bPopup,
            url: h(v.EmbededURL),
            imgurl: v.ImageFileURL,
            audiourl: v.EmbededFileURL,
            imagewidth: v.nImageWidth,
            imageheight: v.nImageHeight,
            islink: k(v),
            externalpublisherid: v.nExternalPublisherID,
            framewidth: v.nFrameWidth,
            frameheight: v.nFrameHeight,
            forceminwidth: v.bForceMinWidth,
            askonclose: v.AskOnClose,
            openitemtype: v.OpenItemType
        });
        return A;
    }
    function i(v) {
        BV_GotoPage(v.pagenum + 1, v.offsettop - 1000);
    }
    function o(v, w) {
        switch (w.type) {
        case c.image:
            if (w.popup) {
                var x = GetEmbededImageSize(w.imagewidth, w.imageheight);
                kmobj.KotarMultmideaDoAction({
                    at: $("#dialog"),
                    type: "image",
                    width: x.nImageWidth,
                    height: x.nImageHeight,
                    url: w.imgurl,
                    title: w.title
                });
                v.stopPropagation();
            }
            break;
        case c.video:
            kmobj.KotarMultmideaDoAction({
                at: $("#dialog"),
                type: "video",
                width: 512,
                height: 384,
                url: w.url,
                title: w.title
            });
            v.stopPropagation();
            break;
        case c.item:
        case c.linkedItem:
            if (w.externalpublisherid !== null) {
                var y = EmbededMgr_Get(w.id);
                EmbededMgr_GetExternalItemURL(y, w.pagenum);
                v.stopPropagation();
            } else {
                if (!w.popup) {
                    kmobj.KotarMultmideaDoAction({
                        type: "iframe",
                        width: (w.forceminwidth ? w.framewidth : 0),
                        height: w.frameheight,
                        url: w.url,
                        title: w.title,
                        fullscreenenabled: (!ieVer || ieVer > 8) ? (w.openitemtype === 2) : false,
                        forcefullscreen: (!ieVer || ieVer > 8) ? w.openitemtype === 1 : false,
                        askonclose: w.askonclose
                    });
                }
            }
            break;
        case c.audio:
            kmobj.KotarMultmideaDoAction({
                at: $("#dialog"),
                type: "audio",
                url: w.audiourl,
                title: w.title
            });
            v.stopPropagation();
            break;
        case c.link:
            kmobj.KotarMultmideaDoAction({
                type: "link"
            });
            break;
        default:
            return "";
        }
    }
    function k(v) {
        if (v.nType == c.item || v.nType == c.linkedItem) {
            if (v.bPopup) {
                if (v.nExternalPublisherID !== null) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            if (v.nType == c.link) {
                return true;
            } else {
                return false;
            }
        }
    }
    function h(v) {
        if (v !== null) {
            return (v.indexOf("http://") < 0 && v.indexOf("https://") < 0 ? "http://" : "") + v;
        }
    }
    m.GetPosts = g;
    m.ShowPost = s;
    m.IsReady = l;
    m.OnPostClick = n;
    m.GroupClick = j;
    m.FilterClick = d;
    m.SetSelected = r;
    m.Closing = b;
    m.UnSelectPosts = u;
    m.SortPosts = t;
    m.GetActivePost = e;
}
)(EmbedPostManager || (EmbedPostManager = {}));
var LMSPost = (function() {
    function a(b) {
        this.id = b.id;
        this.filterby = b.filterby;
        this.groupby = b.groupby;
        this.orderby = b.orderby;
        this.manager = b.manager;
        this.pagenum = b.pagenum;
        this.offsettop = b.offsettop;
        this.type = b.type;
        this.date = b.date;
        this.owner = b.owner;
        this.iconclass = b.iconclass;
        this.title = b.title;
        this.content = b.content;
        this.iseditable = b.iseditable;
        this.issharable = b.issharable;
        this.isdeleteable = b.isdeleteable;
        this.iscloneable = b.iscloneable;
        this.islmsable = b.islmsable;
        this.isshared = b.isshared;
        this.audience = b.audience;
        this.haslmsbuttons = b.haslmsbuttons;
        this.priority = b.priority;
        this.taskid = b.taskid;
        this.cache = "";
    }
    a.prototype.Render = function(b) {
        var d = this.manager.postprefix + this.id;
        var c = (this.cache == "" ? false : true);
        var f = (c ? "" : "<div class='cetwall-post-preloader'></div>");
        var e = [];
        e.push("<div id='", d, "' class='cetwall-post", (b ? " post-alternate" : ""), "' data-echo-pid='", d, "' data-loaded='", c, "'>", "<div class='cetwall-post-icon ", this.iconclass, "'></div>", "<div class='cetwall-post-menu'></div>", "<div id='cetwall-post-lms-container-", d, "'>", this.cache, f, "</div></div>");
        return e.join("");
    }
    ;
    a.prototype.ResetCache = function() {
        this.cache = "";
    }
    ;
    return a;
}
)();
var MarkerPost = (function() {
    function a(b) {
        this.id = b.id;
        this.filterby = b.filterby;
        this.groupby = b.groupby;
        this.orderby = b.orderby;
        this.manager = b.manager;
        this.pagenum = b.pagenum;
        this.offsettop = b.offsettop;
        this.type = b.type;
        this.date = b.date;
        this.owner = b.owner;
        this.isowner = b.isowner;
        this.iconclass = b.iconclass;
        this.title = b.title;
        this.content = b.content;
        this.iseditable = b.iseditable;
        this.issharable = b.issharable;
        this.isdeleteable = b.isdeleteable;
        this.iscloneable = b.iscloneable;
        this.islmsable = b.islmsable;
        this.isshared = b.isshared;
        this.audience = b.audience;
        this.haslmsbuttons = b.haslmsbuttons;
        this.projectid = b.projectid;
        this.showprojects = b.showprojects;
        this.order = b.order;
        this.showorder = b.showorder;
        this.priority = b.priority;
        this.hastalkbacks = b.hastalkbacks;
        this.talkbacksid = b.talkbacksid;
        this.canreport = b.hastalkbacks && b.audience === 1 && !b.iseditable;
    }
    a.prototype.Render = function(b) {
        var d = this.manager.postprefix + this.id;
        var c = [];
        c.push("<div id='", d, "' class='cetwall-post", (b ? " post-alternate" : ""), "'>", this.getNoteContent(), "</div>");
        return c.join("");
    }
    ;
    a.prototype.formatdate = function(b) {
        b = b || new Date();
        return ZeroPad(b.getDate(), 2) + "." + ZeroPad(b.getMonth() + 1, 2) + "." + b.getFullYear();
    }
    ;
    a.prototype.getNoteContent = function() {
        var b = [];
        b.push("<div class='cetwall-post-icon ", this.iconclass, "'></div>", "<div class='cetwall-post-metadata'>", "<div class='cetwall-post-date'>", this.formatdate(this.date), "</div>", "<div class='cetwall-clear'></div>", "<div class='cetwall-post-titlewrapper'><input class='cetwall-post-title' value='", this.title.replace("'", "&#39;"), "' placeholder='", TXT_Note_Title, "' readonly /></div>", "</div>", "<div class='cetwall-post-menu'></div>", "<div class='cetwall-clear'></div>", "<div class='cetwall-post-content'><div class='cetwall-post-contentwarrper'>", cet.pluginsViewManager.render(this.content), "</div></div>", (this.hastalkbacks ? "<div class='cetwall-post-talkbacks' data-echo-talkbackid='" + this.talkbacksid + "' data-loaded='false'></div>" : ""));
        return b.join("");
    }
    ;
    a.prototype.ResetCache = function() {}
    ;
    return a;
}
)();
var SelectionPost = (function() {
    function a(b) {
        this.id = b.id;
        this.filterby = b.filterby;
        this.groupby = b.groupby;
        this.orderby = b.orderby;
        this.manager = b.manager;
        this.pagenum = b.pagenum;
        this.offsettop = b.offsettop;
        this.type = b.type;
        this.date = b.date;
        this.owner = b.owner;
        this.iconclass = b.iconclass;
        this.title = b.title;
        this.content = b.content;
        this.iseditable = b.iseditable;
        this.issharable = b.issharable;
        this.isdeleteable = b.isdeleteable;
        this.iscloneable = b.iscloneable;
        this.islmsable = b.islmsable;
        this.isshared = b.isshared;
        this.audience = b.audience;
        this.haslmsbuttons = b.haslmsbuttons;
        this.projectid = b.projectid;
        this.showprojects = b.showprojects;
        this.order = b.order;
        this.showorder = b.showorder;
        this.priority = b.priority;
        this.hastalkbacks = b.hastalkbacks;
        this.talkbacksid = b.talkbacksid;
        this.canreport = b.hastalkbacks && b.audience === 1 && !b.iseditable;
    }
    a.prototype.Render = function(b) {
        var d = this.manager.postprefix + this.id;
        var c = [];
        c.push("<div id='", d, "' class='cetwall-post", (b ? " post-alternate" : ""), " cetwall-post-selection'>", this.getNoteContent(), "</div>");
        return c.join("");
    }
    ;
    a.prototype.formatdate = function(b) {
        b = b || new Date();
        return ZeroPad(b.getDate(), 2) + "." + ZeroPad(b.getMonth() + 1, 2) + "." + b.getFullYear();
    }
    ;
    a.prototype.getNoteContent = function() {
        var b = [];
        b.push("<div class='cetwall-post-icon ", this.iconclass, "'></div>", "<div class='cetwall-post-metadata'>", "<div class='cetwall-post-date'>", this.formatdate(this.date), "</div>", "<div class='cetwall-post-owner'>", this.owner, "</div>", "<div class='cetwall-clear'></div>", "<div class='cetwall-post-title'>", this.title, "</div>", "</div>", "<div class='cetwall-post-menu'></div>", "<div class='cetwall-clear'></div>");
        return b.join("");
    }
    ;
    a.prototype.ResetCache = function() {}
    ;
    return a;
}
)();
var MarkerPostManager;
(function(X) {
    X.postprefix = "postmarker";
    X.hasPosts = false;
    var a = null;
    var t = null;
    var b = null;
    var Y = [];
    var au = 50;
    function V() {
        return (WordSelectionMgr_bLoaded && MarkersMgr_bLoaded);
    }
    function I() {
        var aU = [];
        var aQ = [];
        Y = Notes.audiences.GetSharingLevelsByType("pushpin");
        var aS = "";
        for (var aR = 0; aR < BV_nTotalPages; aR++) {
            aS = TXT_Page + " " + BookPageState_GetPageLabel(aR);
            aQ = MarkersMgr_GetPageMarkers(aR);
            for (var aP = 0; aP < aQ.length; aP++) {
                var aT = C(aQ[aP], aR, aS);
                if (aT != null) {
                    aU.push(aT);
                }
            }
            if (WordsMgr_PageSelections[aR] !== undefined && WordsMgr_PageSelections[aR].length > 0) {
                layer = Layers_GetPrivate();
                var aW = WordsMgr_PageSelections[aR];
                for (var aV = 0; aV < aW.length; aV++) {
                    var aT = K(aW[aV], aR, aS);
                    if (aT != null) {
                        aU.push(aT);
                    }
                }
            }
        }
        X.hasPosts = (aU.length > 0);
        return aU;
    }
    function aH(aP, aR) {
        var aT = 1;
        var aQ = aP.priority;
        var aS = aR.priority;
        if (aQ < aS) {
            aT = -1;
        } else {
            if (aQ == aS) {
                if (aP.order < aR.order) {
                    aT = -1;
                } else {
                    if (aP.order > aR.order) {
                        aT = 1;
                    } else {
                        if (aP.date < aR.date) {
                            aT = -1;
                        }
                    }
                }
            }
        }
        return aT;
    }
    function aF(aP, aQ) {
        if (X.wall) {
            document.addEventListener("draweritemloaded", function(aR) {
                if (aQ) {
                    X.wall.ShowPost();
                } else {
                    X.wall.ShowPost(X.postprefix, aP);
                }
                document.removeEventListener("draweritemloaded", arguments.callee);
                setTimeout(function(aS) {
                    if (aS.id === undefined) {
                        X.wall.SyncToCurrentPage();
                    } else {
                        if (aS.isnew) {
                            var aV = 0;
                            var aU = BV_GetMarkerByID(BV_TEMPORARY_MARKER_ID);
                            if (aU != null) {
                                aV = aU.nPageIndex;
                            } else {
                                var aT = BV_GetMarkerByID(aS.id);
                                aV = aT.nPageIndex;
                            }
                            X.wall.refreshGroup(aV);
                            X.wall.ShowPost(X.postprefix, aS.id);
                            if (aU != null && aU.nMarkerID == aS.id) {
                                aC(aS.id);
                            }
                        }
                    }
                }, 250, {
                    id: aP,
                    isnew: aQ
                });
            });
            MasterDrawer.Open({
                html: "<div id='bookwall' style='height: 100%'></div>",
                minwidth: 200,
                title: "",
                tabclass: "bookwall",
                resizecallback: X.wall.resize,
                closecallback: X.wall.closing
            });
        }
    }
    function Z(aP, aQ, aR) {
        if (U(aP)) {
            if (aP.target.classList.contains("cetwall-post-lms-title")) {
                aP.preventDefault();
                MasterDrawer.Open({
                    url: aP.target.dataset.url,
                    title: aP.target.innerText
                });
            } else {
                if (aP.target.classList.contains("cetwall-editpostmenu-item")) {
                    if (!aP.target.classList.contains("pressed")) {
                        v(aQ, aR, aP.target.dataset.command);
                        aP.target.classList.add("pressed");
                    }
                } else {
                    if (aP.target.classList.contains("cetwall-post-submenuitem")) {
                        if (!aP.target.classList.contains("pressed") || aP.target.dataset.command == "students") {
                            ab(aP.target.dataset.command, aQ, aR);
                        }
                    } else {
                        j(aR);
                        if (!aR.classList.contains("cetwall-post-selected")) {
                            aP.preventDefault();
                            aD(aQ, aR.id);
                            M(aQ);
                        } else {
                            if (aP.target.classList.contains("cetwall-post-menuitem")) {
                                aP.preventDefault();
                                aa(aQ, aR, aP.target);
                            }
                        }
                    }
                }
            }
        }
    }
    function ac(aR, aP) {
        var aQ = X.wall.GetPostByID(aP);
        aR.innerHTML = aQ.getNoteContent();
        ai(aQ, aP);
        X.wall.correctFilter(aQ.filterby.text);
    }
    function j(aQ) {
        var aR = aQ.querySelectorAll(".cetwall-post-submenu");
        for (var aP = 0; aP < aR.length; aP++) {
            aR[aP].parentNode.removeChild(aR[aP]);
        }
    }
    function aJ(aQ) {
        aQ = aQ || false;
        if (t != null) {
            if (!aq(t, aQ)) {
                return false;
            }
            t = null;
        }
        var aS = document.querySelectorAll(".cetwall-post-selected");
        for (var aP = 0; aP < aS.length; aP++) {
            aS[aP].classList.remove("cetwall-post-selected");
            menu = aS[aP].querySelector(".cetwall-post-menu");
            if (menu) {
                menu.innerHTML = "";
            }
            cet.talkbacksui.collapse(aS[aP]);
        }
        i();
        if (BV_oBubbledMarker != null) {
            var aR = BV_GetMarkerByID(BV_oBubbledMarker.nMarkerID);
            EndMarkerDraggable(aR);
            BV_SetMarkerBackgroundImage_Default(aR);
        }
        BV_oBubbledMarker = null;
        b = null;
        t = null;
        return true;
    }
    function ai(aR, aT) {
        var aQ = null;
        var aS = document.getElementById(aT);
        if (aS) {
            aS.classList.add("cetwall-post-selected");
            aQ = aS.querySelector(".cetwall-post-menu");
            if (aQ !== null) {
                var aP = H(aR);
                var aU = document.createElement("span");
                aU.innerHTML = aP;
                aQ.appendChild(aU.childNodes[0]);
            } else {
                setTimeout(function(aV, aW) {
                    ai(aV, aW);
                }, 100, aR, aT);
            }
        }
    }
    function aD(aP, aQ) {
        if (!X.wall.UnSelectPosts(true)) {
            return false;
        }
        ai(aP, aQ);
        setTimeout(function(aS) {
            if (aS.type !== "selection") {
                var aR = BV_GetMarkerByID(aS.id);
                if (aR != null) {
                    BV_SetMarkerBackgroundImage_Active(aR);
                    BV_oBubbledMarker = aR;
                    if ((aR.sType == BV_PUSHPIN && aR.bIsOwned) || (aR.sType == BV_LMS_TASK && LMSTasks_HasAdminRole(aR))) {
                        SetMarkerDraggable(aR);
                    }
                }
            }
        }, 250, aP);
        b = aP;
        return true;
    }
    function g() {
        t = null;
        b = null;
        BV_oBubbledMarker = null;
        BV_bInNewMarkerState = false;
        BV_bMarkerSelected = false;
    }
    function m() {
        if (t != null) {
            aq(t, true);
        }
        if (is_IOS) {
            if (BV_oBubbledMarker != null) {
                BV_ResetMarkerBackgroundImage(BV_oBubbledMarker.nMarkerID);
            }
        }
        if (BV_oBubbledMarker != null) {
            BV_SetMarkerBackgroundImage_Default(BV_oBubbledMarker);
        }
        if (t == null) {
            g();
        }
    }
    function N(aP) {
        if (!X.wall.UnSelectPosts()) {
            return false;
        }
        var aQ = parseInt(aP.dataset.order);
        BV_GotoPage(aQ + 1, 0);
        return true;
    }
    function x() {}
    function ap(aP) {
        var aQ = X.postprefix + aP;
        var aR = X.wall.GetPostByID(aQ);
        aR.ResetCache();
    }
    function y() {
        if (b != null) {
            return document.getElementById(X.postprefix + b.id);
        }
    }
    function aC(aP) {
        setTimeout(function(aS) {
            var aT = document.querySelector("#" + X.postprefix + aS);
            if (aT) {
                var aQ = aT.querySelector(".postmenu-edit");
                if (aQ) {
                    var aR = TouchUtils.CreateEvent(TouchUtils.EventEnd[0]);
                    aQ.dispatchEvent(aR);
                }
            }
        }, 500, aP);
    }
    function K(aS, aQ, aR) {
        var aP = WordsSelectList_GetImageName(aS);
        return new SelectionPost({
            id: aS.ID,
            date: aS.dtUpdateDate,
            owner: BaseMaster_sUserFullName,
            audience: aS.nAudience,
            projectid: aS.nProjectID,
            pagenum: aQ,
            offsettop: 1000,
            type: "selection",
            iconclass: aP,
            title: aI(aS.Body),
            filterby: {
                text: layer.Name,
                order: layer.Index
            },
            groupby: {
                text: aR,
                order: aQ
            },
            orderby: "date",
            manager: X,
            iseditable: false,
            issharable: false,
            isdeleteable: true,
            iscloneable: false,
            islmsable: false,
            isshared: false,
            haslmsbuttons: false,
            showprojects: false,
            showorder: false,
            order: 0,
            priority: 2
        });
    }
    function C(aS, aT, aU) {
        var aV = null;
        var aR = Layers_Get(aS.nLayer);
        if (aR != null) {
            var aP = MarkerList_GetIcon(aS.sType, aS.sSubType, aS.bIsOwned, aS.nAudience);
            if (aS.nMarkerID === BV_TEMPORARY_MARKER_ID && aS.sOwnerFullName === "") {
                aS.sOwnerFullName = BaseMaster_sUserFullName;
            }
            if (aS.nMarkerID !== BV_TEMPORARY_MARKER_ID) {
                aS.sTitle = (aS.sTitle != "" ? aS.sTitle : TXT_LayersList_NoTitle);
            }
            if (aS.sType !== BV_LMS_TASK) {
                var aQ = aS.nAudience == BV_AUDIENCE_MYSCHOOL_TEACHERS;
                aV = new MarkerPost({
                    id: aS.nMarkerID,
                    pagenum: aT,
                    offsettop: aS.nTop,
                    date: aS.dtUpdateDate,
                    owner: aS.sOwnerFullName,
                    isowner: aS.bIsOwned,
                    audience: aS.nAudience,
                    projectid: aS.nProjectID,
                    type: aS.sType,
                    iconclass: aP,
                    title: aS.sTitle,
                    content: aS.sText,
                    filterby: {
                        text: aR.Name,
                        order: aR.Index
                    },
                    groupby: {
                        text: aU,
                        order: aT
                    },
                    orderby: "date",
                    manager: X,
                    iseditable: S(aS),
                    issharable: true,
                    isdeleteable: S(aS) || aQ,
                    iscloneable: BV_CanCloneNote,
                    islmsable: T(aS),
                    isshared: aQ,
                    haslmsbuttons: false,
                    showprojects: Q(aS),
                    showorder: O(aS),
                    order: parseInt(aS.nOrder),
                    priority: Layers_GetPriority(aS.sType, aS.bIsOwned, aS.nAudience),
                    hastalkbacks: R(aS),
                    talkbacksid: aS.gTalkbacksID
                });
            } else {
                aV = new LMSPost({
                    id: aS.nMarkerID,
                    pagenum: aT,
                    offsettop: aS.nTop,
                    date: aS.dtUpdateDate,
                    owner: aS.sOwnerFullName,
                    audience: aS.nAudience,
                    type: aS.sType,
                    iconclass: aP,
                    title: aS.sTitle,
                    content: aS.sText,
                    filterby: {
                        text: aR.Name,
                        order: aR.Index
                    },
                    groupby: {
                        text: aU,
                        order: aT
                    },
                    orderby: "date",
                    manager: X,
                    iseditable: aS.bIsOwned && LMS_IsLMSable,
                    issharable: true,
                    isdeleteable: aS.bIsOwned && LMS_IsLMSable,
                    iscloneable: BV_CanCloneNote && BV_bIsTeacher,
                    islmsable: false,
                    isshared: false,
                    haslmsbuttons: aS.bIsOwned && aS.nAudience == BV_AUDIENCE_STUDENTS && LMS_IsLMSable,
                    priority: Layers_GetPriority(aS.sType, aS.bIsOwned, aS.nAudience),
                    taskid: aS.gLinkedItemID
                });
            }
        }
        return aV;
    }
    function M(aP) {
        BV_GotoPage(aP.pagenum + 1, aP.offsettop - 1000);
    }
    function S(aP) {
        return aP.bIsOwned || (BV_bAdminUser && (aP.nAudience == BV_AUDIENCE_EVERYONE_ENRICHED || aP.nAudience == BV_AUDIENCE_TEACHERS || aP.nAudience == BV_AUDIENCE_EVERYONE_ELSE));
    }
    function T(aP) {
        return (aP.nAudience == BV_AUDIENCE_EVERYONE_ENRICHED || aP.nAudience == BV_AUDIENCE_TEACHERS || aP.nAudience == BV_AUDIENCE_MYSCHOOL_TEACHERS || aP.bIsOwned) && BV_bIsTeacher && LMS_IsLMSable && aP.sType != BV_LMS_TASK;
    }
    function Q(aP) {
        return (aP.sType == "pushpin");
    }
    function R(aP) {
        return (aP.sType == "pushpin" && (aP.nAudience == BV_AUDIENCE_STUDENTS || aP.nAudience == BV_AUDIENCE_EVERYONE_ELSE));
    }
    function H(aQ) {
        var aP = [];
        aP.push("<div class='cetwall-post-menuitems'>");
        if (BaseMaster_bUserIsLoggedIn) {
            if (aQ.iseditable) {
                aP.push("<div class='cetwall-post-menuitem postmenu-edit' data-command='edit' title='", TXT_Edit, "'></div>");
            }
            if (aQ.issharable) {
                aP.push("<div class='cetwall-post-menuitem postmenu-share' data-command='share' title='", TXT_SHARE, "'></div>");
            }
            if (aQ.islmsable) {
                aP.push("<div class='cetwall-post-menuitem postmenu-convertlms' data-command='lms' title='", TXT_ADDTASK, "'></div>");
            }
            if (aQ.iscloneable) {
                aP.push("<div class='cetwall-post-menuitem postmenu-clone' data-command='clone' title='", TXT_CLONE, "'></div>");
            }
            if (aQ.isdeleteable) {
                aP.push("<div class='cetwall-post-menuitem postmenu-delete' data-command='delete' title='", TXT_Delete, "'></div>");
            }
            if (aQ.taskid != null) {
                aP.push("<div class='cetwall-post-menuitem postmenu-refresh' data-command='refresh' title='", TXT_Refresh, "'></div>");
            }
            if (aQ.canreport) {
                aP.push("<div class='cetwall-post-menuitem postmenu-abuse' data-command='abuse' title='", TXT_Abuse, "'></div>");
            }
        }
        aP.push("</div>");
        return aP.join("");
    }
    function J(aT, aQ) {
        var aU = {
            hassubmenu: false,
            html: "",
            ispushed: false
        };
        var aR = [];
        aR.push("<div class='cetwall-post-submenu'>");
        switch (aQ) {
        case "edit":
            if (aT.type !== BV_LMS_TASK) {
                aU.ispushed = true;
            }
            break;
        case "share":
            aU.ispushed = true;
            aU.hassubmenu = true;
            if (aT.iseditable && aT.type !== BV_LMS_TASK && Y.length > 1 && aT.isowner) {
                for (var aS = 0; aS < Y.length; aS++) {
                    var aP = Y[aS];
                    var aV = Notes.audiences.GetSharingLevel(aP.nAudience);
                    aR.push("<div class='cetwall-post-submenuitem postsubmenu-", aV, (aP.nAudience == aT.audience ? " pressed" : ""), "' data-command='", aV, "'></div>");
                }
            }
            aR.push("<div class='cetwall-post-submenuitem postsubmenu-mail' data-command='mail'></div>");
            break;
        case "clone":
            aU.ispushed = true;
            break;
        case "abuse":
            aU.ispushed = true;
            aU.hassubmenu = true;
            aR.push("<a class='cetwall-post-submenuitem postsubmenu-reportabuse' data-postid='" + aT.id + "' data-command='reportabuse'></a>");
            am(aT);
            break;
        }
        aR.push("</div>");
        aU.html = aR.join("");
        return aU;
    }
    function af(aP) {
        var aQ = document.querySelector("#" + X.postprefix + aP);
        if (aQ != null) {
            aQ.parentNode.removeChild(aQ);
            X.wall.resize();
        }
    }
    function aI(aR) {
        var aQ = aR.search(">") + 1;
        var aP = aR.substring(aQ).search("<");
        if (aP >= au) {
            var aS = aR.substr(aQ, aP);
            return aR.substring(0, aQ) + aS.substring(0, au) + "..." + aR.substring(aQ + aP);
        } else {
            return aR;
        }
    }
    function z(aQ) {
        for (var aP = 0; aP < Y.length; aP++) {
            if (Y[aP].nAudience == aQ) {
                return Y[aP];
            }
        }
    }
    function A(aQ) {
        var aP;
        switch (aQ) {
        case "public":
            aP = audiencesenum.EveryoneEnriching;
            break;
        case "social":
            aP = audiencesenum.Everyone;
            break;
        case "private":
            aP = audiencesenum.Private;
            break;
        case "teachers":
            aP = audiencesenum.Teachers;
            break;
        case "students":
            aP = audiencesenum.Students;
            break;
        case "mySchoolTeachers":
            aP = audiencesenum.MySchoolTeachers;
            break;
        }
        return z(aP);
    }
    function f(aQ, aR, aP) {
        if (aP.confirmMessage != "") {
            if (confirm(aP.confirmMessage)) {
                aK(aQ, aR, aP, "default");
            }
        } else {
            if (aP.nAudience == audiencesenum.Students) {
                E(aQ.id);
            }
        }
    }
    function aK(aS, aT, aP, aU) {
        var aQ = 0;
        if (P(aP.nAudience)) {
            if (aS.order > 0) {
                aQ = aS.order;
            } else {
                aQ = D(aS.pagenum);
            }
        }
        var aR = new Array({
            name: "nBookID",
            value: BV_nBookID
        },{
            name: "nID",
            value: aS.id
        },{
            name: "nAudience",
            value: aP.nAudience
        },{
            name: "nOrder",
            value: aQ
        },{
            name: "sSubType",
            value: aU
        });
        BV_oBubbledMarker.nAudience = aP.nAudience;
        BV_oBubbledMarker.nOrder = aQ;
        BV_oBubbledMarker.sSubType = aU;
        marker = BV_oBubbledMarker;
        callAppKotarCommand("bookextensions.updateaudience", aR, {
            onSuccessFunction: aM,
            onFailureFunction: aL,
            marker: marker,
            postel: aT,
            audience: aP
        }, false);
    }
    function aM(aQ, aP) {
        j(aP.postel);
        if (aP.marker != null) {
            aP.marker.nAudience = aP.audience.nAudience;
            aP.marker.bIsPublished = (aP.audience.nAudience == BV_AUDIENCE_EVERYONE_ELSE);
            if (aQ != "OK") {
                aP.marker.gTalkbacksID = aQ;
            }
            MarkersMgr_UpdateMarker(aP.marker);
        }
        ShowAjaxNotification(TXT_TheNote + " " + TXT_fSaved + " " + TXT_Successfully);
        X.wall.refresh(false);
        if (aP.marker != null) {
            ac(aP.postel, X.postprefix + aP.marker.nMarkerID);
            setTimeout(function() {
                echo.myrender();
            }, 100);
        }
    }
    function aL() {}
    function az(aP, aR) {
        var aQ = new Array({
            name: "nExtensionID",
            value: aP
        },{
            name: "selection",
            value: aR
        });
        callAppKotarCommandPost("bookextensions.setmembers", aQ, {
            onSuccessFunction: aB,
            onFailureFunction: aA
        }, false);
    }
    function aB(aT) {
        var aP = z(audiencesenum.Students);
        var aS = document.getElementById(X.postprefix + b.id);
        var aR = b;
        var aQ = parseInt(aT);
        var aU = (aQ == 0 ? "nonattached" : "");
        aK(aR, aS, aP, aU);
        ad();
        setTimeout(function() {
            echo.myrender();
        }, 100);
    }
    function aA() {}
    function E(aP) {
        var aQ = new Array({
            name: "nExtensionID",
            value: aP
        });
        callAppKotarCommand("bookextensions.getmembers", aQ, {
            onSuccessFunction: G,
            onFailureFunction: F
        }, false);
    }
    function G(aR) {
        var aP = [];
        var aQ = [];
        if (aR != null) {
            var aP = aR.groups;
            var aQ = aR.individuals;
        }
        d();
        aw(aP, aQ);
        setTimeout(function() {
            ShowAddTaskFormPopup();
            ay();
        }, 300);
    }
    function F() {}
    function ad() {
        SetBodyOverlayState(false);
        _openedWindowName = "";
        var aP = getElement("dvModalDialogBackground");
        aP.className = "modalDialog-standart";
        var aQ = getElement("dvModalDialogIFrameContainer");
        aQ.removeChild(getElement("groupbox-header"));
        aQ.removeChild(getElement("groupbox-container"));
        aQ.removeChild(getElement("groupbox-footer"));
    }
    function ay() {
        var aP = getElement("dvModalDialogIFrameContainer");
        aP.style.width = "100%";
        aP.style.height = "544px";
        aP.style.left = "0";
        aP.style.backgroundColor = "#ffffff";
    }
    function d() {
        var aP = getElement("dvModalDialogBackground");
        aP.className = "modalDialog-groups";
        var aR = document.createElement("div");
        aR.id = "groupbox-header";
        aR.className = "groupbox-header";
        var aS = document.createElement("div");
        aS.id = "groupscancel";
        aS.className = "groupbox-close-icon";
        aS.addEventListener("click", function(aT) {
            ad();
        });
        aR.appendChild(aS);
        dvModalDialogIFrameContainer.appendChild(aR);
        var aS = document.createElement("div");
        aS.id = "groupbox-container";
        aS.className = "groupbox-container";
        dvModalDialogIFrameContainer.appendChild(aS);
        var aQ = document.createElement("div");
        aQ.id = "groupbox-footer";
        aQ.className = "groupbox-footer";
        var aS = document.createElement("div");
        aS.id = "groupssave";
        aS.className = "groupbox-save-button";
        aS.addEventListener("click", function(aT) {
            var aU = JSON.stringify(groupbox.getSelection());
            az(BV_oBubbledMarker.nMarkerID, aU);
        });
        aQ.appendChild(aS);
        dvModalDialogIFrameContainer.appendChild(aQ);
    }
    function aw(aP, aQ) {
        var aR = LMSTasks_GetMybagEnviroment();
        groupboxSettings = {
            ticketID: BaseMaster_token,
            apiDomain: aR.environment,
            selectedGroups: aP,
            selectedStudents: aQ
        };
        groupbox.init($(getElement("groupbox-container")), groupboxSettings);
    }
    function F() {}
    function O(aP) {
        return P(aP.nAudience);
    }
    function P(aP) {
        var aQ = BV_bAdminUser;
        return (aQ && BV_HasAdminOrderInMarkers && aP !== BV_AUDIENCE_PERSONAL);
    }
    function aE(aT, aR) {
        var aQ = aT.querySelector(".cetwall-post-metadata");
        var aS = document.createElement("div");
        aS.className = "cetwall-post-order";
        var aP = [];
        var aU = TXT_ORDER;
        aP.push("<span>", aU, ": </span>");
        aP.push("<input type='text' size='6' id='cetwall-post-txtorder' value='", aR, "'>");
        aS.innerHTML = aP.join("");
        aQ.appendChild(aS);
        var aV = document.createElement("div");
        aV.className = "cetwall-post-txtorder-validator";
        aV.innerText = TXT_ORDER_VALIDATOR;
        aQ.appendChild(aV);
    }
    function ae() {
        var aP = document.getElementsByClassName("cetwall-post-order")[0];
        if (aP) {
            aP.parentNode.removeChild(aP);
        }
        var aQ = document.getElementsByClassName("cetwall-post-txtorder-validator on")[0];
        if (aQ) {
            aQ.parentNode.removeChild(aQ);
        }
    }
    function aO() {
        if (b.showorder) {
            var aP = document.getElementById("cetwall-post-txtorder");
            if (aP) {
                var aQ = aP.value;
                if (!aQ.match(/^[1-9]\d*$/)) {
                    var aR = document.getElementsByClassName("cetwall-post-txtorder-validator")[0];
                    aR.className = "cetwall-post-txtorder-validator on";
                    return false;
                }
            }
        }
        return true;
    }
    function D(aS) {
        var aR = 0;
        var aQ = MarkersMgr_GetPageMarkers(aS);
        for (var aP = 0; aP < aQ.length; aP++) {
            var aT = aQ[aP];
            if (aT.nOrder > aR) {
                aR = aT.nOrder;
            }
        }
        return parseInt(aR) + 10;
    }
    function aa(aS, aT, aQ) {
        if (aQ.classList.contains("pressed")) {
            aQ.classList.remove("pressed");
        } else {
            var aR = aT.querySelectorAll(".cetwall-post-menuitem");
            for (var aP = 0; aP < aR.length; aP++) {
                aR[aP].classList.remove("pressed");
            }
            var aU = J(aS, aQ.dataset.command);
            if (aU.ispushed) {
                aQ.classList.add("pressed");
            }
            if (aU.hassubmenu) {
                var aV = document.createElement("span");
                aV.innerHTML = aU.html;
                aQ.appendChild(aV.childNodes[0]);
                setTimeout(function(aW) {
                    aW.style.opacity = "1";
                    aW.style.transform = "translateX(5px)";
                }, 0, aQ.childNodes[0]);
            } else {
                s(aS, aT, aQ.dataset.command);
            }
        }
        return true;
    }
    function ab(aP, aQ, aR) {
        switch (aP) {
        case "mail":
            j(aR);
            av(aQ);
            break;
        case "public":
        case "social":
        case "private":
        case "teachers":
        case "students":
        case "mySchoolTeachers":
            f(aQ, aR, A(aP));
            break;
        case "reportabuse":
            setTimeout(function() {
                j(aR);
                document.querySelector('.cetwall-post-menuitem.postmenu-abuse[data-command="abuse"]').classList.remove("pressed");
            }, 200);
            break;
        }
    }
    function s(aR, aS, aQ) {
        switch (aQ) {
        case "edit":
            w(aR, aS);
            break;
        case "delete":
            r(aR);
            t = null;
            a = null;
            break;
        case "clone":
            if (aR.type !== BV_LMS_TASK) {
                var aT = aS.querySelector(".cetwall-post-title").value;
                var aP = aS.querySelector(".cetwall-post-contentwarrper").innerHTML;
                if (a != null) {
                    aP = a.getCetEditorContent();
                }
                t = null;
                l(aR, aT, aP);
            } else {
                k(aR);
            }
            break;
        case "lms":
            n(aR);
            break;
        case "refresh":
            aR.cache = "";
            aS.dataset.loaded = false;
            echo.myrender();
            break;
        }
        return true;
    }
    function am(aQ) {
        var aP = new Array({
            name: "nMarkerID",
            value: aQ.id
        },{
            name: "nBookID",
            value: BV_nBookID
        },{
            name: "nPageNum",
            value: BookPageState_GetPageID(aQ.pagenum)
        });
        callAppKotarCommandReadOnlySession("bookextensions.reportabusemail", aP, {
            onSuccessFunction: ao.bind(aQ),
            onFailureFunction: an
        }, true, true);
    }
    function ao(aP) {
        document.querySelector('.cetwall-post-submenuitem.postsubmenu-reportabuse[data-postid="' + this.id + '"]').setAttribute("href", aP);
    }
    function an() {}
    function av(aP) {
        var aR = null;
        var aQ = aP.type === "selection" ? "nSelectionID" : "nMarkerID";
        if (aP != null) {
            var aS = [];
            aS.push("https://", window.location.host, "/KotarApp/Viewer.aspx?nBookID=", BV_nBookID, "&nMarkerID=", aP.id, "&Source=share#ShowMarker.", ((aP.pagenum * 1) + 1), ".", aP.id);
            aR = aQ + "=" + aP.id + "&url=" + encodeURIComponent(aS.join(""));
            ShowMailPopup(aR);
        }
    }
    function r(aP) {
        if (aP.type === "selection") {
            p(aP);
        } else {
            if (aP.id === BV_TEMPORARY_MARKER_ID) {
                BV_DeleteTemporaryMarker();
                BV_oBubbledMarker = null;
                BV_bInBubbleEditMode = false;
                BV_bMarkerSelected = false;
                BV_bInNewMarkerState = false;
                X.wall.refresh(true);
            } else {
                o(aP);
            }
        }
        if (a != null) {
            a.remove();
            a = null;
        }
    }
    function p(aP) {
        WordSelectionMgr_DeleteWordSelectionByID(aP.id, aP.pagenum);
    }
    function o(aQ) {
        if (aQ.iseditable) {
            var aP = BV_GetMarkerByID(aQ.id);
            if (aQ.haslmsbuttons) {
                q(aP);
            } else {
                BV_DeleteMarker(aP);
            }
        } else {
            if (aQ.isshared) {
                BV_AddBookExtensionShareExclude();
            }
        }
    }
    function q(aP) {
        if (aP != null) {
            if (aP.sSubType == "archive") {
                if (confirm(decodeKotar(TXT_ConfirmLMSTaskDeletion))) {
                    BV_DeleteMarker(aP);
                }
            } else {
                LMSTasks_GetDeletedLMSTaskGroups(aP.gLinkedItemID);
            }
        }
    }
    function k(aT) {
        var aP = BV_GetMarkerByID(aT.id);
        if (aP != null) {
            var aS = aP.getBoundingClientRect();
            var aQ = {
                clientX: aS.left + aS.width,
                clientY: aS.top + aS.height
            };
            if (aT.haslmsbuttons) {
                var aR = BV_PlaceLMSIconExtension(aQ, aP.nPageIndex, 500, 500);
                LMSTasks_CloneTask(aR, aP.gLinkedItemID);
            }
        }
    }
    function l(aU, aW, aP) {
        var aQ = BV_GetMarkerByID(aU.id);
        if (aQ != null) {
            var aT = aQ.getBoundingClientRect();
            var aS = {
                clientX: aT.left + aT.width,
                clientY: aT.top + aT.height
            };
            var aR = BV_PlaceCloneIconExtension(aS, aQ.nPageIndex);
            var aV = TXT_CopyOf + " ";
            aR.sTitle = aV + aW;
            aR.sText = aP;
            BV_CreateNewMarkerForClone(aR, aV);
        }
    }
    function n(aT) {
        var aP = BV_GetMarkerByID(aT.id);
        if (aP != null) {
            BV_sActiveTool = BV_LMS_TASK;
            var aS = aP.getBoundingClientRect();
            var aQ = {
                clientX: aS.left + aS.width,
                clientY: aS.top + aS.height
            };
            var aR = BV_PlaceIconicExtension(aP.nPageIndex, aQ, BV_LMS_TASK);
            aR.sTitle = aP.sTitle;
            aR.sText = aP.sText;
            LMSTasks_CreateNewTask(aR);
        }
    }
    function w(aQ, aR) {
        if (aQ.type === BV_LMS_TASK) {
            LMSTasks_OnEditTask(aQ.id, aQ.taskid, false, aQ.iconclass === "notattached");
        } else {
            var aP = aR.querySelector(".cetwall-post-menuitems");
            aP.classList.add("disabled");
            u(aQ, aR);
        }
    }
    function u(aQ, aR) {
        MasterDrawer.Resize(800);
        t = aR;
        aR.appendChild(B());
        var aS = aR.querySelector(".cetwall-post-title");
        aS.classList.add("editing");
        aS.readOnly = false;
        var aP = aR.querySelector(".cetwall-post-contentwarrper");
        if (aQ.showprojects) {
            aG(aR, aQ.projectid);
        }
        if (aQ.showorder) {
            aE(aR, aQ.order);
        }
        setTimeout(function(aT) {
            a = cet.editorMananger.getEditor({
                editorElement: aP,
                language: BaseMaster_sLanguageCode,
                toolbarList: "bold italic underline | alignleft aligncenter alignright | bullist numlist | forecolor backcolor | cetKotarImg cetVideo cetAudio cetLink cetFile",
                addDefaultPlugins: false,
                autoFocus: false,
                objectResizing: false,
                pluginList: "autoresize textcolor cetKotarImg cetVideo cetAudio cetLink cetFile paste",
                contentCss: "/KotarApp/System/css/cet.wall/cet.wall.css",
                readyHandler: function(aU) {
                    aU.cetEditor.setCetEditorContent(aT.postcontent);
                    aU.cetEditor.addClass("cetwall-editor");
                    aT.title.focus();
                    X.wall.resize();
                }
            });
            a.onResize = X.wall.resize;
        }, 750, {
            postcontent: aQ.content,
            title: aS
        });
    }
    function aG(aT, aS) {
        var aR = aT.querySelector(".cetwall-post-metadata");
        var aV = document.createElement("div");
        aV.className = "cetwall-post-projects";
        var aP = [];
        var aX = Notes.projects.folders.sTitle;
        var aW = Notes.projects.folders.projectsList;
        aP.push("<span>", aX, ": </span>");
        aP.push("<select class='cetwall-post-project-list'>");
        for (var aQ = 0; aQ < aW.length; aQ++) {
            var aU = aW[aQ];
            aP.push("<option value='", aU.Key, "'", (aU.Key == aS ? " selected" : ""), ">", aU.Value, "</option>");
        }
        aP.push("</select>");
        aV.innerHTML = aP.join("");
        aR.appendChild(aV);
    }
    function ag() {
        var aP = document.getElementsByClassName("cetwall-post-projects")[0];
        if (aP) {
            aP.parentNode.removeChild(aP);
        }
    }
    function h() {
        if (t != null) {
            if (!aq(t)) {
                return false;
            }
            t = null;
        }
        if (a != null) {
            a.remove();
            a = null;
        }
        ag();
        ae();
        return true;
    }
    function i() {
        if (!h()) {
            return false;
        }
        var aP = document.querySelectorAll(".cetwall-post-title.editing");
        for (var aS = 0; aS < aP.length; aS++) {
            var aV = aP[aS];
            aV.classList.remove("editing");
            aV.readOnly = true;
            aV.blur();
        }
        var aQ = document.querySelectorAll(".cetwall-editpostmenu");
        for (var aT = 0; aT < aQ.length; aT++) {
            var aR = aQ[aT];
            aR.parentNode.removeChild(aR);
        }
        var aU = document.querySelectorAll(".cetwall-post-menuitem");
        for (var aS = 0; aS < aU.length; aS++) {
            aU[aS].classList.remove("pressed");
        }
        return true;
    }
    function B() {
        var aP = [];
        aP.push("<div class='cetwall-editpostmenu'>", "<div class='cetwall-editpostmenu-item editpostmenu-finish' data-command='finish'></div>", "<div class='cetwall-editpostmenu-item editpostmenu-cancel' data-command='cancel'></div>", "</div>");
        var aQ = document.createElement("span");
        aQ.innerHTML = aP.join("");
        return aQ.childNodes[0];
    }
    function v(aQ, aR, aP) {
        switch (aP) {
        case "finish":
            i();
            break;
        case "cancel":
            e(aQ, aR);
            t = null;
            break;
        }
    }
    function e(aR, aS) {
        if (BV_oBubbledMarker.nMarkerID === BV_TEMPORARY_MARKER_ID) {
            r(aR);
        } else {
            t = null;
            i();
            var aQ = aS.querySelector(".cetwall-post-menuitems");
            aQ.classList.remove("disabled");
            var aP = aS.querySelector(".cetwall-post-contentwarrper");
            aP.innerHTML = aR.content;
            var aT = aS.querySelector(".cetwall-post-title");
            aT.value = aR.title;
        }
    }
    function aq(aS, aR) {
        aR = aR || false;
        if (!aO()) {
            return false;
        }
        var aU = aS.querySelector(".cetwall-post-title.editing");
        var aP = a.getCetEditorContent();
        var aQ = b.id;
        if (aU.value == "") {
            aU.value = TXT_LayersList_NoTitle;
        }
        var aT = aU.value;
        if (b.id === BV_TEMPORARY_MARKER_ID) {
            c(aT, aP, BV_DefaultProjectID, 0, aR);
        } else {
            aN(aQ, aT, aP, aR);
        }
        return true;
    }
    function ax(aP) {
        var aQ = document.getElementById(X.postprefix + BV_TEMPORARY_MARKER_ID);
        if (aQ) {
            aQ.id = X.postprefix + aP;
        }
    }
    function aN(aS, aX, aP, aT) {
        var aR = null;
        if (b.type !== "selection") {
            aR = BV_GetMarkerByID(aS);
            aR.sTitle = aX;
            aR.sText = aP;
            BV_oBubbledMarker.sTitle = aX;
            BV_oBubbledMarker.sText = aP;
        } else {
            b.title = aX;
            b.content = aP;
            aR = b;
        }
        aX = encodeKotar(aX);
        aP = encodeKotar(aP);
        if (b.showprojects) {
            var aQ = document.getElementsByClassName("cetwall-post-project-list")[0];
            if (aQ) {
                var aW = aQ.options[aQ.selectedIndex].value;
                BV_oBubbledMarker.nProjectID = aW;
            }
        }
        var aU = 0;
        if (b.showorder) {
            var aQ = document.getElementById("cetwall-post-txtorder");
            if (aQ) {
                aU = aQ.value;
                BV_oBubbledMarker.nOrder = aU;
            }
        }
        var aV = new Array({
            name: "type",
            value: b.type
        },{
            name: "id",
            value: aS
        },{
            name: "title",
            value: aX
        },{
            name: "body",
            value: aP
        },{
            name: "projectid",
            value: aW
        },{
            name: "order",
            value: aU
        });
        callAppKotarCommandPost("bookextensions.update", aV, {
            onSuccessFunction: at,
            onFailureFunction: ar,
            marker: aR,
            type: b.type,
            isclosing: aT
        }, false);
    }
    function c(aX, aP, aW, aT, aQ) {
        aX = encodeKotar(aX);
        aP = encodeKotar(aP);
        var aS = BookPageState_GetPageID(BV_oBubbledMarker.nPageIndex);
        var aR = BV_GetTempMarkerInPage(aS);
        var aV = UTILS_GetMarkerLogicalPos(aR);
        var aU = new Array({
            name: "SerType",
            value: 2
        },{
            name: "nBookID",
            value: BV_nBookID
        },{
            name: "nPageID",
            value: aS
        },{
            name: "nLeft",
            value: aV.nLeft
        },{
            name: "nTop",
            value: aV.nTop
        },{
            name: "nWidth",
            value: aV.nWidth
        },{
            name: "nHeight",
            value: aV.nHeight
        },{
            name: "sType",
            value: BV_oBubbledMarker.sType
        },{
            name: "sSubType",
            value: BV_oBubbledMarker.sSubType
        },{
            name: "sTitle",
            value: aX
        },{
            name: "sBody",
            value: aP
        },{
            name: "nProjectID",
            value: aW
        },{
            name: "nAudience",
            value: BV_oBubbledMarker.nAudience
        },{
            name: "nOrder",
            value: aT
        });
        callAppKotarCommandPost("BookExtensions.Add", aU, {
            onSuccessFunction: at,
            onFailureFunction: ar,
            newmarker: aU,
            type: BV_oBubbledMarker.sType,
            isclosing: aQ
        });
    }
    function at(aU, aQ) {
        var aR = null;
        if (aQ.marker != null) {
            aR = aQ.marker;
        } else {
            if (aQ.newmarker != null) {
                if (BV_oBubbledMarker == null || BV_oBubbledMarker.name == "BV_oMarker_" + BV_TEMPORARY_MARKER_ID) {
                    aR = BV_GetTempMarkerInPage(aQ.newmarker[2].value);
                } else {
                    aR = BV_oBubbledMarker;
                }
                if (aQ.isclosing) {
                    aR = BV_GetTempMarkerInPage(aQ.newmarker[2].value);
                    aR.nPageIndex = BookPageState_GetPageIndex(aR.nPageID);
                }
                var aT = JSON.parse(aU);
                var aV = decodeKotar(decodeURIComponent(aQ.newmarker[9].value));
                var aP = decodeKotar(decodeURIComponent(aQ.newmarker[10].value));
                aR.sTitle = aV;
                aR.sText = aP;
                aR.sSubType = aQ.newmarker[8].value;
                aR.bIsPublished = (aQ.newmarker[12].value == BV_AUDIENCE_EVERYONE_ELSE);
                aR.nAudience = aQ.newmarker[12].value;
                aR.nOrder = aQ.newmarker[13].value;
                aR.name = "BV_oMarker_" + aT.ID;
                aR.nMarkerID = aT.ID;
                aR.bModified = false;
                ax(aT.ID);
                MarkersMgr_SetMarkerIdToTemporaryMarker(aR);
            }
        }
        if (aQ.type !== "selection") {
            MarkersMgr_UpdateMarker(aR);
            if (!aQ.isclosing) {
                BV_SetMarkerBackgroundImage_Active(aR);
            }
        } else {
            WordsSelectionMgr_UpdateSelection(aR);
        }
        ShowAjaxNotification(TXT_TheNote + " " + TXT_fSaved + " " + TXT_Successfully);
        var aS = null;
        g();
        if (aQ.isclosing) {
            if (b != null) {
                aS = X.postprefix + b.id;
            } else {
                aS = X.postprefix + aR.nMarkerID;
            }
        } else {
            aS = X.postprefix + aR.nMarkerID;
            BV_bInBubbleEditMode = false;
            BV_bMarkerSelected = false;
            BV_bInNewMarkerState = false;
        }
        X.wall.refreshPost(aS);
    }
    function ar() {
        ShowAjaxNotification(TXT_ServerError);
        BV_DeleteTemporaryMarker();
    }
    function U(aP) {
        var aQ = true;
        if (aP.target.classList.contains("disabled") || (aP.target.parentNode && aP.target.parentNode.classList.contains("disabled"))) {
            aQ = false;
        }
        return aQ;
    }
    function al(aX, aR) {
        var aS = document.getElementById(aR.pid);
        if (aS.dataset.loaded == "true") {
            return false;
        }
        var aV = [];
        var aY = JSON.parse(aX).value;
        var a0 = [];
        if (aY.taskManageInfos != null) {
            for (var aU = 0; aU < aY.taskManageInfos.length; aU++) {
                var aZ = aY.taskManageInfos[aU];
                a0.push("<a href='", aZ.url, "' target='_blank'>", aZ.schoolName, " ", aZ.groupName, "</a>");
                if (aU < aY.taskManageInfos.length - 1) {
                    a0.push(", ");
                }
            }
        }
        var aT = LMSTasks_FixLMSUrl(aY.taskViewUrl);
        aV.push("<div class='cetwall-post-metadata'>", "<div class='cetwall-post-date'>", W(aY.createDate), "</div>", "<div class='cetwall-post-lms-teachername'>", TXT_Teacher, ": ", "</div>", "<div class='cetwall-post-lms-owner'>", aY.teacherName, "</div>", "<div class='cetwall-clear'></div>", "<div class='cetwall-post-lms-title' data-url='", aT, "' >", aY.taskName, "</div>", "</div>", "<div class='cetwall-clear'></div>", "<div class='cetwall-post-content'>", "<div class='cetwall-clear'></div>", "<div class='cetwall-post-lms-status-title'>", TXT_LMS_Status, ":</div>", "<div class='cetwall-post-lms-status'>", aY.numberOfStartedStudents, " ", TXT_NumberOfStartedStudents, " , ", aY.numberOfSubmittedStudents, " ", TXT_NumberOfSubmittedStudents, " , ", aY.numberOfMarkedStudents, " ", TXT_NumberOfMarkedStudents, "</div>", "<div class='cetwall-clear'></div>", "<div class='cetwall-post-lms-schedule-title'>", TXT_LMS_Schedule, ":</div>", "<div class='cetwall-post-lms-schedule'>", W(aY.startDate), "-", W(aY.endDate), "</div>", "<div class='cetwall-clear'></div>", "<div class='cetwall-post-contentwarrper'>", "<div class='cetwall-post-lms-guidelines-title'>", TXT_LMS_Guidelines, ":</div>", cet.pluginsViewManager.render(aY.guidelines), "</div>", "<div class='cetwall-clear'></div>", "<div class='cetwall-post-lms-tasksmanger-title'>", TXT_LMS_Tasksmanger, ":</div>", "<div class='cetwall-post-lms-tasksmanger'>", a0.join(""), "</div>", "</div>");
        var aW = X.wall.GetPostByID(aR.pid);
        var aP = document.getElementById("cetwall-post-lms-container-" + aR.pid);
        if (aP !== null) {
            var aQ = aV.join("");
            aP.innerHTML = aQ;
            aW.cache = aQ;
        }
        aS.dataset.loaded = true;
    }
    function aj(aZ, aR) {
        var aS = document.getElementById(aR.pid);
        if (aS.dataset.loaded == "true") {
            return false;
        }
        var aX = [];
        var a0 = JSON.parse(aZ).value;
        var aT = [];
        if (a0.feedback != null) {
            aT.push("<div class='cetwall-post-lms-feedback-title'>", TXT_LMS_Feedback, ":</div>", "<div class='cetwall-post-lms-feedback'>", a0.feedback, "</div>", "<div class='cetwall-clear'></div>");
        }
        var aW = [];
        if (a0.mark !== null && a0.hideGrade == false) {
            aW.push("<div class='cetwall-post-lms-mark-title'>", TXT_LMS_Mark, ":</div>", "<div class='cetwall-post-lms-mark'>", a0.mark, "</div>", "<div class='cetwall-clear'></div>");
        }
        var aV = [];
        if (a0.feedback === null && a0.mark === null) {
            aV.push("<div class='cetwall-post-lms-contentwarrper'>", "<div class='cetwall-post-lms-guidelines-title'>", TXT_LMS_Guidelines, ":</div>", cet.pluginsViewManager.render(a0.guidelines), "</div>", "<div class='cetwall-clear'></div>");
        }
        var aU = LMSTasks_FixLMSUrl(a0.taskViewUrl);
        aX.push("<div class='cetwall-post-lms-progressicon' style=background-image:url('", a0.progressIconUrl, "')></div>", "<div class='cetwall-post-metadata'>", "<div class='cetwall-post-date'>", W(a0.createDate), "</div>", "<div class='cetwall-post-lms-teachername'>", TXT_Teacher, ": ", "</div>", "<div class='cetwall-post-lms-owner'>", a0.teacherName, "</div>", "<div class='cetwall-clear'></div>", "<div class='cetwall-post-lms-title' data-url='", aU, "' >", a0.taskName, "</div>", "</div>", "<div class='cetwall-clear'></div>", "<div class='cetwall-post-content'>", "<div class='cetwall-clear'></div>", "<div class='cetwall-post-lms-status-title'>", TXT_LMS_Status, ":</div>", "<div class='cetwall-post-lms-status ", (a0.isLate ? "late" : ""), "'>", a0.progressStatusLocalized, "</div>", "<div class='cetwall-clear'></div>", aT.join(""), aW.join(""), aV.join(""), "</div>");
        var aY = X.wall.GetPostByID(aR.pid);
        var aP = document.getElementById("cetwall-post-lms-container-" + aR.pid);
        if (aP !== null) {
            var aQ = aX.join("");
            aP.innerHTML = aQ;
            aY.cache = aQ;
        }
        aS.dataset.loaded = true;
    }
    function ak() {
        console.log("ERROR");
    }
    function L(aQ) {
        var aR = X.wall.GetPostByID(aQ);
        var aP = new Array({
            name: "sTaskID",
            value: aR.taskid
        });
        callAppKotarCommand("BookExtensions.GetNoteTask", aP, {
            onSuccessFunction: ah,
            onFailureFunction: ak,
            pid: aQ
        });
    }
    function ah(aQ, aP) {
        if (BV_bIsTeacher) {
            al(aQ, aP);
        } else {
            aj(aQ, aP);
        }
    }
    function W(aP) {
        date = new Date(aP);
        return ZeroPad(date.getDate(), 2) + "." + ZeroPad(date.getMonth() + 1, 2) + "." + date.getFullYear();
    }
    X.GetPosts = I;
    X.ShowPost = aF;
    X.ResetPostCache = ap;
    X.IsReady = V;
    X.OnPostClick = Z;
    X.GroupClick = N;
    X.FilterClick = x;
    X.SetSelected = aD;
    X.Closing = m;
    X.UnSelectPosts = aJ;
    X.SortPosts = aH;
    X.getTask = L;
    X.removePost = af;
    X.GetActivePost = y;
}
)(MarkerPostManager || (MarkerPostManager = {}));
var cet = cet || {};
(function(ac) {
    var Y = null;
    var K = [];
    var m = [];
    var I = [];
    var S = -1;
    var z = [];
    var J = [];
    var b = [];
    var G = 0;
    var W = 0;
    var af = 0;
    var a = "@@@";
    ac.iscroll = null;
    ac.hasPosts = false;
    function A(ah) {
        K = ah.providers;
        g();
        for (var ag = 0; ag < K.length; ag++) {
            B(K[ag], 1);
        }
    }
    function U() {
        document.addEventListener("draweritemloaded", function(ag) {
            V();
            document.removeEventListener("draweritemloaded", arguments.callee);
            setTimeout(function(ah) {
                X();
            }, 250);
        });
        MasterDrawer.Open({
            html: "<div id='bookwall' style='height: 100%'></div>",
            minwidth: 200,
            title: "",
            tabclass: "bookwall",
            resizecallback: R,
            closecallback: h
        });
    }
    function V(ai, ag) {
        var ah = "";
        if (ai && ag) {
            ah = ai + ag;
            T(ag);
        }
        if (!D()) {
            f();
        } else {
            ab(ag);
            ac.iscroll.refresh();
        }
        if (ah !== "") {
            setTimeout(function(aj) {
                var ak = t(aj);
                if (ak != null) {
                    ak.manager.SetSelected(ak, aj);
                }
                ac.iscroll.scrollToElement("#" + aj, 150, null, true);
            }, 250, ah);
        }
    }
    function R() {
        setTimeout(function() {
            ac.iscroll.refresh();
            for (var ag = 0; ag < K.length; ag++) {
                var ah = K[ag].GetActivePost();
                if (ah != null) {
                    ac.iscroll.scrollToElement(ah);
                }
            }
        }, 0);
    }
    function h() {
        for (var ag = 0; ag < K.length; ag++) {
            K[ag].Closing();
        }
    }
    function B(ah, ag) {
        if (ag > 20 || ah.IsReady()) {
            C(ah);
        } else {
            setTimeout(function(ai) {
                B(ai.provider, ai.attempt + 1);
            }, 500, {
                provider: ah,
                attempt: ag
            });
        }
    }
    function ad() {
        var ah = false;
        for (var ag = 0; ag < K.length; ag++) {
            ah = ah || K[ag].IsReady();
        }
        return ah;
    }
    function C(aj) {
        aj.wall = cet.wall;
        var ai = aj.GetPosts();
        if (!cet.wall.hasPosts) {
            cet.wall.hasPosts = aj.hasPosts;
        }
        for (var ag = 0; ag < ai.length; ag++) {
            var ah = ai[ag];
            if (ah.filterby != null) {
                if (!k(m, ah.filterby.text)) {
                    m.push(ah.filterby);
                    I[ah.filterby.text] = new Array();
                }
                I[ah.filterby.text].push(ah);
            }
            if (ah.groupby != null) {
                if (!k(z, ah.groupby.text)) {
                    z.push(ah.groupby);
                    J[ah.groupby.text] = new Array();
                }
                J[ah.groupby.text].push(ah);
            }
            b.push(ah);
        }
        m.sort(H);
        z.sort(H);
        if (S === -1 || S > m.length - 1) {
            S = m.length > 0 ? 0 : -1;
        }
    }
    function c() {
        var ah = document.getElementById("cetwall-head");
        var ag = document.getElementById("cetwall-content");
        TouchUtils.EventStart.forEach(function(ai) {
            ag.addEventListener(ai, function(aj) {
                W = ac.iscroll.y;
            });
        });
        TouchUtils.EventEnd.forEach(function(ai) {
            ah.addEventListener(ai, function(aj) {
                aj = TouchUtils.NormalizeEvent(aj);
                if (aj.button === 0) {
                    E(aj);
                }
            });
            ag.addEventListener(ai, function(aj) {
                if (ae()) {
                    aj = TouchUtils.NormalizeEvent(aj);
                    if (aj.button === 0) {
                        F(aj);
                        ac.iscroll.refresh();
                    }
                }
            });
        });
        if (cet && cet.display && cet.display.change && typeof (cet.display.change) === "function") {
            cet.display.change(function() {
                if (cet.display.mode() === "fullscreen") {
                    af = ac.iscroll.y;
                } else {
                    ac.iscroll.scrollTo(0, af);
                }
            });
        }
    }
    function f() {
        if (D()) {
            return;
        }
        Y = document.getElementById("bookwall");
        var ag = [];
        ag.push("<div id='cetwall'>", "<div id='cetwall-head'>", x(), "</div><div id='cetwall-content'><div id='cetwall-scrollablecontent'>", w(), "</div></div>", "</div>");
        Y.innerHTML = ag.join("");
        n(Y);
        var aj = document.getElementById("cetwall-content");
        echo.init({
            element: aj,
            offset: 100,
            throttle: 250,
            unload: false,
            callback: function(ak, al) {}
        });
        c();
        var ah = /android/i.test(navigator.userAgent);
        var ai = {
            scrollbars: true,
            mouseWheel: true,
            mouseWheelSpeed: 100,
            interactiveScrollbars: true,
            disableMouse: true,
            probeType: 3,
            preventWrapperScroll: true,
            preventDefaultException: {
                className: /(^|\s)editing(\s|$)/,
                tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|IMG|A)$/
            },
            preventDefault: ah
        };
        if (is_mobile) {
            ai.click = true;
        }
        ac.iscroll = new IScroll("#cetwall-content",ai);
        ac.iscroll.on("scroll", function() {
            echo.myrender();
        });
    }
    function ab(ag) {
        if (ag) {
            T(ag);
            if (!d(true)) {
                e();
            }
        }
    }
    function x() {
        var ah = [];
        ah.push("<div id='cetwall-head-filters'>");
        for (var ai = 0; ai < m.length; ai++) {
            var ag = m[ai];
            ah.push("<span class='cetwall-head-filter ", (ai == S ? "filter-selected" : ""), "' data-filter='", ai, "'>", ag.text, "</span>");
        }
        ah.push("</div><div id='cetwall-head-menu'></div>");
        return ah.join("");
    }
    function w() {
        var ai = [];
        var am = b;
        z.length = 0;
        if (S === -1 || S > m.length - 1) {
            S = m.length > 0 ? 0 : -1;
        }
        if (m.length > 0 && S >= 0) {
            am = I[m[S].text];
        }
        for (var aj = 0; aj < am.length; aj++) {
            var al = am[aj];
            var ah = a;
            if (al.show != false) {
                if (al.groupby != null) {
                    ah = al.groupby.text;
                }
                if (!k(z, ah)) {
                    z.push(al.groupby);
                    J[ah] = new Array();
                }
                J[ah].push(al);
            }
        }
        z.sort(H);
        G = 0;
        for (var ak = 0; ak < z.length; ak++) {
            var ag = z[ak];
            ai.push("<div class='cetwall-group' data-order='", ag.order, "'><div class='cetwall-grouphead' data-order='", ag.order, "'>", (ag.text === a ? "" : ag.text), "</div>");
            ai.push("<div id='cetwall-postsbygroup-", ag.order, "'>");
            ai.push(v(J[z[ak].text]));
            ai.push("</div></div>");
        }
        return ai.join("");
    }
    function s(ah) {
        var ag = TXT_Page + " " + BookPageState_GetPageLabel(ah);
        var ai = [];
        ai.push("<div class='cetwall-group' data-order='", ah, "'><div class='cetwall-grouphead' data-order='", ah, "'>", (ag === a ? "" : ag), "</div>");
        ai.push("<div id='cetwall-postsbygroup-", ah, "'>");
        ai.push(v(J[ag]));
        ai.push("</div></div>");
        return ai.join("");
    }
    function q(ag) {
        var ai = [];
        var al = b;
        var ah = [];
        if (S >= 0) {
            al = I[m[S].text];
        }
        for (var aj = 0; aj < al.length; aj++) {
            var ak = al[aj];
            if (ak.groupby != null && ak.groupby.order === ag) {
                ah.push(ak);
            }
        }
        var ai = v(ah);
        return ai;
    }
    function v(aj) {
        var ag = [];
        if (aj) {
            var ai = aj[0];
            aj.sort(ai.manager.SortPosts);
            for (var ah = 0; ah < aj.length; ah++) {
                var ai = aj[ah];
                ag.push(ai.Render(G % 2 === 0));
                G++;
            }
        }
        return ag.join("");
    }
    function M() {
        var ag = document.getElementById("cetwall-scrollablecontent");
        if (ag != null) {
            ag.innerHTML = w();
            echo.myrender();
            n(ag);
            setTimeout(function() {
                ac.iscroll.refresh();
            }, 100);
        }
    }
    function O() {
        var ag = document.getElementById("cetwall-head");
        if (ag != null) {
            ag.innerHTML = x();
        }
    }
    function T(ah) {
        for (var ag = 0; ag < b.length; ag++) {
            if (b[ag].id === ah) {
                S = o(b[ag].filterby.text);
                break;
            }
        }
    }
    function L(ah) {
        g();
        for (var ag = 0; ag < K.length; ag++) {
            B(K[ag], 1);
        }
        if (ah) {
            O();
            M();
        }
    }
    function N(ah, ak) {
        if (Y != null) {
            var al = S;
            g();
            for (var ai = 0; ai < K.length; ai++) {
                B(K[ai], 1);
            }
            S = al;
            var ag = document.getElementById("cetwall-postsbygroup-" + ah);
            if (ag) {
                ag.innerHTML = q(ah);
                if (ak) {
                    var aj = t(ak);
                    if (aj != null) {
                        aj.manager.SetSelected(aj, ak);
                    }
                }
                echo.myrender();
            }
        }
    }
    function P(ai) {
        if (Y != null) {
            var aj = S;
            g();
            for (var ag = 0; ag < K.length; ag++) {
                B(K[ag], 1);
            }
            S = aj;
            if (ai) {
                var ah = t(ai);
                if (ah != null) {
                    ah.manager.SetSelected(ah, ai);
                }
            }
            echo.myrender();
        }
    }
    function d(ag) {
        var ah = document.querySelectorAll(".cetwall-head-filter");
        if (ag || (m.length != ah.length)) {
            O();
            M();
            return true;
        } else {
            return false;
        }
    }
    function e() {
        var ah = BV_oBubbledMarker.nPageIndex;
        var ag = document.getElementById("cetwall-postsbygroup-" + ah);
        if (ag === null) {
            var ai = document.querySelectorAll(".cetwall-group");
            var ak = -1;
            var al = "";
            var ag = null;
            for (var aj = 0; aj < ai.length; aj++) {
                ag = ai[aj];
                if (parseInt(ag.dataset.order) > ak && parseInt(ag.dataset.order) > ah) {
                    ak = parseInt(ag.dataset.order);
                    al = "beforebegin";
                    break;
                } else {
                    if (parseInt(ag.dataset.order) > ak && parseInt(ag.dataset.order) < ah) {
                        ak = parseInt(ag.dataset.order);
                        al = "afterend";
                    } else {
                        break;
                    }
                }
            }
            if (ag != null) {
                ag.insertAdjacentHTML(al, s(ah));
            }
        }
    }
    function D() {
        var ag = document.getElementById("cetwall");
        if (ag === null) {
            return false;
        } else {
            return true;
        }
    }
    function i(aj) {
        var ai = o(aj);
        var ah = document.querySelectorAll(".cetwall-head-filter");
        var ag = ah[ai];
        if (S != ai) {
            S = ai;
            M();
            Z();
            ag.classList.add("filter-selected");
            setTimeout(function() {
                X();
            }, 100);
        }
    }
    function j(aj) {
        var ai = null;
        var ag = -1;
        for (var ah = 0; ah < b.length; ah++) {
            ai = b[ah];
            if (ai.id === aj) {
                break;
            }
        }
        if (ai != null) {
            ai.manager.removePost(ai.id);
            ag = ai.groupby.order;
        }
        this.hasPosts = false;
        var al = S;
        var ak = m.length;
        L(false);
        S = al;
        if (!this.hasPosts) {
            MasterDrawer.Close(true);
        } else {
            if (!l(S) || ak != m.length) {
                S = 0;
                d(true);
            } else {
                if (!y(ag, m[S].order)) {
                    Q(ag);
                }
            }
        }
    }
    function Q(ah) {
        var ag = document.querySelector(".cetwall-grouphead[data-order='" + ah + "']");
        if (ag) {
            ag.parentElement.removeChild(ag);
            R();
        }
    }
    function y(aj, ag) {
        var ai = "";
        for (var al = 0; al < z.length; al++) {
            var ah = z[al];
            if (ah.order == aj) {
                ai = ah.text;
                break;
            }
        }
        if (ai == "") {
            return false;
        } else {
            var an = J[ai];
            for (var ak = 0; ak < an.length; ak++) {
                var am = an[ak];
                if (am.filterby.order == ag) {
                    return true;
                }
            }
            return false;
        }
    }
    function l(ag) {
        return (m[ag] !== undefined);
    }
    function g() {
        b.length = 0;
        m.length = 0;
        z.length = 0;
        I.length = 0;
        J.length = 0;
    }
    function H(ag, ah) {
        var ai = 0;
        if (ag.order < ah.order) {
            ai = -1;
        } else {
            if (ag.order > ah.order) {
                ai = 1;
            }
        }
        return ai;
    }
    function k(ag, ai) {
        for (var ah = 0; ah < ag.length; ah++) {
            if (ag[ah].text === ai) {
                return true;
            }
        }
        return false;
    }
    function Z() {
        var ag = document.querySelectorAll(".cetwall-head-filter");
        for (var ah = 0; ah < ag.length; ah++) {
            ag[ah].classList.remove("filter-selected");
        }
    }
    function o(ah) {
        var ai = 0;
        for (var ag = 0; ag < m.length; ag++) {
            if (m[ag].text === ah) {
                ai = ag;
                break;
            }
        }
        return ai;
    }
    function n(ai) {
        var ah = ai.getElementsByTagName("a");
        for (var aj = 0; aj < ah.length; aj++) {
            var ag = ah[aj];
            if (ag.target !== "_blank") {
                ag.target = "_blank";
            }
        }
    }
    function aa(ah) {
        var ai = true;
        for (var ag = 0; ag < K.length; ag++) {
            if (!K[ag].UnSelectPosts(ah)) {
                ai = false;
            }
        }
        return ai;
    }
    function X() {
        var ag = BV_nTopPageInView;
        if (is_IOS) {
            ag = MasterDrawer.GetBookOriginalPageNum();
        }
        for (var ai = ag; ai >= 0; ai--) {
            var ah = document.querySelector(".cetwall-grouphead[data-order='" + ai + "']");
            if (ah != null) {
                ac.iscroll.scrollToElement(ah, 0);
                echo.myrender();
                break;
            }
        }
        if (ai < 0) {
            ac.iscroll.scrollTo(0, 0);
        }
    }
    function ae() {
        var ah = true;
        if (W !== 0) {
            var ag = ac.iscroll.y;
            if (Math.abs(ag - W) > 5) {
                ah = false;
            }
        }
        W = 0;
        return ah;
    }
    function E(ag) {
        ag.preventDefault();
        var ah = ag.target;
        for (var ai = 0; ai < K.length; ai++) {
            K[ai].UnSelectPosts(true);
        }
        if (ah.classList.contains("cetwall-head-filter")) {
            var aj = ah.dataset.filter;
            if (m.length > aj) {
                S = aj;
                M();
                Z();
                ah.classList.add("filter-selected");
                setTimeout(function() {
                    X();
                }, 100);
            }
        }
    }
    function p(ag) {
        for (var ah = 0; ah < b.length; ah++) {
            var ai = b[ah];
            if (ai.filterby.text === ag.text) {
                ai.manager.FilterClick();
                break;
            }
        }
    }
    function F(ag) {
        var aj = u(ag.target);
        if (aj != null) {
            var ai = t(aj.id);
            if (ai != null) {
                ai.manager.OnPostClick(ag, ai, aj);
            }
        } else {
            var ah = r(ag.target);
            if (ah != null) {
                aj = u(ah.nextElementSibling.firstChild);
                var ai = t(aj.id);
                if (ai != null) {
                    ai.manager.GroupClick(ah);
                }
            }
        }
    }
    function t(ai) {
        var aj = null;
        var ah = null;
        for (var ag = 0; ag < b.length; ag++) {
            ah = b[ag];
            if (ah.manager.postprefix + ah.id === ai) {
                aj = ah;
                break;
            }
        }
        return aj;
    }
    function u(ah) {
        var ai = null;
        var ag = ah;
        while (ag != null) {
            if (ag.classList.contains("cetwall-post")) {
                ai = ag;
                ag = null;
            } else {
                if (ag.parentElement != null) {
                    ag = (ag.parentElement.id === "cetwall-content" ? null : ag.parentElement);
                } else {
                    ag = null;
                }
            }
        }
        return ai;
    }
    function r(ag) {
        var ah = null;
        if (ag.classList.contains("cetwall-grouphead")) {
            ah = ag;
        }
        return ah;
    }
    ac.Init = A;
    ac.ShowPost = V;
    ac.resize = R;
    ac.refresh = L;
    ac.closing = h;
    ac.refreshGroup = N;
    ac.GetPostByID = t;
    ac.UnSelectPosts = aa;
    ac.Show = U;
    ac.SyncToCurrentPage = X;
    ac.correctFilter = i;
    ac.wallready = ad;
    ac.DeletePost = j;
    ac.refreshPost = P;
}
)(cet.wall || (cet.wall = {}));

/** ========== kotarapp\system\js\miniscroll.js ========== **/
var MiniScroll = MiniScroll || {};
MiniScroll.IsVisible = false;
(function(g) {
    var h = false;
    var j = 750;
    var c = null;
    var b = null;
    function d() {
        var l = document.createElement("div");
        l.id = "miniscroll";
        l.innerHTML = '<div id="up" class="button"></div><div id="down" class="button"></div>';
        return l;
    }
    function a() {
        c.addEventListener("mousedown", function(l) {
            h = true;
            j = 750;
            var m = l.srcElement ? l.srcElement : l.target;
            i(m);
            j = 100;
        });
        c.addEventListener("mouseup", function(l) {
            for (var m = 0; m < b.length; m++) {
                b[m].style.backgroundPosition = "";
            }
            h = false;
        });
        c.addEventListener("mouseleave", function(l) {
            for (var m = 0; m < b.length; m++) {
                b[m].style.backgroundPosition = "";
            }
            h = false;
        });
    }
    function i(l) {
        if (h) {
            switch (l.id) {
            case "down":
                BookScroll.ScrollTop(window.pageYOffset + SCROLL_ARROW_DELTA);
                l.style.backgroundPosition = "-51px 0";
                break;
            case "up":
                BookScroll.ScrollTop(window.pageYOffset - SCROLL_ARROW_DELTA);
                l.style.backgroundPosition = "-17px 0";
                break;
            }
            setTimeout(function(m) {
                i(m);
            }, j, l);
        }
    }
    function f() {
        document.body.appendChild(d());
        c = document.getElementById("miniscroll");
        b = c.querySelectorAll("div");
        a();
    }
    function e() {
        c.style.visibility = "hidden";
        MiniScroll.IsVisible = false;
    }
    function k() {
        c.style.visibility = "visible";
        MiniScroll.IsVisible = true;
    }
    g.Init = f;
    g.Show = k;
    g.Hide = e;
}
)(MiniScroll);

/** ========== kotarapp\viewer\js\onload\bookevents.js ========== **/
var lastBookScrollTop = 0;
var currBookScrollTop = 0;
var bookticking = false;
var SetBookPagesDisplayTimeout = -1;
var SetDocumentEventsTimeout = -1;
var SCROLL_DELTA_ALLOW = 70;
var scrollDirectionDown = true;
var stopDraging = false;
var EmbededIsDragged = false;
var book_holdtimer = null;
var book_startEventX = -1;
var book_startEventY = -1;
var book_startPageIdx = -1;
var book_setautomouseselection = false;
var book_pinchStartDistance = -1;
var book_pinchUpdatedDistance = -1;
var book_orientation;
var _originalSize;
var hideAllTimeout;
var keys = {
    PAGEUP: 33,
    PAGEDOWN: 34,
    END: 35,
    HOME: 36,
    UP: 38,
    DOWN: 40
};
var SCROLL_ARROW_DELTA = 90;
var SCROLL_PAGE_DELTA = BV_nPageImageHeight + 10;
function setBookOrientation() {
    book_orientation = window.clientWidth() > window.clientHeight() ? "landscape" : "portrait";
}
function BookEvents_Wire() {
    AttachDocuemntEvents();
    document.addEventListener("scroll", function(a) {
        book_OnScroll(a);
    });
    $BookWrapper = $("#bookwrapper");
    if (isIE && ieVer <= 9) {
        $BookWrapper.keydown(function(a) {
            return book_OnKeyDown(a);
        });
    }
    if (is_phone) {
        setTimeout(function() {
            setBookOrientation();
        }, 500);
    }
}
function book_OnScroll(a) {
    if (!zooming) {
        currBookScrollTop = window.pageYOffset;
        Book_ReuqestTick();
        if (!BookScroll.Visible) {
            BookScroll.Show();
        }
        BookScroll.SetScrollIndicatorLocation(true, currBookScrollTop);
        if (Toolbar && !Toolbar.preventToolbarHide && is_phone) {
            BookScroll.scrolling = true;
            Toolbar.HideAll();
        }
    }
    if (is_IOS && MasterDrawer) {
        MasterDrawer.FixDrawerPosition(true);
    }
}
function Book_ReuqestTick() {
    if (!bookticking) {
        if (!is_IOS) {
            DettachDocuemntEvents();
        }
        setTimeout(book_ScrollUpdate, 150);
    }
    bookticking = true;
}
function book_ScrollUpdate() {
    bookticking = false;
    clearTimeout(SetDocumentEventsTimeout);
    SetDocumentEventsTimeout = setTimeout(function() {
        AttachDocuemntEvents();
    }, 200);
    if (BV_sActiveTool === BV_SELECT) {
        BV_UpdateStartWordSelection(currBookScrollTop - lastBookScrollTop);
    }
    if (Math.abs(currBookScrollTop - lastBookScrollTop) < SCROLL_DELTA_ALLOW) {
        return false;
    }
    if (zooming) {
        BookScroll.bookHeight = null;
    }
    if (currBookScrollTop - lastBookScrollTop >= 0 || zooming) {
        scrollDirectionDown = true;
    } else {
        scrollDirectionDown = false;
    }
    lastBookScrollTop = currBookScrollTop;
    clearTimeout(SetBookPagesDisplayTimeout);
    SetBookPagesDisplayTimeout = setTimeout(function() {
        calcPagesInView(currBookScrollTop);
        SetDisplayByPagesInVew(false);
        SetBookPagesDisplay(BV_nTopPageInView, BV_nBottomPageInView);
    }, CalcImageDisplayTimer());
}
function book_OnMouseDown(b) {
    var g = b.srcElement ? b.srcElement : b.target;
    var f = g.id;
    var d = g;
    if (is_phone && b.touches && b.touches.length === 2) {
        book_pinchStartDistance = Math.sqrt(Math.pow((b.touches[1].screenX - b.touches[0].screenX), 2) + Math.pow((b.touches[1].screenY - b.touches[0].screenY), 2));
        b.preventDefault();
        return;
    }
    while (f !== undefined && f.indexOf("BV_oPage_") == (-1) && d != null) {
        d = d.parentNode;
        if (d !== null && d.id !== undefined) {
            f = d.id;
        } else {
            d = null;
        }
    }
    if (d == null) {
        return;
    }
    var c = parseInt(d.id.replace("BV_oPage_", ""));
    if (isNaN(c)) {
        return;
    }
    var a = false;
    if (CheckPageIsOpen(d, c)) {
        a = true;
        switch (BV_sActiveTool) {
        case BV_DRAG:
            book_StartDrag(b);
            book_startEventX = b.clientX;
            book_startEventY = b.clientY;
            if (is_mobile) {
                book_holdtimer = setTimeout(function() {
                    if (BV_sActiveTool === BV_DRAG) {
                        if (!UTILS_HasCLass(g, "wordSelectionMenuFirstFloor") && !UTILS_HasCLass(g, "SelectionMenuSecondFloor")) {
                            BV_SwitchToWordSelection(b, c, true);
                        }
                    }
                }, 500);
            } else {
                book_startPageIdx = c;
                if (Utils_Closest(g, "BV_EmbededPart") === null) {
                    book_setautomouseselection = true;
                }
            }
            break;
        case BV_SELECT:
            BV_StartWordSelection(c, b);
            break;
        case BV_TOC_ENTRY:
            BV_StartSelection(c, b);
            break;
        case BV_PUSHPIN:
            BV_PlacePushpin(c, b);
            break;
        case BV_LMS_TASK:
            BV_PlaceLMSTask(c, b);
            break;
        case BV_COPY:
            BV_StartCopySelection(c, b);
            break;
        case BV_LINK:
            BV_StartLinkSelection(c, b);
            break;
        case BV_EMBEDED:
            BV_StartEmbededSelection(c, b);
            break;
        default:
            a = false;
            break;
        }
        if (a) {
            b.cancelBubble = true;
            return false;
        }
    } else {
        b.cancelBubble = true;
        return false;
    }
    return true;
}
function book_OnMouseMove(b) {
    if (b.touches && b.touches.length === 2) {
        BV_sActiveTool = null;
        book_pinchUpdatedDistance = Math.sqrt(Math.pow((b.touches[1].screenX - b.touches[0].screenX), 2) + Math.pow((b.touches[1].screenY - b.touches[0].screenY), 2));
        b.preventDefault();
        return;
    }
    switch (BV_sActiveTool) {
    case BV_DRAG:
        book_ContinueDrag(b);
        var c = b.clientX - book_startEventX;
        var d = b.clientY - book_startEventY;
        var a = Math.sqrt((c * c) + (d * d));
        if (a > 5) {
            if (is_mobile) {
                clearTimeout(book_holdtimer);
            } else {
                if (book_setautomouseselection && (b.type === "mousemove" || (b.pointerType && b.pointerType === "mouse") || (b.MSPOINTER_TYPE_MOUSE && b.pointerType === b.MSPOINTER_TYPE_MOUSE))) {
                    BV_SwitchToWordSelection(b, book_startPageIdx, false);
                }
            }
        }
        break;
    case BV_SELECT:
        b.preventDefault();
        BV_ContinueWordSelection(b);
        break;
    case BV_TOC_ENTRY:
        BV_ContinueSelection(b);
        break;
    case BV_COPY:
        BV_ContinueCopySelection(b);
        break;
    case BV_LINK:
        BV_ContinueSelection(b);
        break;
    case BV_EMBEDED:
        BV_ContinueEmbededSelection(b);
        break;
    case BV_SCROLLING:
        BookScroll.OnPointerMove(b);
        break;
    }
    return true;
}
function book_OnMouseUp(a) {
    clearTimeout(book_holdtimer);
    book_setautomouseselection = false;
    switch (BV_sActiveTool) {
    case BV_DRAG:
        book_EndDrag(a);
        break;
    case BV_SELECT:
        BV_EndWordSelection(a);
        break;
    case BV_TOC_ENTRY:
        BV_EndSelection(a);
        break;
    case BV_COPY:
        BV_EndCopySelection(a);
        break;
    case BV_LINK:
        BV_EndSelection(a);
        break;
    case BV_EMBEDED:
        BV_EndEmbededSelection(a);
        break;
    case BV_SCROLLING:
        BookScroll.OnPointerUp(a);
        break;
    }
    return true;
}
function book_StartDrag(a) {
    if (is_IOS) {
        if (!BookScroll.Visible) {
            BookScroll.Show();
        }
        BV_bOnDrag = true;
    }
}
function book_ContinueDrag(a) {
    if (BV_bOnDrag) {
        BookScroll.SetScrollIndicatorLocation(true, window.pageYOffset);
    } else {
        if (BV_oResizedMarker != null) {
            markerMouseMove(a);
        }
    }
}
function book_EndDrag(a) {
    if (BV_bOnDrag) {
        BookScroll.SetScrollIndicatorLocation(true, window.pageYOffset);
        BV_bOnDrag = false;
    } else {
        if (BV_oResizedMarker != null) {
            markerMouseUp(a);
            PreventBookClick = true;
        }
    }
}
function book_OnKeyDown(a) {
    switch (a.which) {
    case keys.PAGEUP:
        SCROLL_PAGE_DELTA = BV_nPageImageHeight + 10;
        BookScroll.ScrollTop(window.pageYOffset - SCROLL_PAGE_DELTA);
        break;
    case keys.PAGEDOWN:
        SCROLL_PAGE_DELTA = BV_nPageImageHeight + 10;
        BookScroll.ScrollTop(window.pageYOffset + SCROLL_PAGE_DELTA);
        break;
    case keys.END:
        BookScroll.ScrollTop(BookScroll.BookHeight());
        break;
    case keys.HOME:
        BookScroll.ScrollTop(0);
        break;
    case keys.UP:
        BookScroll.ScrollTop(window.pageYOffset - SCROLL_ARROW_DELTA);
        break;
    case keys.DOWN:
        BookScroll.ScrollTop(window.pageYOffset + SCROLL_ARROW_DELTA);
        break;
    default:
        return;
    }
    clearTimeout(Toolbar.ToogleToolBarTimeout);
    if (!BookScroll.Visible) {
        BookScroll.Show();
    }
    a.preventDefault();
}
if (is_phone) {
    document.addEventListener("touchend", function(a) {
        if (book_pinchStartDistance > -1 || book_pinchUpdatedDistance > -1) {
            if (book_pinchStartDistance > book_pinchUpdatedDistance) {
                ZoomOut(false);
            } else {
                ZoomIn(false);
            }
            book_pinchStartDistance = -1;
            book_pinchUpdatedDistance = -1;
            return;
        }
    });
    window.addEventListener("orientationchange", function(a) {
        _originalSize = $(window).height();
        document.getElementById("mobileScrollPagesText").blur();
        HideAjaxMessageBox();
        if (BV_nCurrentSizeStep < BV_nMaxSizeStep) {
            ZoomIn(false);
        } else {
            if (BV_nCurrentSizeStep > BV_nMinSizeStep) {
                ZoomOut(false);
            }
        }
        FitWidth();
    });
    window.addEventListener("backbutton", function() {
        alert();
    });
}

/** ========== kotarapp\viewer\js\onload\bookloader.js ========== **/
function BV_Init(nBookID, sBookDisplayName, nTotalPages, bSomePagesAreClosed, nGotoPageNum, nGotoPageOffset, nDefaultPageWidth, nDefaultPageHeight, dPageRatio, sAutoFitMode, nSizeStep, sSearchText, sViewerFilesPath, bAdminUser, bIsTeacher, bIsStudent, bIsAutherizedMember, bIsAuthenticated, sCdnDomain, nCdnServers, bHasTOC, bSupportsLayersInViewer, bShowLayersFilter, bShowLayerIcons, sBookDirection, bIsLMSable, sCetSubject, canclonenote, hasAdminOrderInMarkers, gSiteID, SessionID, gInstituteID, nSchoolID, sLanguageCode, projectKey, projectSectionKey, nDefaultProjectID, cft, hasfiller, hasKeybaord, showminiscroll, bookversiontext, platform, jsaction) {
    if (!VerifyTSParamIsValid()) {
        return;
    }
    if (location.href.indexOf(".mht") > -1 || location.href.indexOf(".htm") > -1) {
        document.querySelector("body").remove();
    }
    BV_nBookID = nBookID;
    BV_InitElementRefs();
    MarkersMgr_Init();
    BV_InitToolbar();
    BV_sBookDisplayName = ReplaceAll(sBookDisplayName, "[A]", "'");
    BV_bSomePagesAreClosed = bSomePagesAreClosed;
    BV_nTotalPages = nTotalPages;
    BV_dPageRatio = dPageRatio;
    BV_nPageDefaultImageWidth = nDefaultPageWidth;
    BV_nPageDefaultImageHeight = nDefaultPageHeight;
    BV_nCurrentSizeStep = nSizeStep;
    BV_sAutoFitMode = sAutoFitMode;
    BV_sSearchText = sSearchText;
    BV_nGotoPageNum = nGotoPageNum;
    BV_nTopPageInView = (nGotoPageNum > 0 ? nGotoPageNum - 1 : 0);
    BV_nGotoPageOffset = nGotoPageOffset;
    BV_sViewerFilesPath = sViewerFilesPath;
    BV_nScrollbarWidth = UTILS_GetScrollbarWidth();
    BV_bAdminUser = bAdminUser;
    BV_bIsTeacher = bIsTeacher;
    BV_bIsStudent = bIsStudent;
    BV_bIsAutherizedMember = bIsAutherizedMember;
    BV_nCdnServers = nCdnServers;
    BV_sCdnDomain = adjustCdnPattern(sCdnDomain);
    BV_bHasTOC = bHasTOC;
    BV_bSupportsLayersInViewer = bSupportsLayersInViewer;
    BV_bShowLayersFilter = bShowLayersFilter;
    BV_bShowLayerIcons = bShowLayerIcons;
    BV_BookDirection = sBookDirection;
    BV_IsBookDirectionRTL = BV_BookDirection === "rtl";
    BV_LanguageCode = sLanguageCode;
    LMS_IsLMSable = bIsLMSable;
    BV_CetSubject = sCetSubject;
    BV_projectKey = projectKey;
    BV_projectSectionKey = projectSectionKey;
    BV_DefaultProjectID = nDefaultProjectID;
    BV_gSiteID = gSiteID;
    BV_SessionID = SessionID;
    BV_gInstituteID = gInstituteID;
    BV_nSchoolID = nSchoolID;
    BV_Platform = platform;
    BV_ViewerClosefunction = parseInt(cft);
    BV_BookAppHasFiller = hasfiller;
    BV_BookVersionText = bookversiontext;
    BV_CanCloneNote = canclonenote;
    BV_HasAdminOrderInMarkers = hasAdminOrderInMarkers;
    BV_HasKeybaord = hasKeybaord;
    var rem_nTopPageInView = BV_nTopPageInView;
    var rem_nOffsetInPage = BV_nGotoPageOffset;
    var n = location.href.lastIndexOf("#");
    var showMarkerFromQuery = GetQueryParameterByName("ShowMarker");
    var rem_nMarkerPageNum = 0
      , rem_nMarkerID = 0;
    if (n != -1) {
        BV_sHashOnLoad = location.href.substr(n + 1);
        var aParts = BV_sHashOnLoad.split(".");
        if (aParts[0] == "ShowMarker") {
            rem_nMarkerPageNum = aParts[1];
            rem_nMarkerID = aParts[2];
        } else {
            if (showMarkerFromQuery != "") {
                var aParts = showMarkerFromQuery.split(".");
                rem_nMarkerPageNum = aParts[0];
                rem_nMarkerID = aParts[1];
            } else {
                if (aParts.length > 3) {
                    try {
                        rem_nTopPageInView = eval(aParts[0]) - 1;
                        rem_nOffsetInPage = eval(aParts[1]);
                        var zoomOrStep = (typeof (aParts[2]) == "undefined") ? BV_nCurrentSizeStep : eval(aParts[2]);
                        if (zoomOrStep <= BV_nMaxSizeStep) {
                            BV_nCurrentSizeStep = zoomOrStep;
                        }
                        BV_sAutoFitMode = (typeof (aParts[3]) == "undefined") ? sAutoFitMode : aParts[3];
                        BookPages_SetWidthAndHeightToSelectedSizeStep();
                    } catch (e) {}
                }
            }
        }
    } else {
        if (showMarkerFromQuery != "") {
            var aParts = showMarkerFromQuery.split(".");
            rem_nMarkerPageNum = aParts[0];
            rem_nMarkerID = aParts[1];
        }
    }
    if (rem_nTopPageInView == 0) {
        rem_nTopPageInView = BV_nTopPageInView;
    }
    BV_DEFAULTTOOL = BV_sActiveTool = BV_DRAG;
    BV_BookWrraper.style.cursor = "text";
    if (typeof MiniScroll !== "undefined") {
        MiniScroll.Init();
        if (showminiscroll) {
            MiniScroll.Show();
        } else {
            MiniScroll.Hide();
        }
    }
    Viewer_OnLoad(rem_nTopPageInView, rem_nOffsetInPage, bIsAuthenticated, rem_nMarkerPageNum, rem_nMarkerID, jsaction);
    MarkersMgr_Init();
    var talkbacks = getTalkbacksAPI();
    var defaults = {
        baseurl: talkbacks.environment,
        projectKey: BV_projectKey,
        projectSectionKey: BV_projectSectionKey,
        token: BaseMaster_token,
        username: BaseMaster_sUserFullName,
        langcode: BaseMaster_sLanguageCode
    };
    if (BV_BOOKWALL_ENABLED) {
        defaults.onupdated = cet.wall.resize;
    }
    if (BV_bIsTeacher && LMS_IsLMSable) {
        defaults.candelete = true;
    }
    cet.talkbacksui.init(defaults);
    document.addEventListener("keydown", function(e) {
        var nodename = e.target.nodeName.toLowerCase();
        if (e.keyCode === 8 && nodename !== "input" && nodename !== "textarea" && !e.target.isContentEditable) {
            e.preventDefault();
        }
    });
}
function BV_InitToolbar() {
    var b = ["/theme/images/toolbar/toolbar.png?v=3", "/theme/images/toolbar/kotarlogo.png", "/theme/images/toolbar/dots_Resize.png"];
    var a = 2000;
    MultipleImageLoader(b, function() {
        var c = (typeof (Viewer_IsEmbeded) != "undefined") || false;
        Toolbar.Load(document.getElementById("mytoolbar"), BV_nBookID, false, BV_Platform);
        clearTimeout(Toolbar.ToogleToolBarTimeout);
        if (is_mobile) {
            Toolbar.SetBookMarkStyle();
            BookScroll.DisplayCurrentPage();
            a = 500;
        }
        Toolbar.ToogleToolBarTimeout = setTimeout("AutoHideAll();", a);
    });
}
function AutoHideAll() {
    Toolbar.HideAll();
    BookScroll.Hide();
}
function VerifyTSParamIsValid() {
    return true;
    qs();
    var d = location.href + "";
    if (d.indexOf("#") > 1) {
        var a = d.split("#")[1].split(".");
        if (a[0] == "ShowMarker") {
            return true;
        }
        if (typeof (qsParm.ts) == "undefined") {
            d = d.replace("#", "&ts=" + getTimestamp() + "#");
            window.location.replace(d);
            return false;
        } else {
            var e = qsParm.ts.split(".");
            var b = new Date();
            b.setFullYear(e[0] * 1);
            b.setMonth(e[1] * 1);
            b.setDate(e[2] * 1);
            b.setHours(e[3] * 1);
            b.setMinutes(e[4] * 1, e[5] * 1, e[6] * 1);
            var c = new Date();
            if (Math.abs(Math.ceil(b.getTime() - c.getTime())) > 30000) {
                d = d.replace("&ts=" + qsParm.ts + "#", "&ts=" + getTimestamp() + "#");
                window.location.replace(d);
                return false;
            }
        }
    }
    return true;
}
function Bookinit_ClearBookContents() {
    if (isIE) {
        while (BV_oBook.children.length > 0) {
            BV_oBook.removeChild(BV_oBook.lastChild);
        }
    } else {
        while (BV_oBook.childNodes.length > 0) {
            BV_oBook.removeChild(BV_oBook.lastChild);
        }
    }
}
function Bookinit_InitBookPages(h, g, a, c, b) {
    var e = BV_nTotalPages;
    var f = document.createDocumentFragment();
    for (var d = 0; d < e; d++) {
        f.appendChild(bookinit_CreateBookPage(d));
    }
    BV_oBook.appendChild(f);
    BookPagesState_SetDefaultFlagsForAllPages();
    BV_bAllPagesAreLoaded = true;
    if (!BookScroll.initialized) {
        BookScroll.Init();
    }
    bookpages_ApplyNewStyleRules();
    window.setTimeout("bookinit_CompleteBookInitialization(" + h + ", " + g + ", " + a + ", " + c + ", " + b + ")", 250);
}
function bookinit_CreateBookPage(c) {
    var f = oPagesInfo.pages[c];
    aBookPagesInfo[f.pid] = c;
    if (f != null) {
        var d = UTILS_CreateElement("DIV");
        d.id = "BV_oPage_" + c;
        d.className = "BV_oImage";
        if (f.b) {
            var b = UTILS_CreateElement("DIV");
            b.id = "bookmarkTop" + c;
            b.className = "bookmarkTop " + BookmarkSizeClass();
            var a = UTILS_CreateElement("DIV");
            a.id = "bookmarkBot" + c;
            a.className = "bookmarkBot " + BookmarkSizeClass();
            d.appendChild(b);
            d.appendChild(a);
        }
        var e = UTILS_CreateElement("DIV");
        e.id = "BV_oPageWrapper_" + c;
        e.className = "BV_oPage";
        if (BV_nCurrentSizeStep == BV_nMinSizeStep) {
            e.className = "BV_oPage small";
        }
        $(e).attr("wait", TXT_PageIsLoading);
        e.appendChild(d);
        return e;
    }
}
function bookinit_CompleteBookInitialization(e, d, a, c, b) {
    if (BV_sSearchText != "") {
        if (BV_nGotoPageNum > 0) {
            Toolbar.Search.FromSearch = true;
            Toolbar.ToolbarSearchReady();
            Toolbar.Search.DoSearch(BV_sSearchText);
        } else {
            Toolbar.Search.FromSearch = true;
            Toolbar.ToolbarSearchReady();
            Toolbar.Search.DoSearch(BV_sSearchText);
        }
    } else {
        if (b > 0) {
            TOC_bCancelTocEntryAutoClickOnLoad = true;
            HideAjaxMessageBox();
            ShowAjaxImportantMessageBox(TXT_PleaseWaitMarkerIsLoading, 2500);
            MarkersMgr_LoadMarkerASAP(c, b);
        } else {
            if (e > 0) {
                TOC_bCancelTocEntryAutoClickOnLoad = true;
                BV_GotoPage(BV_nTopPageInView + 1, d);
            }
        }
    }
    ToolBar_SetAutoFitMode();
    if (BV_bAdminUser) {
        AdTools_CountPagesWithPics();
        AdTools_CountLockedPages();
    }
    LoadPendingScripts();
    BookScroll.DisplayCurrentPage();
    BookBibliography.Get();
}
function bookinit_InitTools(a) {
    BV_PrepareMarkers();
}
function BookmarkSizeClass() {
    switch (BV_nCurrentSizeStep) {
    case 8:
    case 7:
    case 6:
    case 5:
        return "large";
    case 4:
    case 3:
    case 2:
        return "medium";
    case 1:
    case 0:
        return "small";
    }
}
function getTalkbacksAPI() {
    var a = Master_TalkbackApiDomain.split("/")[2];
    var c = a.indexOf(".");
    var b = a.slice(c + 1);
    var d = a.slice(0, c);
    return {
        environment: b,
        sitekey: d
    };
}

/** ========== kotarapp\viewer\js\onload\bookscroll.js ========== **/
var BookScroll = BookScroll || {};
BookScroll.scrolling = false;
BookScroll.inGotoMode = false;
(function(f, y) {
    var Q = null;
    var x = null;
    var D = null;
    var G = null;
    var E = null;
    var a = null;
    var F = 0;
    var Z = 0;
    var V = null;
    var I = false;
    f.StopScrolling = false;
    f.initialized = false;
    f.Visible = false;
    f.IndicatorTimeout = 0;
    var P = null;
    var t = null;
    f.bookHeight = null;
    var R = null;
    var s = null;
    function v() {
        f.initialized = true;
        x = document.getElementById("ViewerIndicatorKnob");
        s = document.getElementById("ViewerIndicator");
        D = document.getElementById("scrollpagesindicator");
        F = D.offsetHeight;
        a = $("#ViewerVerticalScrollbar");
        V = document.getElementById("scrollwrapper");
        G = document.getElementById("scrollpagesindicatorText");
        pagesdivWrapp = document.getElementById("scrollpagesindicatorWrapper");
        E = document.getElementById("scrollpagesindicatorBookmark");
        if (is_mobile) {
            a.css("visibility", "hidden");
        }
        if (is_IOS) {
            s.style.width = "52px";
            D.style.width = "135px";
            G.style.display = "none";
            pagesdivWrapp.style.display = "inline-block";
        }
        Y();
        g();
        M();
        TouchUtils.EventStart.forEach(function(ad) {
            s.addEventListener(ad, function(ae) {
                ae.preventDefault();
                if (!w(ae)) {
                    G.blur();
                    O(ae);
                } else {
                    G.focus();
                }
                return false;
            });
        });
        TouchUtils.EventEnd.forEach(function(ad) {
            a.bind(ad, function(ae) {
                if (!w(ae)) {
                    U(ae);
                }
            });
        });
        V.addEventListener("mouseover", function() {
            var ad = u();
            ac();
            Y();
        });
        G.addEventListener("keypress", function(ae) {
            var ad = (ae.keyCode ? ae.keyCode : ae.which);
            if (ad == 13) {
                G.blur();
                n(ae);
            }
        });
        G.addEventListener("focus", function(ad) {
            H();
        });
        if (is_IOS) {
            G.addEventListener("blur", function(ad) {
                var ae = y.round((T() / e()) * R);
                ac(ae);
            });
            pagesdivWrapp.addEventListener("touchstart", function(ad) {
                ad.preventDefault();
                D.style.position = "absolute";
                D.style.top = T() + D.offsetTop + "px";
                G.style.display = "inline";
                pagesdivWrapp.style.display = "none";
                G.focus();
                I = true;
            });
        }
        E.addEventListener("click", function(ad) {
            if (!E.classList.contains("processing")) {
                E.classList.add("processing");
                o();
            }
        });
    }
    function o() {
        if (!BaseMaster_bUserIsLoggedIn) {
            Utils_OpenSmartLoginPapgeForRedirect(window.location.href);
            return false;
        }
        if (E.classList.contains("on")) {
            ab(false);
            h();
        } else {
            ab(true);
            b();
        }
    }
    function b() {
        var ad = BV_GetCurrentPageID();
        var ae = new Array({
            name: "nBookID",
            value: BV_nBookID
        },{
            name: "PageID",
            value: ad
        });
        callAppKotarCommand("Bookmark.Add", ae, {
            onSuccessFunction: c,
            onFailureFunction: d
        }, false);
    }
    function c() {
        aa(true);
        var af = calcPage(window.pageYOffset);
        BookPageState_SetBookmark(af, true);
        var ae = BookPageState_GetPageLabel(af);
        var ad = (R / BV_nTotalPages);
        L(ae, ad * af);
        E.classList.remove("processing");
        if (is_mobile) {
            Toolbar.SetBookMarkStyle();
            setTimeout(function() {
                Toolbar.HideAll();
            }, 1000);
        }
    }
    function d() {
        ab(false);
        E.classList.remove("processing");
    }
    function h() {
        var ad = BV_GetCurrentPageID();
        var ae = new Array({
            name: "PageID",
            value: ad
        });
        callAppKotarCommand("Bookmark.Delete", ae, {
            onSuccessFunction: j,
            onFailureFunction: k
        }, false);
    }
    function j() {
        aa(false);
        var ae = calcPage(window.pageYOffset);
        BookPageState_SetBookmark(ae, false);
        var ad = BookPageState_GetPageLabel(ae);
        K(ad);
        E.classList.remove("processing");
        if (is_mobile) {
            Toolbar.SetBookMarkStyle();
            setTimeout(function() {
                Toolbar.HideAll();
            }, 1000);
        }
    }
    function k() {
        ab(true);
        E.classList.remove("processing");
    }
    function aa(af) {
        var ag = BV_nTopPageInView;
        var ah = document.getElementById("BV_oPage_" + ag);
        if (af) {
            var ae = UTILS_CreateElement("DIV");
            ae.id = "bookmarkTop" + ag;
            ae.className = "bookmarkTop " + BookmarkSizeClass();
            var ad = UTILS_CreateElement("DIV");
            ad.id = "bookmarkBot" + ag;
            ad.className = "bookmarkBot " + BookmarkSizeClass();
            ah.appendChild(ae);
            ah.appendChild(ad);
        } else {
            var ae = document.getElementById("bookmarkTop" + ag);
            var ad = document.getElementById("bookmarkBot" + ag);
            ah.removeChild(ae);
            ah.removeChild(ad);
        }
    }
    function ab(ad) {
        if (ad) {
            E.classList.add("on");
            x.classList.add("on");
        } else {
            E.classList.remove("on");
            x.classList.remove("on");
        }
    }
    function N() {
        var af = document.querySelectorAll(".bookmarkTop");
        var ad = document.querySelectorAll(".bookmarkBot");
        var ae = BookmarkSizeClass();
        for (i = 0; i < af.length; i++) {
            af[i].className = "bookmarkTop " + ae;
        }
        for (i = 0; i < ad.length; i++) {
            ad[i].className = "bookmarkBot " + ae;
        }
    }
    function M() {
        var ad = (R / BV_nTotalPages);
        for (i = 0; i < BV_nTotalPages; i++) {
            if (oPagesInfo.pages[i].b) {
                var af = oPagesInfo.pages[i].lbl;
                var ae = ad * i;
                L(af, ae);
            }
        }
    }
    function L(af, ag) {
        var ae = 34 + ag;
        var ad = UTILS_CreateElement("DIV");
        ad.id = "bookmarkIndicator" + af;
        ad.className = "bookmarkIndicator";
        ad.style.top = ae + "px";
        a.append(ad);
        TouchUtils.EventEnd.forEach(function(ah) {
            $("#bookmarkIndicator" + af).on(ah, null, af, function(ai) {
                BV_GotoPageByLabel(ai.data);
                return false;
            });
        });
    }
    function K(ad) {
        $("#bookmarkIndicator" + ad).remove();
    }
    function H() {
        clearTimeout(f.IndicatorTimeout);
        setTimeout(function() {
            G.selectionStart = 0;
            G.selectionEnd = G.value.length;
        }, is_mobile ? 1000 : 0);
        if (is_IOS) {
            setTimeout(function() {
                var ad = document.getElementById("trFooterContainer");
                ad.style.display = "none";
                var ae = document.getElementById("mytoolbar");
                ae.style.display = "none";
                f.inGotoMode = true;
            }, 50);
        }
    }
    function w(ae) {
        var ad = TouchUtils.NormalizeEvent(ae);
        var af = G.getBoundingClientRect();
        if (ad.clientX >= af.left && ad.clientX <= af.right && ad.clientY >= af.top && ad.clientY <= af.bottom) {
            return true;
        } else {
            return false;
        }
    }
    function O(ad) {
        var ae = TouchUtils.NormalizeEvent(ad);
        mousePos = mouseCoords(ae);
        BV_SetActiveTool(BV_SCROLLING);
        AttachDocuemntEvents();
        clearTimeout(Toolbar.ToogleToolBarTimeout);
        var af = T();
        W(true, af);
        clearTimeout(f.IndicatorTimeout);
        f.scrolling = true;
        Z = mousePos.y;
    }
    function B(ad) {
        if (f.scrolling) {
            var af = (mousePos.y - Z);
            Z = mousePos.y;
            var ae = y.round(u() + af);
            if (ae < 0 || ae > R) {
                if (Z < 0 || Z > (R + t + 50)) {
                    C();
                }
                return;
            }
            s.style.top = ae + "px";
            ac(ae);
            var ag = (ae / R) * e();
            m(ag);
        }
    }
    function C(ad) {
        clearTimeout(Toolbar.ToogleToolBarTimeout);
        X(true);
        SetDisplayByPagesInVew(true);
        BV_SetActiveTool(BV_DEFAULTTOOL);
    }
    function U(ad) {
        if (!f.scrolling) {
            PreventBookClick = true;
            var af = TouchUtils.NormalizeEvent(ad);
            var ae = y.round(af.offsetY - (t / 2));
            s.style.top = ae + "px";
            X();
        }
    }
    function n(ad) {
        if (is_IOS) {
            f.inGotoMode = false;
            var ae = document.getElementById("trFooterContainer");
            ae.style.display = "";
            var ag = document.getElementById("mytoolbar");
            ag.style.display = "";
        }
        var af = ad.srcElement ? ad.srcElement : ad.target;
        if (!BV_GotoPageByLabel(af.value)) {
            ShowAjaxImportantMessageBox(TXT_NoPageWithSuchLabel + " (" + af.value + ")");
            l();
        }
    }
    function J(ad) {
        f.bookHeight = null;
        g(ad);
    }
    function T(ad) {
        var ae = 0;
        if (UTILS_IsNumeric(ad)) {
            ae = ad;
            window.scrollTo(0, ad);
        } else {
            ae = window.pageYOffset;
        }
        return y.max(0, ae);
    }
    function S() {
        return BV_BookWrraper.scrollHeight;
    }
    function l() {
        var ae = BookPageState_GetPageLabel(BV_nTopPageInView);
        var ad = document.getElementById("mobileScrollPagesText");
        pagesdivWrapp.textContent = ae;
        G.value = ae;
        if (is_phone && ad) {
            ad.value = ae;
        }
    }
    function m(ag) {
        var ae = calcPage(ag);
        var af = BookPageState_GetPageLabel(ae);
        pagesdivWrapp.textContent = af;
        G.value = af;
        var ad = BookPageState_IsBookmark(ae);
        ab(ad);
    }
    function r() {
        if (!Toolbar.Visible()) {
            a.css("visibility", "hidden");
            D.style.display = "none";
            f.Visible = false;
        }
    }
    function Y() {
        a.css("visibility", "visible");
        f.Visible = true;
    }
    function ac(ad) {
        if (I) {
            I = false;
        } else {
            D.style.display = "block";
            if (is_IOS) {
                pagesdivWrapp.style.display = "inline-block";
                G.style.display = "none";
                D.style.position = "fixed";
            }
            if (ad !== undefined) {
                D.style.top = (ad + 65) + "px";
            }
        }
    }
    function p() {}
    function q() {}
    function W(ad, ag) {
        var ah = y.round((ag / e()) * R);
        s.style.top = ah + "px";
        var af = calcPage(ag);
        var ae = BookPageState_IsBookmark(af);
        ab(ae);
        ac(ah);
        m(ag);
        if (ad) {
            clearTimeout(f.IndicatorTimeout);
        }
        f.IndicatorTimeout = setTimeout(function() {
            r();
        }, 3000);
    }
    function X(ad) {
        ad = ad || false;
        f.scrolling = false;
        var af = u();
        var ae = y.round((af / R) * e());
        if (ad) {
            var ag = calcPage(ae);
            ae = ag * BV_GetPagesPosDelta();
        }
        T(ae);
    }
    function u() {
        var ad = parseInt(s.style.top, 10);
        if (isNaN(ad)) {
            ad = 0;
        }
        return ad;
    }
    function e() {
        if (f.bookHeight === null) {
            f.bookHeight = $("#BV_oBook").height();
        }
        return f.bookHeight;
    }
    function g(ad) {
        if (f.initialized) {
            P = window.innerHeight - 50 - 25;
            V.style.height = P + "px";
            t = s.clientHeight;
            R = P - t;
            if (ad === undefined || ad) {
                W(false, window.pageYOffset);
            }
        }
    }
    function z() {
        V.style.right = "-50px";
    }
    function A() {
        V.style.right = "";
    }
    f.Init = v;
    f.Refresh = J;
    f.ScrollTop = T;
    f.ScrollHeight = S;
    f.DisplayCurrentPage = l;
    f.HasHorizontalScroll = p;
    f.HasVerticalScroll = q;
    f.Show = Y;
    f.UpdatePagesDiv = ac;
    f.Hide = r;
    f.SetScrollIndicatorLocation = W;
    f.BookHeight = e;
    f.OnPointerMove = B;
    f.OnPointerUp = C;
    f.MoveOffScreen = z;
    f.MoveOnScreen = A;
    f.Rerender_Bookmarks = N;
    f.GoToPage = n;
    f.HandleBookmark = o;
}
)(BookScroll, Math);

/** ========== kotarapp\viewer\js\onload\bookviewer.js ========== **/
function BV_InitElementRefs() {
    BV_oBook = getElement("BV_oBook");
    BV_BookWrraper = document.getElementById("bookwrapper");
    oStage = getElement("oStage");
}
function BV_UpdateBrowserLocation_OnTimer() {
    if (BV_UpdateBrowserLocation_Timer > 0) {
        window.clearTimeout(BV_UpdateBrowserLocation_Timer);
    }
    var b = BV_GetHash();
    if (!MasterPage_OnLoadFlagIsSet()) {
        return;
    }
    var a = window.location + "";
    window.location.replace(a.split("#")[0] + "#" + b);
    if (typeof (Viewer_IsEmbeded) != "undefined" && Viewer_IsEmbeded) {
        var c = window.location.href;
        Embeded_UpdateBrowserLocation(c);
    }
}
function BV_GetHash(x) {
    return (x + 1) + "." + x + "." + BV_nCurrentSizeStep + "." + BV_sAutoFitMode;
}
function BV_SetActiveTool(a) {
    if (a !== BV_SCROLLING) {
        if (a != BV_DEFAULTTOOL) {
            CloseOtherElements(a);
        }
        if (a != BV_SELECT) {
            $(BV_BookWrraper).removeClass("selecting");
        }
    }
    BV_sActiveTool = a;
    switch (a) {
    case BV_DRAG:
        BV_BookWrraper.style.cursor = "text";
        break;
    case BV_PUSHPIN:
        BV_BookWrraper.style.cursor = "pointer";
        break;
    case BV_LMS_TASK:
        BV_BookWrraper.style.cursor = "pointer";
        break;
    case BV_SELECT:
        BV_BookWrraper.style.cursor = "text";
        break;
    case BV_TOC_ENTRY:
        BV_BookWrraper.style.cursor = "crosshair";
        break;
    case BV_COPY:
        BV_BookWrraper.style.cursor = "crosshair";
        break;
    case BV_INDICATOR:
        BV_BookWrraper.style.cursor = "crosshair";
        break;
    case BV_LINK:
        BV_BookWrraper.style.cursor = "crosshair";
        break;
    case BV_EMBEDED:
        BV_BookWrraper.style.cursor = "crosshair";
        break;
    case BV_SCROLLING:
        BV_BookWrraper.style.cursor = "pointer";
        break;
    default:
        BV_BookWrraper.style.cursor = "text";
        break;
    }
    if (a == BV_SELECT) {
        $(".selectext").addClass("on");
    } else {
        $(".selectext").removeClass("on");
    }
}

/** ========== kotarapp\viewer\js\onload\globals.js ========== **/
var BV_nPagePadding_Left = 0;
var BV_nPagePadding_Right = 5;
var BV_nScrollbarWidth = 16;
var BV_PUSHPIN = "pushpin";
var BV_DRAG = "drag";
var BV_SELECT = "select";
var BV_COPY = "crop";
var BV_INDICATOR = "indicator";
var BV_LINK = "link";
var BV_ICON_LINK = "iconlink";
var BV_LMS_TASK = "lmstask";
var BV_TOC_ENTRY = "tocentry";
var BV_EMBEDED = "embeded";
var BV_SCROLLING = "scrolling";
var BV_DEFAULTTOOL = BV_DRAG;
var BV_AUDIENCE_EVERYONE_ENRICHED = 0;
var BV_AUDIENCE_EVERYONE_ELSE = 1;
var BV_AUDIENCE_PERSONAL = 2;
var BV_AUDIENCE_TEACHERS = 3;
var BV_AUDIENCE_STUDENTS = 4;
var BV_AUDIENCE_MYSCHOOL_TEACHERS = 5;
var BV_nBookID = 0;
var BV_sBookDisplayName = "";
var BV_nTotalPages = 0;
var BV_bSomePagesAreClosed = false;
var BV_nPageImageWidth = 0;
var BV_nPageImageHeight = 0;
var BV_nPageDefaultImageWidth = 0;
var BV_nPageDefaultImageHeight = 0;
var BV_dPageRatio = 0;
var BV_sViewerFilesPath = "";
var BV_nFirstPagePos = 0;
var BV_nPagesPosDelta = 0;
var BV_nLoadTimeoutID = -1;
var BV_nLoadInHighQualityTimeoutID = -1;
var BV_nUpdateUrlTimeoutID = -1;
var BV_nGotoPageNum = 0;
var BV_nGotoPageOffset = 0;
var BV_nTopPageInView = 0;
var BV_nLastTopPageInView = -1;
var BV_nBottomPageInView = 0;
var BV_sActiveTool = BV_DEFAULTTOOL;
var BV_sAutoFitMode = "none";
var BV_nCurrentSizeStep = 0;
var BV_nOffsetInPage;
var BV_sSearchText = "";
var BV_bAdminUser = false;
var BV_bIsTeacher = false;
var BV_bIsStudent = false;
var BV_bIsAutherizedMember = false;
var BV_bPagesInStorage = true;
var BV_bHasTOC = true;
var BV_bTOCLoaded = false;
var BV_TocEntries = [];
var BV_bOnDrag = false;
var BV_nStartDragMouseLeft = -1;
var BV_nStartDragMouseTop = -1;
var BV_nStartDragScrollLeft = -1;
var BV_nStartDragScrollTop = -1;
var BV_SmartLoadInitialDelay = 1;
var BV_SmartLoadDelayIncrement = 0.3;
var BV_SmartLoadDelayUnit = 300;
var BV_LoadHighQualityPagesInViewDelay = 300;
var BV_nCdnServers = 0;
var BV_sCdnDomain = "";
var BV_UpdateBrowserLocation_Timeout = 1000;
var BV_UpdateBrowserLocation_Timer = 0;
var BV_bAllPagesAreLoaded = false;
var BV_bStageIsVisible = true;
var BV_sHashOnLoad = "";
var BV_oBook = null;
var BV_BookWrraper = null;
var BV_BookWrraper_offsetHeight = window.innerHeight;
var oStage = null;
var aBookPagesInfo = new Array();
var AdTools_bShowWireframe = false;
var AdTools_bShowWordWireframe = false;
var AdTools_bShowLineWireframe = false;
var AdTools_bShowOnlyPagesWithPics = false;
var AdTools_bShowOnlyLockedPages = false;
var AdTools_bBindTocEntry = false;
var AdTools_bModifyTocEntry = false;
var BV_bBookAutoScrolledToAccommodateNoteWindow = false;
var BV_bBookAutoScrolled = 0;
var BV_TEMPORARY_MARKER_ID = "temporary";
var BV_TEMPORARY_SELECTION_ID = -999;
var BV_bApplyNewStyleRulesForTheFirstTime = true;
var BV_bPostLoadScriptsAvailable = false;
var BV_bMarkerScriptsLoaded = false;
var BV_bSupportsLayersInViewer = false;
var BV_bShowLayersFilter = false;
var BV_bShowLayerIcons = false;
var Layers_TotalNumOfLayers = -1;
var BV_projectKey = "";
var BV_projectSectionKey = "";
var BV_DefaultProjectID = -1;
var BV_BookDirection = "rtl";
var BV_IsBookDirectionRTL = true;
var BV_LanguageCode = "he";
var BV_BookVersionText = "";
var BV_CetSubject = "";
var BV_bCanAddEmbeded = false;
var BV_bCanApproveEmbeded = false;
var BV_gSiteID = "";
var BV_SessionID = "";
var BV_gInstituteID = "";
var BV_nSchoolID = 0;
var BV_OriginalTitle = "";
var BV_Platform = "";
var BV_ViewerClosefunction = 0;
var BV_BookAppHasFiller = false;
var BV_BOOKWALL_ENABLED = true;
var BV_HasKeybaord = false;

/** ========== kotarapp\viewer\js\onload\globals_postload.js ========== **/
var BV_aMarkerHandles = new Array({
    sKey: "top-left",
    sCursor: "NW-resize",
    sLeft: "L",
    sTop: "T"
},{
    sKey: "top",
    sCursor: "N-resize",
    sLeft: "M",
    sTop: "T"
},{
    sKey: "top-right",
    sCursor: "NE-resize",
    sLeft: "R",
    sTop: "T"
},{
    sKey: "right",
    sCursor: "E-resize",
    sLeft: "R",
    sTop: "M"
},{
    sKey: "bottom-right",
    sCursor: "SE-resize",
    sLeft: "R",
    sTop: "B"
},{
    sKey: "bottom",
    sCursor: "S-resize",
    sLeft: "M",
    sTop: "B"
},{
    sKey: "bottom-left",
    sCursor: "SW-resize",
    sLeft: "L",
    sTop: "B"
},{
    sKey: "left",
    sCursor: "W-resize",
    sLeft: "L",
    sTop: "M"
});
var Notes_sContainerID = "BV_oBook";
var NotesPreview_BubbledMarkerID = 0;
var NotesEditor_sControlID = "BV_oNotesEditor";
var NotesEditor_nWidth = 400;
var NotesEditor_nBasicHeight = 320;
var NotesEditor_nFullHeight = 470;
var NotesEditor_nCurrentWindowHeight = 0;
var NotesEditor_IFrame = null;
var NotesEditor_LoadIFrameContentTimeout = 500;
var NotesEditor_LoadIFrameContentTimeoutID = 0;
var NotesEditor_bMiniMode = false;
var EditorContainer = null;
var jqEditorContainer = null;
var NotesViewer_sControlID = "BV_oNotesViewer";
var NotesViewer_nWidth = 400;
var NotesViewer_nBasicHeight = 260;
var NotesViewer_nFullHeight = 450;
var NotesViewer_nTopToolbarHeight = 58;
var NotesViewer_nBottomHeight = 14;
var NotesViewer_IFrame = null;
var ViewerContainer = null;
var jqViewerContainer = null;
var Notes_oDraggedWindow = null;
var Notes_oDraggedWindowGrip = null;
var Notes_oDraggedWindowParams = null;
var NotesWindowWasDragged = false;
var Notes_nDraggedMarkerWindowID = 0;
var Notes_LastDraggedPosition = null;
var BV_oDraggedMarker = null;
var BV_oResizedMarker = null;
var BV_sResizedMarkerHandle = null;
var BV_oBubbledMarker = null;
var BV_bInBubbleEditMode = false;
var MarkersMgr_bInitilized = false;
var MarkersMgr_bLoaded = false;
var MarkersMgr_PagesLoaded = null;
var MarkersMgr_PageMarkers = null;
var MarkersMgr_RenderedMarkers = new Array();
var MarkersMgr_MarkerStatistics = new Array();
var WordSelectionMgr_RenderedPages = new Array();
var LMS_EditingMarkerID = 0;
var LMS_MarkerIsTemporary = false;
var LMS_TasksAttitude = new Array();
var LMS_IOS_PositionFix = 0;
var BV_nPushpinHotX = 22;
var BV_nPushpinHotY = 22;
var BV_LMSTaskHotX = 14;
var BV_LMSTaskHotY = 14;
var BV_bOnSelection = false;
var BV_bOnWordSelection = false;
var BV_oSelection = null;
var BV_nSelectionPage = 0;
var BV_nStartSelectionX = -1;
var BV_nStartSelectionY = -1;
var BV_nStartSelectionMouseX = -1;
var BV_nStartSelectionMouseY = -1;
var BV_nSelectionMinX = 0;
var BV_nSelectionMaxX = 0;
var BV_nSelectionMinY = 0;
var BV_nSelectionMaxY = 0;
var BV_nSelectionPageID = 0;
var BV_nSelectionLeft = 0;
var BV_nSelectionTop = 0;
var BV_nSelectionWidth = 0;
var BV_nSelectionHeight = 0;
var BV_bUserCanSelectPushpinType = false;
var BV_bMarkerSelected = false;
var BV_bInNewMarkerState = false;
var BV_aMarkers = new Array();
var BV_CanCloneNote = false;
var BV_HasAdminOrderInMarkers = false;
var LMS_sConvertToHTML = "";
var LMS_IsLMSable = false;
var BV_aEmbededParts = new Array();
var EmbededMgr_bLoaded = false;
var EmbededMgr_PageEmbededParts = null;
var EmbededMgr_RenderedEmbededParts = new Array();
var WordsMgr_PageWords = new Array();
var WordsMgr_PageSelections = new Array();
var WordsMgr_PageWords_bLoaded = new Array();
var WordSelectionMgr_bLoaded = false;
var WordSelectionMgr_LoadRetries = 0;

/** ========== kotarapp\viewer\js\onload\hightlights.js ========== **/
function Highlights_ClearAll(a) {
    var b = BV_nTotalPages;
    for (n = 0; n < b; n++) {
        if (a) {
            BookPageState_SetHasHighlights(n, false);
        }
        UTILS_RemoveDomElement(document.getElementById("BV_oHighlight" + n));
    }
}
function Highlights_LoadPageHighlights(a) {
    if (a < 0 || a + 1 >= BV_nTotalPages) {
        return;
    }
    if (!BookPageState_GetHasHighlights(a) || !BookPageState_GetIsOpen(a)) {
        return;
    }
    var b = document.getElementById("BV_oHighlight" + a);
    if (b == null) {
        var b = UTILS_CreateElement("DIV");
        b.className = "BV_oHighlights";
        b.id = "BV_oHighlight" + a;
        BV_GetPageImageElement(a).appendChild(b);
        var c = new Array({
            name: "nPageID",
            value: BookPageState_GetPageID(a)
        },{
            name: "sSearchText",
            value: BV_sSearchText
        },{
            name: "nImageWidth",
            value: BV_nPageImageWidth
        },{
            name: "nImageHeight",
            value: BV_nPageImageHeight
        });
        callAppKotarCommandNoSession("Pages.GetHighlightedImageMap", c, {
            onSuccessFunction: loadPageHighlights_OnSuccess,
            onFailureFunction: loadPageHighlights_OnFailure,
            sTargetContainerID: b.id
        }, true);
    }
}
function loadPageHighlights_OnSuccess(a, e) {
    var c = document.getElementById(e.sTargetContainerID);
    if (c == null) {
        return;
    }
    c.innerHTML = "";
    for (var b = 0; b < a.length; b++) {
        if (RectangleIsInRange(a[b], BV_nPageImageWidth, BV_nPageImageHeight)) {
            var d = UTILS_CreateElement("DIV");
            d.style.top = a[b].y * 1 + "px";
            d.style.left = a[b].x * 1 + "px";
            d.style.width = a[b].width * 1 + "px";
            d.style.height = a[b].height * 1 + "px";
            d.className = "pageHighlight" + (ieVer < 9 ? "IE" : "");
            c.appendChild(d);
        }
    }
}
function loadPageHighlights_OnFailure() {}
var BV_bHightlightNextAvailablePage = false;
var BV_ListOfHighlightedPages = null;
var BV_ListOfHighlightedPageLocations = null;
function Hightlights_MarkPagesWithHighlights(j, b) {
    BV_HideMarkerBubble("Hightlights_MarkPagesWithHighlights", false);
    Highlights_ClearAll(true);
    BV_sSearchText = j;
    var h = "";
    var a = new Array();
    BV_ListOfHighlightedPageLocations = new Array();
    for (var g = 0; g < b.length; g++) {
        var f = b[g];
        var d = f.pg;
        var e = f.os;
        if (d != h) {
            a[a.length] = d;
            BV_ListOfHighlightedPageLocations[BV_ListOfHighlightedPageLocations.length] = e;
            h = d;
        }
    }
    BV_ListOfHighlightedPages = a;
    for (var c = 0; c < a.length; c++) {
        BookPageState_SetHasHighlights((a[c] - 1), true);
    }
    scrollDirectionDown = true;
    PageContent_LoadPagesInView(true);
}
function Highlights_FindNextPage(c, a) {
    if (BV_ListOfHighlightedPages == null) {
        return false;
    }
    for (var b = 0; b < BV_ListOfHighlightedPages.length; b++) {
        if ((BV_ListOfHighlightedPages[b] - 1) > c) {
            BV_GotoPage(BV_ListOfHighlightedPages[b], BV_ListOfHighlightedPageLocations[b]);
            return true;
        }
    }
    if (!a) {
        ShowAjaxNotification(TXT_LastHighlightedPage);
    }
    return false;
}
function Highlights_FindPreviousPage(b) {
    if (BV_ListOfHighlightedPages == null) {
        return;
    }
    for (var a = BV_ListOfHighlightedPages.length - 1; a >= 0; a--) {
        if ((BV_ListOfHighlightedPages[a] - 1) < b) {
            BV_GotoPage(BV_ListOfHighlightedPages[a], BV_ListOfHighlightedPageLocations[a]);
            return;
        }
    }
    ShowAjaxNotification(TXT_FirstHighlightedPage);
}

/** ========== kotarapp\viewer\js\onload\markersmanager.js ========== **/
var MarkersMgr_sShowPageMarkersQueue = ".";
function MarkersMgr_ShowPageMarkers(a) {
    if (!BV_bMarkerScriptsLoaded) {
        MarkersMgr_PushShowPageMarkers(a);
        return;
    }
    MarkersMgr_RenderPageMarkers(a);
    EmbededMgr_RenderPageEmbededParts(a);
    WordSelectionMgr_RenderPageMarkers(a);
}
function MarkersMgr_PushShowPageMarkers(a) {
    if (MarkersMgr_sShowPageMarkersQueue.indexOf("." + a + ".") > (-1)) {
        return;
    }
    MarkersMgr_sShowPageMarkersQueue = MarkersMgr_sShowPageMarkersQueue + a + ".";
}
var MarkersMgr_LoadMarkerASAPAttempts = 0
  , MarkersMgr_LoadMarkerASAPTimerID = 0;
function MarkersMgr_LoadMarkerASAP(c, b) {
    if (MarkersMgr_LoadMarkerASAPTimerID > 0) {
        window.clearTimeout(MarkersMgr_LoadMarkerASAPTimerID);
    }
    var a = false;
    if (!BV_bPostLoadScriptsAvailable) {
        a = true;
    } else {
        if (BV_bSupportsLayersInViewer) {
            a = !MarkersMgr_bLoaded;
        } else {
            a = !MarkersMgr_PageMarkersWereRendered(c);
        }
    }
    if (a && MarkersMgr_LoadMarkerASAPAttempts < 60) {
        MarkersMgr_LoadMarkerASAPAttempts++;
        MarkersMgr_LoadMarkerASAPTimerID = window.setTimeout("MarkersMgr_LoadMarkerASAP(" + c + "," + b + ")", 250);
    } else {
        c = (c * 1) - 1;
        b = b * 1;
        MarkersMgr_OnClick(c, b);
    }
}

/** ========== kotarapp\viewer\js\onload\styleutils.js ========== **/
function UTILS_UpdateStyleRule(c, b, a) {
    if (typeof (a) != "undefined") {
        if (isIE && document.documentMode == "9") {
            UTILS_UpdateStyleRule_FF(c, b);
        } else {
            if (isIE) {
                UTILS_UpdateStyleRule_IE(c, b);
            } else {
                UTILS_UpdateStyleRule_FF(c, b);
            }
        }
    } else {
        if (isIE) {
            UTILS_UpdateStyleRule_IE(c, b);
        } else {
            UTILS_UpdateStyleRule_FF(c, b);
        }
    }
}
function UTILS_UpdateStyleRule_IE(g, f) {
    var d;
    var c;
    var h = g.toLowerCase();
    var a = document.styleSheets.length;
    for (d = 0; d < a; d++) {
        var e = document.styleSheets[d];
        var b = e.rules.length;
        for (c = 0; c < b; c++) {
            if (e.rules[c].selectorText.toLowerCase() === h) {
                e.removeRule(c);
                e.addRule(g, f);
                return;
            }
        }
    }
}
function UTILS_UpdateStyleRule_FF(j, h) {
    var f;
    var e;
    var a = false;
    var i = j;
    j = (j + "").toLowerCase();
    try {
        var c = document.styleSheets.length;
        for (f = 0; f < c && !a; f++) {
            var g = document.styleSheets[f];
            if (g.href && g.href.indexOf("kotar") >= 0 && g.cssRules) {
                var d = g.cssRules.length;
                for (e = 0; e < d && !a; e++) {
                    var k = (g.cssRules[e].selectorText + "").toLowerCase();
                    if (k == j) {
                        g.deleteRule(e);
                        g.insertRule(i + "{" + h + "}", g.cssRules.length);
                        a = true;
                    }
                }
            }
        }
    } catch (b) {}
}

/** ========== kotarapp\viewer\js\onload\toc.js ========== **/
var TOC_nCurrentTocEntryID = 0;
var BV_nLastClickedTOCEntryID = 0;
var BV_nLastClickedTOCEntryPrimitiveID = 0;
var TOC_bCancelTocEntryAutoClickOnLoad = false;
function TocEntry_OnClick(a, c, d, b) {
    if (!Toolbar.SubMenu.scrolled && !Toolbar.Toc.PreventTocClick) {
        BV_nLastClickedTOCEntryID = d;
        BV_nLastClickedTOCEntryPrimitiveID = b;
        BV_GotoPage(a, c);
        if (AdTools_bBindTocEntry) {
            ShowAjaxNotification("בחר/י פריטיב מהדף אותו ברצונך לקשר לרשומה זו", 1000);
        } else {
            if (AdTools_bModifyTocEntry) {
                TocEdit_ModifyEntry(d);
            } else {
                TOC_ShowTocEntryTitle(d);
            }
        }
    }
    Toolbar.SubMenu.scrolled = false;
    Toolbar.Toc.SyncTocToPages();
}
function TOC_ShowTocEntryTitle(c) {
    if (TOC_IsEmpty()) {
        return;
    }
    var b = BV_TocEntries.length;
    for (var a = 0; a < b; a++) {
        if (BV_TocEntries[a].nID == c) {
            ShowAjaxNotification(BV_TocEntries[a].sTitle);
            return;
        }
    }
}
function TOC_IsEmpty() {
    if (!BV_bTOCLoaded) {
        BV_bTOCLoaded = true;
        window.setTimeout("TOC_LoadTocJS()", 100);
    }
    return (!BV_bHasTOC || BV_TocEntries.length == 0);
}
function TOC_LoadTocJS() {
    callAppKotarCommandNoSession("TOC.GetToc", [{
        name: "nBookID",
        value: BV_nBookID
    }], {
        onSuccessFunction: TOC_LoadTocJS_OnComplete,
        onFailureFunction: TOC_LoadTocJS_OnError
    }, true);
}
function TOC_LoadTocJS_OnError() {}
function TOC_LoadTocJS_OnComplete(a) {
    BV_TocEntries = a;
}
var BV_bTocLoaded = false;
function LoadTocIfNotAlreadyLoaded() {
    if (BV_bTocLoaded == true) {
        return;
    }
    BV_bTocLoaded = true;
    window.setTimeout("LoadToc_OnTimeout()", 1000);
}
function Refresh_TOC() {
    if (AdTools_bShowEditableTOC) {
        getElement(btnLoadQATocClientID).click();
    } else {
        getElement(btnLoadTocClientID).click();
    }
    TOC_AlignToSide();
}
function TOC_AlignToSide() {}
function LoadToc_OnTimeout() {
    try {
        getElement(btnLoadTocClientID).click();
    } catch (a) {}
}
var nLastScrollWidth = 0;

/** ========== kotarapp\viewer\js\onload\toolbar.js ========== **/
function Toolbar_GetHeight() {
    return (getElement("dvToolbar") != null && getElement("dvToolbar").style.display == "block" ? 35 : 5);
}
function ToolBar_SetDefaultTool() {
    ToolBar_OnClickDragMode();
}
function ToolBar_OnClickDragMode() {
    if (!Viewer_bLoadCompleted) {
        return;
    }
    BV_SetActiveTool(BV_DEFAULTTOOL);
}
function ToolBar_OnTocEntryMode() {
    if (!Viewer_bLoadCompleted || !MarkersMgr_bLoaded) {
        return;
    }
    Layers_EnsureLayerVisibility(BV_TOC_ENTRY, BV_AUDIENCE_PERSONAL);
    ShowAjaxNotification(TXT_TocEntryIsActive);
    BV_SetActiveTool(BV_TOC_ENTRY);
}
function ToolBar_OnClickSelectMode() {
    if (!Viewer_bLoadCompleted) {
        return;
    }
    Layers_EnsureLayerVisibility(BV_SELECT, BV_AUDIENCE_PERSONAL);
    ShowAjaxNotification(TXT_HighlightIsActive);
    AttachDocuemntEvents();
    TouchUtils.DisableMsScrolling();
    Toolbar.ActivateButton("", "selectext", BV_SELECT);
}
function ToolBar_OnClickCeleb() {
    var a = ['<div class="celeb-header"><button class="celeb-close-btn">CLOSE</button></div>', '<iframe class="celeb-frame" src="https://www.celleb.cet.ac.il/"></iframe>', ].join("");
    var b = document.createElement("div");
    b.classList.add("celeb-container");
    b.innerHTML = a;
    document.querySelector("body").appendChild(b);
    document.querySelector(".celeb-close-btn").addEventListener("click", function(c) {
        c.preventDefault();
        document.querySelector(".celeb-container").remove();
    });
}
function ToolBar_OnClickPushpinMode() {
    if (!Viewer_bLoadCompleted || !MarkersMgr_bLoaded) {
        return;
    }
    Layers_EnsureLayerVisibility(BV_PUSHPIN, BV_AUDIENCE_PERSONAL);
    ShowAjaxNotification(TXT_PushpinIsAction);
    BV_bUserCanSelectPushpinType = BV_bAdminUser;
    AttachDocuemntEvents();
    TouchUtils.DisableMsScrolling();
    Toolbar.ActivateButton("note", "ToolBar_OnClickPushpinMode", BV_PUSHPIN);
}
function ToolBar_OnClickLMSTaskMode() {
    if (!Viewer_bLoadCompleted || !MarkersMgr_bLoaded) {
        return;
    }
    Layers_EnsureLayerVisibility(BV_LMS_TASK, BV_AUDIENCE_STUDENTS);
    ShowAjaxNotification(TXT_LMSTaskIsActive);
    AttachDocuemntEvents();
    TouchUtils.DisableMsScrolling();
    Toolbar.ActivateButton("lmstask", "ToolBar_OnClickLMSTaskMode", BV_LMS_TASK);
}
function ToolBar_OnClickCopyMode() {
    var a = BookBibliography.Get();
    if (!Viewer_bLoadCompleted) {
        return;
    }
    ShowAjaxNotification(TXT_CopyRegionIsActive);
    AttachDocuemntEvents();
    TouchUtils.DisableMsScrolling();
    Toolbar.ActivateButton("crop", "ToolBar_OnClickCopyMode", BV_COPY);
}
function Toolbar_IsEditToolActive() {
    return (BV_sActiveTool != BV_DEFAULTTOOL);
}
var BV_bIsInFullScreenMode = false;
var BV_bEnforceResize = false;
var BV_SelectionColor = "ffff00";
function GetSelectionType(a) {
    switch (a) {
    case "ffff00":
        return 1;
    case "ff96d7":
        return 2;
    case "52ff36":
        return 3;
    }
}
function GetSelectionColor(a) {
    switch (a) {
    case 1:
        return "ffff00";
    case 2:
        return "ff96d7";
    case 3:
        return "52ff36";
    }
}

/** ========== kotarapp\viewer\js\onload\utils.js ========== **/
var UTILS_nLogicalUnits = 10000;
function UTILS_PreventBrowserDefaultAction(a) {
    if (a.preventDefault) {
        a.preventDefault();
    }
}
function UTILS_GetScrollbarWidth() {
    var c = null;
    var b = null;
    var a = 0;
    c = UTILS_CreateElement("div");
    c.style.position = "absolute";
    c.style.top = "-1000px";
    c.style.left = "-1000px";
    c.style.width = "100px";
    c.style.height = "100px";
    c.style.overflow = "scroll";
    b = UTILS_CreateElement("div");
    b.style.width = "100%";
    b.style.height = "100%";
    c.appendChild(b);
    document.body.appendChild(c);
    a = c.offsetWidth - b.offsetWidth;
    document.body.removeChild(document.body.lastChild);
    return a;
}
function UTILS_GetElementPos(a) {
    var b = a.getBoundingClientRect();
    return {
        nLeft: ((b.left + "").split(".")[0]) - 18,
        nTop: ((b.top + "").split(".")[0]) - 2
    };
}
function UTILS_GetMarkerLogicalPos(e) {
    var b = UTILS_PixelToLogicalX(e.offsetLeft, BV_nPageImageWidth);
    var c = UTILS_PixelToLogicalY(e.offsetTop, BV_nPageImageHeight);
    var d = UTILS_PixelToLogicalX(e.offsetWidth, BV_nPageImageWidth);
    var a = UTILS_PixelToLogicalY(e.offsetHeight, BV_nPageImageHeight);
    if (e.sType == BV_PUSHPIN) {
        b = UTILS_PixelToLogicalX(e.offsetLeft + BV_nPushpinHotX, BV_nPageImageWidth);
        c = UTILS_PixelToLogicalY(e.offsetTop + BV_nPushpinHotY, BV_nPageImageHeight);
    }
    return {
        nLeft: b,
        nTop: c,
        nWidth: d,
        nHeight: a
    };
}
function UTILS_PixelToLogicalX(b, a) {
    return Math.round(b * UTILS_nLogicalUnits / BV_nPageImageWidth);
}
function UTILS_PixelToLogicalY(b, a) {
    return Math.round(b * UTILS_nLogicalUnits / BV_nPageImageHeight);
}
function UTILS_LogicalToPixelX(a, b) {
    return Math.round(a * b / UTILS_nLogicalUnits);
}
function UTILS_LogicalToPixelY(a, b) {
    return Math.round(a * b / UTILS_nLogicalUnits);
}
function UTILS_CreateElement(a) {
    return document.createElement(a);
}
function UTILS_AddHandler(c, a, b) {
    if (typeof (c) == "undefined") {
        return;
    }
    if (a.indexOf("on") == 0) {
        a = a.substring(2);
    }
    if (typeof (c.addEventListener) != "undefined") {
        c.addEventListener(a, b, false);
    } else {
        if (c.attachEvent) {
            c.attachEvent("on" + a, b);
        } else {
            c["on" + a] = b;
        }
    }
}
function UTILS_RemoveDomElement(a) {
    if (a == null) {
        return;
    }
    if (isIE) {
        a.removeNode(true);
    } else {
        if (a.parentNode !== null) {
            a.parentNode.removeChild(a);
        }
    }
}
function UTILS_IsNumeric(a) {
    return !isNaN(parseFloat(a)) && isFinite(a);
}
function UTILS_HasCLass(b, a) {
    var c = false;
    if (b.classList) {
        c = b.classList.contains(a);
    } else {
        c = new RegExp("(^| )" + a + "( |$)","gi").test(b.className);
    }
    return c;
}
function Utils_Closest(b, a) {
    var d = null;
    var c = b;
    while (c !== null) {
        if (UTILS_HasCLass(c, a)) {
            d = c;
            break;
        } else {
            c = c.parentNode;
        }
    }
    return d;
}
function UTILS_AddClass(b, a) {
    if (b.classList) {
        b.classList.add(a);
    } else {
        b.className += " " + a;
    }
}
var IsAttachDocuemntEvents = false;
function AttachDocuemntEvents() {
    IsAttachDocuemntEvents = true;
    TouchUtils.EventStart.forEach(function(a) {
        document.addEventListener(a, Pointers.pointerdown);
    });
    TouchUtils.EventMove.forEach(function(a) {
        document.addEventListener(a, Pointers.pointermove);
    });
    TouchUtils.EventEnd.forEach(function(a) {
        document.addEventListener(a, Pointers.pointerup);
    });
}
function DettachDocuemntEvents() {
    if (IsAttachDocuemntEvents) {
        TouchUtils.EventStart.forEach(function(a) {
            document.removeEventListener(a, Pointers.pointerdown);
        });
        TouchUtils.EventMove.forEach(function(a) {
            document.removeEventListener(a, Pointers.pointermove);
        });
        TouchUtils.EventEnd.forEach(function(a) {
            document.removeEventListener(a, Pointers.pointerup);
        });
        TouchUtils.EnableMsScrolling();
        IsAttachDocuemntEvents = false;
    }
}

/** ========== kotarapp\viewer\js\onload\viewer.js ========== **/
var Viewer_bVisibleForTheFirstTime = true;
var Viewer_bFirstDisplaySize = true;
var Viewer_bLoadCompleted = false;
var Viewer_bRotated = false;
var PreventBookClick = false;
var Toolbar_AutoHide = true;
function Viewer_OnLoad(g, f, a, e, d, c) {
    document.body.className = "viewer";
    window.focus();
    var b = document.getElementById("bookwrapper");
    UTILS_AddHandler(b, "onclick", function(h) {
        return Viewer_OnClick(h);
    });
    ShowAjaxNotification(TXT_PleaseWaitBookIsLoading);
    Bookinit_ClearBookContents();
    Viewer_SetControlSizes(true);
    Viewer_CompleteLoad(g, f, a, e, d);
    BV_OriginalTitle = document.title;
    if (document.attachEvent) {
        document.attachEvent("onpropertychange", function(h) {
            if (h.propertyName === "title" && document.title !== BV_OriginalTitle) {
                setTimeout(function() {
                    document.title = BV_OriginalTitle;
                }, 1);
            }
        });
    }
    if (c !== "") {
        Viewer_DoJsAction(c);
    }
    sendPageStatistics();
}
function Viewer_DoJsAction(a) {
    switch (a) {
    case "addbooktofavorites":
        AddBookToFavorites(BV_nBookID, false);
        break;
    case "onclickpushpinmode":
        ToolBar_OnClickPushpinMode();
        break;
    case "onclickselectmode":
        ToolBar_OnClickSelectMode();
        break;
    case "info":
        if (!is_phone) {
            window.setTimeout("Toolbar.LoadBookInfo('bookinfo')", 300);
        }
        break;
    case "addbooktoprojects":
        Open_AddBookToProjectPopup(BV_nBookID, false, false, BV_GetCurrentPageID());
        break;
    }
}
function Viewer_CompleteLoad(e, d, a, c, b) {
    Bookinit_InitBookPages(e, d, a, c, b);
    Viewer_AddOnResizeHandlers();
    Viewer_PreloadImages();
    Bandwidth.Init();
}
function Viewer_PreloadImages() {
    new ImageLoader("/kotarapp/viewer/images/wordselection/firstfloor2.png").load();
    new ImageLoader("/kotarapp/viewer/images/wordselection/secondfloor3.png").load();
    new ImageLoader("/theme/images/toolbar/layers2.png?v=1").load();
    new ImageLoader("/theme/images/toolbar/Search.png").load();
    new ImageLoader("/theme/images/note/noteIcons.png").load();
    new ImageLoader("/KotarApp/Resources/Images/preloaderbig.gif").load();
}
function Viewer_AddOnResizeHandlers() {
    Viewer_bLoadCompleted = true;
    AddWindowResizeListner("Viewer_OnWindowResize()");
    window.addEventListener("orientationchange", function() {
        Viewer_bRotated = true;
        if (is_IOS) {
            HideTouchModalPopup();
        } else {
            setTimeout(function() {
                var a = document.getElementById("modalTouchDialogIFrame");
                if (a !== null) {
                    a.style.width = window.innerWidth + "px";
                    a.style.height = window.innerHeight + "px";
                    a.style.top = window.pageYOffset + "px";
                }
            }, 200);
        }
    });
    Viewer_PostLoadScripts_OnLoad();
    BookEvents_Wire();
}
function Viewer_OnClick(a) {
    if (!PreventBookClick) {
        if (WordSelectionMgr_MenuVisible) {
            WordSelectionMgr_ClearWordSelection();
        } else {
            if (!(is_mobile && Notes && Notes.Editor.Visible())) {
                Toolbar.Toggle();
            }
            Viewer_GetFocus();
        }
    }
    if (Toolbar_AutoHide) {
        PreventBookClick = false;
    }
}
function Viewer_GetFocus(a) {
    TryToBlur("txtsearch");
}
function TryToBlur(b) {
    if (typeof (b) == "undefined" || b == "") {
        return;
    }
    try {
        var a = document.getElementById(b);
        if (a) {
            a.blur();
        }
    } catch (a) {}
}
var lastWinSize = null;
var lastWinHeight = null;
function Viewer_OnWindowResize() {
    if (lastWinSize == null) {
        lastWinSize = $(window).width();
    }
    if (lastWinHeight == null) {
        lastWinHeight = $(window).height();
    }
    var a = $(window).width();
    var b = $(window).height();
    if (a != lastWinSize) {
        if (!is_phone) {
            Toolbar.HideAll();
        }
        lastWinSize = a;
        lastWinHeight = b;
        BV_BookWrraper_offsetHeight = b;
        Viewer_SetControlSizes(false);
        return;
    }
    if (Viewer_bRotated && b != lastWinHeight) {
        Viewer_bRotated = false;
        Toolbar.HideAll();
        lastWinSize = a;
        lastWinHeight = b;
        BV_BookWrraper_offsetHeight = b;
        window.setTimeout("Viewer_SetControlSizes(false);", 900);
        return;
    }
    if (is_mobile && b != lastWinHeight && Notes && Notes.Editor.Visible()) {
        lastWinSize = a;
        lastWinHeight = b;
        Notes.Editor.ChangePosition(0, null);
    }
    if (BV_bEnforceResize) {
        BV_bEnforceResize = false;
        Viewer_SetControlSizes(false);
        return;
    }
    if ((document.body.clientWidth - 5 < screen.width && screen.width < document.body.clientWidth + 5) && (document.body.clientHeight - 5 < screen.height && screen.height < document.body.clientHeight + 30)) {
        Viewer_SetControlSizes(false);
        return;
    }
}
function Viewer_SplitterOnResize() {
    Viewer_SetControlSizes(true);
}
function Viewer_SetControlSizes(c) {
    BV_PrePageSizeChangePosition = BV_GetVerifiedPosition();
    CalcClientSize();
    var e = clientDimensions.width;
    if (typeof (nSideMarginsWidth) != "undefined") {
        e -= nSideMarginsWidth;
    }
    var a = (typeof (BV_bIsInFullScreenMode) != "undefined" ? BV_bIsInFullScreenMode : false);
    var d = clientHeight();
    SetAjaxAjaxMessageCustomContainerTop((Toolbar_GetHeight() + (a ? 0 : nWebsiteHeaderHeight) + 10));
    if (e < 0) {
        e = 0;
    }
    if (d < 0) {
        d = 0;
    }
    var b = false;
    if (d < 30) {
        BV_BookWrraper.style.display = "none";
        BV_bStageIsVisible = false;
    } else {
        b = (BV_bStageIsVisible == false);
        BV_BookWrraper.style.display = "";
        BV_bStageIsVisible = true;
        BV_SetDisplaySize(e, d);
        if (!isRTL()) {
            SetAjaxAjaxMessageCustomContainerLeft(12);
        } else {
            SetAjaxAjaxMessageCustomContainerLeft(15);
        }
        nLastScrollWidth = 0;
        if (b == true) {
            PageContent_LoadPagesInView(false);
        }
    }
}
function BV_SetDisplaySize(d, c) {
    if (is_mobile && _openedWindowName == "TTS") {
        HideModalPopup();
    }
    var b = document.getElementById("kotaruidialog");
    if (is_IOS && b) {
        if (b.offsetWidth > d) {
            kmobj.CloseMultimeDiadialog();
        }
    }
    if (d > 100 && c > 100) {
        SetAjaxAjaxMessageCustomContainerWidth(d);
        BV_BookWrraper.style.width = "100%";
        BV_BookWrraper.style.display = "block";
        BV_BookWrraper.style.visibility = "visible";
        BV_BookWrraper.style.position = "relative";
        BookPages_ApplyPageSize();
        if (Viewer_bVisibleForTheFirstTime && !Viewer_bFirstDisplaySize) {
            Viewer_bVisibleForTheFirstTime = false;
            try {
                if (BV_sHashOnLoad != "" && BV_PrePageSizeChangePosition == null) {
                    window.setTimeout("BV_GoToPositionByOriginalHashedInstruction('" + BV_sHashOnLoad + "')", 1000);
                    BV_sHashOnLoad = "";
                }
            } catch (a) {}
        }
    } else {
        if (!Toolbar.preventToolbarHide) {
            SetAjaxAjaxMessageCustomContainerWidth(0);
            ShowAjaxNotification(TXT_NoSpace);
            BV_BookWrraper.style.display = "none";
        }
    }
    Viewer_bFirstDisplaySize = false;
    if (BV_bMarkerScriptsLoaded) {
        BV_SmartShowMarkerBubble(true);
    }
    BookScroll.Refresh();
    if (Viewer_bRotated && BV_GetAutoFitMode() == "none") {
        var f = BookScroll.ScrollTop();
        BookScroll.SetScrollIndicatorLocation(false, f);
    }
}
function BV_GoToPositionByOriginalHashedInstruction(sHash) {
    var aParts = sHash.split(".");
    if (aParts.length > 3) {
        try {
            var nPage = eval(aParts[0]);
            var nOffset = eval(aParts[1]);
            BV_GotoPage(nPage, nOffset);
        } catch (e) {}
    }
}
var DelayStatisticsTimeOut;
function sendPageStatistics() {
    if (BV_bStageIsVisible == false) {
        return;
    }
    var b = document.getElementById("oPageNum");
    if (b != null) {
        b.value = BV_GetCurrentPageLabel();
    }
    window.clearTimeout(DelayStatisticsTimeOut);
    var a = 5000;
    if (BV_UpdateBrowserLocation_Timeout < 5000) {
        a = a - BV_UpdateBrowserLocation_Timeout;
    }
    DelayStatisticsTimeOut = window.setTimeout(NewDelayStatistics, a);
}
function OnCurrentPageChange() {
    sendPageStatistics();
}
function UserCurrentBookRead() {
    var a = new Array({
        name: "nBookID",
        value: BV_nBookID
    },{
        name: "nPageNum",
        value: (BV_nTopPageInView + 1)
    },{
        name: "nOffset",
        value: BV_nOffsetInPage
    },{
        name: "nSizeStep",
        value: BV_nCurrentSizeStep
    },{
        name: "sFitMode",
        value: BV_sAutoFitMode
    });
    callAppKotarCommand("UserLastRead.Set", a);
}
function NewDelayStatistics() {
    window.clearTimeout(DelayStatisticsTimeOut);
    var b = window.location + "";
    b = encodeKotar(b);
    var a = new Array({
        name: "tmp",
        value: "tmp"
    },{
        name: "gSiteID",
        value: BV_gSiteID
    },{
        name: "SessionID",
        value: BV_SessionID
    },{
        name: "gInstituteID",
        value: BV_gInstituteID
    },{
        name: "nSchoolID",
        value: BV_nSchoolID
    },{
        name: "nPageID",
        value: BV_GetCurrentPageID()
    },{
        name: "bIsOpen",
        value: BV_IsCurrentPageOpen()
    },{
        name: "sCurrentBookUrl",
        value: b
    });
    callAppKotarCommand("Statistics.RegisterCurrentPageView", a, {
        onSuccessFunction: UpdateCurrentBookUrl_OnComplete,
        onFailureFunction: UpdateCurrentBookUrl_OnComplete
    }, false);
    UserCurrentBookRead();
}
function UpdateCurrentBookUrl_OnComplete() {}

/** ========== kotarapp\viewer\js\onload\zoom.js ========== **/
function ToolBar_SetAutoFitMode() {
    Utilities_SetCtrlClass("fit", "Button Toolbar_fit");
    Utilities_SetCtrlClass("fitW", "Button Toolbar_fitW");
    if (BV_GetAutoFitMode() == "fitpage") {
        Utilities_SetCtrlClass("fit", "ButtonSelected Toolbar_fit_s");
    } else {
        if (BV_GetAutoFitMode() == "fitwidth") {
            Utilities_SetCtrlClass("fitW", "ButtonSelected Toolbar_fitW_s");
        }
    }
}
function BV_GetVerifiedPosition() {
    BV_UpdateBrowserLocation_OnTimer();
    var b = location.href.lastIndexOf("#");
    if (b != -1) {
        var a = location.href.substr(b + 1).split(".");
        if (a.length > 3) {
            return a;
        }
    }
    return null;
}
var BV_PrePageSizeChangePosition = null;
function BV_RememberCurrentPosition() {
    BV_PrePageSizeChangePosition = BV_GetVerifiedPosition();
}
function BV_SetAutoFitMode(b, a) {
    BV_RememberCurrentPosition();
    if (BV_bMarkerScriptsLoaded) {
        BV_SmartHideMarkerBubble("BV_SetAutoFitMode", false);
    }
    if (BV_sAutoFitMode != b || a) {
        BV_sAutoFitMode = b;
        if (BV_bMarkerScriptsLoaded) {
            MarkersMgr_OnBookLayoutModification();
            EmbededMgr_OnBookLayoutModification();
            WordSelectionMgr_OnBookLayoutModification();
        }
        zooming = true;
        BookPages_ApplyPageSize();
    }
    if (BV_bMarkerScriptsLoaded) {
        if (BV_BOOKWALL_ENABLED) {} else {
            BV_SmartShowMarkerBubble(true);
        }
    }
}
function BV_GetAutoFitMode() {
    return BV_sAutoFitMode;
}
var BV_PageResizeIsEnabled = true;
function BV_DisablePageSizeButtons() {
    BV_PageResizeIsEnabled = false;
    if (BV_GetAutoFitMode() != "fitpage") {
        Utilities_SetCtrlClass("fit", "ButtonSelected Toolbar_fit_disabled");
    }
    if (BV_GetAutoFitMode() != "fitwidth") {
        Utilities_SetCtrlClass("fitW", "ButtonSelected Toolbar_fitW_disabled");
    }
    Utilities_SetCtrlClass("zoomin", "ButtonSelected Toolbar_zoomin_disabled");
    Utilities_SetCtrlClass("zoomout", "ButtonSelected Toolbar_zoomout_disabled");
}
function BV_EnablePageSizeButtons() {
    Utilities_SetCtrlClass("fit", (BV_GetAutoFitMode() == "fitpage" ? "ButtonSelected Toolbar_fit_s" : "Button Toolbar_fit"));
    Utilities_SetCtrlClass("fitW", (BV_GetAutoFitMode() == "fitwidth" ? "ButtonSelected Toolbar_fitW_s" : "Button Toolbar_fitW"));
    BV_PageResizeIsEnabled = true;
}
function FitWidth() {
    Toolbar.ActivateButton("", "fitwidth", "");
    if (BV_GetAutoFitMode() != "fitwidth") {
        BV_sAutoFitMode = "fitwidth";
        if (MasterDrawer && MasterDrawer.IsOpen()) {
            MasterDrawer.SetIsSticky(true);
        } else {
            setFitWidthSizeStep();
            zoomBook(BV_nCurrentSizeStep);
        }
    }
}
function ZoomOut(a) {
    Toolbar.ActivateButton("", "BV_ZoomOut", "");
    var b = BV_nCurrentSizeStep;
    BV_sAutoFitMode = "none";
    if (b > BV_nMinSizeStep) {
        if (a) {
            b = BV_nMinSizeStep;
        } else {
            b--;
            if (b <= BV_nMinSizeStep) {
                $(".zoomout").addClass("disabled");
            }
            $(".zoomin").removeClass("disabled");
        }
        if (a) {
            setTimeout(" zoomBook(" + b + ");", 500);
        } else {
            zoomBook(b);
        }
        if (MasterDrawer) {
            MasterDrawer.SetIsSticky(false);
        }
    } else {
        ShowAjaxMessageBox(TXT_YoureAtMinimunZoomLevel);
    }
}
function ZoomIn(a) {
    Toolbar.ActivateButton("", "BV_ZoomIn", "");
    var b = BV_nCurrentSizeStep;
    BV_sAutoFitMode = "none";
    if (b < BV_nMaxSizeStep) {
        if (a) {
            b = BV_nMaxSizeStep;
        } else {
            b++;
            if (b >= BV_nMaxSizeStep) {
                $(".zoomin").addClass("disabled");
            }
            $(".zoomout").removeClass("disabled");
        }
        if (a) {
            setTimeout(" zoomBook(" + b + ");", 500);
        } else {
            zoomBook(b);
        }
        if (MasterDrawer) {
            MasterDrawer.SetIsSticky(false);
        }
    } else {
        ShowAjaxMessageBox(TXT_YoureAtMaximunZoomLevel);
    }
}
var zoomClickTimeout = null;
var clickZoom = new Date();
var zooming = false;
var BV_nLastSizeStep = -1;
function zoomBook(b) {
    BV_nPagesPosDelta = 0;
    if (BV_nLastSizeStep == -1) {
        BV_nLastSizeStep = BV_nCurrentSizeStep;
    }
    if (BV_nLastSizeStep !== b) {
        BV_nCurrentSizeStep = b;
        zooming = true;
        scrollDirectionDown = true;
        BookPages_SetWidthAndHeightToSelectedSizeStep();
        BV_PrePageSizeChangePosition = BV_GetVerifiedPosition();
        fromPage = CalcFromPage();
        toPage = CalcToPage();
        var a = (BV_PrePageSizeChangePosition == null ? BV_GetVerifiedPosition() : BV_PrePageSizeChangePosition);
        clearBookLayers();
        clearNotInViewPagesBackgrounds(fromPage, toPage);
        animatePages(a[1]);
        if (BV_bMarkerScriptsLoaded) {
            if (BV_BOOKWALL_ENABLED) {} else {
                BV_SmartShowMarkerBubble(true);
            }
        }
        if (BV_nCurrentSizeStep == BV_nMinSizeStep) {
            $(".BV_oPage").addClass("small");
        } else {
            $(".BV_oPage").removeClass("small");
        }
        BV_nLastSizeStep = BV_nCurrentSizeStep;
    }
}
var ratioh, ratiow, toPage, fromPage, gap, duration, isTotalPagesExceed;
function animatePages(b) {
    ratioh = BV_aSizeSteps[BV_nCurrentSizeStep].nHeight / BV_aSizeSteps[BV_nLastSizeStep].nHeight;
    ratiow = BV_aSizeSteps[BV_nCurrentSizeStep].nWidth / BV_aSizeSteps[BV_nLastSizeStep].nWidth;
    gap = BV_aSizeSteps[BV_nCurrentSizeStep].nHeight - BV_aSizeSteps[BV_nLastSizeStep].nHeight;
    duration = 500;
    isTotalPagesExceed = false;
    if (toPage == BV_nTotalPages - 1) {
        isTotalPagesExceed = IsTotalPagesExceed(fromPage, b);
        if (isTotalPagesExceed) {
            fromPage -= 1;
        }
    }
    for (var a = fromPage; a <= toPage; a++) {
        animatePage(a, b);
    }
}
function animatePage(c, d) {
    if (d == "undefined") {
        d = 0;
    }
    var b = $("#BV_oPageWrapper_" + c);
    var a = (gap * (c - fromPage)) - (d / 10000 * gap);
    if (isTotalPagesExceed) {
        b.css("transform-origin", "bottom");
        a = gap * (c - toPage);
    }
    if (BookPageState_GetHasCartCover(c)) {
        BV_RemoveHTMLCover(c);
    }
    b.velocity({
        translateY: [a, 0.1],
        scaleX: [ratiow, 1],
        scaleY: [ratioh, 1]
    }, {
        duration: duration,
        ease: "ease-out",
        complete: function(g) {
            var f = g[0];
            f.style.lineHeight = BV_nPageImageHeight + "px";
            f.style.height = BV_nPageImageHeight + "px";
            f.style.width = BV_nPageImageWidth + "px";
            f.style.transform = "";
            f.style.webkitTransform = "";
            f.style.transformOrigin = "";
            var h = document.getElementById("BV_oPage_" + c);
            $(h).width(BV_nPageImageWidth);
            $(h).height(BV_nPageImageHeight);
            clearPageBackground(c);
            loadPagesInViewForZoom(fromPage, toPage);
            if (BookPageState_GetHasCartCover(c)) {
                Cart_CoverPage(c);
            }
            if (c == toPage) {
                BookPages_PrepareNewBookPageSize();
                zooming = false;
                BookScroll.Refresh(false);
                var e = (BV_PrePageSizeChangePosition == null ? BV_GetVerifiedPosition() : BV_PrePageSizeChangePosition);
                if (e != null && BV_bAllPagesAreLoaded == true && e[0] != "undefined" && e[1] != "undefined") {
                    BV_GotoPage(e[0], e[1]);
                }
            }
        }
    });
}
function setFitWidthSizeStep() {
    BV_nLastSizeStep = BV_nCurrentSizeStep;
    var c = 0
      , b = 0
      , a = 0;
    c = BV_aSizeSteps[BV_nMaxSizeStep].nWidth;
    b = BV_BookWrraper.offsetWidth - BV_nPagePadding_Left - BV_nPagePadding_Right - BV_nScrollbarWidth - 4;
    if (b > c) {
        b = c;
    }
    a = Math.round(b * BV_nPageDefaultImageHeight / BV_nPageDefaultImageWidth);
    bookpages_setActualSizeStep(b, a);
}
function IsPageRelevant(a) {
    if (scrollDirectionDown) {
        if (a >= fromPage && a <= toPage) {
            return true;
        } else {
            return false;
        }
    } else {
        if (a >= toPage && a <= fromPage) {
            return true;
        } else {
            return false;
        }
    }
}
function clearBookLayers() {
    MarkersMgr_ClearMarkerDomElements();
    EmbededMgr_ClearEmbededPartDomElements();
    WordSelectionMgr_ClearAllSelection();
}

/** ========== kotarapp\viewer\js\onload\pages\bookpages.js ========== **/
function BookPages_ApplyPageSize() {
    var c = 0
      , b = 0
      , a = 0;
    switch (BV_sAutoFitMode) {
    case "fitpage":
        a = BV_BookWrraper_offsetHeight;
        b = Math.round(a * BV_nPageDefaultImageWidth / BV_nPageDefaultImageHeight);
        if (b > BV_BookWrraper.offsetWidth) {
            b = BV_BookWrraper.offsetWidth;
            a = Math.round(b * BV_nPageDefaultImageHeight / BV_nPageDefaultImageWidth);
        }
        break;
    case "fitwidth":
        c = BV_aSizeSteps[BV_nMaxSizeStep].nWidth;
        b = BV_BookWrraper.offsetWidth - BV_nPagePadding_Left - BV_nPagePadding_Right - BV_nScrollbarWidth - 4;
        if (b > c) {
            b = c;
        }
        a = Math.round(b * BV_nPageDefaultImageHeight / BV_nPageDefaultImageWidth);
        break;
    case "default":
        c = BV_aSizeSteps[Math.min(DefaultMaxSizeStep, BV_nMaxSizeStep)].nWidth;
        b = BV_BookWrraper.offsetWidth - BV_nPagePadding_Left - BV_nPagePadding_Right - BV_nScrollbarWidth - 4;
        if (b > c) {
            b = c;
        }
        a = Math.round(b * BV_nPageDefaultImageHeight / BV_nPageDefaultImageWidth);
        break;
    default:
        b = BV_nPageImageWidth;
        a = BV_nPageImageHeight;
        break;
    }
    bookpages_setActualSizeStep(b, a);
    BookPages_SetWidthAndHeightToSelectedSizeStep();
    BookPages_PrepareNewBookPageSize();
    BV_nLastSizeStep = BV_nCurrentSizeStep;
}
var _lastPreparedBookPageSize = (-1);
function BookPages_ClearLastPreparedBookPageSize() {
    _lastPreparedBookPageSize = (-1);
}
function BookPages_PrepareNewBookPageSize() {
    WordSelectionMgr_ClearWordSelection();
    if (_lastPreparedBookPageSize == BV_nCurrentSizeStep) {
        return;
    }
    _lastPreparedBookPageSize = BV_nCurrentSizeStep;
    BV_nPagesPosDelta = 0;
    bookpages_UpdatePageStyle();
}
function BookPages_SetWidthAndHeightToSelectedSizeStep() {
    BV_nPageImageWidth = BookPages_GetCurrentSizeStepWidth();
    BV_nPageImageHeight = BookPages_GetCurrentSizeStepHeight();
}
function BookPages_GetCurrentSizeStepWidth() {
    return BV_aSizeSteps[BV_nCurrentSizeStep].nWidth;
}
function BookPages_GetCurrentSizeStepHeight() {
    return BV_aSizeSteps[BV_nCurrentSizeStep].nHeight;
}
function BookPages_ClearAllPageBackgroundsAndOverlays() {
    var a = BookPageState_GetPagesWithLoadedBg();
    var c = a.length;
    for (nPage = 0; nPage < c; nPage++) {
        if (!clearPageImage(a[nPage])) {
            return;
        }
    }
    c = BV_nTotalPages;
    var b = BookPageState_SomePagesAreNotVisible();
    for (nPage = 0; nPage < c; nPage++) {
        var d = getElement("BV_oPageWrapper_" + nPage);
        if (d == null) {
            return;
        }
        d.style.display = "";
        if (b && !BookPageState_GetIsVisible(nPage)) {
            d.style.display = "none";
        }
    }
}
function bookpages_setActualSizeStep(f, e) {
    var a = 0;
    for (var g = 0; g < BV_aSizeSteps.length && a == 0; g++) {
        if (BV_aSizeSteps[g].nWidth > f) {
            a = g;
        }
    }
    if (a == 0) {
        a = BV_nMaxSizeStep;
    }
    var b = (a > BV_nMinSizeStep ? a - 1 : BV_nMinSizeStep);
    var d = Math.abs(BV_aSizeSteps[b].nWidth - f);
    var c = Math.abs(BV_aSizeSteps[a].nWidth - f);
    switch (BV_sAutoFitMode) {
    case "fitpage":
        BV_nCurrentSizeStep = (c <= 0 ? a : b);
        break;
    case "fitwidth":
        BV_nCurrentSizeStep = (c <= 0 ? a : b);
        break;
    case "default":
        BV_nCurrentSizeStep = (c <= 0 ? a : b);
        break;
    default:
        BV_nCurrentSizeStep = ((d < c) ? b : a);
        break;
    }
}
function bookpages_getHighestZoomToFitWith(b) {
    var c = 0;
    for (var a = 0; a < BV_aSizeSteps.length; a++) {
        if (BV_aSizeSteps[a].nWidth < b) {
            c = a;
        }
    }
    return c;
}
function BookPages_GetSizeStepWidth(a) {
    return BV_aSizeSteps[a].nWidth;
}
function bookpages_UpdatePageStyle() {
    if (BV_bPostLoadScriptsAvailable) {
        Highlights_ClearAll(false);
    }
    bookpages_ApplyNewStyleRules();
    if (!zooming) {
        loadPagesInView();
    }
}
var bookpages_WirePageEventsCallOnce = false;
function bookpages_ApplyNewStyleRules() {
    BV_DisablePageSizeButtons();
    BV_ApplyingNewStyleRules = true;
    var a = (BV_PrePageSizeChangePosition == null ? BV_GetVerifiedPosition() : BV_PrePageSizeChangePosition);
    if (AdTools_bShowWireframe || AdTools_bShowWordWireframe || AdTools_bShowLineWireframe) {
        BV_RemoveAllWireframeElements();
    }
    bookpages_SetWireframeStyleRule();
    bookpages_SetHighlightsStyleRule();
    bookpages_SetBookNewStyle();
    bookpages_SetAddToBasketStyleRule();
    if (BV_bApplyNewStyleRulesForTheFirstTime) {
        BV_bApplyNewStyleRulesForTheFirstTime = false;
    } else {
        if (BV_bMarkerScriptsLoaded) {
            BookScroll.Rerender_Bookmarks();
            if (!zooming) {
                MarkersMgr_ReRender();
                EmbededMgr_ReRender();
                WordsSelectionMgr_ReRender();
            }
        }
    }
    if (!bookpages_WirePageEventsCallOnce) {
        bookpages_WirePageEventsCallOnce = true;
    }
    clearLoadImagesTimers();
    if (!zooming) {
        BookScroll.Refresh();
        if (a != null && BV_bAllPagesAreLoaded == true && a[0] != "undefined" && a[1] != "undefined") {
            BV_GotoPage(a[0], a[1]);
        }
    }
    BV_EnablePageSizeButtons();
}
function bookpages_SetHighlightsStyleRule() {
    var a = "width:" + BV_nPageImageWidth + "px;height:" + BV_nPageImageHeight + "px;background-position: " + (isIE ? "right top;" : "0px 0px;") + "overflow: hidden;filter: progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=25);";
    $("DIV.BV_oHighlights").attr("style", a);
}
function bookpages_SetWireframeStyleRule() {
    var a = "z-index: 1;position: absolute;top: 0px;left: 0px;width:" + BV_nPageImageWidth + "px;height:" + BV_nPageImageHeight + "px;background-position: " + (isIE ? "right top;" : "0px 0px;") + "overflow: hidden;";
    $("DIV.BV_oWireframeElements").attr("style", a);
}
function bookpages_SetAddToBasketStyleRule() {
    var a = "z-index: 2;position: relative;top: 0px;left: 0px;width: 100%;height: 100%;padding-top: " + (BV_nPageImageHeight - 200) / 2 + "px";
    $(".BV_AddToBasket_Wrapper").attr("style", a);
}
function bookpages_WirePageEvents() {}
function pagesPointerDown(a) {
    mousePos = mouseCoords(a);
    Page_OnMouseDown(a);
}
function bookpages_SetBookNewStyle() {
    var c = document.getElementsByClassName("BV_oPage");
    for (var a = 0; a < c.length; a++) {
        c[a].style.width = BV_nPageImageWidth + "px";
        c[a].style.height = BV_nPageImageHeight + "px";
        c[a].style.lineHeight = BV_nPageImageHeight + "px";
        var b = document.getElementById("BV_oPage_" + a);
        b.style.width = BV_nPageImageWidth + "px";
        b.style.height = BV_nPageImageHeight + "px";
    }
}

/** ========== kotarapp\viewer\js\onload\pages\bookpagesinview.js ========== **/
function BV_ComputePagesInView(a) {
    return;
}
function BV_TranslateToVisiblePagesInView() {
    var c = (-1)
      , b = (-1);
    var d = 0;
    for (var a = 0; a < BV_nTotalPages && c == (-1); a++) {
        if (BookPageState_GetIsVisible(a)) {
            d++;
        }
        if (d == (BV_nTopPageInView + 1)) {
            c = a;
        }
    }
    b = c;
    if (BV_nBottomPageInView > BV_nTopPageInView) {
        for (var a = c + 1; a < BV_nTotalPages && b == c; a++) {
            if (BookPageState_GetIsVisible(a)) {
                d++;
            }
            if (d == (BV_nBottomPageInView + 1)) {
                b = a;
            }
        }
    }
    if (c == (-1)) {
        c = 0;
    }
    if (b == (-1)) {
        b = 0;
    }
    BV_nTopPageInView = c;
    BV_nBottomPageInView = b;
}
var BV_sLastDisplayedAjaxPageRange = "";
function BV_ShowAjaxPageRange() {
    if (BV_nTopPageInView >= 0 && BV_nTopPageInView < BV_nTotalPages && BV_nBottomPageInView >= 0 && BV_nBottomPageInView < BV_nTotalPages) {
        var c = BV_nTopPageInView;
        var b = BV_nBottomPageInView;
        var a = (c != b);
        c = BookPageState_GetPageLabel(BV_nTopPageInView);
        b = BookPageState_GetPageLabel(BV_nBottomPageInView);
        var d = "";
        if (a) {
            d = TXT_Pages + ": " + c + " " + TXT_To + " " + b;
        } else {
            if (BV_nTopPageInView < (BV_nTotalPages - 1)) {
                d = TXT_Page + ": " + c;
            } else {
                d = TXT_Page + ": " + b;
            }
        }
        if (d != BV_sLastDisplayedAjaxPageRange) {
            ShowAjaxMessageBox(d);
            BV_sLastDisplayedAjaxPageRange = d;
        }
    }
}
function BV_GetViewportHeight() {
    var b = BookScroll.ScrollTop();
    var a = b + BV_BookWrraper_offsetHeight - 1;
    return (a - b);
}
function BV_ComputePageVisiblePortion(c) {
    try {
        if (c > BV_nTotalPages || c < 0) {
            return 0;
        }
        var i = BookScroll.ScrollTop();
        var h = i + BV_BookWrraper_offsetHeight - 1;
        var j = BV_GetViewportHeight();
        var d = BV_GetPagesPosDelta();
        var f = (i - BV_nFirstPagePos) - (c * d);
        if (f > h || ((c + 1) * d) < i) {
            return 0;
        } else {
            var b = i - (c * d);
            var k = 0;
            if (b >= 0) {
                k = d - b;
            } else {
                k = j + b;
            }
            var g = k / (d / 100);
            if (g > 100) {
                g = 100;
            }
            return g;
        }
    } catch (a) {}
    return 0;
}
function calcPage(c) {
    var b = BV_GetPagesPosDelta();
    var a = Math.floor((c - BV_nFirstPagePos) / b);
    if (a < 0) {
        a = 0;
    }
    if (a > (BV_nTotalPages - 1)) {
        a = BV_nTotalPages - 1;
    }
    return a;
}
function calcPagesInView(e) {
    var c = BV_GetPagesPosDelta();
    var d = e + BV_BookWrraper_offsetHeight - 1;
    var b = (e - BV_nFirstPagePos) / c;
    var a = (d - BV_nFirstPagePos) / c;
    BV_nTopPageInView = Math.floor(b);
    BV_nBottomPageInView = Math.floor(a);
    if (BV_nTopPageInView < 0) {
        BV_nTopPageInView = 0;
    }
    if (BV_nBottomPageInView > (BV_nTotalPages - 1)) {
        BV_nBottomPageInView = BV_nTotalPages - 1;
    }
    BV_nOffsetInPage = e - (c * BV_nTopPageInView);
    if (BV_nOffsetInPage != 0) {
        BV_nOffsetInPage = Math.floor(BV_nOffsetInPage * UTILS_nLogicalUnits / c);
    }
}
function SetDisplayByPagesInVew(a) {
    if (AdTools_bShowOnlyPagesWithPics || AdTools_bShowOnlyLockedPages) {
        BV_TranslateToVisiblePagesInView();
    } else {
        if (BV_nTopPageInView != BV_nLastTopPageInView) {
            OnCurrentPageChange();
        }
        if (BV_nTopPageInView != BV_nLastTopPageInView || a) {
            BV_nLastTopPageInView = BV_nTopPageInView;
            if (BV_UpdateBrowserLocation_Timer > 0) {
                window.clearTimeout(BV_UpdateBrowserLocation_Timer);
            }
            if (location.href.indexOf("ShowMarker") < 0) {
                BV_UpdateBrowserLocation_Timer = window.setTimeout("BV_UpdateBrowserLocation_OnTimer()", BV_UpdateBrowserLocation_Timeout);
            }
        }
    }
}

/** ========== kotarapp\viewer\js\onload\pages\bookpagestate.js ========== **/
function BookPageState_Update(a, c) {
    BookPageState_SetHasMarkers(a, c.bMarkers);
    BookPageState_SetMarkersLoaded(a, false);
    BookPageState_SetIsMarkedAsClosed(a, c.bIsClosed);
    BookPageState_SetHasPictures(a, c.bPictures);
    if (c.bOpen != BookPageState_GetIsOpen(a)) {
        var b = BV_GetPageImageElement(a);
        b.style.backgroundImage = "url('')";
    }
    BookPageState_SetIsOpen(a, c.bOpen);
}
function BookPageState_PageExists(a) {
    return (typeof (oPagesInfo) != "undefined" && oPagesInfo != null && oPagesInfo.pages[a] != null);
}
function BookPageState_GetPageID(a) {
    return (oPagesInfo.pages[a].pid);
}
function BookPageState_GetPageGuid(a) {
    return (antiPlagiarism(oPagesInfo.pages[a].gid));
}
function BookPageState_GetPageIndex(a) {
    return (aBookPagesInfo[a]);
}
function BookPageState_GetPageNumber(a) {
    return (aBookPagesInfo[a] + 1);
}
function BookPageState_GetPageLabel(a) {
    return (oPagesInfo.pages[a].lbl);
}
function BookPageState_GetIsPrintable(a) {
    return BookPageState_GetIsOpen(a);
}
function BookPageState_GetPageImageVersion(a) {
    return (oPagesInfo.pages[a].v);
}
function BookPageState_GetIsOpen(a) {
    return (oPagesInfo.pages[a].o);
}
function BookPageState_SetIsOpen(b, a) {
    oPagesInfo.pages[b].o = a;
}
function BookPageState_GetHasHighlights(a) {
    return (oPagesInfo.pages[a].h == 1);
}
function BookPageState_SetHasHighlights(b, a) {
    oPagesInfo.pages[b].h = (a ? 1 : 0);
}
function BookPageState_GetHasCartCover(a) {
    return (oPagesInfo.pages[a].hc == 1);
}
function BookPageState_SetHasCartCover(b, a) {
    oPagesInfo.pages[b].hc = (a ? 1 : 0);
}
function BookPageState_GetHasMarkers(a) {
    return (oPagesInfo.pages[a].m == 1);
}
function BookPageState_SetHasMarkers(b, a) {
    oPagesInfo.pages[b].m = (a ? 1 : 0);
}
function BookPageState_GetMarkersLoaded(a) {
    return (oPagesInfo.pages[a].ml == 1);
}
function BookPageState_SetMarkersLoaded(b, a) {
    oPagesInfo.pages[b].ml = (a ? 1 : 0);
}
function BookPageState_ResetMarkersLoadedForAllPages() {
    var b = BV_nTotalPages;
    for (var a = 0; a < b; a++) {
        oPagesInfo.pages[a].ml = 0;
    }
}
function BookPageState_GetHasPictures(a) {
    return (oPagesInfo.pages[a].hp == 1);
}
function BookPageState_SetHasPictures(b, a) {
    oPagesInfo.pages[b].hp = (a ? 1 : 0);
}
function BookPageState_GetIsMarkedAsClosed(a) {
    return (oPagesInfo.pages[a].ic == 1);
}
function BookPageState_SetIsMarkedAsClosed(b, a) {
    oPagesInfo.pages[nPageIndex].ic = (a ? 1 : 0);
}
function BookPageState_GetBgLoaded(a) {
    return (oPagesInfo.pages[a].BgLoaded == true);
}
function BookPageState_SetBgLoaded(b, a) {
    oPagesInfo.pages[b].BgLoaded = a;
}
function BookPageState_GetPagesWithLoadedBg() {
    var b = new Array();
    for (var a = 0; a < BV_nTotalPages; a++) {
        if (oPagesInfo.pages[a].BgLoaded) {
            b.push(a);
        }
    }
    return b;
}
function BookPagesState_SetDefaultFlagsForAllPages() {
    var a = 0
      , c = BV_nTotalPages;
    for (var b = 0; b < c; b++) {
        var d = oPagesInfo.pages[b];
        d.BgLoaded = false;
        d.ml = 0;
        d.hc = 0;
    }
}
function BookPageState_SomePagesAreNotVisible() {
    return (AdTools_bShowOnlyPagesWithPics || AdTools_bShowOnlyLockedPages);
}
function BookPageState_GetIsVisible(a) {
    if (AdTools_bShowOnlyPagesWithPics) {
        return (BookPageState_GetHasPictures(a));
    } else {
        if (AdTools_bShowOnlyLockedPages) {
            return (BookPageState_GetIsMarkedAsClosed(a));
        } else {
            return true;
        }
    }
}
function BookPageState_GetPageNumberByLabel(b) {
    for (var a = 0; a < BV_nTotalPages; a++) {
        if (oPagesInfo.pages[a].lbl == b) {
            return a + 1;
        }
    }
    return 0;
}
function BookPageState_IsBookmark(a) {
    return (oPagesInfo.pages[a].b);
}
function BookPageState_SetBookmark(b, a) {
    oPagesInfo.pages[b].b = a;
}

/** ========== kotarapp\viewer\js\onload\pages\content.js ========== **/
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(a) {
        var c = this.length;
        var b = Number(arguments[1]) || 0;
        b = (b < 0) ? Math.ceil(b) : Math.floor(b);
        if (b < 0) {
            b += c;
        }
        for (; b < c; b++) {
            if (b in this && this[b] === a) {
                return b;
            }
        }
        return -1;
    }
    ;
}
if (!Array.prototype.clear) {
    Array.prototype.clear = function() {
        this.splice(0, this.length);
    }
    ;
}
var BV_nHQPages = 3;
var HighQualityImages = new Array();
var waitToLoadImagesTimersList = new Array();
var loadImagesBuffer = 3;
var loadImagesBufferConst = 3;
var loadImagesTimer = 70;
var loadImagesTimerConst = 20;
var waitToLoadImageQ = new Array();
var BV_nHighQualityImagesTimeoutID = 0;
var lastFromPage = null;
var lastToPage = null;
var loadedPagesList = new Array();
var imagesLoaderQ = new Array();
function pageContentLoad(a) {
    if (a < 0 || a >= BV_nTotalPages) {
        return;
    }
    if (BV_bHasTOC) {
        LoadTocIfNotAlreadyLoaded();
    }
    if (BV_bPostLoadScriptsAvailable) {
        Highlights_LoadPageHighlights(a);
    }
    if (AdTools_bShowWireframe || AdTools_bShowWordWireframe || AdTools_bShowLineWireframe) {
        BV_LoadPageWireframe(a);
    }
    MarkersMgr_ShowPageMarkers(a);
    WordsMgr_LoadPageWords(a);
}
function PageContent_LoadPagesInView(c) {
    var a = BV_SmartLoadInitialDelay;
    clearLoadImagesTimers();
    var e = 1;
    CalcImageDisplayBuffer();
    var f = CalcToPage();
    var b = CalcFromPage();
    if (scrollDirectionDown) {
        for (var d = b; d <= f; d++) {
            PageContent_LoadPageInView(d, a, c);
        }
    } else {
        for (var d = b; d >= f; d--) {
            PageContent_LoadPageInView(d, a, c);
        }
    }
}
function PageContent_LoadPageInView(c, a, b) {
    if (BookPageState_GetIsVisible(c)) {
        if (BookPageState_PageExists(c) && !BookPageState_GetIsOpen(c) && !BookPageState_GetHasCartCover(c)) {
            Cart_CoverPage(c);
        }
        if (b) {
            pagescontent_SmartLoadPageContent(c, 0);
        } else {
            pagescontent_SmartLoadPageContent(c, a);
            a = a + BV_SmartLoadDelayIncrement;
        }
    }
}
function pagescontent_GetSmartLoadQueueLength() {
    return waitToLoadImageQ.length;
}
function pagescontent_SmartLoadPush(b, a) {
    waitToLoadImageQ.push(b);
    waitToLoadImagesTimersList["T:" + b] = window.setTimeout("pageContentLoad(" + b + ")", a * BV_SmartLoadDelayUnit);
}
function pagescontent_SmartLoadPop(a) {
    var b = waitToLoadImageQ.indexOf(a);
    if (b > -1) {
        waitToLoadImageQ.splice(b, 1);
    }
}
function pagescontent_SmartLoadGetNextToPop() {
    if (waitToLoadImageQ.length > 1) {
        return waitToLoadImageQ[1];
    }
}
function clearLoadImagesTimers() {
    while (pagescontent_GetSmartLoadQueueLength() > 0) {
        var a = waitToLoadImageQ.shift();
        window.clearTimeout(waitToLoadImagesTimersList["T:" + a]);
    }
}
function pagescontent_SmartLoadPageContent(b, a) {
    if (waitToLoadImageQ.indexOf(b) > -1) {
        return;
    }
    pagescontent_SmartLoadPush(b, a);
}
function SetBookPagesDisplay(a, b) {
    if (a == lastFromPage && lastToPage == b) {
        return;
    }
    if (a == BV_nTopPageInView && b == BV_nBottomPageInView) {
        CalcImageBuffer();
        lastFromPage = a;
        lastToPage = b;
        unLoadPagesInView();
        loadPagesInView();
    }
}
function clearLoadedPagesList() {
    loadedPagesList.clear();
}
function clearLoadedPage(b) {
    for (var a = 0; a < loadedPagesList.length; a++) {
        if (loadedPagesList[a] == b) {
            loadedPagesList.splice(a, 1);
        }
    }
}
function unLoadPagesInView() {
    if (loadedPagesList.length < loadImagesBuffer) {
        return;
    }
    var a = CalcFromPage();
    var d = CalcToPage();
    for (var b = 0; b < loadedPagesList.length; b++) {
        var c = false;
        if (scrollDirectionDown) {
            c = loadedPagesList[b] >= a && loadedPagesList[b] <= d;
        } else {
            c = loadedPagesList[b] <= a && loadedPagesList[b] >= d;
        }
        if (!c) {
            clearPageImage(loadedPagesList[b]);
            loadedPagesList.splice(b, 1);
            if (loadedPagesList.length < loadImagesBuffer) {
                return;
            }
            b--;
        }
    }
}
function loadPagesInView() {
    imagesLoaderQ.clear();
    var a = CalcFromPage();
    if (a < 0) {
        return;
    }
    CalcImageDisplayBuffer();
    var d = CalcToPage();
    var c = new Array();
    if (scrollDirectionDown) {
        for (var b = a; b <= d; b++) {
            addImageURL(b, c);
        }
    } else {
        for (var b = a; b >= d; b--) {
            addImageURL(b, c);
        }
    }
    imagesLoaderQ = c;
    pageImageLoader();
}
function loadPagesInViewForZoom(a, d) {
    imagesLoaderQ.clear();
    CalcImageDisplayBuffer();
    var c = new Array();
    for (var b = a; b <= d; b++) {
        addImageURL(b, c);
    }
    imagesLoaderQ = c;
    pageImageLoader();
}
function addImageURL(a, b) {
    var c = PageImages_GetPageImageURL(a, true);
    if (BookPageState_GetIsVisible(a)) {
        if (BookPageState_PageExists(a) && !BookPageState_GetIsOpen(a) && !BookPageState_GetHasCartCover(a)) {
            Cart_CoverPage(a);
        }
        b.push({
            url: c,
            pageIndex: a
        });
    }
}
var image;
var pageImageLoaderIndex;
var pageImageLoaderUrl;
var currentSizeStep;
var jqImage = null;
var isBusy;
function pageImageLoader() {
    try {
        if (imagesLoaderQ.length == 0) {
            return;
        }
        image = new Image();
        jqImage = $(image).load(pageBookImageLoaded).error(function() {});
        var b = imagesLoaderQ.shift();
        var c = b.pageIndex;
        var d = b.url;
        b.pageZoomSize = BV_nCurrentSizeStep;
        image.imageInfo = b;
        if (IsImageRelevant(c) && loadedPagesList.indexOf(c) == -1 && !BookPageState_GetBgLoaded(c)) {
            jqImage.attr("src", d);
            Bandwidth.StartLoadPageImage(b.pageIndex, BV_nCurrentSizeStep);
            handleBookImageComplete(image);
        } else {
            pageImageLoader();
        }
    } catch (a) {
        setTimeout(function() {
            pageImageLoader();
        }, 40);
    }
}
function handleBookImageComplete(a) {
    if (a.imageInfo != null) {
        if (a.complete) {
            displayBookPage(a.imageInfo.url, a.imageInfo.pageIndex);
            a.imageInfo = null;
            pageImageLoader();
        }
    }
}
function pageBookImageLoaded(b) {
    if (this.imageInfo != null) {
        Bandwidth.FinishLoadPageImage(this.imageInfo.pageIndex, this.imageInfo.pageZoomSize);
        var c = this.imageInfo.pageIndex;
        var d = this.imageInfo.url;
        var a = this.imageInfo.pageZoomSize;
        if (IsImageRelevant(c) && a == BV_nCurrentSizeStep && !BookPageState_GetBgLoaded(c)) {
            displayBookPage(d, c);
        }
        this.src = "";
        this.imageInfo = null;
        $(this).remove();
        pageImageLoader();
    }
}
function displayBookPage(b, a) {
    if (loadedPagesList.indexOf(a) == -1) {
        loadedPagesList.push(a);
    }
    if (setPageImage(a, "url(" + b + ")")) {
        pageContentLoad(a);
    } else {
        clearLoadedPage(a);
        setTimeout(function() {
            loadPagesInView();
        }, 40);
    }
}
function clearPageImage(b) {
    BookPageState_SetBgLoaded(b, false);
    var a = true;
    return a;
}
function setPageImage(b, c) {
    var a = BV_GetPageImageElement(b);
    if (a != null) {
        BookPageState_SetBgLoaded(b, c != "");
        if (c == "") {
            c = "none";
        }
        if (a.style.backgroundImage === "") {
            a.style.backgroundImage = c;
        } else {
            a.style.backgroundImage = a.style.backgroundImage.split(",")[0] + "," + c;
            setTimeout(function() {
                a.style.backgroundImage = a.style.backgroundImage.split(",")[1];
            }, 100);
        }
        return true;
    }
    return false;
}
function CalcImageBuffer() {
    var a = (BV_nMaxSizeStep + 1) - BV_nCurrentSizeStep;
    loadImagesBuffer = loadImagesBufferConst * a;
}
function CalcImageDisplayBuffer() {
    var a = Math.ceil(((BV_nMaxSizeStep + 1) - BV_nCurrentSizeStep) / 3);
    loadImagesDisplayBuffer = a;
}
function CalcImageDisplayTimer() {
    var a = Math.ceil(BV_nCurrentSizeStep + 2);
    loadImagesTimer = loadImagesTimerConst * a * Bandwidth.GetCurrentColor();
    return loadImagesTimer;
}
function CalcFromPage() {
    if (scrollDirectionDown) {
        return BV_nTopPageInView;
    } else {
        return BV_nBottomPageInView;
    }
}
function CalcToPage() {
    if (scrollDirectionDown) {
        return Math.min(BV_nBottomPageInView + loadImagesDisplayBuffer, BV_nTotalPages - 1);
    } else {
        return Math.max(BV_nTopPageInView - loadImagesDisplayBuffer, 0);
    }
}
function clearAllPagesBackgrounds() {
    for (var a = 0; a < loadedPagesList.length; a++) {
        if (!clearPageImage(loadedPagesList[a])) {
            return;
        }
    }
    clearLoadedPagesList();
}
function clearPageBackground(a) {
    if (!clearPageImage(a)) {
        return;
    }
    clearLoadedPage(a);
}
function clearNotInViewPagesBackgrounds(a, c) {
    for (var b = 0; b < loadedPagesList.length; b++) {
        if (loadedPagesList[b] < a || loadedPagesList[b] > c) {
            if (!clearPageImage(loadedPagesList[b])) {
                return;
            }
        }
    }
    clearLoadedPagesList();
}
function IsImageRelevant(b) {
    var a = CalcFromPage();
    var c = CalcToPage();
    if (scrollDirectionDown) {
        if (b >= a && b <= c) {
            return true;
        } else {
            return false;
        }
    } else {
        if (b >= c && b <= a) {
            return true;
        } else {
            return false;
        }
    }
}
function loadImageFixerWatcher() {
    if (window.BV_sOpenPageUrlFormat !== undefined && window.BV_oBook != null) {
        setTimeout("loadImageFixer(" + BV_nTopPageInView + "," + BV_nBottomPageInView + ");", 200);
    }
}
function loadImageFixer(a, c) {
    if (a == BV_nTopPageInView && c == BV_nBottomPageInView) {
        for (var b = a; b <= c; b++) {
            if (BookPageState_GetIsVisible(b)) {
                if (BookPageState_PageExists(b) && !BookPageState_GetIsOpen(b) && !BookPageState_GetHasCartCover(b)) {}
                var d = PageImages_GetPageImageURL(b, true);
                if (loadedPagesList.indexOf(b) == -1) {
                    displayBookPage(d, b);
                }
            }
        }
    }
}

/** ========== kotarapp\viewer\js\onload\pages\events.js ========== **/
function Page_IgnoreMouseDown(a) {
    if (window.event) {
        a = window.event;
    }
    a.cancelBubble = true;
}
function Page_OnMouseDblclick(a) {
    if (window.event) {
        a = window.event;
    }
    var f = a.srcElement ? a.srcElement : a.target;
    var d = f.id;
    if (d === undefined) {
        return true;
    }
    var c = f;
    while (d !== undefined && d.indexOf("BV_oPage_") == (-1) && c != null) {
        c = (isIE ? c.parentElement : c.parentNode);
        if (c !== null) {
            d = c.id;
        }
    }
    if (d === undefined || c == null) {
        return;
    }
    f = c;
    var b = parseInt(f.id.replace("BV_oPage_", ""));
    if (isNaN(b)) {
        return;
    }
    switch (BV_sActiveTool) {
    case BV_SELECT:
        BV_WordClickSelection(a);
        break;
    }
    return true;
}
function CheckPageIsOpen(c, a) {
    var b = true;
    if (c.className == "BV_AddToBasket_Wrapper" || !BookPageState_GetIsOpen(a)) {
        switch (BV_sActiveTool) {
        case BV_TOC_ENTRY:
            Utils_ShowMessageDialog(TXT_CantAddTocEntriesToClosedPage, TXT_BlockedAction, true);
            break;
        case BV_SELECT:
            Utils_ShowMessageDialog(TXT_CantAddHighlightsToClosedPage, TXT_BlockedAction, true);
            break;
        case BV_PUSHPIN:
            Utils_ShowMessageDialog(TXT_CantAddNotesToClosedPage, TXT_BlockedAction, true);
            break;
        case BV_COPY:
            Utils_ShowMessageDialog(TXT_CantCopyFromClosedPage, TXT_BlockedAction, true);
            break;
        case BV_LINK:
            Utils_ShowMessageDialog(TXT_CantAddLinksToClosedPage, TXT_BlockedAction, true);
            break;
        case BV_LMS_TASK:
            Utils_ShowMessageDialog(TXT_CantAddLMSTaskToClosedPage, TXT_BlockedAction, true);
            break;
        }
        b = false;
    }
    return b;
}

/** ========== kotarapp\viewer\js\onload\pages\gotopage.js ========== **/
function BV_GotoPage(b, a) {
    if (b < 0) {
        b = 0;
    }
    if (b > BV_nTotalPages) {
        b = BV_nTotalPages;
    }
    if (AdTools_bShowOnlyPagesWithPics || AdTools_bShowOnlyLockedPages) {
        b = BV_GetClosestVisiblePage(b);
    }
    if (b >= 0 && b <= BV_nTotalPages) {
        var c = (b - 1) * BV_GetPagesPosDelta();
        if (typeof (a) != "undefined") {
            c += Math.floor((a * BV_GetPagesPosDelta()) / UTILS_nLogicalUnits);
        }
        if (c < 0) {
            c = 0;
        }
        BookScroll.ScrollTop(c);
        if (!is_phone) {
            calcPagesInView(c);
            SetBookPagesDisplay(BV_nTopPageInView, BV_nBottomPageInView);
        }
    }
}
function BV_GetClosestVisiblePage(b) {
    var c = 0, a;
    for (a = 0; a < b; a++) {
        if (BookPageState_GetIsVisible(a)) {
            c++;
        }
    }
    if (!BookPageState_GetIsVisible((b - 1))) {
        ShowAjaxNotification(TXT_ReqPageIsNotVisible + " (" + b + ")");
    } else {
        HideAjaxMessageBox();
    }
    return c;
}
function BV_GotoPageByLabel(b) {
    for (var a = 0; a < BV_nTotalPages; a++) {
        if (BookPageState_GetPageLabel(a) == b) {
            if (!BookPageState_GetIsVisible(a)) {
                ShowAjaxNotification(TXT_ReqPageIsNotVisible + " (" + b + ")");
                return true;
            } else {
                BV_GotoPage(a + 1);
                return true;
            }
        }
    }
    return false;
}
function BV_GotoNextPage() {
    BV_GotoPage(BV_nTopPageInView + 2);
}
function BV_GotoPrevPage() {
    BV_GotoPage(BV_nTopPageInView);
}
function IsTotalPagesExceed(c, b) {
    var d = BV_GetPagesPosDelta();
    var f = (c - 1) * d;
    if (typeof (b) != "undefined") {
        f += Math.floor((b * d) / UTILS_nLogicalUnits);
    }
    if (f < 0) {
        f = 0;
    }
    var e = f + BV_BookWrraper_offsetHeight - 1;
    var a = (e - BV_nFirstPagePos) / d;
    BV_nBottomPageInView = Math.ceil(a);
    return BV_nBottomPageInView > (BV_nTotalPages - 1);
}

/** ========== kotarapp\viewer\js\onload\pages\images.js ========== **/
function PageImages_GetPageForPrintImageURL(a) {
    return pageimages_CalcPageImageURL(a, true, true);
}
function PageImages_GetPageImageURL(b, a) {
    return pageimages_CalcPageImageURL(b, a, false);
}
function pageimages_CalcPageImageURL(d, b, a) {
    if (d < 0) {
        return "";
    }
    if (BV_bPagesInStorage == false) {
        b = true;
    }
    var c = BookPageState_GetIsOpen(d);
    if (a == true && c == false) {
        return "";
    }
    var e = BV_sCdnDomain.replace("$$", (BV_nCdnServers > 1 ? (d % BV_nCdnServers) : ""));
    var f = (a ? BV_sPrintPageUrlFormat : (c ? BV_sOpenPageUrlFormat : BV_sClosedPageUrlFormat));
    f = f.replace("{CDN}", e);
    f = f.replace("{nBookID}", BV_nBookID);
    f = f.replace("{nPageNum}", d + 1);
    f = f.replace("{nPageID}", BookPageState_GetPageID(d));
    f = f.replace("{gPageToken}", BookPageState_GetPageGuid(d));
    f = f.replace("{nQuality}", (b == true ? BV_nHighQualitySizeStepID : BV_nLowQualitySizeStepID));
    f = f.replace("{nStep}", (c == true ? (BV_bPagesInStorage == true ? BV_nCurrentSizeStep + 1 : BV_nCurrentSizeStep) : (BV_bPagesInStorage == true ? BV_nCurrentSizeStep + 1 : BV_nCurrentSizeStep)));
    f = f.replace("{nVersion}", BookPageState_GetPageImageVersion(d));
    if (BV_bPagesInStorage == false) {
        f += (f == "" ? "?" : "&") + "_bIsOpen=" + c;
    }
    if (!a && f.indexOf("https://") != 0 && BV_bPagesInStorage) {
        f = "https://" + f;
    }
    return f;
}
var keyChar = "g";
function antiPlagiarism(a) {
    var c = keyChar.charCodeAt(0);
    var b = "";
    for (i = 0; i < a.length; i++) {
        b += String.fromCharCode(c ^ a.charCodeAt(i));
    }
    return b;
}

/** ========== kotarapp\viewer\js\onload\pages\utils.js ========== **/
function BV_GetPageWrapperElement(a) {
    if (isIE) {
        return BV_oBook.children[a];
    } else {
        return BV_oBook.childNodes[a];
    }
}
function BV_GetPageImageElement(b) {
    var a = (isIE ? BV_oBook.children[b] : BV_oBook.childNodes[b]);
    if (a == null) {
        return;
    }
    if (isIE) {
        return a.children[0];
    } else {
        return a.childNodes[0];
    }
}
function BV_AddElementToPage(a, b) {
    if (BV_oBook.children.length == 0) {
        return null;
    }
    if (isIE) {
        return BV_oBook.children[a].children[0].appendChild(b);
    } else {
        return BV_oBook.childNodes[a].childNodes[0].appendChild(b);
    }
}
function BV_SetPageBackgroundImage(c, d) {
    var b = BV_GetPageImageElement(c);
    if (b != null) {
        var a = (d != "");
        BookPageState_SetBgLoaded(c, a);
        b.style.backgroundImage = (a ? d : "url('')");
        return true;
    }
    return false;
}
function BV_GetPageBackgroundImage(b) {
    var a = BV_GetPageImageElement(b);
    if (a != null) {
        return a.style.backgroundImage;
    }
    return "";
}
function BV_GetPagesPosDelta() {
    if (BV_nPagesPosDelta == 0) {
        BV_nPagesPosDelta = BookPages_GetCurrentSizeStepHeight() + 10;
    }
    return BV_nPagesPosDelta;
}
function BV_GetCurrentPageNum() {
    return BV_nTopPageInView + 1;
}
function BV_GetCurrentPageLabel() {
    if (BV_nTopPageInView >= 0 && BV_nTopPageInView < BV_nTotalPages) {
        return BookPageState_GetPageLabel(BV_nTopPageInView);
    }
    return "";
}
function BV_GetCurrentPageID() {
    if (BV_nTopPageInView >= 0 && BV_nTopPageInView < BV_nTotalPages) {
        return BookPageState_GetPageID(BV_nTopPageInView);
    }
    return "";
}
function BV_IsCurrentPageOpen() {
    if (BV_nTopPageInView >= 0 && BV_nTopPageInView < BV_nTotalPages) {
        return BookPageState_GetIsOpen(BV_nTopPageInView);
    }
    return false;
}

/** Created in 531.2661 ms **/
