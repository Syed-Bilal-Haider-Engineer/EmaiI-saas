import Link from "next/link";
import React from "react";
import FooterLogo from "./footer.logo";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white pt-10">
      <div className="w-[95%] md:flex m-auto py-5">
        <div className="w-full md:w-[40%]">
          <Link href="/">
              <FooterLogo />
          </Link>
          <p className="text-2xl py-2">
            Get Email Saas updates delivered directly to your inbox.
          </p>
          <div className="flex items-center w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent w-full md:w-[50%] border h-[42px] px-2 rounded-none rounded-l outline-none"
            />
            <button className="w-[90px] cursor-pointer rounded-r h-[43px] bg-blue-500 text-xl outline-none">
              Submit
            </button>
          </div>
          <br />
          <p className="text-xs">
            By subscribing you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
        <div className="w-full md:w-[60%] flex md:justify-end justify-center py-5 md:py-0">
          <div className="md:w-[50%] flex justify-around">
            <div>
              <ul>
                <li className="text-xl pb-4 cursor-pointer">
                  <Link href="/create">
                    Create
                  </Link>
                </li>
                <li className="text-xl pb-4 cursor-pointer">
                  <Link href="/write">
                    Write
                  </Link>
                </li>
                <li className="text-xl pb-4 cursor-pointer">
                  <Link href="/grow">
                    Grow
                  </Link>
                </li>
                <li className="text-xl pb-4 cursor-pointer">
                  <Link href="/monetize">
                    Monetize
                  </Link>
                </li>
                <li className="text-xl pb-4 cursor-pointer">
                  <Link href="/analyze">
                    Analyze
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li className="text-xl pb-4 cursor-pointer">
                  <Link href="/careers">
                    Careers
                  </Link>
                </li>
                <li className="text-xl pb-4 cursor-pointer">
                  <Link href="/pricing">
                    Pricing
                  </Link>
                </li>
                <li className="text-xl pb-4 cursor-pointer">
                  <Link href="/shop">
                    Shop
                  </Link>
                </li>
                <li className="text-xl pb-4 cursor-pointer">
                  <Link href="/compare">
                    Compare
                  </Link>
                </li>
                <li className="text-xl pb-4 cursor-pointer">
                  <Link href="/love">
                    Love
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p className="text-lg text-center pb-10">
        © 2024 Email Saas, Inc. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
