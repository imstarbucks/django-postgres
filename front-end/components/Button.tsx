import Link from "next/link";
import { Button } from "rsuite";

type Button =
    | {
          title: string;
      } & {
          type: "Link";
          href: string;
      };

const AccentButton = (options: Button) => {
    if (options.type === "Link")
        return (
            <Link
                href={options.href}
                className="p-2 rounded text-custom-blue bg-secondary ease-in-out duration-300 hover:bg-accent hover:text-secondary hover:border-accent"
            >
                {options.title}
            </Link>
        );

    return (
        <button
            type="button"
            className="p-2 rounded text-custom-blue bg-secondary ease-in-out duration-300 hover:bg-accent hover:text-secondary hover:border-accent"
        >
            {options.title}
        </button>
    );
};

export default AccentButton;
