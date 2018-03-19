var scenes = [],
    scrollY,
    visibleY = document.documentElement.clientHeight;


function createScenes(element) {
    var childs = element.querySelectorAll(".scene");

    var j = 0;

    for(var i=0; i < childs.length; i++) {
        var scene = {};
        scene['content'] = childs[i];
        scene['coord'] = visibleY*j;
        j+=2;

        childs[i].style.transform = "translateY(" + scene['coord'] + "px)";

        scenes.push(scene);
    }
    // childs.forEach(function(child) {
    //     var scene = {};
    //     scene['content'] = child;
    //     scene['coord'] = visibleY*i;
    //     i+=2;

    //     child.style.transform = "translateY(" + scene['coord'] + "px)";

    //     scenes.push(scene);
    // });

    document.body.style.height = (visibleY * j) + "px";
}

function animateScenes() {
    scrollY = window.pageYOffset;

    for(var i = 0; i < scenes.length; i++) {
        if(scrollY <= scenes[i]["coord"]) {
            scenes[i]["content"].style.transform = "translateY(" + (scenes[i]["coord"] - scrollY) + "px)";
        } else if (scrollY >= (scenes[i]["coord"] + visibleY)) {
            scenes[i]["content"].style.transform = "translateY(" + (scenes[i]["coord"] - (scrollY - visibleY)) + "px)";
        }
    }

    // scenes.forEach(function(scene){
    //     if(scrollY <= scene["coord"]) {
    //         scene["content"].style.transform = "translateY(" + (scene["coord"] - scrollY) + "px)";
    //     } else if (scrollY >= (scene["coord"] + visibleY)) {
    //         scene["content"].style.transform = "translateY(" + (scene["coord"] - (scrollY - visibleY)) + "px)";
    //     }
    // });
}