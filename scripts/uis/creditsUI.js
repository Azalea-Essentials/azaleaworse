import { ActionFormData } from "@minecraft/server-ui";
import config from "./config";
import { playerManager } from "apis/PlayerManager";
export default {
    name: "AzaleaRewrite0.1/Config/Chat",
    open(player) {
        let actionForm = new ActionFormData();
        actionForm.title("§bAzalea Credits");
        actionForm.button("§bTrash9240\n§7Main Developer", "textures/minidevs/trash");
        actionForm.button("§9Asteroid3946\n§7OwO", "textures/minidevs/Astroidboi");
        actionForm.button("§aOft5shotzz\n§7Crates Developer", "textures/minidevs/Otf5shotzz");
        actionForm.button("§eEgg7869\n§7Texture Designer", "textures/minidevs/Egg7869");
        actionForm.button("§cProtogen1164\n§7Bugtester", "textures/minidevs/Protogen1164");
        actionForm.button("§5EnderPearl59\n§7Bugtester", "textures/minidevs/EnderPearl59");
        actionForm.button("§eLegoTheArlo\n§7Bugtester", "textures/minidevs/LegoTheArlo");
        // actionForm.button("§dZJawa\n§7Your average 40k furry man", "textures/minidevs/zjawa")
        if (playerManager.isFurry(player.name))
            actionForm.button("§eAverage Azalea User\n§7UwU", "textures/minidevs/AverageAzaleaUser");
        actionForm.show(player).then(res => {
            config.open(player);
        });
    }
};
