function add(n1: number, n2:number): number {
    return n1 + n2;
}

function printResult(num: number): void {
    console.log("result : " + num);
}

printResult(add(1,4));

//let combineValue: Function; // 이렇게 하는건 러프하게 선언하는 것
let combineValue: (a: number, b: number) => number;

combineValue = add;
//combineValue = printResult;

console.log(combineValue(8, 8)); //이렇게 해도 동작함
//result : 8
//undefined
// 이렇게 나온다. js는 매개변수 초과해서 넣어줘도 타입에러를 뱉지않고 앞에것만 취해서 걍 동작시킨다.
//void 타입은 undefined와 호환되며 명시적인 반환형이 없을 때 써준다.