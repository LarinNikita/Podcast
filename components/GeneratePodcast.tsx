'use client';

import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { useMutation } from 'convex/react';
import { v4 as uuidv4 } from 'uuid';

import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { GeneratePodcastProps } from '@/types';
import { api } from '@/convex/_generated/api';

import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const useGeneratePodcast = ({
    setAudio,
    voiceType,
    voicePrompt,
    setAudioStorageId,
}: GeneratePodcastProps) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();

    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const { startUpload } = useUploadFiles(generateUploadUrl);

    const getAudioUrl = useMutation(api.podcasts.getUrl);

    const generatePodcast = async () => {
        setIsGenerating(true);
        setAudio('');

        if (!voicePrompt) {
            toast({
                title: 'Please provide a voiceType to generate a podcast',
            });
            return setIsGenerating(false);
        }

        try {
            const response = await fetch('/api/elevenlab', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input: voicePrompt,
                    voice: voiceType,
                }),
            });

            const blob = await response.blob();

            const fileName = `podcast-${uuidv4()}.mp3`;

            const file = new File([blob], fileName, { type: 'audio/mpeg' });

            const uploaded = await startUpload([file]);

            const storageId = (uploaded[0].response as any).storageId;

            setAudioStorageId(storageId);

            const audioUrl = await getAudioUrl({ storageId });

            setAudio(audioUrl!);

            setIsGenerating(false);

            toast({
                title: 'Podcast generated successfully',
            });
        } catch (error) {
            console.log('Error generating podcast', error);
            toast({
                title: 'Error creating a podcast',
                variant: 'destructive',
            });
            setIsGenerating(false);
        }
    };

    return { isGenerating, generatePodcast };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
    const { isGenerating, generatePodcast } = useGeneratePodcast(props);

    return (
        <div>
            <div className="flex flex-col gap-2.5">
                <Label className="text-16 font-bold text-white-1">
                    AI Prompt to generate Podcast
                </Label>
                <Textarea
                    className="input-class font-light focus-visible:ring-orange-1 focus-visible:ring-offset-0"
                    placeholder="Provide text to generate audio"
                    rows={5}
                    value={props.voicePrompt}
                    onChange={e => props.setVoicePrompt(e.target.value)}
                />
            </div>
            <div className="mt-5 w-full max-w-[200px]">
                <Button
                    type="submit"
                    className="text-16 bg-orange-1 py-4 font-bold text-white-1"
                    onClick={generatePodcast}
                >
                    {isGenerating ? (
                        <>
                            Generating
                            <Loader size={20} className="ml-2 animate-spin" />
                        </>
                    ) : (
                        'Generate'
                    )}
                </Button>
            </div>
            {props.audio && (
                <audio
                    src={props.audio}
                    controls
                    autoPlay
                    className="mt-5 w-full"
                    onLoadedMetadata={e =>
                        props.setAudioDuration(e.currentTarget.duration)
                    }
                />
            )}
        </div>
    );
};

export default GeneratePodcast;
