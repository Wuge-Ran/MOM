Page({
    data:{
        path:''
    },
    onLoad: function (options) {
        console.log(options)
        var webview = options.webview;
        this.setData({
            path: webview
        })
    }
})