"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import data from '../../../database/eng-abdullahyusufal.json';

export default  function Page({ params }) {
    const { slug } = params;
    
    return <>
    {data.quran.filter(item => item.chapter == slug).map((entry, index) => (<>
    <Card key={index} className="m-5">
        <CardHeader>
            <CardTitle>Chapter {entry.chapter}</CardTitle>
            <CardDescription>Verse {entry.verse}</CardDescription>
        </CardHeader>
        <CardContent>
            <p>{entry.text}</p>
        </CardContent>
    </Card>
    </>))}</>
}