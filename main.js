Status = "";
objectName = "";
objects = [];

function setup() {
    canvas = createCanvas(480, 320);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 320);
    if (Status != "") {
        ObjectDetector.detect(gotresults);
        for (i = 0; i < objects.length; i++) {
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            document.getElementById("status").innerHTML = "Object Detected";
            document.getElementById("no_of_object").innerHTML = "No. of Object : " + objects.length;
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r, g, b);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start() {
    ObjectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Object Detected";
    objectName = document.getElementById('object_name').value;
    if (results == objectName) {
        variable_name_holds_webcamLiveView.stop();
document.getElementById("status").innerHTML = "object mentioned found";
        speechSynthesis.speak(utterThis);
    } else {

        updateObjectStatus("object mentioned not found");
    }

}

function modelLoaded() {
    console.log("model loaded!");
    Status = true;
    video.loop();
}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}