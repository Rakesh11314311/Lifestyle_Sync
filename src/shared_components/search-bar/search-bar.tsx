import { Input } from "@/components/ui/input";
import { ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function SearchBar({ onKeyDown }: { onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void }) {
    return (
        <div>
            <Input type="text" placeholder="Search" className="w-full h-full bg-white mt-10 p-4 mb-0 rounded-lg" onKeyDown={onKeyDown} />
            {/* <Button variant="secondary" size="icon" className="size-8 ml-2 mt-10">
                <ChevronRightIcon />
            </Button> */}
        </div>
    );
}