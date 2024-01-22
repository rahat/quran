"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState, useEffect } from "react";

async function fetchData(slug: number) {
    const response = await fetch(`/eng-abdullahyusufal/${slug}.json`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    if (!response.ok) {
        throw new Error('Failed to retrieve data: ' + response.statusText);
    }
    const data = await response.json();
    return data;
}

export interface Root {
    chapter: Chapter[]
}

export interface Chapter {
    chapter: number
    verse: number
    text: string
}


interface Params {
    slug: number;
}

export default function Page({ params }: { params: Params }) {
    const { slug } = params;

    const [data, setData] = useState<Root>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        fetchData(slug)
            .then((res) => {
                setData(res);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error: ", error);
                setError('An error occurred while fetching data.');
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {data && data.chapter && data.chapter.map((entry) => (
                <Card key={entry.chapter} className="m-5">
                    <CardHeader>
                        <CardTitle>Chapter {entry.chapter}</CardTitle>
                        <CardDescription>Verse {entry.verse}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{entry.text}</p>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}
