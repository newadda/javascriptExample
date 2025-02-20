"use client";

/**
 * 
 * npm install react-hook-form @hookform/resolvers yup
 * 
 * react-hook-form 와 yup 을 이용한 validation 검사사
 * 
 * 
 */

import { useForm ,useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("아이디를 입력하세요").min(4, "4자 이상 입력하세요"),
  email: yup.string().email("올바른 이메일 형식이 아닙니다").required("이메일을 입력하세요"),
  password: yup.string().min(6, "비밀번호는 최소 6자 이상 입력하세요").required("비밀번호를 입력하세요"),
  confirmPassword: yup
  .string()
  .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다") //yup.ref()를 통해 다른 값을 알 수 있다.
  .required("비밀번호 확인을 입력하세요"),
});



/*
 test() 를 이용해서 검증을 함수 구현 가능하다.
 test() 의 첫 파라미터는 유효성 검사 규칙의 식별자(이름)이다. errors.key.type 값이 해당 값이다.
   - 예를 들어 required("비밀번호 확인을 입력하세요")가 문제일 경우 errors.key.type=required 이다.
 context를 사용하면 context.parent 를 통해 다른 필드 값을 참조할 수 있다. 예) context.parent.password
*/
const schema2 = yup.object().shape({
    password: yup.string().required("비밀번호를 입력하세요"),
    confirmPassword: yup
      .string()
      .required("비밀번호 확인을 입력하세요")
      .test("passwords-match", "비밀번호가 일치하지 않습니다", (value, context) => {
        return value === context.parent.password;
      }),
  });






export default function SignupForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch, // const uname = watch("username") 을 통해 필드의 값을 가져올 수 있다. 입력값이 변경될 때마다 자동으로 값이 업데이트됨, 
                //   입력된 값을 UI에 반영할 때 유용 예) <p>{uname}</>
        getValues , // getValues("username") 을 통해 필드의 값을 가져올 수 있다. 이벤트 기반 내부코드에서 가져올때 사용
        trigger, /* 
                 유효성 검사를 트리거하는 함수
                 특정 유효성을 검증가능하다. tirger("특정 스키마 키키")
                 onChange={()=>tirger(schema의 키 이름)}, 키가 없을 경우 모든 schema 키를 확인한다.
                 */
        reset, // 초기값등 설정할 수 있다. 예) reset({sername: "홍길동"}) 
        control,
      } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: "홍길동", // 초기값 설정
          },
        //mode: "onChange", // form내의 input 컴포넌트의 onChange가 발생시 행한다. 입력할 때마다 자동 검증,  onChange=<form {()=>tirger(schema의 키 이름)}}> 과 같은 의미이다.
      });


      // 필드값 가져오기
    const watchUsername = watch("username"); //입력값이 변경될 때마다 즉시 반영
    const useWatchUsername = useWatch({ control, name: "username" }); // 입력값을 감지하지만 리렌더링 최적화, watch보다 성능 최적화


      
  const onSubmit = (data) => {
    console.log("입력된 데이터:", data);
  };


  return (
    <div className="p-4 max-w-md mx-auto border rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)}   className="space-y-3">
        <div>
          <label className="block font-medium">아이디</label>
          <input  {...register("username")} className="border p-2 w-full rounded-md"  />
          <p>watch : {watchUsername}</p>
          <p>useWatch : {useWatchUsername}</p>
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        
        </div>

        <div>
          <label className="block font-medium" >이메일</label>
          <input {...register("email")}  className="border p-2 w-full rounded-md" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-medium">비밀번호</label>
          <input type="password" {...register("password")} className="border p-2 w-full rounded-md" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block font-medium">비밀번호확인</label>
          <input type="password" {...register("confirmPassword")} className="border p-2 w-full rounded-md" />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded-md" >가입하기</button>
      </form>
    </div>
  );
}