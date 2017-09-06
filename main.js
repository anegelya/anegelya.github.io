var timeinterval = setInterval(1000),
    timerTime = 259200000,
    endTime = localStorage.getItem("time"),
    button = document.querySelector(".button");
    
// set timer into Local Storage of browser
    
function toMonth(m) {
        switch(m) {
            case 0:
                return "січня";
                break;
            case 1:
                return "лютого";
                break;
            case 2:
                return "березня";
                break;
            case 3:
                return "квітня";
                break;
            case 4:
                return "травня";
                break;
            case 5:
                return "червня";
                break;
            case 6:
                return "липня";
                break;
            case 7:
                return "серпня";
                break;
            case 8:
                return "september";
                break;
            case 9:
                return "жовтня";
                break;
            case 10:
                return "листопада";
                break;
            case 11:
                return "грудня";
                break;
                }
}
    
function setTimer(timer){
    var date = new Date();
    var t = date.getTime() + timer;
    var n = date.getDate();
    var m = date.getMonth();
    
    //turn index of month into humal language
    
    var month = toMonth(m);
    
    //write data in Local Storage
    localStorage.setItem("time", JSON.stringify(t));
    
    var benjiObj = {
        'total time': t,
        'last water': n + " " + month
    };
    
    
    
    localStorage.setItem("benjObj", JSON.stringify(benjiObj));
    var obj = JSON.parse(localStorage.getItem('benjObj'));
    
    var graphicObj = JSON.parse(localStorage.getItem('graphicObj'));
    
    if (graphicObj) {
        graphicObj[n + " " + month] = true;
        localStorage.setItem("graphicObj", JSON.stringify(graphicObj));
        console.log(graphicObj);
    } else {
        var graphicObj = {};
        graphicObj[n + " " + month] = true;
        localStorage.setItem("graphicObj", JSON.stringify(graphicObj));
        console.log(graphicObj);
        createWaterList();
    }
    
    
    var endTime = obj['total time'];
    clearInterval(timeinterval);
    initializeClock(endTime);
}
    
// get timer from Local Storage of browser
function getTimeRemaining(endtime){
    var t = endtime - Date.parse(new Date());
    return t;
}

function createWaterList() {
    var p = document.createElement("p");
    p.classList.add('graph', 'fade-in', 'is-paused');
    var graphicObj = JSON.parse(localStorage.getItem('graphicObj'));
    /*for (var key in graphicObj) {
        var span = document.createElement('span');
        span.innerHTML = key;
        p.appendChild(span);
    }*/
    
    console.log(graphicObj);
    
    var dayTime = Number(localStorage.getItem('time'));
    var days = [];
    for (var i = 10; i >= 1; i--) {
        days.push(new Date(dayTime - (i*86400000)).getDate() + ' ' + toMonth(new Date(dayTime - (i*86400000)).getMonth()));
    }
    
    days.forEach(function(item, i, arr) {
        var span = document.createElement('span');
        
        if(graphicObj.hasOwnProperty(item)) {
            span.innerHTML = item.substring(0, 2) + " ";
            span.classList.add('span-wattered')
        } else {
            span.innerHTML = item.substring(0, 2)  + " ";
        }
        
        p.appendChild(span);
    });
    
    console.log(days)
    
    p.classList.remove('is-paused');
    var div = document.querySelector('#text div');
    div.appendChild(p);
    
}

// updating and animating circle timer
function initializeClock(endtime){
    
    function updateClock(){
        var t = getTimeRemaining(endtime);
      
        function animateCircle() {
            var circle = document.querySelector('#timer svg path:nth-child(2)');
            var length = ((circle.getTotalLength())/timerTime)*t;
            var percentage = Math.floor((length * 100)/(circle.getTotalLength()));
            document.querySelector('#count').textContent = percentage + "%";
            
            var obj = JSON.parse(localStorage.getItem('benjObj'));
            var lastWater = obj['last water'];
            var daySpan = document.querySelector("#text h2 span");
            daySpan.innerHTML = lastWater;
            
            circle.style.strokeDasharray = length + " 1000";
        }
      
        animateCircle(); // run animation of circle path
      
        if(t<=0){
            clearInterval(timeinterval);// stop the animation and counting
            document.querySelector('#count').textContent = "Полий!"
        }
    }
  
    updateClock(); // run function once at first to avoid delay
  
    timeinterval = setInterval(updateClock, 1000); // interval of function updating
}

createWaterList();
initializeClock(endTime);

var btn = document.querySelector('.button');
var el = document.querySelector('.js-fade');

btn.addEventListener('click', function(e){
  el.classList.remove('is-paused');
});