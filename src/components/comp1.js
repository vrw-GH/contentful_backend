import React from "react";

const DefModule = (props)=>{
   //functions..
   return (
      <div>hello {props.text}
         <button>test</button>
      </div>      
      )
}

const OtherModule = (props) => {
   //functions....
   return <div>{props.other}</div>
}

// class ?? extends React.module{
   // construct(props) {
   //    super(props);
   //    this.state = { data: value, data2: val2 };
   // }
   // methods = () => {
   //    ;
   // }
// }

//export default (props) => <button>{props.text}</button>;
export default DefModule;