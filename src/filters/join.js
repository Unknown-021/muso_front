export default (array, joinWith = ', ', and = null) => {
    // set default arguments and filter the array from empty elements
    joinWith = joinWith || ', ';
    and = and || joinWith;
    array = array.filter(e => e);

    if (array.length <= 1) {
        return array[0];
    }

    let result = array.join(joinWith);
    const lastJoin = result.lastIndexOf(joinWith);

    result = result.substring(0, lastJoin) + and + result.substring(lastJoin + joinWith.length);

    return result;

};
