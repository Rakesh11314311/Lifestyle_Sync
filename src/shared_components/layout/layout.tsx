import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import Header from "../heading/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-screen overflow-hidden">
                <AppSidebar />

                {/* Content Area */}
                <div className="flex flex-col flex-1 min-w-0">
                    <Header />

                    <div className="flex-1 overflow-auto bg-[#81b9d7]">
                        <main className="flex flex-1 items-center justify-center overflow-y-auto bg-[#81b9d7]">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
