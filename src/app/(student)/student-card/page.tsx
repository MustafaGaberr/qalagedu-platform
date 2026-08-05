import { redirect } from "next/navigation";

/** Preserves a previously valid route without exposing any attendance-code UI. */
export default function StudentCardRoute() { redirect("/attendance"); }
