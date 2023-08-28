import { Icons } from "@/components/icons";

export default function Loading() {
  return (
    <main className="relative h-24">
      <div className="max-w-5xl w-full items-center justify-center">
        <Icons.spinner className="m-auto h-8 w-8 animate-spin" aria-hidden="true"/>
      </div>
    </main>
  )
}
