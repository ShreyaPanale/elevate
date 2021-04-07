import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
const words = ["elevate."];
const styles = makeStyles(()=>({
    root:{
        
        backgroundColor:"#EF757D",
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center",
        display:"flex",
        width:"100vw",
        height:"100vh"
    },
    text2:{
        color:"white",
        verticalAlign:"center",
        fontFamily:"Poppins",
        fontSize:150,
    }
}))
export default function Loader() {
  const classes = styles()
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);
  // typeWriter
  useEffect(() => {
    if (index === words.length) return;

    if ( subIndex === words[index].length + 1 && 
        index !== words.length - 1 && !reverse ) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 :
                150, parseInt(Math.random() * 350)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // blinker
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <>
    <div className={classes.root}>
      <h1 className={classes.text2}>
        {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
      </h1>
    </div>
    </>
  );
}