"use client";
import Image from 'next/image'

export default function Loading() {
  return ( 
    <div className="opener"> 
      <Image className="loadingImage" src={`/snoo-gif.gif`} alt ="Reddit logo" width="256" height="256" />
    </div> 
  );
}