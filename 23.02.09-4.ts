// <void의 두 가지 사용법>

// interface는 타입이 합쳐짐.
// interface A {a: string}
// interface A {b: string}
// const obj: A = {a:'hello', b:'world'}
// 하지만, 타입별칭(type alias)는 에러가 뜸.
// type B = {a: string}
// type B = {b: string}
// const obj2: B = {a:'hello', b:'world'} b에 에러뜸.
// 공통점은 type은 intersection으로 상속된다 interface는 extends로 상속된다가 있다.

// 그래서 타입과 인터페이스가 서로간에 공통점도 있지만 이런 차이점(합쳐지고 안 합쳐지는)이 있다.

// ! 객체리터럴
// interface A {a: string}
// const obj1: A = {a: 'hello', b: 'world'}
// 이게 객체리터럴인데 이러면 잉여속성검사가 나타나게 된다. 이게 황당할 수가 있는데
// interface A에는 a속성밖에 안 들어 있는데, 여기다 b를 넣었더니 b가 없다고 error뜸 근데 웃긴거는 얘를 따로 변수로 빼보고 나서 변수를 대입하면 error가 안 떠.이게 타입스크립트에서 많이 헷갈릴 수 있는 특성이다.
// 타입 붙여준 변수에다가 직접 객체리터럴을 넣으면 에러가 뜨는데 중간에 다른 변수 하나 껴서 대입하면 검사를 안 해.
// 그래서 타입스크립트에서는 객체리터럴을 직접 대입하면 잉여속성검사라는 추가 기능이 들어간다. 기억해줘야 된다.

// !! void

// function a () {

// }

// const b = a()

// a라는 function을 b 변수에다 넣고 커서 올려보면 void라고 타입이 뜬다. function a도 커서 올리면 void라고 반환값 타입이 추론이 돼.

// function a ():void { // 이렇게 void라고 타입을 정확하게 명시해 주고
//     return '3';
// }

// return 값을 적어주면 error가 떠 return 값에. (string 형식은 void에 할당할 수 없습니다.)

// 즉, 함수의 return값이 void 타입이라는 것은, return값을 넣으면 안 되는 그런 함수라는 거다. 대신에,
// return 값으로 undefined는 돼 근데 null은 안 돼. 보통 그래서 return을 아예 안 적거나(return 값이 없거나), 아니면 그냥 return만 있거나임. 이런 함수들이 return 타입이 void가 되는 거다.

// interface Human {
//     talk: () => void;
// }
// 이 Human이라는 객체안에 talk라는 메서드가 있다고 치자.
// const human: Human = {
//     talk() {}
// }
// 이렇게 해줘야 겠지 위에 talk가 void니까 밑에도 talk 메서드도  return 값이 없다. 또는 return undefined이다. 아니면 그냥 return;이다. 근데 여기서 우리를 헷갈리게 하는게,

// const human: Human = {
//     talk() {return 'abc'}
// }
// 이렇게 하는데 이게 돼 error가 안 떠

// 일단 function에서는 void를 두 가지로 기억하는 게 좋다.
// function a(): void {

// }
// 아예 void function을 이렇게 선언한 것과, 아니면
// interface Human {
//     talk: () => void;
// }
// 이렇게 메서드로 선언 할 때 void 두 개의 역할이 조금 다르다고 볼 수 있다. 그 다음에 한 가지 더 있다면,
// 매개변수로 선언한 void도 있다.
// function a(callback:() => void): void {

// }

// 그래서 void가 세 가지 종류로 크게 나올 수가 있는데,
// return 값 타입이 void인 것과, 매개변수가 void 함수가 들어간 것과, 메서드가 void 함수가 들어간 것
// 신기하게도 매개변수가 void인 함수도 return값이 존재해도 돼

// a(() => {
//     return '3';
// })
// 이렇게! 이게 콜백인데 이것도 void인데 return값이 존재하지
// interface Human {
//     talk: () => void;
// }
// 얘도 메서드잖아 하지만
// const human: Human = {
//     talk() {return 'aba'}
// }
// 이렇게 return값이 존재할 수 있음.

// 그래서 void는 크게 두 가지 함수의 return 값이 void인 경우에만 return에 값이 있으면 에러가 나고 매개변수와 메서드 이 둘은 상관 없다.<< 얘네는 왜 error가 안 나냐, 애네한테서의 void의 의미는, 이 함수 또는 이 메서드의 return값을 사용하지 않겠다 그런 의미이다. '사용하지 않겠다의 의미'
// 그리고 return값의 타입을 void로 명시한 경우는 직접적으로 return값이 없다는 의미이다.
// 그래서 같은 void이지만 의미가 다르다고 보면 된다.

// !! 예시타임

// function forEach(arr: number[], callback: (el: number) => undefined): void;
// 함수도 이렇게 선언할 수 있다고 했지 body 없이. 그치만 바로 밑에 실제 구현물을 만들어줘야 해 error 없으려면 이렇게
// function forEach() {

// }
// 그런데 구현물을 만들기 싫을 때가 있어 그럴 때는 앞에 declare라는 걸 선언해주면 돼.
// declare function forEach(arr: number[], callback: (el: number) => undefined): void;

// declare라는 걸 선언 해주는 순간, 에러는 사라짐 대신 얘는 JS로 변환하면 사라짐.
// declare를 통해서 타입만 만들어 줄 수 있단는 거! 알아두기

// !! 이제 void와 undefined의 차이 알아보자 특히 매개변수 함수에서
// function forEach(arr: number[], callback: (el: number) => undefined): void; 여기서 undefined면
// forEach([1,2,3], el => target.push(el)); // target.push에서 에러가 날 수 밖에 없어.
// 왜냐면 push는 return값이 number야 그래서 >> 이 함수가 콜백인데 el => target.push(el) 지금 얘의 return값은 number지 근데 나는 여기 타입 정의를 undefined으로 해놨기 때문에, error가 뜨는거야.(number는 undefined에 할당할 수 없습니다) 그래서 타입선언이랑 짝을 잘 맞춰서 봐야 돼.
// 그래서 undefined를 number로 수정하면 당연히 error가 안 뜨겠지. 근데 여기다 void로 선언해도 에러가 안 나.
// 이게 왜냐 매개변수에서 쓰이는 void는 실제 return값이 뭐든간에 신경쓰지 않겠다 그런 의미이기 때문이다.
// 그래서 이게 void냐 아니냐에 따라서 함수 표현이 좀 제한이 된다. 예를들어,

// let target: number[] =[];
// forEach([1,2,3], el => {target.push(el)});
// forEach([1,2,3], el => target.push(el));

// 이렇게 두 개의 함수가 있을 때, 실제로 이 두 함수는 둘 다 잘 돌아가야 한다. 근데 위에서 우리가 void를 안 쓰고 undefined라고 타입을 선언하면, 그럼 둘이 서로 다른 error가 뜬다.
// 1. number 형식은 undefined 형식에 할당할 수 없습니다.
// 2. void 형식은 undefined 형식에 할당할 수 없습니다.
// (반대로 undefined는 void에 대입이 가능.)
// 아니면 타입을 number로 하자니 1번함수에 void 형식은 number에 할당할 수 없다고 뜸. 그래서 결국에는, void로 선언할 수 밖에 없게 함.
// void는 undefined이랑 다르다. 그게 가장 핵심적인 내용.

// 여기서 문제,
// interface A {
//     talk: () => void;
// }
// const a:A = {
//     talk() {return 3;}
// }
// const b = a.talk(); // 얘 타입 void 나옴.

// 보통의 JS를 생각하면 b는 3이 나오는 게 맞는데 타입스크립트에서 지금같은 상황이면 메서드가 void인 경우에는 return값이 뭐든지간에 다 무시를 해버림 그래서 b 타입도 void가 뜬다. 이러면 문제가 되겠지
// 그래서 애초에 void면 return을 넣으면 안 되는 게 맞아. 원칙적으로는
// 그래서 위와같은 경우에는 const b = a.talk() as number; 이렇게 강제로 만들어 줘야 되는데, 강제로 바꿔줄 때, 항상 바꿀 수 있는 게 아니야. 이렇게 에러 떠 (void 형식을 number 형식으로 변환한 작업은 실수일 수 있습니다. 두 형식이 서로 충분히 겹치지 않기 때문입니다. 의도적으로 변환한 경우에는 먼저 'unknown'으로 식을 변환합니다.)라는 에러가 떠.
// 그렇기 때문에 내가 진짜 책임진다 하는 경우에는 const b = a.talk() as unkown as number 이렇게 바꿔줄 수 있다.

// 또, const b: number = a.talk() // 이거는 또 안 되겠지, void 형식은 number 형식에 할당할 수 없다.라고 에러 뜸.

// 또 강제로 바꾸는 방법이 하나 더 있다.
// const b = <number><unknown>a.talk(); // 이 방식보다는 as를 더 권장함 그 이유는,
// react에 jsx에서 <>이런 태그들이 사용이 되는데 <div></div> 이렇게, 그래서 이게 헷갈려서 타입스크립트가 잘 이해를 못 함. 그래서 react를 쓰게 될 경우 강제 타입 변환시에 as unknown as 형식으로 쓰는 게 더 좋다.

// !! declare 추가설명

// 어떨 때 사용하는가?
// declare function forEach(arr: number[], callback: (el: number) => void):void;

// let target: number[] =[];
// forEach([1,2,3], el => {target.push(el)});
// forEach([1,2,3], el => target.push(el));

// 이런경우 forEach 선언도 안 했는데 그냥 쓰면 에러나잖아, 이게 유효한 자바스크립트 코드가 맞나? 생각할 수 있어.
// 이런 경우가 있어,
// 브라우저라고 생각해보면 <script></script> script 태그가 서로 나눠져 있고 다른 스크립트 태그에서 선언이 되어있고 또 다른 스크립트 태그에서 쓰고 있는 상황이라고 생각해보면 타입스크립트 입장에서는  forEach 함수를 사용하고 있는 파일에서 봤을 때 어디에서 선언되고 있는 지 알 수가 없잔아. 그렇다고 forEach를 다른데서 선언 했지만 거기와 다른 곳에서 쓰려니 에러가 나고 그럴 떄 임시적으로 forEach 다른 곳에서 선언 했음을 보장해 할 때 declare로 타입 선언만 해놓는 그런 용도로 쓰이는 거다.
// // 외부에서 만들어진 애들을 타입 선언할 때 declare로 해놓고 얘를 사용하는 파일에서 선언이 되어있는 것처럼 쓰는거다.

// ex)

// declare let c: number;

// c = 3;

// 이렇게!!