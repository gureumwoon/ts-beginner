// <하나에는 걸리겠지 (오버로딩)>

// function add(x: number, y: number): number
// function add(x: string,y: string): string
// function add(x: number| string, y: number|string) {
//   return x + y
// }

// 이렇게 같은 타입을 여러번 선언하는 것을 '오버로딩'이라고 한다.
// 자바스크립트는 함수를 여러가지 방법으로 활용할 수 있어
// add(1,2)
// add(1,2,3) 이렇게 매개변수 갯수도 다르게 할 수 있고,
// add('1','2','3') 이렇게 타입도 다르게 할 수 있어. 이런 게 다 허용되게 코드를 짤 수 있다
// 이런거를 오버로딩이라고 한다.(같은 함수인데 여러번 선언 된 거)

// declare << 함수 타입 정의만 하고, 실제 코드는 다른 데 있다고 타입스크립트를 속일 수 있다. 그래서 declare로 선언하고 나면 body부분은 구현하지 않아도 돼 왜냐, 타입스크립트는 다른 어딘가에 add 구현이 있겠구나 생각하기 때문에

// declare function add(x: number, y: number): number
// declare function add(x: number,y: number): number

// add(1,2) ---1
// add(2,3,4) ---2

// 만약 타입스크립트를 잘 모르는 상황에서 1번도 있고 2번도 있다 이 두개를 한방에 타이핑을 하고 싶은데, 잘 못하겠다 그럴 때 이렇게 두 번을 선언하면 돼. 가장 좋은 방법은 옵셔널을 사용해주는 거지만 이 옵셔널을 모르는 상황이라면 위에 방식처럼 z 없는 거 하나 있는 거 하나 이렇게 두 번 선언해주면 된다. 그래도 타입스크립트는 똑같이 알아 듣는다.

// function add(x: number, y: number, z?: number): number

// 인터페이스 안에서도 오버로딩 되고 클래스 안에서도 오버로딩이 된다.

// interface Add {
//   (x: number, y: number): number
//   (x: string, y: string): string
// }
// const add: Add = (x: any,y: any) => x+y;
// add(1,2)
// add('1','2')
// add('1',2)

// class A {
//   add(x: number, y: number): number
//   add(x: string, y: string): string
//   add(x: any, y: any) {
//     return x + y;
//   }
// }

// const c = new A().add(1,2) // 커서 올리면 const c: number 라고 타입이 맞게 나옴.
// 알아서 오버로딩에 따라서 타입이 추론됨.

// 그래서 이런식으로 내가 도저히 한줄로 타이핑을 못하겠다 할 때, 각각의 경우를 전부 다 여러개로 만들어 두면, 타입스크립트가 알아서 그 여러개중 하나에 걸리게 해준다.
// 그리고 이렇게 오버로딩을 해놨으면 실제 구현부에서는 const add: Add = (x: any,y: any) => x+y; 이렇게 매개변수 타입 any로 해도 됨. 이렇게 하더라도 타입을 any라고 생각하는 게 아니라
// interface Add {
//   (x: number, y: number): number
//   (x: string, y: string): string
// }
// interface Add 안에 있는 타입으로 알아서 추론해줌.