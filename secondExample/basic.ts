function add(n1: number, n2: number, showResult: boolean, phrase: string) {    
    if(showResult) {
        console.log(phrase + (n1 + n2));
    }else {
        return n1 + n2;
    }    
}

const number1: number = 4;
const number2: number = 2.8;
const printResult: boolean = true;
const resultPhrase: string = "result is : ";

add(number1, number2, printResult, resultPhrase);