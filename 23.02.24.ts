// <map 타입 직접 만들기>

// interface Arr<T> {
//   forEach(callback: (item: T, index: number) => void): void;
//   map(callback: (v: T) => T): T[];
// }

// const a: Arr<number> = [1,2,3];
// const b = a.map((v) => v + 1); // [2,3,4]
// const c = a.map((v) => v.toString()) // ['2','3','4'] 이렇게 string[] string의 배열이어야 하는데 커서를 올려보면 number[]라고 뜬다. 무언가 잘못됐다. 왜냐, const a에서 Arr<number>로 타입을 지정해주면서 map에서의 T도 number가 되었기 때문, 이럴때는
// 세로운 제네릭을 만들어준다(밑에 S처럼).

// interface Arr<T> {
//   forEach(callback: (item: T, index: number) => void): void;
//   map<S>(callback: (v: T) => S): S[];
// }

// 근데 제네릭을 꼭 map옆에 map<S>이렇게만 해줄 필요는 없다.

// interface Arr<T,S> {
//   forEach(callback: (item: T, index: number) => void): void;
//   map(callback: (v: T) => S): S[];
// }

// 이렇게 Arr 제네릭 타입에 S를 포함시켜도 돼 근데 문제는 이렇게 하면

// const a: Arr<number> = [1,2,3]; 이런 형식이어야 되는데 여기서 map으로 뭘 할 줄 알고 Arr옆에 미리 map에 대한 타입을 넣겠어
// 그렇기 때문에 위의 방식으로 할 수는 없고, map을 사용하는 순간에 타이핑 할 수 있게 밑에처럼 만들어야 한다.

// interface Arr<T> {
//   forEach(callback: (item: T, index: number) => void): void;
//   map<S>(callback: (v: T) => S): S[];
// }

// const a: Arr<number> = [1,2,3];
// const b = a.map((v) => v + 1); // [2,3,4]
// const c = a.map((v) => v.toString()) // toString()은 S잖아 S자리가 문자니까 위에 설정해준 S는 string이 되고, return 값도 strimg[]이 된다. ['1','2','3']

// const d = a.map((v) => v % 2 === 0); // [false, true, false] << 얘는 그럼 타입이 boolean[]이 되어야 함. 커서를 올려보면 타입 알맞게 추론 됨.