function count(string) {
    //convert to lower case
    var lowCase = string.toLowerCase()

    //get rid of spaces within the string
    const string01 = lowCase.replace(/\s/g, '');

    string1 = string01.split("").sort().join("");
    let counter = 1;
    for (let i = 0; i < string.length; i++) {
        if (string1[i] == string1[i + 1]) {
            counter++;
        }
        else
        {
            console.log(string1[i] + " " + counter);
            counter = 1;
        }
    }
}
count("The Quick Brown Fox Jumps Over The Lazy Dog");

