import type { ReactNode, Ref } from "react";

export interface ContentProps {
    children: ReactNode;
    showLeftDrawer?: boolean;
    brand?: string;
}

export interface HeaderProps {
    headerRef: Ref<HTMLElement>;
    show?: boolean;
    hideSidebar?: boolean;
}

export interface FooterProps {
    show?: boolean;
}
