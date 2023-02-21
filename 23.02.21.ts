// <forEach 타입 만들기>

// [1,2,3].forEach((item)=>{
//   console.log(item)
// });
// [1,2,3].forEach((item)=>{
//   console.log(item)
//   return '3';
// })



// interface Arr {
//   forEach(callback: (item: number) => void): void;
// }

// const a: Arr = [1,2,3];
// a.forEach((item)=>{
//   console.log(item)
// });
// a.forEach((item)=>{
//   console.log(item)
//   return '3';
// })

// // 이번엔 string

// interface Arr {
//   forEach(callback: (item: string) => void): void;
// }

// const a: Arr = [1,2,3];
// a.forEach((item)=>{
//   console.log(item)
// });
// a.forEach((item)=>{
//   console.log(item)
//   return '3';
// })                      ---- 얘는 에러가 나고

// const b: Arr = ['1','2','3'];
// b.forEach((item)=>{
//   console.log(item)
// });
// b.forEach((item)=>{
//   console.log(item)
//   return '3';
// })                      ---- 얘는 통과가 되겠지

// 모두를 충족하고 싶으면,

// interface Arr {
//   forEach(callback: (item: string|number) => void): void;
// }
// 이렇게 하면 에러가 안 남. 하지만 이 코드는 조금만 복잡해져도 에러가 날 수 밖에 없는 코드임. 예를들면
// const a: Arr = [1,2,3];
// a.forEach((item)=>{
//   console.log(item)
//   item.toFixed(1); // a는 숫자 배열이니까 toFixed 사용이 가능해야 하고,
// });

// const b: Arr = ['1','2','3'];
// b.forEach((item)=>{
//   console.log(item)
//   item.charAt(3) // b는 문자 배열이니까 charAt 사용이 가능해야 한다.
// });

// 하지만 둘 다 에러가 남. 왜냐하면 item이 string|number니까 모든 걸 고려하게 돼서 에러가 난다. 그럼 이제 string|number가 안 된다는 걸 알게 됐으니까 어떻게 고쳐야 할까? 이렇게 또는 관계에서 표현이 잘 안 될 떄에는 '제네릭'이 있었던 걸 기억하자.

// interface Arr<T> {
//   forEach(callback: (item: T) => void): void;
// }
// or
// interface Arr {
//   forEach<T>(callback: (item: T) => void): void;
// }  // 함수이름 뒤에 넣는 것도 가능. 이것도 Arr 뒤에 놓을지 forEach 뒤에 놓을지 고민이면 가까운 곳에 먼저 놓아봐. 먼저 forEach 뒤에 놓고 item type을 T로 해보자. 이렇게 해서 에러가 없으면 되는데,
// interface Arr {
//   forEach<T>(callback: (item: T) => void): void;
// }

// const a: Arr = [1,2,3];
// a.forEach((item)=>{
//   console.log(item)
//   item.toFixed(1); // 이렇게 하면 item의 타입이 unknown이라고 추론된다.
// });

// 왜지? 이게 타입스크립트가 제네릭 자리를 제대로 추론을 해주지 못해서 그렇다. 이런거는

// const a: Arr = [1,2,3];
// a.forEach<number>((item)=>{
//   console.log(item)
//   item.toFixed(1); // 이렇게 하면 item의 타입이 unknown이라고 추론된다.
// });
// 이렇게 제네릭 자리에 직접 <number>라고 넣어주면 추론이 되기는 해. 그런데 이렇게 직접 하지 말고, 자연스럽게 추론되길 원한다면,
// 제네릭 자리를 옮겨보자.

// interface Arr<T> {
//   forEach(callback: (item: T) => void): void; // 이정도만 해도 훌륭
//   forEach(callbackfn: (value: T, index: number, array: T[]) =>  void, thisArg?: any): void; // 이게 정답
// }

// const a: Arr<number> = [1,2,3];
// a.forEach((item)=>{
//   console.log(item)
//   item.toFixed(1); // 이렇게 하면 item의 타입이 unknown이라고 추론된다.
// });

// const b: Arr<string> = ['1','2','3'];
// b.forEach((item)=>{
//   console.log(item)
//   item.charAt(3) // b는 문자 배열이니까 charAt 사용이 가능해야 한다.
// });

// 우리가 여기서 실제로 index나 원본배열(array:T[]) 이 두 개를 안 쓰기 때문에
// 실제 코드에서 안 쓰는 것까지 타이핑 하기에는 너무나 어려운 일임.
// 그래서 실제 코드에서 안 쓰는 건 일단 타이핑 하지 말다가
// 나중에 혹시 forEach 쓰다가 두 번째 매개변수로 index를 쓰고싶다 하면 그럴 때
// 내가 만들었던 코드에 다시 추가하거나 고쳐 그러니까 그때그때 우리가 실제로 쓴 코드가 발전함에 따라서 만들었던 타입도 같이 수정해 나가라.
// 처음부터 모든 걸 다 예상하고 완벽하게 만들어두려고 하지마라 매우 어렵다.
// 처음에는 에러가 안 잡히는 정도까지 타이핑 하고 코드가 업데이트 됨에 따라서 타입도 같이 업데이트 시켜라.