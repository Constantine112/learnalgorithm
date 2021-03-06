// 百度地图
    // 百度地图API功能
    var mp = new BMap.Map("allmap");
    mp.centerAndZoom(new BMap.Point(113.332324, 23.136326), 15);
    mp.enableScrollWheelZoom();
    // 复杂的自定义覆盖物
    function ComplexCustomOverlay(point, text, mouseoverText){
      this._point = point;
      this._text = text;
      this._overText = mouseoverText;
    }
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    
    ComplexCustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
      this._div.style.top  = pixel.y - 30 + "px";
    }
    // var txt = "上车地点", mouseoverTxt = txt + " 2 "  ;
        
    // var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(113.332324, 23.136326), "上车地点" + '1',mouseoverTxt);

    // mp.addOverlay(myCompOverlay);

//画覆盖点函数
function draw(data) {
    for (let i = 0; i < data.length; i++) {
        ComplexCustomOverlay.prototype.initialize = function(map){
          this._map = map;
          var div = this._div = document.createElement("div");
          div.style.position = "absolute";
          div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
          let num = 15621000 + i * 80; 
          div.style.backgroundColor = "#" + num.toString(16);//EE5D5B
          div.style.border = "1px solid #BC3B3A";
          div.style.color = "white";
          div.style.height = "18px";
          div.style.padding = "2px";
          div.style.lineHeight = "18px";
          div.style.whiteSpace = "nowrap";
          div.style.MozUserSelect = "none";
          div.style.fontSize = "12px"
          var span = this._span = document.createElement("span");
          div.appendChild(span);
          span.appendChild(document.createTextNode(this._text));      
          var that = this;

          var arrow = this._arrow = document.createElement("div");
          arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
          arrow.style.position = "absolute";
          arrow.style.width = "11px";
          arrow.style.height = "10px";
          arrow.style.top = "22px";
          arrow.style.left = "10px";
          arrow.style.overflow = "hidden";
          div.appendChild(arrow);
         
          div.onmouseover = function(){
            this.style.backgroundColor = "#6BADCA";
            this.style.borderColor = "#0000ff";
            this.getElementsByTagName("span")[0].innerHTML = that._overText;
            arrow.style.backgroundPosition = "0px -20px";
          }

          div.onmouseout = function(){
            this.style.backgroundColor = "#EE5D5B";
            this.style.borderColor = "#BC3B3A";
            this.getElementsByTagName("span")[0].innerHTML = that._text;
            arrow.style.backgroundPosition = "0px 0px";
          }

          mp.getPanes().labelPane.appendChild(div);
          
          return div;
        }
        let txt = "上车地点第", 
            mouseoverTxt = txt + (i + 1) + '次，上车时间：' + data[i][4] + ',坐标: ' + data[i][0] + ', ' + data[i][1];
        var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(data[i][0], data[i][1]), txt + (i + 1) + "次", mouseoverTxt);
        mp.addOverlay(myCompOverlay);

        txt = "下车地点第";
        mouseoverTxt = txt + (i + 1) + '次，下车时间：' + data[i][5] + ',坐标: ' + data[i][2] + ', ' + data[i][3];
        var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(data[i][2], data[i][3]), txt + (i + 1) + "次", mouseoverTxt);
        mp.addOverlay(myCompOverlay);
    }
}
// 画路线函数 
function paintline(data, color) {
    var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
        // scale: 0.6,//图标缩放大小
        strokeColor:"#" + color,//设置矢量图标的线填充颜色
        strokeWeight: '2',//设置线宽
        fillOpacity: 0,
        strokeOpacity : 0.1, //线宽
    });
    var icons = new BMap.IconSequence(sy, '10', '30');
    // 创建polyline对象
    // var pois = [
    //     new BMap.Point(116.350658,39.938285),
    //     new BMap.Point(116.386446,39.939281),
    //     new BMap.Point(116.389034,39.913828),
    //     new BMap.Point(116.442501,39.914603)
    // ];
    let pois = []
    for (let i = 0; i < data.length; i++) {
        pois.push(new BMap.Point(data[i].LONGITUDE,data[i].LATITUDE))
    }
    var polyline =new BMap.Polyline(pois, {
       enableEditing: false,//是否启用线编辑，默认为false
       enableClicking: true,//是否响应点击事件，默认为true
       icons:[icons],
       strokeWeight:'8',//折线的宽度，以像素为单位
       strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
       strokeColor:"#" + color //折线颜色
    });
      //增加折线
      mp.addOverlay(polyline);  
}
function paint(data) {
    for (let i = 0; i < data.length; i++) {
        let num = 15621000 + i * 80; 
        // div.style.backgroundColor = "#" + num.toString(16);//EE5D5B
        paintline(data[i], num.toString(16))
    }  
}
// paintline()
// draw([[
//             "113.243492",
//             "23.114299",
//             "113.283612",
//             "23.104568"
//         ],
//         [
//             "113.277723",
//             "23.117414",
//             "113.291834",
//             "23.071883"
//         ]]
// )
var select = document.querySelector("#select")
// 画图
select.addEventListener('change', function (e) {
    mp.clearOverlays();
    requestAjax(this.options[this.options.selectedIndex].value, '/id/detail/' + this.options[this.options.selectedIndex].value, drawAll)
    // console.log(this.options[this.options.selectedIndex].value)
}, false)
var url = 'http://192.168.1.100:8086'
//请求函数
function requestAjax (e, urlAfter, callback) {
    // let reqData = {
    //     id: e
    // }
    $.ajax({
        type: "GET",
        url: url + urlAfter,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        // data: JSON.stringify(reqData),
        success: function(data) {
            callback(data.data)
        },
        error: function(jqXHR) {
            alert("发生错误：" + jqXHR.status);
        },
    });
}

function init () {
    requestAjax(0, '/id/all', function (data) {
        var str = ''
        for (let i = 0; i < data.length; i++) {
            str += '<option value ="' + data[i] + '">' + data[i] + '</option>'
        }
        select.innerHTML = str
        requestAjax(data[0], '/id/detail/' + data[0], draw)
    }) 
}
// init()
function drawAll(data) {
    //用于画出路线
    let line = []
    //用于画出开始和下车的地点
    let goPoints = []

    for (let i = 0; i < data.length; i++) {
        goPoints.push( [ data[i].GET_ON_LONGITUDE, data[i].GET_ON_LATITUDE, data[i].GET_OFF_LONGITUDE, data[i].GET_OFF_LATITUDE, data[i].WORK_BEGIN_TIME, data[i].WORK_END_TIME] )
        line.push(data[i].GPS)
    }

    draw(goPoints)
    paint(line)
}
drawAll(datas.data)
console.log(datas)