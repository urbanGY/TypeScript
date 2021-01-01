type Combinalbe = number | string;
type conversionDescriptor = "as-number" | "as-string";

function combine(input1: Combinalbe, input2: Combinalbe, resultType: conversionDescriptor) {
    let result;
    if(typeof input1 === 'number' && typeof input2 === 'number' || resultType === "as-number") {
        result = +input1 + +input2;
    }else {
        result = input1.toString() + input2.toString();
    }
    return result;
}

const combineAges = combine(30, 26, "as-number");
console.log(combineAges);

const combineAgesStr = combine("30", "26", "as-number");
console.log(combineAgesStr);

const combineNames = combine("max", "anna", "as-string");
console.log(combineNames);