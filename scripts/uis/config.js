import { ActionFormData } from "@minecraft/server-ui";
import chatCustomizationUI from "./chatCustomizationUI";
import creditsUI from "./creditsUI";
import chestGUIEditorRoot from "./chestGUIEditorRoot";
var OptionTypes;
(function (OptionTypes) {
    OptionTypes[OptionTypes["Dropdown"] = 0] = "Dropdown";
    OptionTypes[OptionTypes["Text"] = 1] = "Text";
    OptionTypes[OptionTypes["Toggle"] = 2] = "Toggle";
    OptionTypes[OptionTypes["Slider"] = 3] = "Slider";
})(OptionTypes || (OptionTypes = {}));
let options = [
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
        ui: chestGUIEditorRoot
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
        ui: {
            name: "A",
            open() { }
        }
    },
    {
        name: "§cCredits\n§7See people who helped",
        icon: "textures/minidevs/icon",
        key: "Credits",
        ui: creditsUI
    },
];
export default {
    name: "AzaleaRewrite0.1/Config",
    open(player) {
        let actionForm = new ActionFormData();
        let selections = [];
        for (const option of options) {
            selections.push(option);
            actionForm.button(option.name, option.icon ? option.icon : undefined);
        }
        actionForm.show(player).then(res => {
            if (res.canceled)
                return;
            let selection = selections[res.selection];
            selection.ui.open(player);
        });
    }
};
