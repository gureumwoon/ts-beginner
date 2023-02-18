// <옵셔널,제네릭 기본>

// <옵셔널>

// function abc(a: number, b?:number, c?:number){}
// abc(1)
// abc(1,2)
// abc(1,2,3) // 이렇게 세개까지는 되는데
// abc(1,2,3,4) // 4개부터는 에러가 남.

// let obj: {a:string, b?:string} =  {a:'hello', b:'world'}
// obj = {a: 'hello'}

// ? << 있어도 되고, 없어도 된다 라는 뜻. 물음표의 위치는 항상 속성명 뒤에 붙여서 써야돼.
// 4개도 가능하고 그 이상으로 전부 다 받게 하고 싶으면 , function abc(...args: number[]){} << 이렇게 사용.
// 그렇지 않고 난 갯수가 딱 정해져 있고 몇개만 옵셔널로 하고싶다 하면 위에 원래 function abc()처럼 쓰면 돼.

// 이 '옵셔널'은 인터페이스나 타입 alias에서도 된다.  let obj: {a:string, b?:string} =  {a:'hello', b:'world'} 여기에서
// b속성이 있어도 그만 없어도 그만. 대신에 c라든지 그 이상의 속성이 생길수는 없다.

// <제네릭>

// 제네릭이 왜 필요한가?

// function add(x: string|number, y: string|number):string|number {return x + y }
// add(1,2); //3
// add('1','2') // '12'
// >> 근데 add 함수는 잘못된 함수야... 저렇게 위에 까지는 괜찮은데
// add('1',2)나 add(1,'2') 이렇게 되면 add 할 수가 없잖아.. 근데 위에처럼 타입을 정하면 얘네까지 허용해주는 게 되잖아. 그럼 결국 얘네들은 결과가 '12'가 나오겠지.

// 그럼 add(1,2),add('1','2')얘네는 되고, add('1',2), add(1,'2') 얘네는 안 되게 하려면 첫 번째,

// function add(x: string, y: string):string {return x + y }
// function add(x:number, y: number):number {return x + y } // 함수를 이렇게 두 개로 쪼개는 거지 하지만 이렇게 되면 함수가 에러가 남. 왜냐하면 바디가 있는 같은 함수를 두 번 선언했기 때문에
// 이런 딜레마가 있기 때문에, 나온 게 '제네릭'이다.

// >> 일단 지금 현재의 타입이 뭔지는 모르겠는데, 나중에 정하겠다 하는 거.(타입을 변수처럼 만든다고 생각하면 돼)

// function add<T>(x: T, y: T): T {return x + y}
// add<number>(1,2)
// add(1,2)
// add<string>('1','2')
// add('1','2')
// add(1,'2')

// '제네릭'은 function 뒤에다가 <T>붙여줌. << 보통은 이렇게 T라고 많이 적는다. 그리고 매개변수 타입 return 반환값 타입도 다 T로
// 그러니까 뭔 타입인지는 모르겠는데 같은 타입은 전부 다 하나의 문자로 표현하는 거야. 뭔지는 모르지만 같은 문자로 표현했으면 같은 타입이라고 했잖아 그러니까 add(1,2),add('1','2')이 둘은 돼 매개변수끼리 다 같은 타입이니까 하지만add('1','2'),add(1,'2') 얘네들은 타입이 서로 다르니까 에러가 남.
// 그러니까 이 제네릭은 만들어놨을 당시에는 무슨 타입인지 모르는데 실제로 사용할 때 타입이 정해지게 된다.
// 제네릭은 함수를 선언할 때 말고, 함수를 쓸 때 타입이 정해질 수 있도록 해주는 역할이다.

// 그리고 이 <T>가 어떤 타입이든 다 될 수 있다고 했잖아 그렇게되면 범위가 너무 넓어짐. 예를들어, add(true,false)이것도 될 것 아니야. 타입이 같기만 하면 되니까 그래서 이런 걸 허용했을 떄 문제가 될 수 있음. 그래서 저렇게 하는 걸 원치 않아 그러면 이 <T>에다가 제한을 둘 수 있어. <T extends string> extends를 T 옆에 붙이면 타입이 제한됨. << 이렇게 되면 반드시 T는 string이어야함.
// function add<T extends number|string>(x: T, y: T): T {return x + y} 하면 add(1,2)와 add('1','2')가 가능하게 되는 거야.
// 그리고 function add<T extends number, K extends string>(x: T, y: K): T {return x + y} 이런식으로 제네릭을 여러개 동시에 만들면서 각각 다른 제한을 둘 수도 있음. 그럼 저렇게 하면 add(1,'2')얘가 가능하게 되지.

// <각종 제한 방법>

// function add<T extends {a: string}>(x: T): T {return x}
// add({a: 'hello'})

// function add<T extends string[]>(x: T){return x} // string의 배열만 가능.
// add({'1','2','3'})

// function add<T extends (a: string) => number>(x: T):T{return x}; // 함수 모양으로 제한
// add((a) => +a) // a는 string이고 +a는 number니까. 이런식으로 콜백함수의 형태를 제한하는 방법.

// function add<T extends (...args: any) => any>(x: T):T{return x}; // 모든 함수를 다 넣고싶다 할 때는 이렇게 any 사용
// // 제한을 거는 거기 때문에 제한이 "없다"라는 걸 표현하고 싶을 때는 'any'를 사용해도 된다.
// // 그렇지만 제한이 없는 경우는 그렇게 많지 않다.

// function add<T extends abstract new (...args: any) => any>(x: T):T{return x}; // 얘는 생성자 넣을 때
// class A {}
// add(A) // new A()는 안 되지만 A는 되게 class A{}도 생성자잖아
// 그래서 생성자만 뽑고 싶을 때는 이 형식을 사용한다.