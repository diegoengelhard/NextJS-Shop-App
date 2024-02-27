import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";


const Layout = () => {
    // const { data: session } = useSession();

    // if (!session) {
    //     return (
    //         <div className="bg-bgGray w-screen h-screen flex items-center">
    //             <div className="text-center w-full">
    //                 No session
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-purple-400">
                <h1 className="text-xl font-bold my-4">Sign In</h1>

                <form className="flex flex-col gap-3">
                    <input

                        type="text"
                        placeholder="Email"
                    />
                    <input

                        type="password"
                        placeholder="Password"
                    />
                    <button className="bg-purple-600 text-white font-bold cursor-pointer px-6 py-2">
                        Sign In
                    </button>
                    <button className="flex items-center justify-center bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
                        <div>
                            <FcGoogle size={24} />
                        </div>
                        <div className=' ml-2'>
                            Sign In with Google
                        </div>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Layout