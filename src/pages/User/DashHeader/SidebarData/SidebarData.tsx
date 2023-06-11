import { ReactComponent as Home } from "../../assets/images/home.svg";
import { ReactComponent as Launch } from "../../assets/images/launch.svg";
import { ReactComponent as Token } from "../../assets/images/token.svg";
import { ReactComponent as Balloon } from "../../assets/images/air.svg";
import { ReactComponent as List } from "../../assets/images/list.svg";
import { ReactComponent as Up } from "../../assets/images/up.svg";
import { ReactComponent as Down } from "../../assets/images/down.svg";

export interface SidebarTypes {
    id: number;
    image: any;
    label: string;
    path?: string;
    iconOpened?: any;
    iconClosed?: any;
    children?: ChildLocation[];
}

export interface ChildLocation {
    id: number;
    value: string;
    label: string;
    path?: string;
}

const options: SidebarTypes[] = [
    {
        id: 1,
        image: <Home />,
        label: "Home",
        path: "/",
    },
    {
        id: 2,
        image: <Token />,
        label: "Create Token",
        path: "/createToken",
    },
    {
        id: 3,
        image: <Launch />,
        label: "Launchpads",
        iconOpened: <Up />,
        iconClosed: <Down />,
        children: [
            { id: 0, value: "Create Launchpad", label: "Create Launchpad", path: "/Launchpad/CreateLaunchpad" },
            { id: 1, value: "Launchpad List", label: "Launchpad List", path: "/Launchpad/Launchpadlist" },
        ],
    },
    {
        id: 4,
        image: <Balloon />,
        label: "Gumdrop",
        path: "/gumdrop",
    },
    {
        id: 5,
        image: <List />,
        label: "Claim List",
        path: "/claimlist",
    },
];

export default options;
