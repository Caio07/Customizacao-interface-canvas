/***************
Handtalk
****************/
var s = document.createElement("script");
s.type = "text/javascript";
s.src = "//api.handtalk.me/plugin/latest/handtalk.min.js";
$("body").append(s);

setTimeout(function () {
  var ht = new HT({
    token: "5aea65a039daa42e5a691a9f02a589ab"
  });
}, 1000);