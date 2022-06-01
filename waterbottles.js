var status="";

img="";

objects="";

function preload(){
    img=loadImage('waterbottle.png');
}

function back_btn(){
    window.location="index.html";
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    
}

function draw(){
    image(img, 0, 0, 640, 420);
    if(status != ""){
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status : Objects detected";
            fill("#eb8f52");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+ "   " + percent + "%", objects[i].x+15, objects[i].y-15);
            noFill();
            stroke("#eb8f52");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function modelLoaded(){
    console.log("Model loaded!");
    status=true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}