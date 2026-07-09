import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {

    try {

        const config = await prisma.config.update({

            where: {

                id: 1

            },

            data: {

                resetToken: {

                    increment: 1

                }

            }

        });

        return NextResponse.json(config);

    }

    catch (error) {

        console.error(error);

        return NextResponse.json(

            { message: "Error" },

            { status: 500 }

        );

    }

}