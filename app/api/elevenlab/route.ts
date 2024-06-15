import { ElevenLabsClient } from 'elevenlabs';

const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY,
});

export async function POST(req: Request) {
    const { input, voice } = await req.json();

    try {
        const audio = await elevenlabs.generate({
            voice: voice,
            text: input,
            model_id: 'eleven_turbo_v2',
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.8,
                style: 0.0,
                use_speaker_boost: true,
            },
        });

        return new Response(audio as any, {
            headers: { 'Content-Type': 'audio/mpeg' },
        });
    } catch (error: any) {
        console.error(error);
        return Response.json(error, { status: error.statusCode });
    }
}
