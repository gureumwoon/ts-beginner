
// <공변성과 반공변성>

// 함수간에 서로 대입할 수 있냐 없냐 그걸 따지는 거!
// 이거를 알아둬야지만 나중에 왜 이 함수는 여기에 대입이 안 되고, 저 함수는 여기에 대입이 되지? 하는 것들을 구별할 수 있음.

// 이런 함수가 있다고 합시다. 매개변수로 string을 받아서 number를 return 하는
// function a(x: string): number {
//   return +x;
// }
// a('1'); // 1

// type B = (x: string) => number|string;
// const b: B = a// 여기에다 a를 넣을 수 있을까?(const b에다 a함수를 대입할 수 있을까)

// 언뜻보면 다른데(a는 string 받아서 number를 return, B는 string 받아서 number|string을 return) << 이렇게 서로 타입이 다름.
// 그런데 대입이 된다. 여기서 이제 엄청난 혼란이 온다.
// 자아, return 값은 더 넓은 타입으로 대입할 수 있다. B가 return 타입이 더 넓지 number|string이니까

// 그래서, return 값은 넓은 타입으로는 대입 가능! 넓은 타입에서 좁은 타입으로는 대입 불가능!! 다음은 매개변수,

// function a(x: string|number): number {
//   return +x;
// }
// a('1'); // 1

// type B = (x: string) => number;
// const b: B = a

// a의 매개변수가 string|number인데, B에 대입이 된다!!? 왜때문에 매개변수는 넓은타입이 좁은타입으로 대입이 되는거지?
// 그래, (x: string) => number 또는 (x: number) => number 아니 (x: string) => number 얘가 대입이 가능한 건 알겠어 그런데
// (x: string) => number얘는 어떻게 가능하지? 매개변수에서는 이렇게 생각하면 안 돼

// 매개변수에서는 strign|number 얘네를 하나로 보고 string 타입으로 대입해보자 그럼 string|number니까 string이 있잖아 그럼 오케이 그냥 이렇게 생각하자;; return값이랑 그냥 반대라고 생각해 이거를 풀어서 생각하려고 하면 머리아파 매개변수는 좁은 타입으로 대입이 되는데 오히려 넓은 타입으로는 대입이 안 돼 number가 없어서 그런가?

// function a(x: string): number {
//   return 0;
// }
// type B = (x: string|number) => number;
// let b:B = a;

// // 이러면 모든 게 만족
// function a(x: string|number): number {
//   return 0;
// }
// type B = (x: string) => number|string;
// let b: B = a;