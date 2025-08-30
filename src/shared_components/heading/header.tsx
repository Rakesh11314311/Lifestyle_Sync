import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
    function toggleSidebar() {
        const current = localStorage.getItem("sidebarOpen") === "true";
        localStorage.setItem("sidebarOpen", String(!current));
    }

    return (
        <header className="w-full bg-blue-500 text-white p-4">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="flex-shrink-0" onClick={toggleSidebar} />
                <h1 className="flex-1 truncate">Header</h1>
            </div>
        </header>
    );
}
