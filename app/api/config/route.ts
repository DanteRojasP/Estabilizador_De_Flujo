import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

    try {

        let config = await prisma.config.findUnique({

            where: {

                id: 1

            }

        });

        if (!config) {

            config = await prisma.config.create({

                data: {

                    id: 1,

                    setpoint: 50,

                    kp: 1.8,

                    ki: 0,

                    kd: 0

                }

            });

        }

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

export async function POST(request: Request) {

    try {

        const body = await request.json();

        const config = await prisma.config.upsert({

            where: {

                id: 1

            },

            update: {

                setpoint: body.setpoint,

                kp: body.kp,

                ki: body.ki,

                kd: body.kd

            },

            create: {

                id: 1,

                setpoint: body.setpoint,

                kp: body.kp,

                ki: body.ki,

                kd: body.kd

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