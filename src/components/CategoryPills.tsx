import {Button} from "./Button";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useEffect, useRef, useState} from "react";

type CategoryPillsProps = {
    categories: string[]
    selectedCategory: string
    onSelect: (category: string) => void
};

const TRANSLATE_AMOUNT = 200;

export function CategoryPills({categories, selectedCategory, onSelect}: CategoryPillsProps) {
    const [translateX, setTranslateX] = useState(0);
    const [isLeftVisible, setIsLeftVisible] = useState(false);
    const [isRightVisible, setIsRightVisible] = useState(true);
    const refContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refContainer.current === null) {
            return;
        }

        const observer = new ResizeObserver(entries => {
            const container = entries[0]?.target;
            if(container === null) {
                return;
            }

            setIsLeftVisible(translateX > 0);
            setIsRightVisible(translateX < container.scrollWidth - container.clientWidth);
        });

        observer.observe(refContainer.current);

        return () => {
            observer.disconnect();
        }
    }, [categories, translateX]);

    return (
        <div ref={refContainer} className="overflow-x-hidden relative">
            <div
                className={`flex whitespace-nowrap gap-3 transition-transform w-[max-content]`}
                style={{transform: `translateX(-${translateX}px)`}}>
                {categories.map((category) => (
                    <Button
                        key={category}
                        onClick={() => onSelect(category)}
                        variant={`${category === selectedCategory ? 'dark' : 'default'}`}
                        className={`py-1 px-3 rounded-lg whitespace-nowrap`}
                    >
                        {category}
                    </Button>
                ))}
            </div>
            {isLeftVisible && <div
                className={`absolute top-1/2 left-0 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full`}>
                <Button
                    onClick={() => {
                        setTranslateX(translateX => {
                            const newTranslateX = translateX - TRANSLATE_AMOUNT;
                            if (newTranslateX < 0) {
                                return 0;
                            }
                            return newTranslateX;
                        })
                    }}
                    variant={`ghost`} size={`icon`}
                    className={`h-full aspect-square w-auto p-1.5`}>
                    <ChevronLeft/>
                </Button>
            </div>
            }
            {isRightVisible && <div
                className={`absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end`}>
                <Button
                    onClick={() => {
                        setTranslateX(translateX => {
                            if (refContainer.current == null) {
                                return translateX;
                            }
                            const newTranslateX = translateX + TRANSLATE_AMOUNT;
                            const edge = refContainer.current.scrollWidth;
                            const width = refContainer.current.clientWidth;
                            if (newTranslateX + width >= edge) {
                                return edge - width;
                            }
                            return newTranslateX;
                        })
                    }}
                    variant={`ghost`} size={`icon`}
                    className={`h-full aspect-square w-auto p-1.5`}>
                    <ChevronRight/>
                </Button>
            </div>
            }
        </div>
    );
}