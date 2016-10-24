/*!
 * Mx
 * Copyright 2016
 * Licensed under the  MIT license
 *
 * the basic component to init app
 *
 * created by ck  2016.10.13
 * mxstrong@126.com
 */

(function ($) {

    "use strict";

    if (typeof Zepto === "undefined") {
        throw new Error("requires Zepto");
    }

    window.Mx = window.Mx || {
            wrap: function (wrap) {
                $.extend(this, wrap || {});
            }
        };

    Mx.wrap({
        version: '1.0',
        isDebug: true,
        debug: function (msg) {
            if (this.isDebug && console) {
                console.log("debug", msg);
            }
        },
        error: function (msg) {
            if (console) {
                console.log("error", msg);
            }
        },
        info: function (msg) {
            if (console) {
                console.log("info", msg);
            }
        }
    });

})(Zepto);



/*
 * MxDom
 */
(function ($) {

    "use strict";

    //MxDom
    var MxDom = function (params) {
        this._init(params);
    };

    MxDom.prototype._ori_dom = {
        url: '',
        className: 'MxDom_test_class_name',
        state: {},
        params: {},

        enter: "enter",
        leave: "leave",
        enterTimeout: 200,  //通过css控制进入特效，清除css的时间，与显示无关
        leaveTimeout: 250,

        renderLoading: function () {
            return "<i class='mx-dom-loading'>正在载入</i>";
        },

        renderError: function (info) {
            return "<div class='mx-page-error'>"+info+"</div>";
        },

        getInitialState: function () {
            return {};
        },
        setState: function (params) {
            var self = this;
            var shouldRend = false;

            for (var i in params) {
                if (params.hasOwnProperty(i)) {
                    if (self.state[i] !== params[i]) {
                        self.state[i] = params[i];
                        shouldRend = true;
                    }
                }
            }

            if (shouldRend) {
                if (!this.wrap) return;
                this.wrap.html(this.render());
            }
        },

        render: function () {

        },

        domWillMount: function () {

        },
        domDidMount: function () {

        },

        domWillUnmount: function () {

        }
    };

    MxDom.prototype._init = function (params) {
        $.extend(this, this._ori_dom, params || {});
    };

    Mx.createDom=function(_json){
        return new MxDom(_json);
    };

})(Zepto);