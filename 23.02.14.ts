// <타입 좁히기(타입 가드)>

// function numOrStr(a:number | string) { //매개변수로 숫자 또는 문자를 받을 수 있음.
//     a.toFixed(1) // 하면 에러나 왜냐면 a는 string도 될 수 있는데 string에는 toFixed 속성이 없기 때문.
//       // 확실한 숫자 메서드를 쓰기 위해서는 타입스크립트한테 a는 숫자가 분명해 라고 알려줘야 함.
//       (a as number).toFixed(1) // 그럼 as 이용해서 이렇게 써야 함. 하지만 이건 위험한 코드임.
//    // 왜냐면 우리가 실수했을 수도 있으니까. 매개변수로 '123'이라는 문자열이 들어오면 우리가 아무리 타입스크립트한테
// 이거 숫자야라고 타입스크립트를 안심시켰더라도 자바스크립트 단에서 에러가 날거임. 왜냐, 문자열에는 toFixed를 쓸 수 없으니까.
// // 그래서 as도 unkown이랑 쓰는 거 아니면 웬만해서는 사용하지 않아야 한다고 생각하자.
// }
// toFixed() 메서드는 숫자를 고정 소수점 표기법(fixed-point notation)으로 표시합니다.

// numOrStr('123');
// numOrStr(1);

// 미리 만들어진 남이 만들어놓은 타입이 틀렸을 때, 이때는 어쩔 수 없이 as를 사용해야 겠지만, 그 외에는 안 써야 함.

// best는 타입가드라는 기법을 쓰는건데

// function numOrStr(a:number | string) { //매개변수로 숫자 또는 문자를 받을 수 있음.
//     if(typeof a === 'number') {
//         a.toFixed(1); // 이렇게 넣어주면 a가 숫자인 건 확실하지 (if문 안에서 a가 숫자인 건 확실)
//  // 타입스크립트도 아무 불만을 표시하지 않음. 왜냐면 타입스크립트도 이 if문 안에서는 이 매개   변수 a가 number 또는 string이 아니라 무조건 number라는 걸 알고 있기 때문이지.
//     }else {
//         a.charAt(3)
// }
//     if(typeof a === 'string') {
//         a.charAt(3) // 여기는 반드시 문자열이라는 걸 보장을 할 수 있지.
//      }
//     if(typeof a === 'boolean') {
//         a.toString()
//      }
// }

// numOrStr('123');
// numOrStr(1);

// 타입스크립트가 똑똑한 이유는 else문 까지 파악을 한다. number 또는 string인데 위에 if문이 number면 그 다음 나오는 else문은 string이겠지

// 그래서 기본적인 타입가드 원시값들은 이런식으로 확인하면 된다.

// 그런데 다만, 매개변수가 number 또는 string이잖아 근데 boolean인 경우가 있을 수 있을까? 그러니까 위의 코드증 마지막 if문은 절대 실행될 수 없겠지. 그렇기 때문에 a.toString()에 커서를 올려두면 type이 never라고 뜸.
// 타입스크립트 입장에서는 상대방이 분명 number 또는 string이라고 분명히 선언을 했는데 a를 왜 갑자기 boolean으로 만드냐 여기서는 a를 사용하면 안 된다 그래서 never라고 딱 지정해버림. never로 되면 사용할 수 없게 돼버림.
// 그래서 이런 것까지 타입스크립트가 타입 추론을 잘 해준다.
// 그다음에 이런 경우가 있다


// 타입스크립트는 배열로 구분을 할 수 있다.

// function numOrNumArray(a: number | number[]) {
//     if(Array.isArray(a)) { // 배열인지 아닌지는 Array.isArray로 구별하면 돼 // 얘는 number[]
//       a.concat(4);
//     } else { // number
//       a.toFixed(3);
//     }
// }
// numOrNumArray(123);
// numOrNumArray([1,2,3]);

// 내가 받은 매개변수가 배열인지 아닌지 어떻게 구별할까?
// 타입스크립트에서 | 타입이 많이 나온다. &는 거의 안 나옴. 그렇기 때문에 | 타입일 때, 서로간의 타입을 구별해주는 게 매우 중요함.
// 그래서 원시값일 때는, typeof를 쓰고
// 배열일 때는, Array.isArray 이렇게 쓴다.

// 이런 것도 돼! 예를들어 class가 있다고 치면,

// class A {
//     aaa() {}
// }
// class B {
//     bbb() {}
// }
// function aOrB(param: A|B) {
//     if(param.instanceof A) {
//        param.aaa(); // 이렇게 하고 싶은데 얘가 A인지 B인지 모르는 상태. 이럴 때는 aaa는 A에만 있는 거니까..if문으로 타입을 좁힘. 그럼 이 param은 반드시 A라는 게 여기서 보장이 되는 거임.
//     }
// }
// aOrB(A)
// aOrB(new B())

// 여기서 우리가 A인지 B인지 구별을 해야 돼. class는 그자체로 타입이 될 수 있음. class 이름 자체가 타입 자리에 올 수 있어. 대신에 위에 A B class처럼 class 자체를 의미하는 게 아니라 new A() new B() 이렇게 인스턴스를 의미함.
// 이렇게 class 자체를 의미하는 게 아니라 인스턴스 타이핑은 class 이름으로 한다. 그래서
// aOrB(A) << 처럼 바로 A를 넣으면, 에러난다. (클래스 자체의 타입은 typeof 클래스(typeof A)이다.) 그래서
// aOrB(new A()) 이렇게 인스턴스를 넣기를 원하는 거다.
// 그래서 클래스간에는 instanceof로 구별을 한다.


// type B = {type: 'b', bbb: string}
// type c = {type: 'c', ccc: string}
// type d = {type: 'd', ddd: string}

// function typeCheck(a: B|C|D) {
//     if(a.type === 'b') {
//       a.bbb;
//     } else if (a.type === 'c') {
//       a.ccc;
//     } else {
//       a.ddd;
//     }
// }

// 타입스크립트에서는 a가 B인지 C인지 D인지 몰라
// 근데 if문 안에서 a의 타입이 b다 그럼 a:B a가 B 타입이라고 추론을 해준다. 그래서 타입스크립트가 if문에 대해서 타입 추론을 매우 정확하게 해줌. 그래서 이런게 객체간에 타입 구별법이라고 보면 된다.
// 객체는 사실 구별하기가 좀 어려운데 Array.isArray 이런 메서드들이 없기 때문
// 그렇지만 안에 속성들로 구별할 수 있음 {type:'b'} << 라잌디스

// 이번에는 타입스크립트가 조금 헷갈리게
// type B = {type: 'b', bbb: string}
// type c = {type: 'c', ccc: string}
// type D = {type: 'c', ddd: string}
// 타입c가 두 개이게 만들어 줘 봄.

// function typeCheck(a: B|C|D) {
//     if(a.type === 'b') {
//       a.bbb;
//     } else if (a.type === 'c') {
//       a.ccc;
//     } else {
//       a.ddd;
//     }
// }

// 그럼 저 a.ccc에서 에러가 남. a를 C|D로 추론하고 있음. 왜냐면 a.type === 'c'인 애가 type C랑 type D 두 개라서
// 그래도 여기서 B는 아예 제외를 시켜주지 그럼 맨 밑에 else 에서의 a.ddd는 never가 뜬다. 왜냐면 else if에서 이미 세 개의 타입이 다 해당되어 버렸으니까 아래에서는 해당 될 게 없어서 never가 뜸.
// 객체간에 타입 구별은 이렇게 해줄 수 있고 한 가지 다른 방법도 있다.

// type B = {type: 'b', bbb: string}
// type c = {type: 'c', ccc: string}
// type d = {type: 'd', ddd: string}

// function typeCheck(a: B|C|D) {
//     if(a.type === 'b') {
//       a.bbb;
//     } else if (a.type === 'c') {
//       a.ccc;
//     } else {
//       a.ddd;
//     }
// }

// 객체간에 타입을 검사하기 위해서는 객체들간에 차이를 좀 만들어줘야 함.
// 위에 세 객체의 차이를 찾아보면 객체 안에 type 속성 값이 다 다름. 그리고 bbb,ccc,ddd 속성이 다 다름.
// 그래서 같은 속성인데 값이 다르거나, 속성이 다른 걸로 객체를 구분할 수 있음.
// 그럼 위에서는 속성값의 다름으로 구별을 했다면 이번에는 속성으로 구분 하는 방법! (in 연산자 사용)

// type B = {type: 'b', bbb: string}
// type c = {type: 'c', ccc: string}
// type d = {type: 'd', ddd: string}

// function typeCheck(a: B|C|D) {
//     if('bbb' in a) { // a라는게 B|C|D 중에 하나라는 건데 만약 이중에 a라는 객체안에 'bbb'라는 속성이 있다 그럼 해당하는 건 type B밖에 없지. 그럼 당연히 a는 B 타입이 되는 거다.(a:B)
//       a.bbb;
//     } else if ('ccc' in a) {
//       a.ccc;
//     } else {
//       a.ddd;
//     }
// }

// 그래서 이런식으로 in연산자 사용해서 속성명으로도 찾아낼 수 있음.

// 근데 보통은 객체의 속성 값으로 구분하는 방법을 더 많이 사용하긴 함.
// 그래서 객체를 만들 때, type이라는 속성을 하나씩 넣어주는 이런 습관을 들이면 좋음. 타입스크립트를 위해서

// ex) const human = {type: 'human'};
//     const dog = {type: 'dog'};
//     const cat = {type: 'cat'};

// 그럼 나중에 타입 검사할 때,
// 쉽게 찾아낼 수 있음. 그래서 이렇게 하는 걸 객체에다가 태그를 달아둔다 라벨을 달아둔다 표현을 함. 근데 위에처럼 타입을 달아두지 않았다면, 어떻게 찾으라고? 차이를 찾아라

// ex) const human = {talk()};
//     const dog = {bow()};
//     const cat = {meow()};


// if( 'talk' in a ) {

// } // 이런식으로 하면 a가 human인거를 찾아낼 수 있겠지.

// 그래서 객체들간에 구별할 때는 이렇게 두 가지 방법을 사용한다 알아두기!