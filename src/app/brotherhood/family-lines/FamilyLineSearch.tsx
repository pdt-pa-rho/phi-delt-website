import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import clsx from "clsx";

export type FamNode = {
  name: string;
  littles: FamNode[];
};

export type FamTree = {
  root: FamNode;
};

export default function FamilyLineSearch({ forest }: { forest: FamTree[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("person") ?? "");

  const names = useMemo(() => {
    const all = new Set<string>();

    function walk(node: FamNode) {
      all.add(node.name);
      node.littles.forEach(walk);
    }

    forest.forEach((tree) => walk(tree.root));
    return [...all].sort((a, b) => a.localeCompare(b));
  }, [forest]);

  const filteredNames =
    query === ""
      ? names.slice(0, 12)
      : names
        .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 12);

  function selectPerson(name: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (name) {
      params.set("person", name);
    } else {
      params.delete("person");
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Combobox value={searchParams.get("person") ?? ""} onChange={selectPerson}>
      <div className="relative mb-6 max-w-md">
        <label className="mb-2 block text-sm text-white/60">
          Search family lines
        </label>

        <ComboboxInput
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-(--blue) focus:ring-2 focus:ring-(--blue)/30 backdrop-blur-sm shadow-sm"
          placeholder="Search by name..."
          displayValue={(name: string) => name}
          onChange={(event) => setQuery(event.target.value)}
        />

        <ComboboxOptions className="absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-lg border border-white/10 bg-white/5 text-white outline-none transition focus:border-(--blue) focus:ring-2 focus:ring-(--blue)/30 backdrop-blur-sm shadow-sm">
          {filteredNames.map((name) => (
            <ComboboxOption
              key={name}
              value={name}
              className={({ focus }) =>
                clsx(
                  "cursor-pointer px-4 py-2 text-sm",
                  focus ? "bg-(--blue) text-white" : "text-white/80"
                )
              }
            >
              {name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}
