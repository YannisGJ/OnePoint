import ClockIcon from "@/app/_images/clock-05-stroke-rounded";
import CartIcon from "@/app/_images/shopping-cart-01-stroke-rounded";
import Separator from "@/app/_images/solid-line-01-stroke-rounded";
import Link from "next/link";

export default function GameCard({
    game_header_image,
    hours,
    game_shop_url,
    date,
}: GameCardProps) {
    return (
        <div
            className="bg-no-repeat bg-cover bg-center h-48 w-full rounded-lg content-end relative"
            style={{ backgroundImage: `url(${game_header_image})` }}
        >
            <div className="absolute -left-4 -bottom-4  w-fit h-fit text bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] ">
                <div className="flex p-1">
                    <div className="group inline-flex hover:w-fit overflow-hidden">
                        <div>
                            <ClockIcon />
                        </div>
                        <div className="hidden group-hover:block ml-3 mr-3">
                            <p className="text-nowrap text-white hiden self-center w-1/2 text-sm">
                                {hours}
                            </p>
                        </div>
                    </div>
                    <Separator className="rotate-90 self-center " />
                    <Link
                        href={game_shop_url}
                        className="inline-flex group hover:w-fit overflow-hidden"
                    >
                        <div>
                            <CartIcon />
                        </div>
                        <div className="hidden group-hover:block ml-3 mr-3">
                            <p className="text-white text-nowrap hiden self-center w-1/2 text-sm">
                                buy the game
                            </p>
                        </div>
                    </Link>
                </div>
                {/* <div className="h-5/6 w-1/2 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] ml-3">
                <h2>{name}</h2>
                <p>Note: {note}</p>
                <p>Date: {date}</p>
            </div> */}
            </div>
        </div>
    );
}
