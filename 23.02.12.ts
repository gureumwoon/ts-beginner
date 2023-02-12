// <unknown & any>

// 도대체 unkown이 뭐냐 any랑 다른 점이 뭐냐?
// any를 쓸바에는 unkown을 쓰는 게 낫다고 일단 원칙적으로 기억 해놓자.
// any의 문제점이 뭐냐면, 이후로 타입스크립트가 타입 체킹을 타입 검사를 포기를 해버린다.
// 존재하지 않는 거 막 써도 타입 검증을 안 해줌.

// interface A {
//     talk: () => void;
// }
// const a:A = {
//     talk() {return 3;}
// }

// const b: any = a.talk();
// b.method(); // 이렇게 써도 에러 안 남.

// 그래서 any를 쓰면 그 다음부터는 나 타입 검사 안 할거야라는 포기선언이기 때문에 타입스크립트를 쓰는 의미가 없어져버림.

// const b: unkown = a.talk();
// b.method();

// 근데 unkown을 쓰면 뭐냐 b.method();// 여기서 '알 수 없는' 형식이라고 에러가 뜸. unkown을 쓰면 우리가 직접 b의 타입을 정해줘야 한다. b의 타입을 정해줘서 정해진 타입만 쓸 수 있게 한다.

// ex) const b: unkown = a.talk();
//        (b as A).talk();

// // 결론! any는 타입 선언을 포기 해버리는 거고, unkown도 없는 게 가장 베스트이긴 한데 unkown은 내가 지금 타입을 정확히 모르겠을 때 사용함. 지금 타입은 내가 잘 모르겠고, 나중에 쓸 때 타입을 정의해서 쓸 수 있게 해주자 할 때 unkown.

// 그래서 unkown이 나오는 가장 흔한 경우가....

// ex) try {

//     } catch(error) { // 보통 try catch 할 때 error가 unkown타입으로 뜸.
//         error.message // 그래서 이런식으로 하면, '알 수 없는' 형식이라고 error남.
//              (error as Error).message  // 그래서 우리가 이 error에 타이핑을 이런식으로 이 Error는 TS에서 기본으로 제공하는 타입이다.
// // 왜 이렇게 하냐면 에러가 어떤 게 나올지 모른다. 그렇기 때문에 타입스크립트도 에러에 대한 타입을 any로 원래 해놨다가 이게 나중에 unkown으로 바뀌었다. any로 하니까 에러 처리에서 에러가 나는 경우가 너무 많아져서 error를 unkown으로 바꾸고
// 우리가 직접 이 error의 타입이 뭔지 기본 Error인지 AxiosError인지 타입을 정의해주는 형식으로 바뀜.
//     }