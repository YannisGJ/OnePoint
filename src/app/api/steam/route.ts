import axios from "axios";
import { parseStringPromise } from "xml2js";

export async function GET(req: any, res: any) {
    const { steamId } = req.query;

    if (!steamId) {
        return res.status(400).json({ error: "Steam ID is required" });
    }

    try {
        const response = await axios.get(
            `https://steamcommunity.com/prfiles/${steamId}?xml=1`
        );

        // Convertir le XML en JSON
        const jsonResult = await parseStringPromise(response.data, {
            mergeAttrs: true,
        });

        // Retourner le JSON
        res.status(200).json(jsonResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch or convert Steam profile",
        });
    }
}
