import { ActionFormData, MessageFormData } from "@minecraft/server-ui";
import config from "./config";
import { chestguis } from "apis/ChestGUIMaker";
import createChestGUI from "./createChestGUI";
let root = {
    name: "AzaleaRewrite0.1/ChestGUIs/Root",
    open(player) {
        let ui = new ActionFormData();
        let buttons = [];
        ui.button("§aAdd Chest\n§7Add a Chest GUI", "textures/3d_icons/AddChest");
        buttons.push(null);
        for (const gui of chestguis.chestGUIs) {
            ui.button(`§e${gui.title}\n§7${gui.tag}`, "textures/3d_icons/Chest");
            buttons.push(gui);
        }
        ui.button("§dGet Help\n§7Get help with Chest GUI maker", "textures/3d_icons/EnderChest");
        buttons.push(null);
        ui.show(player).then(res => {
            if (res.canceled)
                return config.open(player);
            if (res.selection == 0) {
                createChestGUI.open(player);
            }
            else if (buttons[res.selection]) {
            }
            else {
                let messageForm = new MessageFormData();
                messageForm.title("Chest GUI Maker Help");
                messageForm.body("Help dialog");
                messageForm.button1("§aBack");
                messageForm.button2("§aBack");
                messageForm.show(player).then(res => {
                    root.open(player);
                });
            }
        });
    }
};
export default root;
