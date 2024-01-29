import logo from '../assets/Logo.png';
import {ArrowLeft, Bell, Menu, Mic, Search, Upload, User} from "lucide-react";
import {Button} from "../components/Button";
import {useState} from "react";

export function Header() {
    const [showSearch, setShowSearch] = useState(false);
    return (
        <div className={`flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4`}>
            <div
                    className={`gap-4 items-center flex-shrink-0 flex  ${showSearch ? 'hidden' : 'flex'}`}
            >
                <Button variant="ghost" size="icon">
                    <Menu/>
                </Button>
                <a href="/">
                    <img src={logo} className="h-6" alt={``}/>
                </a>
            </div>
            <form className={` gap-4 justify-center flex-grow ${showSearch ? 'flex' : 'hidden md:flex'}`}>
                {showSearch &&
                    <Button onClick={() => setShowSearch(false)} size="icon" type={`button`} variant={`ghost`}
                            className={`flex-shrink-0 rounded-r-full`}>
                        <ArrowLeft/>
                    </Button>
                }
                <div className={`flex flex-grow max-w-[600px]`}>
                    <input
                        type="search"
                        placeholder="Search"
                        className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary px-4 py-1 text-lg
                            w-full focus:border-blue-500 outline-none"
                    />
                    <Button
                        className={`py-2 px-4 rounded-r-full border border-secondary-border border-1-0 flex-shrink-0`}>
                        <Search/>
                    </Button>
                </div>
                <Button size="icon" type={`button`} className={`flex-shrink-0 rounded-r-full`}>
                    <Mic/>
                </Button>
            </form>

            <div className={`flex flex-shrink-0 md:gap-2 ${showSearch ? 'hidden' : 'flex'}`}>
                <Button onClick={() => setShowSearch(true)} size={`icon`} variant={`ghost`} className={`md:hidden`}>
                    <Search/>
                </Button>
                <Button size={`icon`} variant={`ghost`} className={`md:hidden`}>
                    <Mic/>
                </Button>
                <Button size={`icon`} variant={`ghost`}>
                    <Upload/>
                </Button>
                <Button size={`icon`} variant={`ghost`}>
                    <Bell/>
                </Button>
                <Button size={`icon`} variant={`ghost`}>
                    <User/>
                </Button>
            </div>
        </div>
    )
        ;
}