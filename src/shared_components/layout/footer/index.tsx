import type { FC } from "react";
import { StyledFooter } from "../styles";
import type { FooterProps } from "../types";

const Footer: FC<FooterProps> = (props) => {

    const { show = false } = props;

    return show && <StyledFooter>Footer</StyledFooter>;

};

export default Footer;