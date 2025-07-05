import { Input } from "@/components/ui/input";


export default function SearchBar({ value, onChange, onKeyDown }: { value: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void }) {
    return (
        <div>
            <Input type="text" placeholder="Search" className="w-full h-full bg-white mt-10 p-4 mb-0 rounded-lg" value={value} onChange={onChange} onKeyDown={onKeyDown} />
            {/* <Button variant="secondary" size="icon" className="size-8 ml-2 mt-10">
                <ChevronRightIcon />
            </Button> */}
        </div>
    );
}