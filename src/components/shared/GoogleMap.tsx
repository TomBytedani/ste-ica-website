import { contactInfo } from "@/lib/constants";

export function GoogleMap() {
    const { coordinates } = contactInfo.address;

    // Using Google Maps embed URL
    const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.2!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDI4JzIzLjkiTiA5wrAxMiczMi41IkU!5e0!3m2!1sit!2sit!4v1234567890`;

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="aspect-video relative">
                <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mappa dello studio"
                    className="absolute inset-0"
                />
            </div>
        </div>
    );
}
