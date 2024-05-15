import Logo from "./headercontents/logo";
import Image from "next/image";
import userimg from "@/app/_images/Chokbar.jpg";

export default function Header() {
    return (
        <section className="bg-stone-900 w-full h-20 flex items-center justify-between drop-shadow-md border-bottom-gradient">
            <div className="ml-10">
                <Logo />
            </div>
            <div className="">
                <input
                    className="rounded-full w-full h-10 bg-stone-800 text-white pl-4"
                    type="text"
                    placeholder="Search"
                />
            </div>
            <div className="flex mr-10">
                <div className="font-bold">
                    <p>SuleyLaMerdeALol</p>
                </div>
                <div className="flex justify-evenly">
                    <p>Rank</p>
                    <p>Level</p>
                </div>
                <Image
                    className="rounded-full ml-4"
                    src={userimg}
                    width={50}
                    height={50}
                    alt="Picture of the author"
                />
            </div>
        </section>
    );
}
