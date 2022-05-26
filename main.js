song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song_1_status = "";
scoreRightWrist = 0;
song_2_status = "";

function preload() {
    song_1 = loadSound("enemy.mp3");
    song_2 = loadSound("believer.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000")
    stroke("#FF0000")
    
    song_1_status.isPlaying();
    song_2_status.isPlaying();

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song_2.stop();
        if (song_1_status = "false") {
            song_1 = loadSound("enemy.mp3");
            document.getElementById("song").innerHTML = "Song - Enemy";
        }
    }
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song_1.stop();
        if (song_2_status = "false") {
            song_2 = loadSound("believer.mp3");
            document.getElementById("song").innerHTML = "Song - Believer";
        }
    }
}

function modelLoaded() {
    console.log("PoseNet is Intitalized!");
}

function gotPoses() {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX - " + leftWristX + "leftWristY - " + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        righttWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX - " + rightWristX + "rightWristY - " + rightWristY);
    }
}

