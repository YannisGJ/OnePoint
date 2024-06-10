import Image from "next/image";
import steamimg from "@/app/_images/Steamsplash.svg";
import epicimg from "@/app/_images/Epicsplash.svg";
import eaimg from "@/app/_images/EAsplash.svg";
export default function GameSelection() {
    return (
        <>
            <article className="w-2/3 -skew-x-12 -translate-x-1/3 rounded-lg z-10">
                <Image
                    src={steamimg}
                    alt=""
                    className="w-full h-full bg-steamSplash object-cover object-left"
                />
            </article>
            <article className="w-screen h-screen rounded-lg z-0 absolute">
                <Image
                    src={eaimg}
                    alt=""
                    className="w-full h-full bg-eaSplash bg-cover bg-center"
                />
            </article>
            <article className="w-2/3 -skew-x-12 translate-x-1/3 rounded-lg z-10">
                <Image
                    src={epicimg}
                    alt=""
                    className="w-full h-full bg-epicSplash object-cover bg-right"
                />
            </article>
        </>
    );
}
