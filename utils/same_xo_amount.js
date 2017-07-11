module.exports = sameXOAmount; 

function sameXOAmount(str) {
    let x_reg = /x/ig;
    let x_amount = 0;
    let o_reg = /o/ig;
    let o_amount = 0;

    while( ( match = x_reg.exec(str) ) != null) x_amount++;
    while( ( match = o_reg.exec(str) ) != null) o_amount++;

    return x_amount === o_amount;
}

