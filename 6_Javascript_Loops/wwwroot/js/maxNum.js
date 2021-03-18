function max_of_three(x, y, z) {

    var maxnum = 0;

    if (x > y)
    {
        maxnum = x;
    }
    else
    {
        maxnum = y;
    }
    if (z > maxnum)
    {
        maxnum = z;
    }
    return maxnum
}

console.log(max_of_three(1, 2, 0));
console.log(max_of_three(0, 30, 100));
console.log(max_of_three(1000, 510, 440));