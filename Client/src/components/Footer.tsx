export const Footer = () => {
    return (
        <footer className="flex flex-wrap gap-5 justify-between items-start py-4 pr-20 pl-5 mt-7 w-full bg-black max-md:pr-5 max-md:max-w-full">
            <div className="flex flex-col self-end mt-6 text-base text-center">
                <div className="self-center text-3xl text-white">
                    <span className="font-bold">Webify </span>
                    <span className="font-bold text-[#51b7d0]">Co.</span>
                </div>
                <div className="flex gap-3.5 mt-6">
                    <span className="font-semibold text-white">Location:</span>
                    <address className="flex-auto font-light text-neutral-400 w-[245px]">
                        Thu Duc District, Ho Chi Minh City.
                    </address>
                </div>
                <div className="mt-2 max-w-full w-[227px] max-md:ml-1">
                    <div className="flex gap-4 whitespace-nowrap">
                        <span className="grow font-semibold text-white">Contact:</span>
                        <a
                            href="mailto:contact@webify.vn"
                            className="grow shrink font-light text-neutral-400 w-[131px]"
                        >
                            contact@webify.vn
                        </a>
                    </div>
                    <p className="mt-9 font-light text-neutral-400 max-md:mr-1.5">
                        @Copyright Webify Company
                    </p>
                </div>
            </div>

            <nav className="flex flex-col items-center text-xl font-light text-center text-neutral-400">
                <h3 className="self-stretch text-2xl font-bold text-sky-400">
                    Important
                </h3>
                <a href="#" className="mt-3">
                    About us
                </a>
                <a href="#" className="mt-1.5">
                    Terms
                </a>
                <a href="#" className="mt-4">
                    Policy
                </a>
                <a href="#" className="mt-3">
                    Contact
                </a>
            </nav>

            <div className="flex flex-col items-center">
                <div className="flex gap-9 items-start self-stretch text-2xl font-bold text-center text-sky-400 whitespace-nowrap">
                    <h3 className="grow shrink self-stretch my-auto w-[93px]">Payment</h3>
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0193d01d27ec4f57ac28c071eac09a3f23edb1dca9e08a488e09e8340fd5ab9d?placeholderIfAbsent=true&apiKey=ebb3257718164cd3b8c551bf8167e955"
                        alt="Payment method 1"
                        className="object-contain shrink-0 aspect-[2] w-[70px]"
                    />
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/30ce08cf3a71ba02a4f3bf27d801f24a23f92a94a0b0862f9e7a226f270b7f04?placeholderIfAbsent=true&apiKey=ebb3257718164cd3b8c551bf8167e955"
                        alt="Payment method 2"
                        className="object-contain shrink-0 w-14 aspect-[1.6]"
                    />
                </div>
                <h3 className="mt-7 text-2xl font-bold text-center text-sky-400">
                    Follow us
                </h3>
                <div className="flex gap-5 justify-between mt-2 max-w-full w-[134px]">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/611116ccd7b438644a2ef71fc6a83985d14aa0bc2947c93a273f8eea6ba040a8?placeholderIfAbsent=true&apiKey=ebb3257718164cd3b8c551bf8167e955"
                        alt="Social media 1"
                        className="object-contain shrink-0 aspect-[1.25] w-[50px]"
                    />
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7eed5fb7672c5b167c981d0582a694cde5677216c3ee139d1c5acd148af9adc?placeholderIfAbsent=true&apiKey=ebb3257718164cd3b8c551bf8167e955"
                        alt="Social media 2"
                        className="object-contain shrink-0 aspect-[1.25] w-[50px]"
                    />
                </div>
            </div>
        </footer>
    );
};
