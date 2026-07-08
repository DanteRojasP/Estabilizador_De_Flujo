import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    try {

        const { searchParams } = new URL(request.url);

        const limitParam = Number(searchParams.get("limit"));

        const limit = Number.isFinite(limitParam) && limitParam > 0
            ? Math.min(limitParam, 500)
            : 50;

        const rows = await prisma.telemetry.findMany({

            orderBy: {

                createdAt: "desc"

            },

            take: limit

        });

        // se devuelve en orden cronológico ascendente para alimentar la gráfica directo
        const chronological = rows.reverse();

        return NextResponse.json(chronological);

    }

    catch (error) {

        console.error(error);

        return NextResponse.json(

            { message: "Error" },

            { status: 500 }

        );

    }

}

export async function POST(request: Request) {

    try {

        const body = await request.json();

        const telemetry = await prisma.telemetry.create({

            data: {

                distance: body.distance,

                height: body.height,

                pwm: body.pwm,

                error: body.error,

                wifi: body.wifi

            }

        });

        return NextResponse.json(telemetry);

    }

    catch (error) {

        console.error(error);

        return NextResponse.json(

            { message: "Error" },

            { status: 500 }

        );

    }

}