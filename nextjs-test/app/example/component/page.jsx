"use client";

/**
 * useImperativeHandle과 forwardRef를 조합하여 자식 컴포넌트의 함수호출
 */

import React, { forwardRef, useImperativeHandle, useState,useRef  } from "react";



const MyComponent = forwardRef((props, ref) => {
    const [count, setCount] = useState(0);
  
    useImperativeHandle(ref, () => ({
      increment: () => setCount((prev) => prev + 1),
      reset: () => setCount(0),
    }));
  
    return (
      <div>
        <p>Count: {count}</p>
      </div>
    );
  });


  export default function Page() {
    const myComponentRef = useRef(null);
  
    return (
      <div>
        <h1>Page</h1>
        <MyComponent ref={myComponentRef} />
        <div>
        <button onClick={() => myComponentRef.current?.increment()}>
          Increase Count
        </button>
        </div>
        <button onClick={() => myComponentRef.current?.reset()}>Reset</button>
      </div>
    );
  }