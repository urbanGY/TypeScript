
# 2021년 1월 1일... 신년 특집! 타입스크립트 3시간 뿌시기!

<br>  

## 실습 환경 세팅
1. npm init (패키지 매니저)
2. npm install --save-dev light-server (실시간 변경사항 보기위한 가벼운 서버 모듈)
3. package.json의 script에 start: "lighit-server" 작성 (npm start로 서버 구동하기 위함) 

<br>


## 기본 타입

<br>

- number 

  js처럼 정수, 실수 구분없이. 아마 64비트를 기본으로 할듯

<br>

- string 

  'str', "str", `str` 모두 지원

<br>

- boolean 

  true,false 두개만 가능. js 특유의 null, undefined, 빈 배열 등의 참, 거짓 판단 불가능

<br>

- object

  js와 비슷하게 사용 가능. js 방식으로의 선언이 제일 간결하긴하다.

    ``` {typescript}
    const obj: { // obj에 대한 타입을 object, {} 이런 방식으로 정해줄 수 있다.
      key: string,
      n: number
    } = {
      key: "str",
      n: 1
    } 
    ```

<br>

- array

  js와 마찬가지로 똑같이 사용할 수 있다.
    ``` {typescript}
    const arr: string[] = ["str", "str"] // 스트링 타입 배열이라고 선언을 하면 배열 요소에 스트링이 강제된다.
    ```

<br>

## 타입스크립트에서 추가적으로 사용 가능한 타입

<br>

- tuple

  ts에서 가능한건데 tuple이라는 형식을 추가했다기 보다는 기존 배열에 자료형 강제를 해서 흉내내는 느낌이 강해보인다.
  파이썬처럼 불변한 것 같지도 않고 각 자리에 대한 자료형에 대해서만 체크하는 것 같아보인다.
    ``` {typescript}
    const tup: [number, string]; //자료형을 이런식으로 표현한다.
    tup = [1, "str"] //이렇게 자료형을 반드시 맞춰줘야한다.
    tup.push(1) //엄격하게 두개를 제한하는게 아니라 이렇게 push가 된다.... ts가 이건 못잡는 것 같다.
    const tup: [number, string, boolean] = [1, "str", true] 그냥 이렇게도 되는데 그냥 튜플 흉내가 아닌가 싶다.
    ```

<br>

- enum

  ts에서 c와 비슷하게 열거형을 쓸 수 있다.
    ``` {typescript}
    enum Role {ADMIN, AUTHOR} // 이런식으로 선언
    let role = Role.ADMIN // 이런식으로 값에 접근 가능 
    enum Role {ADMIN = 1, AUTHOR} // 이렇게 시작 상수를 바꿀 수 있음. 안적으면 기본이 0
    ```

<br>

- any

  js그대로 쓰는 것과 같은 효과. 타입 신경안씀

<br>

- union

  위에서 보면 모두 타입을 하나만 지정해 줬는데 이건 여러 타입의 인자를 받을 수 있다를 명시해두는 방법이다.
  그런데 이러면 하나의 함수로 여러 타입에 대해서 처리를 해줄 수 있지만 내부적으로 typeof로 런타임 상황에서의
  타입체크를 해줘야 한다. 반드시!

    ```{typescript}
    function combine(input1: number | string, input2: number | string) {
      let result;
      if(typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
      }else {
        result = input1.toString() + input2.toString();
      }
    return result;
    }
    ```

<br>

- literal

  enum이랑 비슷한 용도긴 한데 열거할 정도로 많지 않으면 써보기 좋은 옵션. const val = "str" 이런식으로 선언할 때,
  const는 불변이니까 ts에서는 val을 "str"타입이라고 표시한다. 이걸 이용한 방법

    ```{typescript}
    function combine(input1: number | string, input2: number | string, resultType: "as-number" | "as-string") {
      let result;
      if(typeof input1 === 'number' && typeof input2 === 'number' && resultType === "as-number") {
          result = +input1 + +input2;
      }else {
          result = input1.toString() + input2.toString();
      }
      return result;
    }
    ```

<br>

- alias

  타입 명을 정의할 수 있다. type myType = number; 이런식으로
  이건 번잡하게 기술되는 union을 깔끔하게 보여줄 수 있다. type myType = number | string;
  위 코드를 type정의를 통해서 가독성 좋게 바꿀 수 있게 되었다.
    ```{typescript}
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
    ```

<br>

- 함수 타입

  함수의 반환형에 대해서 타입을 지정해줄 수 있음. 방법은 object때 처럼 기본 object, {} 방식처럼
  Function, () => {type} 두가지로 지정해줄 수 있음. 당연히 상세하게 제약할 수 있는 후자가 좋아보인다.
  함수의 반환형 뿐만 아니라, 매개변수에 콜백함수로 넘어올 때에도 이렇게 타입을 정해줄 수 있다.

    ```{typescript}
    function add(n1: number, n2:number): number {
      return n1 + n2;
    }

    function printResult(num: number): void {
      console.log("result : " + num);
    }

    printResult(add(1,4));

    let combineValue: Function; // 이렇게 하는건 러프하게 선언하는 것
    let combineValue: (a: number, b: number) => number; //빡빡하게 타입을 지정

    combineValue = add; //지정된 타입과 맞기때문에 컴파일 에러 없다.
    combineValue = printResult; //위의 Function으로 하면 문제없지만 아래처럼 제약하면 에러가 발생한다.
    ```

<br>

- unknown

  현재는 뭐가 이 변수의 타입이 될지 모를 때 사용한다. any는 모든 타입체크를 무력화하지만 unknown은 뭐가 나올지 모르기
  때문에 항상 타입체크를 강제한다.
    ```{typescript}
    let userInput: unknown;
    let userName: string;

    //userName = userInput; // any와 다르게 string을 보장할 수 없기 때문에 에러를 발생시킨다.
    if(typeof userInput === "string") {
        userName = userInput;
    }
    ```

<br>

- never

  함수가 반환이 없는 경우, 예를 들어 무한루프나 throw같은 내용이 있다면 이 함수가 실행된 이후의 코드는 의미가 없어진다.
  이 부분에 대해서 명시적으로 표시하기위해서 never 타입을 함수의 반환형에 표시시켜준다. 다만 강제성은 없어보인다.

<br>

## tsc configuration

<br>

- 컴파일

  tsc app.ts   -> app.js 생성

- 계속 자동으로 컴파일되도록 하기

  tsc app.ts -w(아니면 --watch)   -> watch모드로 ts파일이 수정될 때 마다 컴파일 해주고 에러를 표시해준다.

- 현 디렉토리의 모든 ts파일 자동 컴파일

  tsc --init 타이핑. 이러면 tsconfig.json 파일이 생성된다. 아마 이걸로 여러가지 ts 옵션을 설정할 수 있을 것 같다.
  tsc 타이핑. tsconfig.json이 있는 상태에서 tsc를 타이핑하면 모든 ts파일에 대해서 자동으로 컴파일한다.
  tsc -w 타이핑. 위와 같은 동작이되, 백그라운드로 돌아가지않고 터미널에 계속 컴파일 사항에 대해서 표시해준다.

- 자동 컴파일에서 제외, 포함

  tsconfig.json의 맨 아래에 중괄호 다음에 추가적으로 옵션을 넣어줄 수 있는데
  아래같이 exclude옵션에 배열을 넣을 수 있는데, 여기 표기된 파일은 tsc에서 자동 컴파일에서 제외된다.
  명시 뿐만 아니라 **같이 패턴으로 잡을 수 도 있다.

  include로 넣어주면 위와 반대로 포함된 정보에 대해서만 자동 컴파일 한다.

  ```{typescript}
    ...
    }
  "exclude":[]
  }
  ```

- ts lib 옵션

  타입스크립트가 자바스크립트 요소에 대해서 해석할 수 있어야 하는데 그 요소들을 명시해준다. lib에 대한 별도의 설정이
  없으면 default 세팅이 되는데 이는 "lib" : ["dom", "es6", "dom.iterable", "scripthost"] 와 같다.

- sourceMap 옵션

  브라우저의 source에는 컴파일된 js파일만 보이는데 여기서 원본이 되는 ts파일도 보이게 만들어주는 옵션이다. 이 옵션을
  주고 tsc를 실행하면 .map.js파일이 추가로 생성되는데 브라우저에게 ts파일을 연결해주는 파일이라고 생각하면 된다.
  디버깅에 좋음

- outDir 옵션

  컴파일된 js 파일을 풀 목적지를 정해주는 옵션. ts파일이 특정 폴더 안에 있어도 그 구조 그대로 js파일을 만들어준다.

- rootDir 옵션

  컴파일될 ts파일을 볼 범위를 한정짓는 옵션. 이 옵션에서 정해준 경로내에 있는 ts파일에 대해서만 컴파일 진행

- removeComments 옵션

  ts파일에 있는 주석을 js에서 빼고 컴파일 해준다.

- noEmitOnError 옵션

  ts파일은 컴파일시 에러가 발생해도 지적만 하지 컴파일 자체는 막지 않는다. 대부분의 경우 js의 관대한 문법에 따라서
  동작할 가능성이 높긴 하지만 이런 여지도 줄이고 싶다면 위 옵션으로 에러가 없어야만 컴파일이 수행될 수 있게 한다.

- noUsed** 옵션

  추가적으로 선언 후 사용되지 않은 변수에 대해서 체크해주는 등 몇몇 옵션들을 추가적으로 체크해주게 된다. 근데 이거
  eslint, prettier쓰면 알아서 지적해줄거 같긴한다.
  
<br>