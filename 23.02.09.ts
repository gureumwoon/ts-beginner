// <union (|)과 intersection(&)>

// type A = {a:string}; // A라는 타입을 선언했다 이렇게 생각하면 돼. type alias 라고 불리는데, 그냥 타입 정의
// 라고 하겠음.
// 객체를 이렇게 타입을 정의해서
// const a: A = {a: 'hello'} 이렇게 타입처럼 사용하는 것!  우리가 타입을 새로 만들어 낸 거야.
// 이게 싫으면,
// const a: {a:string} = {a:'hello'} 여기다 이렇게 바로 넣어줘도 돼.
// 아니면 이렇게 해도 돼!
// 변수 inline 하듯이

// 다른 거는 interface 만드는 거.
// interface B {a:string}
// const b:B = {a:'hello'}

// 둘 중에 뭐가 더 낫냐? 일단 간단하게 하고 싶으면 type을 써라

// 이 interface는 상속받고 implement 구현하고 이런 java의 객체지향에서 나오는 개념들이 포함되어 있어 그래서 나중에 객체지향 프로그래밍을 하고싶다 그러면 interface를 써라 얘가 복잡한 기능이 더 많다.

// <union |>

// function add(x: string | number, y: string | number): string | number {return x + y}
// add(1,2)
// add('1','2')
// add(1,'2')

// |이거를 union이라고 부른다. '또는'의 의미를 가지고 있어 정확하게는 union이라고 불린다. 이걸하면 좋은점은,
// string 또는 number니까 위의 add들 처럼 마음대로 넣을 수 있어. 문제는, 타입추론도 제대로 안 된다. 타입스크립트는 모든 가능성을 다 고려하기 때문에 x가 string인 경우 y가 number인 경우 둘 다 string인 경우 둘 다 number인 경우도 고려하고 등의 모든 경우를 다 고려하는데, return 값이 string|number인 게 말이 안 된다.
// 모든 경우를 고려하는거면 return 값도 string|number가 맞지 않나? 생각 할 수 있는데 이게 문제가
// const result: string|number = add(1,2) 이렇게 될 수가 있어. 만약 위에처럼 return값이 string|number 이게 맞다면,
// const result: string|number = add(1,2)얘도 타입적으로는 맞아야돼 근데 실제로는 add는 그냥 number지 근데 result가 string이라고 착각할 수가 있어. 그러면 문제가 생기게 된다. 예를들면 이렇게 result.charAt() add는 number인데 거기에 문자열 메서드를 쓰면 얘는 숫자니까 error가 나겠지
// 그러니까 하고싶은 말은 애초에
// function add(x: string | number, y: string | number): string | number {return x + y} 얘부터가 잘못되었다는 거야. 그렇기 때문에 이 이후부터 계속 연달아 문제가 생기게 된다. 그래서 타입스크립트 할 때에 처음 타입을 엄청 잘 잡아놔야 함. 안 그럼 줄줄이 다 꼬임.
// 그래서 위에께 얼핏보면 맞는 말 같아도 안 되는 이유 위에처럼 허용해주면 얘가 위에처럼 add가 number인데도 result가 string이 될 수도 있는 잘못된 상황이 나와버림 이 설명이 주는 아니었지만 쨌든 union이란 type이 있고,

// <intersection(&)>

// 이거는 type A = string & number
// 얘는 둘 다 여야 된다는 거 string이면 number여야 된다는 거 이런 게 있나?
// const a:A = 1; 얘는 당연히 안 되겠지 근데 string이면서 number도 되는 건 당연히 없지 그럼 이거는 다 안 되는 거 아닌가? 할 수 있는데 객체가 있다.
// 객체에서 놀라운 걸 볼 수 있는데, type A = {hello:'world'} & {zero:'cho'} type이 이렇게 되어있는 거야.
// 실제로 대입을 해보면, const a: A = {hello:'world',zero:'cho'} 이렇게 둘 다 만족하면 돼. 여기서
// const a: A = {hello:'world'}이렇게 zero를 없애면 error가 뜸.  &로 하면 둘 다 만족.

// 여기서 우리를 정말 혼란스럽게 만들 수 있어. 이게 |(또는(union))도 가능하다는 거야.
// type A = {hello:'world'} | {zero:'cho'}
// 보통 & 가 되면 |은 불가능 하고  |이 되면 &가 불가능한데 여기서 미쳐버리는 포인트는 둘 다 된다는 거 근데 이게 의미가 완전히 다름. type A = {hello:'world'} | {zero:'cho'}얘를 해석하고 앞에 또는 뒤에야 그니까
// const a: A = {hello:'world'} 위에서는 zero:'cho'를 지우면 error가 났었지만 얘는 통과야.

// // 결론!
// &는 모든 속성이 다 있어야만 한다.
// |는 여러 개 중에 하나만 있으면 된다.


