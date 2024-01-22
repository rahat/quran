"use client"

import React from 'react';
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import database from '../../database/info.json'

export function Navbar() {
    const pathname = usePathname();

    return (
        <>
            <div>
                <ScrollArea className="h-full w-48 border">
                    <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">Chapters</h4>
                        {database.chapters.map((item, index) => (
                            <React.Fragment key={index}>
                                <Link
                                    href={`/chapters/${item.chapter}`}
                                    className={
                                        pathname === `/chapters/${item.chapter}`
                                            ? "font-medium text-foreground"
                                            : "text-muted-foreground"
                                    }
                                >
                                    <div className="text-sm">
                                        {item.chapter}. {item.name}
                                    </div>
                                </Link>
                                <Separator className="my-2" />
                            </React.Fragment>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </>
    );
}