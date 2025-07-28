"use client";

import { useRef } from "react";
import type { ReactNode, FC } from "react";

import Footer from "./footer";
import Header from "./header";
import { StyledContent } from "./styles";
import type { ContentProps, HeaderProps, FooterProps } from "./types";
import AppSidebar from "../app-sidebar"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

interface LayoutProps {
    children: ReactNode;
    contentProps?: ContentProps;
    headerProps?: HeaderProps;
    footerProps?: FooterProps;
    brand?: string;
    master?: string;
    hideSidebar?: boolean;
}

export const Layout: FC<LayoutProps> = (props) => {
    const { children, contentProps, headerProps, footerProps, brand, hideSidebar = false } = props;


    const headerRef = useRef<HTMLElement>(null);

    return (
        <div className="[--header-height:calc(theme(spacing.14))]">
            <SidebarProvider className="flex flex-col">
                <Header {...headerProps} headerRef={headerRef} hideSidebar={hideSidebar} />
                <div className="flex flex-1 mt-[theme(spacing.14)]">
                    <AppSidebar />
                    <SidebarInset>
                        <Content {...contentProps} brand={brand}>
                            {children}
                        </Content>
                        <Footer {...footerProps} />
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    );
};

const Content: FC<ContentProps> = ({
    children,
    ...props
}) => {
    return (
        <StyledContent {...props}>
            <section className={"col-span-full"}>
                {children}
            </section>
        </StyledContent>
    );
};