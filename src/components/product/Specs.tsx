import { Check } from "lucide-react";
import { customOptions, departmentOf, type Category } from "@/lib/catalogue";

export function SpecList({ category, dark = false }: { category: Category; dark?: boolean }) {
  return (
    <ul className="space-y-3">
      {category.description.map((d) => {
        const [label, ...rest] = d.split(": ");
        const hasLabel = rest.length > 0 && label.length < 14;
        return (
          <li key={d} className={`flex gap-3 text-[15px] leading-relaxed ${dark ? "text-white/75" : "text-ink/75"}`}>
            <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
            <span>
              {hasLabel ? (
                <>
                  <strong className={`font-medium ${dark ? "text-white" : "text-ink"}`}>{label}:</strong> {rest.join(": ")}
                </>
              ) : (
                d
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Customisation options for a category's collection (sportswear options by default). */
export function OptionBadges({ category, dark = false }: { category?: Category; dark?: boolean }) {
  const options = category ? departmentOf(category).options : customOptions;
  return (
    <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {options.map((o) => (
        <li
          key={o.key}
          className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 text-[13px] font-medium ${
            dark ? "border-gold/50 text-white" : "border-ink/15 text-ink"
          }`}
        >
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold text-ink">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          {o.label}
        </li>
      ))}
    </ul>
  );
}

export function PrintSizes({ category }: { category: Category }) {
  if (!category.printSizes) return null;
  return (
    <div>
      <h3 className="font-display text-xl font-semibold tracking-wide uppercase">Print sizes</h3>
      <table className="mt-3 w-full text-left text-sm">
        <thead className="sr-only">
          <tr>
            <th>Placement</th>
            <th>Size</th>
            <th className="max-sm:hidden">Imperial</th>
          </tr>
        </thead>
        <tbody>
          {category.printSizes.map((s) => (
            <tr key={s.label} className="border-b border-ink/10">
              <th scope="row" className="py-2.5 pr-3 font-medium text-gold-deep">
                {s.label}
              </th>
              <td className="py-2.5 pr-3 text-ink/75">
                {s.metric}
                {/* on phones the imperial size sits under the metric one */}
                <span className="block text-xs whitespace-nowrap text-ink/50 sm:hidden">{s.imperial}</span>
              </td>
              <td className="py-2.5 text-right whitespace-nowrap text-ink/75 max-sm:hidden">{s.imperial}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {category.printNote && <p className="mt-2 text-xs text-ink/50">{category.printNote}</p>}
    </div>
  );
}
