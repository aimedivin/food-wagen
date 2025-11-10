import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CiSearch } from "react-icons/ci";
import {
  FaEnvelope,
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-black/90 text-white px-[5%]">
      <div className="flex flex-col md:flex-row items-center gap-10 mx-auto max-w-6xl py-12 justify-between">
        <div className="flex flex-wrap max-w-sm md:max-w-md w-full gap-8 lg:gap-14 text-sm">
          <div>
            <h4 className="font-semibold mb-3 text-base">Company</h4>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="#" className="hover:underline hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-primary">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-base">Contact</h4>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="#" className="hover:underline hover:text-primary">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-primary">
                  Partner with us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-primary">
                  Ride with us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-base">Legal</h4>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="#" className="hover:underline hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-primary">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-sm lg:max-w-md w-full space-y-7">
          <div>
            <h4 className="font-semibold mb-3 text-gray-300 uppercase">
              FOLLOW US
            </h4>
            <div className="flex gap-4 text-muted">
              <Link href="#" className="hover:text-primary">
                <FaInstagram className="size-5 " />
              </Link>
              <Link href="#" className="hover:text-primary">
                <FaFacebook className="size-5" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <FaTwitter className="size-5" />
              </Link>
            </div>
          </div>
          <h4 className="font-semibold mb-3 text-base text-muted">
            Receive exclusive offers in your mailbox.
          </h4>
          <form
            action=""
            className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full max-w-2xl"
          >
            <div className="relative w-full h-11 sm:h-12">
              <FaEnvelope className="absolute inset-0 left-3 my-auto text-muted/70 size-4.5 stroke-1" />
              <Input
                className="min-w-50 h-full flex-1 pl-9 py-2 outline-none! bg-muted-foreground/60 placeholder:text-muted/70 ring-muted! text-base!"
                placeholder="Enter Your email"
              />
            </div>
            <Button className="food-btn-primary h-11 sm:h-12 text-base">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-muted-foreground mx-auto max-w-6xl  py-4 text-sm text-muted flex flex-wrap gap-x-6 items-center justify-between">
        <p className="space-x-2">
          <span>All rights Reserved</span>
          <span className="font-semibold">
            &copy; Your Company, {new Date().getFullYear()}
          </span>
        </p>
        <p className="flex space-x-1">
          <span className="flex items-center gap-1">
            Made with <FaHeart className="size-3 text-amber-400" /> by
          </span>
          <span className="font-semibold">Themewagon</span>
        </p>
      </div>
    </footer>
  );
}
