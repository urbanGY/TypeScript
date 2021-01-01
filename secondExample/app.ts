let userInput: unknown;
let userName: string;

//userName = userInput; // any와 다르게 string을 보장할 수 없기 때문에 에러를 발생시킨다.
if(typeof userInput === "string") {
    userName = userInput;
}


function generateError(message: string, code: number): never {
    throw {message: message, errorCode: code};
}

const result = generateError('an error occured', 500);