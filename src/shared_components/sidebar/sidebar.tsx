import { Link, useLocation } from "react-router-dom";
import { cardList } from "@/components/home/Home";
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarHeader,
    SidebarSeparator
} from "@/components/ui/sidebar";

const AppSidebar = () => {
    const location = useLocation();
    return (
        <Sidebar>
            <SidebarHeader>
                <span className="text-lg font-bold">Sections</span>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <SidebarMenu>
                    {cardList.map((card) => (
                        <SidebarMenuItem key={card.route}>
                            <Link to={card.route} style={{ textDecoration: "none" }}>
                                <SidebarMenuButton isActive={location.pathname === card.route}>
                                    {card.name}
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
