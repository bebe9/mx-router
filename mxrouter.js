/*!
 * mxrouter (https://github.com/bebe9/mxrouter)
 * the simplest version  with no stayAlive ,no sourcerender  v2.0
 * Copyright 2016
 * Licensed under the  MIT license
 *
 * this is core version , with basic component
 *
 * created by ck  2016.10.13
 * mxstrong@126.com
 */

(function () {

    window.Router = function Router(params) {
        this.routeMap = [];
        this.defaultUrl = '/';
        this.dommap = {};
        this._history=[];
        this.cur(params);
    };

    Router.prototype._config = {
        container: '#container'
    };

    Router.prototype.cur = function (params) {
        this._config = $.extend({}, this._config, params || {});
    };

    Router.prototype.parseHash = function () {
        var hash = location.hash;
        var self = this;
        var routeMap = self.routeMap;
        var _chose = false;
        var _route;
        var matchResult;

        for (var routeIndex in routeMap) {
            _route = routeMap[routeIndex];
            matchResult = hash.match(_route.rule);
            if (matchResult) {
                _chose = _route;
                break;
            }
        }

        if (!_chose) {
            throw new TypeError('the site url is not found');
        }

        self.manageUnmount();

        self.currentId=_chose.id;
        self.pushHistory(_chose.id);

        self.manageMount();
    };

    Router.prototype.manageUnmount = function () {
        var self = this;
        var _now = self.getNow();
        if(!_now) return;
        _now.isActive=false;
        _now.domWillUnmount();
        if (_now.leaveTimeout > 0) {
            _now.wrap.addClass(_now.leave);
            _now._leaveTout=setTimeout(function () {
                self.container.find('.'+_now.className).remove();
                delete _now._leaveTout;
            }, _now.leaveTimeout);
        } else {
            _now.wrap.remove();
        }
        _now.state = {};
        _now.params = {};
        _now.wrap=null;
    };

    Router.prototype.manageMount = function () {
        var self = this;
        var _now = self.getNow();
        _now.isActive=true;
        if (typeof _now.getInitialState === 'function') {
            var _r = _now.getInitialState();
            if (_r) {
                _now.state = _r;
            }else{
                _now.state={};
            }
        }
        self.container.append("<div class='" + _now.className + "'></div>");
        _now.wrap=self.container.find('.'+_now.className);
        _now.domWillMount();
        _now.wrap.html(_now.render());
        if (_now.enterTimeout > 0) {
            _now.wrap.addClass(_now.enter);
            _now._enterTout=setTimeout(function () {
                _now.wrap.removeClass(_now.enter);
                delete _now._enterTout;
            }, _now.enterTimeout);
        }
        _now.domDidMount();
    };

    Router.prototype.pushHistory = function (id) {
        this._history.unshift(id);
        if (this._history.length >= 20) {
            this._history.pop();
        }
    };

    Router.prototype.getNow = function () {
        if (this._history.length) {
            return this.getDom(this._history[0]);
        } else {
            return false;
        }
    };

    Router.prototype.getDom = function (id) {
        if (typeof id == 'string') {
            var _dom=this.dommap[id];
            if(_dom){
                return _dom;
            }else{
                return undefined;
            }
        }
        return undefined;
    };

    Router.prototype.push = function (id, _params) {
        var self = this;
        var rule;
        var url = _params.url;
        if (url == '/') {
            rule = '^#/$';
        } else {
            rule = '^#' + url + '$';
        }
        self.routeMap.push({
            id: id,
            url: _params.url,
            rule: new RegExp(rule, 'i')
        });
        _params.id = id;
        this.dommap[id] = _params;
        return self;
    };

    Router.prototype.setDefault = function (url) {
        this.defaultUrl = url;
        return this;
    };

    Router.prototype.listen = function () {
        var self = this;
        window.addEventListener('hashchange', function () {
            self.parseHash();
        }, !1)
    };

    Router.prototype.init = function () {
        this.container = $(this._config.container);
        this.listen();
        var hash = location.hash;
        if (hash.length === 0) {
            location.href = '#' + this.defaultUrl;
            return false;
        } else {
            this.parseHash();
        }
    };

})();