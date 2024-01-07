song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
songStatus = "";
name1 = "something"
name2 = "something"


function preload(){
    song1 = loadSound("music_1.mp3");
    song2 = loadSound("music_2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
   
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose', gotPoses );
}

function modelLoaded() {
    console.log("Model is initialized");
}

function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+ scoreLeftWrist);    

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX+ "   leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX+ "   rightWristY = "+rightWristY);

    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");


    songStatus = song1.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX,leftWristY,20);
    song2.stop();
    }
       
    if(songStatus == false)
       {
        song1.play();
        document.getElementById("song_name").innerHTML = name1
       
    }
    

}

function play() {
    song2.play();
}
