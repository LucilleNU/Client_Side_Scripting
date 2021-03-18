/*function reverse_number(n)
{
	n = n + "";
	return n.split("").reverse().join("");
}
console.log(reverse_number(32243)); */

//OR

function reverse_number(num)
{
    // return a new array of the number
    var arrayNum = num.split("");

    // reverse the new created array elements
    var reverseNum = arrayNum.reverse();

    // join all elements of the array into a number
    var joinNum = reverseNum.join("");

    // return the reversed number
    console.log(joinNum );
    return joinNum ;
}
reverse_number('32243');