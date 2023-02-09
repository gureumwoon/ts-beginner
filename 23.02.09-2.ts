// <타입 애일리어스와 인터페이스의 상속(extends)>

// type Animal = {breath: true};
// type Poyouryu = Animal & {breed: true};
// type Human = Poyouryu & {think: true};
// 이렇게 상속같은 느낌으로 쓸 수 있어.

// const zerocho: Human = {brath: true, breed:true, think: true}
// 예를 든거야 사람은 숨을 쉬는데 숨만 쉬면 안 되고, 포유류기 때문에 breed도 해야되고, 사람이기 때문에 think도 해야돼
// 이런식으로 확장의 개념으로 쓸 수도 있어.(상속의 개념으로) 그래서& 얘를 그리고 라는 개념으로 생각하면 안 되고,
// 상속의 개념으로 받아드리면 좋을듯.

// interface에도 extends가 있어서,

// interface A {
//     brath: true
// }
// interface B extends A {
//     breed: true 
// }
// 이렇게 하면, 
// const b:B = {brath: true, breed: true}
// 이런식으로 위에 &와 비슷하게 사용할 수 있다. 이 두 개의 차이가 있는데 차이를 몰라도 돼 뭐만 생각하면 되냐면,
// 내가 interface를 쓸 지 type을 쓸 지 그 둘 만 생각하면 돼.
// 결국 객체지향 프로그래밍을 해서 interface를 쓰게 되더라 >> 제로초님의 말씀.
// type은 typescript를 잘 모르는 사림이 보면 명확하지 못 해 & 이게 뭘 뜻하는지 근데 interface를 쓰고 interface의 extends를 쓰면 상속의 의미가 딱 명확하지 extends자체로 확장 상속보다는 확장의 의미.

// 근데 타입이랑 interface가 완전히 분리되어 있는 게 아니라, interface가 type을 extends 할 수도 있고, 반대일 수도 있고 그렇기 때문에 명확하게 둘이 구분되어 있는 게 아니다.

// 또 다른 interface 특징중에 이런 것도 있어. interface가 같은 이름으로 여러 번 선언할 수 있다.
// interface A {
    
// }
// interface A {
    
// }
// interface A {
   
// }
// type에서는 안 되는 것! interface에는 이런 특징도 있다.
// interface는 이렇게 여러 번 선언할 수 있는데 선언할 때마다 합쳐진다.
// interface A {
//     talk: () => void;
// }
// interface A {
//     eat: () => void;
// }
// interface A {
//    shit: () => void;
// }

// const a: A = {talk() {}, eat() {}, shit() {}}
// 이걸 사용해서 뭘 할 수 있냐
// 그래서 라이브러리들이 대부분 다 타입이 아니라 interface로 만들어놨다 왜냐? 우리들이 나중에 다른 사람들의 interface를 확장할 수 있어 남의 라이브러리에 위에처럼 저런식으로 되어있다 그런데 어 나 뭐 하나 맘에 안 들어 하면 뭐 하나 수정하고 싶어 하면 
// interface A {
//    sleep: () => void;
// }
// 얘 따로 하나 추가해주면
// const a: A = {talk() {}, eat() {}, shit() {}, sleep() {}}
// 실제로 여기에 하나가 추가가 된다.

// 그래서 interface는 서로간에 합쳐진다는 특이한 습성 그래서 이 특성을 기반으로 남의 라이브러리 코드를 수정한다는거
// 그럴 수 있다.

// 현업에서 타입, 인터페이스, 이넘 변수명 지을 때 네이밍 룰에는 크게 두가지가 있다.
// 인터페이스에는 interface I를 붙이고 type에는 T를 붙이고 enum에는 E를 붙여서
// interface Iprops{}
// type TType = string | number;
// enum EHello {
//     Left,
//     Right
// }
// 이런 방법이 있고,
// 안 붙이는 방식
// interface props{}
// type Type = string | number;
// enum Hello {
//     Left,
//     Right
// }
// 이렇게 크게 두 가지가 있는데 요즘 거의 국룰은 안 붙이는 거다. 왜 안 붙이냐면, 
// const a: Props = {}
// 어차피 커서 올리면 다 나오니까
// 인터페이스냐 아니냐 그렇게 중요하지도 않을 뿐더러 props에 커서 올리면 interfac인지 아닌지 에디터로 다 알 수 있기 때문에 굳이 안 붙임. 별 의미가 없으니까...