function calcSupply(age, maxAge, food, foodPerDay) {
    var totalNeeded = (foodPerDay * 365) * (maxAge - age);
    totalNeeded = totalNeeded.toFixed(0);
    var message = totalNeeded + 'kg of ' +food + ' would be enough until I am ' +maxAge + ' years old.';
    console.log(message);
}

calcSupply(38, 118, 'chocolate', 0.5);
calcSupply(20, 87, 'fruits', 2);
calcSupply(16, 102, 'nuts', 1.1);


