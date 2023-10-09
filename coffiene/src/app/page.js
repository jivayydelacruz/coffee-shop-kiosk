import Image from "next/image";
import background from "@/assets/coffee-background.jpg";
import logo from "@/assets/logo.png";

export default function Home() {
  return (
    <main
      className={
        "flex min-h-screen flex-col items-center justify-between pt-10"
      }
      style={{ background: `url(${background.src}) center / cover` }}
    >
      <div className={"max-w-7xl w-full top-0 flex flex-col gap-30"}>
        <nav className={"w-full flex lg:justify-start justify-center"}>
          <Image src={logo} alt={"logo"} width={300} draggable={false} />
        </nav>
        <div className={"flex flex-col gap-5 lg:p-0 p-5"}>
          <h1 className={"md:text-6xl md:max-w-lg font-bold max-w-xs text-2xl"}>
            Start your day with a coffee!
          </h1>
          <a href={"/menu"}>
            <button
              className={
                "bg-[#b68c4d] p-3 rounded-full md:text-lg font-bold text-base"
              }
            >
              Order Now!
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
