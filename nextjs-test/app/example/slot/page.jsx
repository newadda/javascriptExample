"use client";

import React, { useState } from "react";

const Card = (props)=>{
    let header, footer, body = [];

    const [headerData, setHeaderData] = useState({title:"Header Title Text",contents:"Header 내용"});
    const [footerData, setFooterData] = useState({footName:"Foot Text",contents:"Foot 내용"});

    React.Children.forEach(props.children, (child) => {
        if (!React.isValidElement(child)) return;

        if (child.type === Card.Header) {
        header = React.cloneElement(child, { slotData: headerData });
        } else if (child.type === Card.Footer) {
        footer = React.cloneElement(child, { slotData: footerData });
        } else {
        body.push(child);
        }
    });
    return (
        <div className="border p-4 rounded-lg shadow-md">
          {header && <div className="border-b pb-2 mb-2">{header}</div>}
          <div>{body}</div>
          {footer && <div className="border-t pt-2 mt-2">{footer}</div>}
        </div>
      );
}

Card.Header = ({ children, slotData }) => <>{children(slotData)} {slotData && <span className="text-gray-500">({slotData.title})</span>}</>;
Card.Footer = ({ children, slotData }) => <>{children(slotData)} {slotData && <span className="text-sm text-gray-500">- {slotData.footName}</span>}</>;



export default function Page(){

    return (
        <div>
        <Card>
          <Card.Header>
           {(data)=> (<h2>📌 공지사항({data.contents})</h2>)}
          </Card.Header>
          
          <p>이곳은 Body</p>
          
          <Card.Footer>
            {(data)=>   (<button className="bg-blue-500 text-white p-2 rounded">확인</button>) }
          </Card.Footer>
        </Card>
        <button onClick={(e)=>{

        }}></button>
        </div>
      );

}