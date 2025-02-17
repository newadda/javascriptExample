"use client";

/**
 * Object의 변경을 아는 방법법
 */

import { useState } from "react";


const handler = {
    set(target, prop, value) {
        console.log(`${prop} 속성이 ${value}로 변경됨`);
        target[prop] = value; // 실제 값 저장
        return true; // 반드시 `true`를 반환해야 정상 작동
    }
};

const obj = new Proxy({}, handler);



export default function Page(){
    const [data, setData] = useState({name:"test",count:0,nest:{
        name:"Nest Name",
        count:0
    }}); // 초기값 0 설정

    function setA(object){
        setData((prev)=>{return ({...data})})
    }


    return (
        <div>
            <p>count : {data.count}</p>
            <p>nest.count : {data.nest.count}</p>
        <button onClick={(e)=>{
            //</div>setData((prev)=>{data.count++  ;return ({...data})})
            setA(data.count++)
            setA(data.nest.count++)
        }}>버튼</button>
        </div>
      );

}