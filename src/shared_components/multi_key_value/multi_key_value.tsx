import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import "./multi_key_value.css"

export default function MultiKeyValue() {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                <Label htmlFor="key">Key</Label>
                <Input id="key" placeholder="Enter key" className="max-w-[200px]" />
                <Label htmlFor="value">Value</Label>
                <Input id="value" placeholder="Enter value" className="max-w-[200px]" />
                <Button>Add</Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Key</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead className="w-[80px]" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">API_KEY</TableCell>
                            <TableCell>abc123</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon">
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">SECRET_KEY</TableCell>
                            <TableCell>xyz456</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon">
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">ENDPOINT</TableCell>
                            <TableCell>https://api.example.com</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon">
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    )
}