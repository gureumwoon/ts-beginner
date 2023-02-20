// <filter 제네릭 분석>

// interface Array<T> {
//   filter<S extends T>(predicate:(value: T, index: number, array: T[]) => value is S, thisArg?: any): S[] --1
//   filter(predicate:(value: T, index: number, array: T[]) => unknown, thisArg?: any): T[] --2
// }

// const filtered = [1,2,3,4,5].filter((value)=>value%2) //number의 배열 number[]
// const filtered = ['1',2,'3',4,'5'].filter((value)=> typeof value === 'string'); // ['1','3','5'] string[] 타입이 나와야 함.
// 그런데 문제가 커서를 올려보면 (string|number)[] 으로 타입추론을 함. <<이거는 잘못된 추론이지. 얘를 string[] 타입으로 만드려면
// 1번을 선택해야 한다. 왜 2번이 안 되냐, T가 string|number 였잖아['1',2,'3',4,'5']이 배열 1번은 S[]여서 바뀔 가능성이 남아있어
// S는 string이 될 수도 있고 number도 될 수 있어. 하지만 2번은 타입이 string|number로 고정이 되었기 때문에 얘는 바꿔줄 여지가 없다. S는 string[]이든 number[]든 바꿔줄 수 있는 가능성이 있지만 2번은 가능성이 없는 거다. 그래서 얘는 타입 추론을 제대로 해줄 수 없어. S는 string이 될 수도 number가 될 수도 string|number가 될 수도 있다.

// 그래서 1번 함수 형식을 적용시키면,

// const predicate = (value: string|number): value is string => typeof value === 'string'; // 1번이랑 똑같이 바꾼 거야. 여기서 value is string으로 해서 S를 우리가 원하는 string으로 바꿈. 이게 가능했던 이유는 S extends T에서 string extends string|number 이게 가능하기 때문.
// const filtered = ['1',2,'3',4,'5'].filter(predicate) // ['1','2','3'] string[]