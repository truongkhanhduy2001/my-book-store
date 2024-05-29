import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const DropdownAdmin = () => {
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleLogOut = () => {
    Cookies.remove("TOKEN-ADMIN");
    router.push("/admin/login");
  };
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="relative">
          <Link
            ref={trigger}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-4"
            href="#"
          >
            <span className="hidden text-right lg:block">
              <span className="block text-sm font-medium text-[var(--title-color)]">
                Duy
              </span>
              <span className="block text-xs text-[var(--title-color)]">
                Web Design
              </span>
            </span>

            <span className="h-12 w-12 rounded-full">
              <i className="text-[20px] text-[var(--first-color)] flex justify-center items-center m-[10px]">
                <FaRegUser />
              </i>
            </span>

            <i className="hidden fill-current sm:block text-[20px] text-[var(--title-color)]">
              <IoIosArrowDown />
            </i>
          </Link>

          {/* <!-- Dropdown Start --> */}
          <div
            ref={dropdown}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
            className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
              dropdownOpen === true ? "block" : "hidden"
            }`}
          >
            <button
              onClick={handleLogOut}
              className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base text-[red]"
            >
              <i>
                <IoIosLogOut />
              </i>
              Log Out
            </button>
          </div>
          {/* <!-- Dropdown End --> */}
        </div>
      </div>
    </header>
  );
};

export default DropdownAdmin;
