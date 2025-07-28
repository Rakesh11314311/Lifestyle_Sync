import type { FC } from "react";
import { SidebarIcon } from "lucide-react";
import { StyledHeader } from "../styles";
import type { HeaderProps } from "../types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";

const Header: FC<HeaderProps> = (props) => {
    const { headerRef, show = true, hideSidebar = false } = props;
    const { toggleSidebar } = useSidebar();

    return (
        show && (
            <StyledHeader ref={headerRef}>
                <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
                    {!hideSidebar && (
                        <>
                            <Button
                                className="h-8 w-8"
                                variant="ghost"
                                size="icon"
                                onClick={toggleSidebar}
                            >
                                <SidebarIcon />
                            </Button>
                            <Separator orientation="vertical" className="mr-2 h-4" />
                        </>
                    )}

                    <div className={"px-2"}>
                        Image
                    </div >
                    <div className="ml-auto flex items-center space-x-4">
                        User Profile
                    </div>
                </div >
            </StyledHeader >
        )
    );
};

export default Header;