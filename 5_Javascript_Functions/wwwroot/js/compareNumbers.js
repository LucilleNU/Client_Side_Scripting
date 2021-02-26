function computeNumbers() {
    let numberA = Number(document.getElementById("num1").value);
    let numberB = Number(document.getElementById("num2").value);
    let operation = document.getElementById("operator").value;
    var result;

    switch (operation) {
        case '+':
            result = numberA + numberB;
            document.getElementById("results").innerHTML = "Sum of numbers = " + result;
            break;

        case '*':
            result = numberA * numberB;
            document.getElementById("results").innerHTML = "Product of numbers = " + result;
            break;

        case '<':
            if (numberA < numberB) {
                result = numberA;
            }
            else {
                result = numberB;
            }
            document.getElementById("results").innerHTML = "Minimum number = " +  result;
            break;

        case '>':
            if (numberA > numberB) {
                result = numberA;
            }
            else {
                result = numberB;
            }
            document.getElementById("results").innerHTML = "Maximum number = " +  result;
            break;


        default:
            console.log('Invalid operator');
            break;
    }
}