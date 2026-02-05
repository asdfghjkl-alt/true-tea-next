import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Not found" }, { status: 404 });
}

export async function POST() {
  return NextResponse.json({ message: "Not found" }, { status: 404 });
}

export async function PUT() {
  return NextResponse.json({ message: "Not found" }, { status: 404 });
}

export async function DELETE() {
  return NextResponse.json({ message: "Not found" }, { status: 404 });
}

export async function PATCH() {
  return NextResponse.json({ message: "Not found" }, { status: 404 });
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Not found" }, { status: 404 });
}

export async function HEAD() {
  return NextResponse.json({ message: "Not found" }, { status: 404 });
}
