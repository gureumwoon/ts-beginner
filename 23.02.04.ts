// <never타입과 느낌표(non-null aserition)>

// try {
//     const array = [];
//     array[0];
// } catch(error) {
//   error;
// }



// * 타입스크립트 선언할 때 빈배열 조심해라 빈배열 위에 커서 올려놓으면 never라는 타입이 뜬다.(const array: never[])이렇게
// 이 never라는 타입이 뜨게되면 이 array는 아무 타입도 올 수가 없어
// 그니까 빈 배열은 never이기 때문에 빈배열을 선언할 때는 반드시 미리 타이핑 지정을 해줘야지 이 array에다가 나중에
// array.push('hello'); 이런 걸 할 수가 있는거야.
// 그래서 이렇게 const array: string[] =[]; 이렇게 타이핑 지정 해주기. 저 타입 지우면 array가 never 배열이 돼서 'string' 형식의 인수는 'never' 형식의 변수에 할당할 수 없습니다.라는 에러가 뜨게 돼.
// >> 결론! 빈 배열일 때 희한한 never라는 타입이 나오니까 이것 주의!

// <! 느낌표 타입?>

const head = document.querySelector('#head');
console.log(head);

// tag를 가리키는 Element라는 타입이 있어

const head2: Element = document.querySelector('#head');

// 'Element'는 글로벌이기 때문에 아무때나 우리가 가져다 쓸 수 있어.
// 이 head는 태그니까 태그에는 innerHTMLM이 있어서

head2.innerHTML = 'hello world'

// 이렇게 작성이 가능하잖아.

// 근데 이 코드 커서 올려놓고 보면 타입에
// const head: Element | null 이렇게 head가 Element or null이 될 수 있다.
// 이렇게 뜸 왜냐? 실제로 여기 태그처럼 아이디가 head인 태그가 없으면
// 변수 head는 null이잖아 그래서 타입스크립트는 모든 가능성을 다 고려하고 있다는거지

// 만약 head 태그가 있음에 확신을 할 수 있다. 하면 그럴 떄 붙이는 게 '!' 느낌표다.

const head3 = document.querySelector('#head')! // 이렇게 사용이 가능 이것도 나중에 JS로 변환 될 때 사라진다.

// !의 역할: 이 느낌표를 사용하면 아까처럼 Element|null이 아니라 Element만 뜬다
// 무조건 존재함을 나타낸다. 그래서 null이나 undefined이 아님을 보증하는 방식이다.
// 하지만 세상엔 절대란 없기 때문에 ! 사용을 그렇게 권장하지는 않는다.

const head4 = document.querySelector('#head');
if (head) {
    head4.innerHTML = 'hello'
}

// 이런식으로 쓰면 안전하지 id가 head가 아니라 header여도 if는 false가 뜨니까 코드가 실행되지 않아서 안전함.
// 하지만 꼭 저렇게 쓰지 않아도

const head5 = document.querySelector('#head');
head5.innerHTML = 'hello'
// 이렇게 써도 개체가 null인 것 같다고 typescript가 알려줌.
// if의 사용은 스스로 미리 방지하기 위해 사용

// <원시 래퍼 타입,>

const aaa: string = 'hello';
const bbb: String = 'hell';

// string과 String은 서로 다른 타입이다. 대문자 String도 일단 에러는 나지 않지만
// 일반 문자 데이터 타입은 아니다 문자열 데이터 타입은 소문자 string을 사용해야 한다.
// String은 래퍼 개체야. 이 스트링은 언제 쓰냐
// new String()할 때 이 String이야. 하지만 이거 실제로 쓰는 경우 거의 없음.

// <템플릿리터럴>

type World = "world"
const cc: World = 'world'

const dd = `hello ${a}`;

// 타입을 커스텀하게 만들어 주는 기능.(type키워드로) 그리거 ctrl+space 누르면 자동완성 추천을 해준다.

// 이런 경우도 있어

type World2 = "world" | 'hell'
type Greeting = `hello ${World2}`;

// 위에 const dd처럼 타입에서도 이렇게 사용 가능 근데 파이프 사용으로 선택지가 두 개로 나뉘어 지면
// 자동완성 추천에서 'hello world'와 'hello hell' 두 개를 추천해준다. 

// 근데 위에같이 선택지가 두 개가 아니고
type Greeting2 = `hello ${string}`;
// 그냥 string이었다 그러면 추천이 안 뜨겠지 왜냐면 모르니까 그냥 모든 문자열이 다 될 수 있으니까.
const ee: Greeting2 = 'hello world';

// 그래서 나중에 타입을 정교하게 만들때는 | (or이라는 뜻) 형태로 쓰인다.

// <rest parameter>

// 레스트 매개 변수는 매개 변수의 수를 정해 놓지 않고 사용자가 넣고 싶은 독립 변수의 수만큼 넣을 수 있도록 도와주는 기능이다.
// 레스트 매개 변수는 배열이기 때문에 타입 선언 시 [] 대괄호를 꼭 넣어주어야 해.
// 함수가 있는데, 함수의 파라미터에 몇개의 인자가 들어올지 모르는 상황이다. 
// 이럴 때 사용하는 것이 rest parameter이다. 문법은 spread operator를 사용한다. 


function rest(...args: string[]) {
    console.log(args); // ['1','2','3']
}

function rest(a, ...args: string[]) {
    console.log(a, args); // 1,[2,3]
}

// 예를들어, rest(1, 2, 3); 이렇게 있으면 위에 함수 안의 console.log가 [1,2,3]이 되잖아. 
// 모든 매개변수들을 다 이렇게 받는데 지금 rest 타입이 string으로 되어 있으니까 
// 방금 rest(1,2,3)도 rest('1','2','3')이 되어야 한다.

// 이런식으로 해도 되겠지
// 다양한 형식이 있는데 이게 타입 때문에 엄청 헷갈려 안 헷갈릴 수 있는 방법은 
// 타입을 지워봐 그리고 잠깐 JS정신으로 돌아와서 a는 첫 번째 매개변수이고 ...args얘는 나머지 매개변수구나 이렇게 정신을 차린 다음에 다시 타입을 붙여봐 그럼 안 헷갈릴 수 있어.

// <튜플>

const type: [string, number] = ['1', 1]
type[2] = 'hello' // 세 번째 자리에 'hello' 넣으려고 해서 에러남

type.push('hello')

// 웃긴 게 타입스크립트가 바보라서 typle[2] = 'hello' 얘는 안 되고 typle.push('hello') 얘는 돼
// 둘 다 세 번째로 요소를 추가 하는 건 똑같아