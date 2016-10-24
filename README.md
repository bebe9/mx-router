# mxrouter version v2.0

update @ 2016.10.23

this is a smart and faster router

created by ck(mxstrong@126.com)  2016.10.13


##### mxrouter (https://github.com/bebe9/mxrouter)


### how to init a app

    window.MxRouter = new Router({
        container: '#container',
        enterTimeout: 200,
        leaveTimeout: 200
    });


    var home = Mx.createDom({
        url: '/',
        className: 'home',
        render: function () {
            return $('#tpl_home').html();
        }
    });
    MxRouter.push('home', home);


    var article=Mx.createDom({
        url: '/article',
        className: 'article',
        render: function () {
            return $('#tpl_article').html();;
        }
    });
    MxRouter.push('article',article);



    var detail=Mx.createDom({
        url: '/detail',
        className: 'detail',
        render: function () {
            return $('#tpl_detail').html();;
        }
    });

    MxRouter.push('detail',detail);


    MxRouter.setDefault('/').init();
    
    

Copyright 2016

Licensed under the  MIT license
