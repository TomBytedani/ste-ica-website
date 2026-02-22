import { getSettings } from "@/lib/settings";
import { ContactClient } from "./ContactClient";

export async function Contact() {
    const settings = await getSettings();
    return (
        <ContactClient
            contact={settings.contact}
            studio={settings.studio}
        />
    );
}
