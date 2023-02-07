// <enum 이넘>

const enum EDirection {
    Up, // 0  // 아니면 Up = 3 // 이렇게 아예 지정 해줄수도 있음 그럼, // 아니면 Up = 3,// '123'문자열도가능
    Down, // 1 // 얘는 4가 되고 // 각자 이렇게 불규칙하게 정해줄 수도 있음 // 5, // 'hello'
    Left, // 2 // 얘는 5 // 4
    Right, // 3 // 얘는 6임. // 6 이런식으로
}
// const a = Edirection.Up; 순서대로 했다면 얘는 0
// const c = EDirection.Left; 얘는 2

// JS로 변환되면 const a = 0 const c = 2 이렇게 변환 돼.

// 보통 enum을 언제쓰냐? 변수들을 하나의 그룹으로 묶고 싶을 때 사용하긴 하는데,

const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
} as const;


// 둘 다 거의 비슷한데 enum은 JS로 변환되면 사라져, 근데 객체는 남아있어. 그래서 실제로 JS 코드로 변환했을 때 남아있냐 안 남아있냐 이것도 타입스크립트에서 엄청 중요한데 나는 안 남아있게 하고싶다 그럼 enum 쓰면 되고, 남아있게 하고싶다 그럼 객체쓰고 나는 남겨야 될 지 안 남겨야 될 지 모르겠다 그러면 웬만하면 남겨라

// 저 객체에서 as const를 빼고 커서를 올려봐 그럼 저 변수들 타입이 다 number로 뜨는데 여기서 타입스크립트가 바보다. 왜냐면 우리는 정확히 0,1,2,3처럼 정확한 값이 나오길 바라는데 타입스크립트가 추론하기론 number로 추론한거지.
// 타입의 추론을 바보같이 한다면 직접 나서야 된다. 그러면 우리가 타이핑을

const ODirection: { Up: 0, Down: 1, Left: 2, Right: 3 } = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
};

// 이렇게 해줄 수도 있지만, 편한 방법으로는 위에 처럼 as const를 붙여주면 돼. 나는 이 값을 상수로 쓰겠다. 그래서 다시 커서 올려보면 상수로 정확히 타입이 나온다. 여기서는 readonly까지 붙어서 나오는데, 이 읽기전용은 수정을 못한다. 수정을 못하도록 readonly까지 해서 정확히 고정시킴. 직접 타이핑 할 때도 readonly 직접 붙여도 돼.


// 이 enum은 직접 타입으로 사용이 가능하다.

function walk(dir: EDirection) { } // dir은 위에 EDirection의 Up,Down,Left,Right중 하나여야 한다는 얘기

// 나는 enum 쓰기 싫다 enum 쓰기 낯설다 하면 똑같이 쓰는 방법이 있는데, 타입 정의가 조금 복잡해져

type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) { }

// keyof는 

const obj = { a: '123', b: 'hello', c: 'world' }이런 객체가 있다고 쳐
// 나는 여기서 a,b,c만 꺼내오고 싶다.하면
type Key = keyof obj; // 이렇게 하면 에러 떠 obj는 값인데 형식(type)으로 사용되고 있다며 error가 뜸.

// 그러니까 obj는 JS 값인데 type으로 쓰려고 하고있다. 그러면 이 떄, typeof를 앞에 붙여준다.

type Key = keyof typeof obj; // 이렇게 값을 타입으로 쓰고 싶을 때, typeof를 쓰는거고
// 이 typeof obj는

const obj: { a: string, b: string, c: string } //이게 되는거지. 이건데 여기서 key들만 뽑아내고 싶다?
// 그럴 때 keyof를 붙이면? type Key = "a"|"b"|"c" 이렇게 나오게 돼.

// 아까 봤던 readonly도 타입스크립트야 그래서 변환되면 사라져 그래서 이런 코드들 보면 엄청 복잡한데 천천히 살펴보면 다 원리가 있다. 
// 아까도 처음 원형은 type Key = keyof obj; 이거라고 했지 근데 obj는 JS 값이기 때문에 type으로 쓸 수가 없었지 
// 그래서 타입으로 쓰기 위해 typeof를 붙여줬고, 거기에 keyof를 하면 "a","b","c"를 뽑아낼 수 있었던 거지 
// 그리고 그거를 Key라는 타입으로 type Key = keyof typeof obj 이렇게 커스텀 하게 만든거지.

walk(EDirection.Left);
run(ODirection.Right);

// 이 코드를 살펴보자면
type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) { }

const obj = { a: '123', b: 'hello', c: 'world' } as const
type Key = typeof obj[keyof typeof obj]; // 이렇게 하면 value들만 다 가져오고 싶다는 거야.
// 아까 위에서는 key들을 가져오는 거였다면 지금 이 위에처럼 하면 value들의 type들만 다 가져오고 싶다는 거야.