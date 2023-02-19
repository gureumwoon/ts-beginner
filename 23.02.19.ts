// <forEach,map 제네릭 분석>

// interface Array<T> {
//   forEach(callbackfn: (value: T, index: number, array: T[])=>void, thisArg?:any): void;
// }

// const a: Array<number> = [1,2,3]
// a.forEach((value) => {console.log(value);}) // 1,2,3
// ['1','2','3'].forEach((value)=>{console.log(value)})
// [true,false,true].forEach((value)=>{console.log(value)})
// ['123',123,true].forEacth((value)=>{console.log(value)})

// 제네릭의 좋은점!!
// 코드를 작성할 때는 타입이 뭐가 될 지 모르는데, 코드를 실행할 때는 확실히 안다 그럼 그 자리를 미리 제네릭으로 만들어 놓는 거지.

// function add<T>(x: T, y: T):T {return x}

// add<number>(1,2) // 이렇게 직접 넣어줄 수도 있어 그럼 여기의 <number>는 위에 add 함수에서의 <T>가 되는 거야. <T>가 number라는 걸 직접 알리는 거지.
// 이렇게 직접 알리는 건 언제 써야 할까? 타입스크립트가 멍청해서 추론을 잘 못 해줄 때는 직접 T가 뭔지 알려줘야 함. add함수의 <T> 얘를 '제네릭'이라고 하고 add<number>(1,2)에서의 <number>는'타입 파라미터'라고 부른다.

// <map 분석>

// interface Array<T> {
//   forEach(callbackfn: (value: T, index: number, array: T[])=>void, thisArg?:any): void;
//   map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
// }

// const strings = [1,2,3].map((item)=> item.toString()); // 커서 올리면 stirng[]으로 잘 추론해줌 // ['1','2','3']

// - T는 [1,2,3] 이 부분이니까 타입이 number가 돼 그럼 U는?
// - U는 callbackfn을 보니까 return 값의 타입을 말하는 것 같아 그럼 (item)=> item.toString() 이 부분을 말하는건데,
// - 이 부분은 toString()이니까 타입은 당연히 string이 되는 거지.
// - 그러니까 결국에 map 함수의 전체의 return 값은 string[]이 된다.
// - 결국 return인 strings가 커서를 올려보면 string[]으로 제대로 추론되고 있는 걸 알 수 있다.