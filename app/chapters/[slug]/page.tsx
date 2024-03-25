"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useState, useEffect } from "react";

import editions from '@/database/editions.json';

async function fetchData(translation: string, slug: number) {
    const response = await fetch(`/${translation}/${slug}.json`,
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
    const [translation, setTranslation] = useState(() => JSON.parse(localStorage.getItem('translation')) || 'eng-abdullahyusufal');

    useEffect(() => {
        localStorage.setItem('translation', JSON.stringify(translation));
    }, [translation]);

    useEffect(() => {
        setLoading(true);
        fetchData(translation, slug)
            .then((res) => {
                setData(res);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error: ", error);
                setError('An error occurred while fetching data.');
                setLoading(false);
            });
    }, [translation, slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className='ml-5'>
                <Select onValueChange={setTranslation}
                    defaultValue={translation}>
                    <SelectTrigger className="w-[480px]">
                        <SelectValue placeholder="Select Translation" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {editions && Object.values(editions).map((edition, index) => (
                                <SelectItem key={edition.name} value={edition.name}>
                                    {edition.language} - {edition.author}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {data?.chapter?.map((entry) => (
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
