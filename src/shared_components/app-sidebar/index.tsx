import type { ComponentProps } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    DollarSign,
    Film,
    Heart,
    Home
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

type AppSidebarProps = ComponentProps<typeof Sidebar>;

interface MenuItem {
    name: string;
    route: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
}

const AppSidebar = ({ ...props }: AppSidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems: MenuItem[] = [
        {
            name: "Home",
            route: "/",
            icon: Home,
            description: "Main Dashboard"
        },
        {
            name: "Finance",
            route: "/finance",
            icon: DollarSign,
            description: "Track your monthly Financial Expenses"
        },
        {
            name: "Entertainment",
            route: "/entertainment",
            icon: Film,
            description: "Weekend Entertainment Recommendations"
        },
        {
            name: "Health",
            route: "/health",
            icon: Heart,
            description: "Track your daily Intake calories"
        }
    ];

    const isActiveRoute = (route: string) => {
        if (route === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(route);
    };

    const handleNavigation = (route: string) => {
        navigate(route);
    };

    return (
        <Sidebar
            className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
            {...props}
        >
            <Separator orientation="vertical" className="mr-2 h-4" />
            <SidebarContent>
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel>Lifestyle</SidebarGroupLabel>
                    <SidebarMenu className={"gap-2"}>
                        {menuItems.map((item) => (
                            <SidebarMenuItem className={"h-auto"} key={item.name}>
                                <SidebarMenuButton
                                    asChild
                                    className={
                                        "py-2 h-auto rounded-none data-[active=true]:text-[#271FE0] data-[active=true]:bg-[#F0F0FF] data-[active=true]:border-r-2 data-[active=true]:border-r-[#4945FF]"
                                    }
                                    isActive={isActiveRoute(item.route)}
                                >
                                    <button
                                        onClick={() => handleNavigation(item.route)}
                                        className="w-full text-left flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <div className="flex flex-col">
                                            <span className="text-base font-medium">{item.name}</span>
                                            <span className="text-sm text-gray-500">{item.description}</span>
                                        </div>
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
};

export default AppSidebar;