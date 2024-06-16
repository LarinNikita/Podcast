'use client';

import React from 'react';
import { useQuery } from 'convex/react';

import PodcastCard from '@/components/PodcastCard';
import { api } from '@/convex/_generated/api';

function Home() {
    const podcastData = useQuery(api.podcasts.getTrendingPodcasts);
    return (
        <div className="mt-9 flex flex-col gap-9">
            <section className="flex flex-col gap-5">
                <h1 className="text-20 font-bold text-white-1">
                    Trending Podcasts
                </h1>
                <div className="podcast_grid">
                    {podcastData?.map(
                        ({
                            _id,
                            podcastTitle,
                            podcastDescription,
                            imageUrl,
                        }) => (
                            <PodcastCard
                                key={_id}
                                imgURL={imageUrl}
                                title={podcastTitle}
                                description={podcastDescription}
                                podcastId={_id}
                            />
                        ),
                    )}
                </div>
            </section>
        </div>
    );
}

export default Home;
