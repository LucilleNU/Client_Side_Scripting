function convertToKnot() {
    let a = Number(document.getElementById("num1").value);

    //1 km/h to knots = 0.53996 knots
    var answer = a * 0.53996;
    answer = answer.toFixed(2);

    document.getElementById("results").innerHTML = "Number in knots: " + answer;

}
