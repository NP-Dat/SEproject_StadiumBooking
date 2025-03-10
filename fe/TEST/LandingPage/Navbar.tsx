"use client";
import * as React from "react";

export const Navbar = () => {
  return (
    <header className="flex flex-col justify-center items-end px-16 py-14 w-full text-2xl font-bold text-center text-white bg-black max-md:px-5 max-md:max-w-full">
      <nav className="flex gap-10 items-center w-full max-w-[1132px] max-md:max-w-full">
        <h1 className="grow self-stretch text-4xl">
          Webify <span className="text-[#2687b8]">Co.</span>
        </h1>
        <input
          type="search"
          placeholder="search"
          className="self-stretch px-16 py-2 my-auto font-light whitespace-nowrap bg-white rounded-2xl text-zinc-400 max-md:px-5"
        />
        <button className="self-stretch my-auto whitespace-nowrap">
          Login
        </button>
        <button className="self-stretch my-auto whitespace-nowrap">
          Register
        </button>
      </nav>
    </header>
  );
};
