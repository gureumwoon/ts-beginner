// <클래스의 새로운 기능들>

// 원래 class의 원본은,

// class A {
//   a: string;
//   b: number;
//   constructor(){
//     this.a = '123'
//     this.b = 123 // 원래의 class 형태인데 이렇게 하면 a,b에서 에러 남. 그래서 위에다 type 정의 해 줌. 그리고 얘를 생략 함.
//   }
//   method(){
 
//   }
// }

// class A {
//   a: string;
//   b: number; // 근데 이렇게 하면 생략만 되지 값이 할당되지 않았다고 에러 뜸.
//   method(){
 
//   }
// }

// 그래서

// class A {
//   a: string = '123';
//   b: number = 123; // 이렇게 바뀐거임.
//   method(){
 
//   }
// }

// constructor가 필요한 이유는, 

// class A {
//   a: string;
//   b: number;
//   constructor(a: string, b: number){ // 이렇게 쓸 수 있게 하려고
//     this.a = '123'
//     this.b = 123 
//   }
//   method(){
 
//   }
// }

// const a = new A('123') // 이렇게 쓸 수 있게 하려고

// 클래스의 이름은 그자체로 타입이 될 수 있다. 

// type AA = A; 
// 근데 얘가 클래스를 가리키는 게 아니라
// new A() << 얘를 가리키는 거야.
// const a:A = new A('123')

// 그럼 클래스 자체를 가리키는 타입은 뭐냐
// typeopf A
// const b:typeof A = new A('123') // 이렇게 하면 에러남.
// const b: typeof A = A

// 클래스 자체의 타입은 typeof A이고,  클래스 이름은 인스턴스를 가리킨다(new A())
// 한가지 더 추가로 하자면,

// class A {
//   private a: string = '123'; // 얘는 TS에서 제공하는 private이고 
//   #b: number = 123; // 새로 추가 된 건데 이런 게 있어 (#) 이거는 JS에서 제공하는 private이다 
  
//   method(){
//     console.log(this.a, this.#b) --1
//   }
// }

// 프라이빗이라는 건데 근데 이게 타입스크립트의 프라이빗과는 조금 달라 TS에서도 프라이빗 이런식으로 private a: string = '123'
// 표현할 수 있었잖아 그리고 1.프라이빗이면 자기 클래스 내부에서만 이런식으로 쓸 수 있었지
// JS private이랑 TS private은 조금 다르다. 웬만하면 TS의 private을 쓰는 게 좋다. 왜냐하면, protected와 구분을 할 수 있어. JS에서 제공하는 private은 protected가 안 되기 때문에 좀 더 정교하게 쓰고싶으면 TS의 private을 쓰는 걸 권장한다. 다만 TS의 private은
// 실제 코드에서는 public으로 바뀐다. 그게 조금 문제이긴 한데 그래도 타입스크립트에서 프라이빗을 실제코드에서 퍼블릭으로 바뀐다고 해도 실제 코드에서 프라이빗 변수에 접근하거나 그러면 애초에 타입스크립트 관계에서부터 에러가 나겠지 그래서 그런 일은 거의 없기 때문에 좀 더 정교하게 쓸 수 있는 private protected가 가능한 TS private을 권장하는 거다.

// <클래스에 추가된 3가지 impleents,private,protected> -- 타입스크립트에만 있는 키워드들임.

// 그래서 클래스는 인터페이스를 implements(시행,구현 하다) 구현할 수 있어. 이게 객체지향에서 생기는 특징인데, TS가  그런점들을 언어에 추가한거다. 인터페이스가 있으면 클래스는 이 인터페이스를 따라야 한다.

// interface A {
//   readonly a: string;
//   b: string;             // 인터페이스가 있고
// }
// class B implements A {
//   a: string = '123'
//   b: string = 'world'    // 클래스로 구현.
// }
// class C extends B {}
// new C().a;
// new C().b;

// 이걸 이제 JS로 변환하면,  인터페이스는 사라진다. 그리고 TS가 알아서 contructor를 추가함.

// class B {
//   constructor(){
//     this.a = '123'     // JS로 변환하니 interface 사라지고 implements도 사라짐.
//     this.b = 'world'
//   }
// }
// class C extends B {

// }
// new C().a;
// new C().b;

// 대신에 이 인터페이스가 뭔가 잘못됐다 그럼 항상 경고에러를 띄워줌. 그래서 class의 모양을 interface로 통제할 수 있다.


// interface A {
//   readonly a: string;
//   b: string;             
// }
// class B implements A {
//   private a: string = '123'
//   protected b: string = 'world'
//   public c: string =  'wow'  
// }

// private, protected, public 이 세 개가 추가 됐는데, 일단 기본은 public이라서 얘는 안 써줘도 돼 생략가능.
// private, protected얘네는 객체지향에서 쓰는 것들. public은 공식적으로 new C().c << 이렇게 아무렇게나 접근이 가능함. 인스턴스에서 접근이 되는 게 퍼블릭이고(그냥 일반적인 속성), private은 new C().a << 이렇게 접근할 수 없는 애들임. 그래서 이 private속성은 class B 안에서만 써야 돼.

// ex)

// interface A {
//   readonly a: string;
//   b: string;             
// }
// class B implements A {
//   private a: string = '123'
//   protected b: string = 'world'
//   public c: string =  'wow'  

//   method() {
//     console.log(this.a) // 이렇게 안에서 사용 가능.
//     console.log(this.b) // protected
//     console.log(this.c) // 얘는 안에서나 밖에서나 가능.(public)
//   }
// }

// class C extends B {
//     method() {
//       console.log(this.a) 
//       console.log(this.b) 
//       console.log(this.c) 
//   }
// }

// protected가 애매한데... protected도 안에서는 사용이 가능함. 밖에서는 못쓴다. 인스턴스에서는 못 써 (new C().b) 
// 그럼 private과의 차이가 뭐냐! 상속 받았을 떄 쓸 수 있냐 없냐가 구별이 돼
// B의 속성 a는 private이라서 접근 할 수 없고, protected는 상속한 애들까지는 접근할 수 있다.
// 그래서 C는 B를 상속받았기 때문에 private은 못쓰지만, 부모의 protected까지는 쓸 수 있음.
// 대신에 인스턴스에서는 private protected 둘 다 못쓴다. ex) new C().a, new C().b 

// *인스턴스는 new C()이렇게 해서 실제 객체로 만들어 낸 애가 인스턴스임.

// ---------- public ---- protected ---- private --------
// 클래스내부      O             O             O
// 인스턴스         O                     X                     X
// 상속클래스      O                     O                     X

// 문제는 JS로 변환하면 전부 다 사라짐. 그래서 JS가 된 이후에는 private protected 이런 거가 없는거다. 그냥 TS 자체가 타입검사 할 때만, 이렇게 부여를 해주는 거기 때문에 실제 JS 코드로 가서는 그런 게 사라져버림. 그리고 private readonly a: string = '123'이런식으로 복합적으로 섞어서 쓸 수도 있음.

// 인터페이스는 JS로 변환하면서 사라져버림 그래서 JS에서는 인터페이스에 있는 거를 가져다 쓸 수 없음. 왜냐면 인터페이스는 애초에 JS에 존재하는 개념이 아니기 떄문. 근데 클래스는 JS에서도 계속 남아있기 떄문에 클래스 내부의 것을 가져다 쓸 수 있음.
// 그래서 클래스를 쓰냐 인터페이스를 쓰냐는 실제 JS에서도 남아있어야 한다면 무조건 클래스 JS에서는 사라져도 되고 추상에 더 의존하는 그런 코드를 만들고 싶다면 인터페이스를 쓰면 돼
// 참고로 클래스도 추상클래스가 가능함(abstract).

// abstract class B {
//   private a: string = '123'
//   protected b: string = 'world'
//   public c: string =  'wow'  

//   abstract method() {
//     console.log(this.a) // 이렇게 안에서 사용 가능.
//     console.log(this.b) // protected
//     console.log(this.c) // 얘는 안에서나 밖에서나 가능.(public)
//   }
// }

// class C extends B {
//     method() {
//       console.log(this.a) 
//       console.log(this.b) 
//       console.log(this.c) 
//   }
// }
// new C().a;
// new C().b;
// new C().c;

// 클래스를 대충 모양만 미리 만들어놓은 거다. 그리고 실제 구현은 class C extends B{...} 여기서 한 거다. 실제 구현은 여기서 하되, abstract class B{...}여기서 가져다 쓰는 거다.
// 인터페이스가 추상적 개념이고 클래스가 실제로 추상적 개념을 구현한 거라고 했는데 인터페이스를 잘 안 쓰는 이유는 클래스도 추상 클래스가 있다. 클래스에 추상성을 부여한 추상클래스가 있기 때문에, 그래서 (제로초)님은 웬만하면 다 클래스로 쓰고 필요하면 abstract class를 쓰지 interface를 implements하는 경우는 잘 없다.

// 추상클래스도 메서드를 가지고 있을 수 있음. 추상클래스라고 무조건 추상적인 것만 가지고 있는 게 아니라, 실제적인 메서드도 갖고 있을 수 있다.

// abstract class B {
//   private readonly a: string = '123'
//   b: string = 'world'
//   c: string =  'wow'  

//   abstract method(): void;
//     method2(){
//       return '3';
//     }
// }

// class C extends B {
//    method() {
//      console.log(this.a)
//      console.log(this.b)
//      console.log(this.c) // 이렇게 구현 해줘야 함. --2
//    }
// }

// 다만 무조건 직접 구현을 해줘야 한다. 비추상 클래스 'C'는 'B'클래스에서 상속된 추상 멤버 'method'를 구현하지 않습니다. 경고가 뜸. 2. abstract로 되어있는 것은 반드시 상속 받았을 때 구현 해줘야 한다.