import {Header} from "./layouts/Header";
import {CategoryPills} from "./components/CategoryPills";
import {categories, videos} from "./data/home";
import {useState} from "react";
import {VideoGripItem} from "./components/VideoGripItem";
import {Sidebar} from "./layouts/Sidebar";


export default function () {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <div className="max-h-screen flex flex-col">
            <Header/>
            <div className={`grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto`}>
                <Sidebar/>
                <div className="overflow-x-hidden px-8 pt-4">
                    <div className={`sticky top-0 bg-white z-10 flex-grow-1 pb-4`}>
                        <CategoryPills categories={categories} selectedCategory={selectedCategory}
                                       onSelect={setSelectedCategory}/>
                    </div>
                    <div className={`grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]`}>
                        {
                            videos.map(video =>(
                                <VideoGripItem
                                    key={video.id}
                                    {...video}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}