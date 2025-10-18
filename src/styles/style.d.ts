import "styled-components";
import { I_Theme } from "./theme";

declare module "styled-components" {
    export interface DefaultTheme {
        ItemColor: string;
        ItemBoxColor: string;
        BoxBorderColor: string;
        TextColor: string;
        bgColor: string;
        AddBtnColor: string;
        ThemeBtnColor: string;

        //Form' Color
        FormBgColor: string;
        FormTitleTextColor: string;
        FormBoxColor;
        FormBtnColor;
    }
}