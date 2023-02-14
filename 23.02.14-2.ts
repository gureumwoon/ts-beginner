// <커스텀 타입 가드(js,형식 조건자)>

// interface Cat {meow: number}
// interface Dog {bow: number}
// function catOrDog(a: Cat | Dog): a is Dog {
//   // 타입 판별을 우리가 직접 만들어라.
//    //  그래서 뭘 한거냐면 이 catOrDog라는 함수는 여기서 강아지임을 찾아내는 걸 직접 만들어야함.
//    //  그래서 a의 meow라는 속성이 있으면 이건 Cat이니까 false고 그게 아니면 true
//   if((a as Cat).meow) {return false}
//   return true;
// }

// // 타입을 구분해주는 커스텀 함수를 내가 직접 만들 수 있다.
// 우리가 지금까지는 다 자밥스크립트 문법으로만 사용했잖아
// ex) typeof instanceof in Array.isArray 이런 자바스크립트 문법 사용해서 a가 뭔지 찾는 그런 걸 했었는데 이런 게 아니라 우리가 커스텀하게 함수를 만들어줄 수 있어.


// function pet(a: Cat|Dog) {
//    if(catOrDog(a)) {
//       console.log(a.bow))
//    }
//    if('meow' in a) {
//       console.log(a.meow))
//    }
// }

// Cat이냐 Dog이냐 구분할 땐  이렇게 해줘도 된다. 커스텀 함수로도 할 수 있다는 걸 보여주려다 예제가 복잡해진거야. 강아지이려면(a is Dog) meow가 (a as Cat).meow 없어야 한다(return false).
// 그리고 그걸 실제로 if문에서 위처럼 저런 식으로 써서 a가 Dog란 걸 밝혀냄. 두 번째 if문은 Cat
// 그래서 이런거는 커스텀한 타입가드

// is도 타입가드의 하나인데
// return 값에 is가 들어가 있는 애들이 있어 is가 들어있는 애들은 커스텀 타입 가드 함수이다.
// 커스텀 타입 가드 함수들은 어떨 때 쓰이냐, if문 안에 쓰는 거다. if문 안에 써서 타입스크립트한테 정확한 타입이 무엇인지 알려준다. 대신에 타입을 판별하는 거는 우리가 직접 코드를 짜야된다. 이 방법은 복잡해질 때 쓰면 된다.
// 간단하게는 typeof instanceof in Array.isArray 이런 걸로 다 구분이 가능한데 만약 이런걸로 안 될 정도로 너무 복잡해졌다 하면 그럴 때 직접 만들어서 쓰는 게 커스텀 타입 가드 함수이다. (그리고 is가 아니면 타입 추론이 안 되는 경우도 있다.)

// is가 있어줘야만 타입스크립트가 if문 안에서 정확하게 구별을 해준다.