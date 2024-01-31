"use client";
import Image from 'next/image'

export default function Header() {
  return (
    <div className="header">
      <Image src={`/catjam.gif`} alt="Reddit logo" width="256" height="256" />
      <h1>r/memes</h1>

      <style jsx>{`
        .header {
          display: block;
          justify-content: center;
          align-items: center;
          height: 50vh;
          text-align: center;
        }

        .header h1 {
          display: block;
          font-size: 3rem;
          color: rgb(93, 136, 222);
          margin: 35px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}
