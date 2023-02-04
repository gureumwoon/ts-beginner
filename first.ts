// 기본적인 ts 타입들
const a = '5';
const b = 5;
const c = true;
const d = undefined;
const e = null;

// 이렇게 값의 타입을 고정시키는것도 가능 true만 받겠다. 이런 식으로
// 타입 자리에 아예 고정된 원시 값을 넣어줄 수도 있다.
// const는 사실 바뀔 일이 없잖아. 바뀔 일이 없는데 괜히 타입이 다른 거일 필요가 없지 왜냐 const f: boolean = true; const f가 true면 f는 계속 true인 거잖아. 그럼 이 타입이 boolean일 필요가 없는거야. 타입은 항상 정확하게 최대한 정확하게 잡는게 좋아.
const f: true = true;

// 매개 변수에 타입을 정해주면 반환값의 타입 추론이 가능하기 때문에 굳이 반환값에 타입을 명시하지 않아도 돼
function add(x: number, y: number) { return x + y };
const result = add(1, 2);

const arr = ['123', '456', '567', '890']
const arr2 = [123, 456]
// 튜플:  길이가 고정된 배열이라는 뜻. 
const arr3: [number, number, string] = [123, 456, 'hello'];

const obj = { lat: 37.5, lon: 127.5 };

// <JS 변환 시 사라지는 부분 파악>

const ff: true = true; // ff: true 부분이 사라짐

type Add = () => number;
interface Minus { } // 인터페이스
Array<string> // 제네릭

// 이것들은 나중에 JS로 변환되면 다 사라질 것들이다.
// * 타입이 적혀있는 부분을 명확히 구분하고, 어디가 없어지는지까지 정확히 알아야함. 왜냐!
// 사라지는 부분을 지웠을 때, 올바르게 실행되는 자바스크립트 코드여야 되기 때문에

// function minus(a:number, b:number):number;
// function minus(a, b) {
//     return a - b;
// }
// >> 이런 케이스도 존재한다 위에는 타입이고 밑에는 실제 코드
// 실제로 JS로 변환시키면 위에 타입 부분은 사라지고 밑에 코드만 남게된다.

// as as
let aa = 123;
// aa = 'hello' // 이러면 error
// 이런 문자열 형식을 억지로 다른 애로 바꿀 수 있다 어떻게?
aa = 'hello' as unknown as number; // 이러면 error 안 남.

// 이렇게 as라는 특별한 키워드가 있어서 앞에 타입을 강제로 다른 애로 바꿔줄 수 있는데
// 얘도 변환하게 되면 사라진다. 그래서

// let aa = 123;
// aa ='hello'
// 이렇게 남게 된다.
