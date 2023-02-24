// <filter 타입 직접 만들기>

// interface Arr<T> {
//   forEach(callback: (item: T, index: number) => void): void;
//   map<S>(callback: (v: T) => S): S[];
//   filter(callback: (v: T) => boolean): T[];
// }

// const a: Arr<number> = [1,2,3];

// const b = a.filter((v) => v % 2 === 0); // [2] number[]

// const c: Arr<number | string> = [1,'2',3,'4',5];
// const d: c.filter((v) => typeof v === 'string'); // ['2','4'] string[] << 이게 나와야 하는데 커서 올리면 const d: (string|number)[] 타입으로 추론됨. 잘못됐어

// 타입가드를 사용해보자!!

// interface Arr<T> {
//   forEach(callback: (item: T, index: number) => void): void;
//   map<S>(callback: (v: T) => S): S[];
//   filter(callback: (v: T) => V is T): T[];
// }

// const a: Arr<number> = [1,2,3];

// const b = a.filter((v): v is number => v % 2 === 0); // [2] number[]

// const c: Arr<number | string> = [1,'2',3,'4',5];
// const d: c.filter((v): v is string => typeof v === 'string');

// 이런식으로! 일단 에러는 다 사라졌어 근데 에러만 사라졌다고 되는 게 아니라, 결과가 맞는지를 생각해야 한다. 그래서 d에 커서를 올려봤더니 아직도 타입이  const d: (string|number)[] 이렇게 나옴. T가 지금 number|string인데 지금 d는 string[]이 나오길 원해. 그럼 새로운 제네릭(ex S)이 필요해

// interface Arr<T> {
//   forEach(callback: (item: T, index: number) => void): void;
//   map<S>(callback: (v: T) => S): S[];
//   filter<S>(callback: (v: T) => V is S): S[];
// }

// 그러면 T가 number|string이더라도 S는 string이라는 다른 타입이 될 수 있겠지 서로 같은 타입이면 같은 문자열을 쓰는데, 다른 타입이면 다른 문자를 쓰는 거다.

// const a: Arr<number> = [1,2,3];

// const b = a.filter((v): v is number => v % 2 === 0); // [2] number[]

// const c: Arr<number | string> = [1,'2',3,'4',5];
// const d: c.filter((v): v is string => typeof v === 'string'); // 그럼 d는 이제 타입이 string[]이라고 맞게 나옴. ['2','4']

// 그런데 filter에 V is S에서 S 부분이 빨갛게 에러가 뜸 ('S' 형식은 'T' 형식에 할당할 수 없습니다.) S랑 T랑 서로 관련이 없다는 뜻이다. 그러니까 T타입이 갑자기 왜 S타입이 되냐 이소리(V is S) 근데 말이 되는 케이스가 딱 한가지 있다.
// T가 number|string이고 S가 그거의 부분집합 (number이거나 string) 그러면 T가 S로 변하는 게 가능하지.
// 커스텀 타입 가드는 넓은 타입을 좁은 타입으로 좁혀주는 거잖아. 그래서 number 또는 string이 있었을 때 얘를 정확하게 string이야 혹은 number야 하고 좁혀주는 역할을 하는 거랬지.
// 그래서 이게 가능하다고 했지? extends!!

// filter<S extends T>(callback: (v: T) => V is S): S[]; // S는 T의 부분집합이라는 뜻. 그래서 T가 S로 좁혀질 수가 있다.

// const e = c.filter((v) => typeof v === 'number'); // [1,3,5] number[] 근데 에러 뜸
// 왜냐하면 이 함수가 무조건 커스텀 타입가드여야 하기 때문이다. 에러내용('(v: string|number): boolean' 시그니처는 형식 조건자여야 합니다.) 여기서 형식 조건자는 커스텀 타입 가드를 말한다. 그래서 이 함수를 형식 조건자로 만들어줘야 함.

// const e = c.filter((v): v is number => typeof v === 'number'); // [1,3,5] number[]
// 근데 이렇게 하면 가독성에 안 좋으니까, 이렇게 해도 돼

// const predicate = (v: string|number): v is number => typeof v === 'number'
// const e = c.filter(predicate) // [1,3,5] number[]


