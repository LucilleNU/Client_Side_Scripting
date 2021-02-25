function Clock() {
    var date = new Date();

    var currentime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    document.getElementById("clock").innerHTML = "The current time is: "+ currentime;

}
myInterval = setInterval(Clock, 1000);