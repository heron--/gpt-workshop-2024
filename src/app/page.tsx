import Chat from "./chat/page";
import Image from "next/image";
import martini from "./assets/martini.png";

export default function Home() {
  return (
    <div className="page-container">
      <h1>
        Chat G&T
        <Image src={martini} alt="not a gin and tonic" width="50" height="80" />
      </h1>
      <p>What's to drink?</p>
      <Chat></Chat>
    </div>
  );
}
