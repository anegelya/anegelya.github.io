var scenes = [],
    scrollY,
    visibleY = document.documentElement.clientHeight;


function createScenes(element) {
    var childs = element.querySelectorAll(".scene");

    var i = 0;
    childs.forEach(function(child) {
        var scene = {};
        scene['content'] = child;
        scene['coord'] = visibleY*i;
        i+=2;

        child.style.transform = "translateY(" + scene['coord'] + "px)";

        scenes.push(scene);
    });

    document.body.style.height = (visibleY * i) + "px";
}

function animateScenes() {
    scrollY = window.pageYOffset;

    scenes.forEach(function(scene){
        if(scrollY <= scene["coord"]) {
            scene["content"].style.transform = "translateY(" + (scene["coord"] - scrollY) + "px)";
        } else if (scrollY >= (scene["coord"] + visibleY)) {
            scene["content"].style.transform = "translateY(" + (scene["coord"] - (scrollY - visibleY)) + "px)";
        }
    });
}