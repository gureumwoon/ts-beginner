// <{}와 Object>

// const x: {} = 'hello'
// const y: Object = 'hi'

// 4.8버전 타입스크립트에서 두가지 새로운 타입이 나옴. 빈 객체 타입과 Object(대문자임)
// 이 두 타입이 객체를 뜻하는 거 아닌가? 하는데 보면 문자열도 다 대입이 가능하다.
// 여기서 알아야 할 게 빈객체와{} Object 이 두개는 '모든타입'이다(null과 undefined는 제외). 모양이 객체라서 착각할 수 있는데 '모든타입'을 가리킴. 실제 객체는 object임(소문자) << 얘는 문자열은 error 뜨고 객체만 대입 가능.

// ex) const xx: object = 'hi' << error
//     const yy: object = {hello: 'world'} O

// 하지만 실제로 객체를 타이핑 할 때는 object는 웬만하면 지양하고, interface나 type, class를 써라.

// 여기서 4.8 버전에서의 핵심은

// unknown 타입도 사실 모든 값을 다 받을 수 있어. any랑 마찬가지로 모든 값을 다 받을 수 있는데,

// const z: unknown = 'hi'

// any 보다는 조금 더 나 any는 사실상 타입 추론을 포기한 것과 같다고 했지 unknown은 타입을 우리가 나중에 직접 정의 해줘야 하는 거고.
// 4.8버전에서 나온 게 unknown = {}|null|undfined 요건데 4.8버전에서 이 공식이 성립하게 되었음. 그전까지는 unknown 변수를 if문 안에 넣으면 그대로 unknown이 나왔었음. 근데 4.8버전부터는 unknown을 if문 안에 넣으면 타입이 {}이렇게 뜸.

// ex) if(z) {
//       z: // const z: {} << 타입이 이렇게 뜸. 이 타입은 객체 X 모든타입을 말한다.
//     } else {
//       z:
//     }
// 그래서 왜 이게 이렇게 됐냐면, if문 안에 들어가면 null과 undefined가 떨어져 나가는데 null과 undefined는 else안에 속하기 때문임. if문은 null과 undefined를 빼버려서 이 두 타입은 if문 안에 들어올 수가 없지. 그래서 이 두개가 unknown에서 걸러져서 {}타입만 남은거야.
// 그래서 이걸 반대로 생각하면, unknown은 모든타입{}과 null,undefined가 합쳐진 거라고 보면 돼.