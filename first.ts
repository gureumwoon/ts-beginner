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