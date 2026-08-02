import { trustBar } from "@/lib/data/content";

const icons: Record<number, JSX.Element> = {
  0: (
    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z M9 12l2 2 4-4" />
  ),
  1: <path d="M12 12a9 9 0 109-9 M12 7v5l3 3" />,
  2: <path d="M13 2 3 14h7l-1 8 11-14h-8l1-6z" />,
  3: <path d="M4 4h16v16H4z M9 9h.01M15 9h.01M9 15h6" />,
};

export default function TrustBar() {
  return (
    <div className="bg-navy border-y border-line">
      <div className="wrap grid grid-cols-2 lg:grid-cols-4 divide-x divide-line">
        {trustBar.map((item, i) => (
          <div key={item.title} className="flex items-center gap-3 py-6 px-4 first:pl-0">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="text-signal shrink-0"
              aria-hidden="true"
            >
              {icons[i]}
            </svg>
            <div>
              <div className="text-sm font-semibold text-white leading-tight">{item.title}</div>
              <div className="text-xs text-steel-light leading-tight mt-0.5">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
