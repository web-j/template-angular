import { RouterSub } from './router-sub.interface';

export interface RouterInfo {
    path?: string;
    icon?: string;
    title?: string;
    role?: Array<string>;
    type?: string;
    submenu?: RouterSub[];
    open?: Boolean;
    tooltip?: string;
}
