import { ActionFormData } from "@minecraft/server-ui";
import { Player } from "@minecraft/server"
import chatCustomizationUI from "./chatCustomizationUI";
import creditsUI from "./creditsUI";
// import settingsUI from "./settingsUI";
import chestGUIEditorRoot from "./chestGUIEditorRoot";
import permissionsRoot from "./permissions/permissionsRoot";
import { permissions } from "apis/Permissions";
enum OptionTypes {
    Dropdown = 0,
    Text = 1,
    Toggle = 2,
    Slider = 3,
}
type DropdownOptions = {
    key: string;
    display: string;
}
type OptionData = {
    type: OptionTypes;
    options?: DropdownOptions[];
    key: string;
    label: string;
    max?: number;
    min?: number;
    default?: number|string|boolean;
    placeholder?: string
}
type UI = {
    name: string;
    open: Function;
}
type OptionsObject = {
    name: string;
    icon: string;
    key: string;
    ui: UI;
    enabled?: Function;
    // options: OptionData[];
}
let options:OptionsObject[] = [
    {
        name: "§aChat\n§7Chat Customization",
        icon: "textures/3d_icons/chat",
        key: "Chat",
        ui: chatCustomizationUI
    },
    {
        name: "§6Chest GUIs \uE331\n§7Manage Chest GUIs",
        icon: "textures/3d_icons/Chest",
        key: "Chest",
        ui: chestGUIEditorRoot,
        enabled(player: Player) {
            return permissions.hasPermission(player, "chestguis.edit")
        }
    },
    // {
    //     name: "§cSettings\n§7Change and config stuff",
    //     icon: "textures/minidevs/icon",
    //     key: "Settings",
    //     ui: settingui
    // },
    {
        name: "§aPermissions\n§7Manage permissions",
        icon: "textures/3d_icons/Permissions",
        key: "Permissions",
        ui: permissionsRoot
    },
    // {
    //     name: "§6Settings\n§7Config and edit settings ingame!",
    //     icon: "textures/3d_icons/Chest",
    //     key: "Settings",
    //     ui: settingsUi
    // },
    {
        name: "§cCredits\n§7See people who helped",
        icon: "textures/minidevs/icon",
        key: "Credits",
        ui: creditsUI
    },

]
export default {
    name: "AzaleaRewrite0.1/Config",
    open(player: Player) {
        let actionForm = new ActionFormData();
        let selections = [];
        for(const option of options) {
            if(option.enabled && !option.enabled(player)) continue;
            selections.push(option);
            actionForm.button(option.name, option.icon ? option.icon : undefined);
        }
        actionForm.show(player).then(res=>{
            if(res.canceled) return;
            let selection = selections[res.selection]
            selection.ui.open(player);
        })
    }
}