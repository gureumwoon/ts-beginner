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