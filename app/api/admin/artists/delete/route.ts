import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const { error } = await supabase
      .from("artists")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );

  }
}