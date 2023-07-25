export default function checkIfImageAvaliable(thumbnail) {
    if (typeof (thumbnail) === "string") {
        return thumbnail.match("image_not_available") || thumbnail.match("4c002e0305708") ? { objectFit: "contain" } : null
    }
    return null;
}