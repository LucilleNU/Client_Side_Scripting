function Calculate() {

    let a = Number(document.getElementById("num1").value);
    let b = Number(document.getElementById("num2").value);
    console.log(a, b);

    let operator = document.getElementById("operator").value;
    console.log(operator);

    switch (operator) {
        case '+':
            var result = a + b;
            document.getElementById("results").innerHTML = result;
            break;

        case '-':
            var result = a - b;
            document.getElementById("results").innerHTML = result;
            break;

        case '*':
            var result = a * b;
            document.getElementById("results").innerHTML = result;
            break;

        case '/':
            var result = a / b;
            document.getElementById("results").innerHTML = result;
            break;

        default:
            console.log('Invalid operator');
            break;
    }

}

