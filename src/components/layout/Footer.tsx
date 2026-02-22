import { getSettings } from "@/lib/settings";
import { FooterClient } from "./FooterClient";

export async function Footer() {
    const settings = await getSettings();
    return (
        <FooterClient
            contact={settings.contact}
            studio={settings.studio}
        />
    );
}
