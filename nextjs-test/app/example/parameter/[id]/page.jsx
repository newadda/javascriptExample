"use client";



import React, {useState} from "react";
import { useParams,useSearchParams  } from "next/navigation";


//import { BrowserRouter as Router, Route, Routes,useParams as reactUseParams, useSearchParams as reactUseSearchParams } from "react-router-dom"; //react-router-dom 패키지 설치해야함함


export default function ProductPage() {
    
    ////// NextJS
    const { id } = useParams(); // [id]/page.tsx (Next.js App Router 방식) URL에서 id 값 가져오기
    
    ///// ?q1=test&q2=test2 , query string에서 파라미터 가져옴
    // Next.js (App Router)
    const searchParams = useSearchParams();
    const q1 = searchParams.get("q1");
    const q2 = searchParams.get("q2");


    ////// react-router-dom
    /*
    const { id } = useParams(); // URL에서 id 값 가져오기

    const [searchParams] = useSearchParams();
    const q1 = searchParams.get("q1");
    const q2 = searchParams.get("q2");
    */

    return (
      <div>
        <h1>ID: {id}</h1>
        <h1>q1: {q1}</h1>
        <h1>q2: {q2}</h1>
      </div>
    );
  }