import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <motion.nav
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#0B0F1A]/70 border-b border-white/5"
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* LOGO */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-wide text-white">
                        Job<span className="text-indigo-400">Dekho</span>
                    </span>
                </Link>

                {/* NAV LINKS */}
                <ul className="hidden md:flex items-center gap-8 text-sm text-gray-300">
                    {user && user.role === "recruiter" ? (
                        <>
                            <li>
                                <Link className="hover:text-white transition" to="/admin/companies">
                                    Companies
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition" to="/admin/jobs">
                                    Jobs
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link className="hover:text-white transition" to="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition" to="/jobs">
                                    Jobs
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-white transition" to="/browse">
                                    Browse
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* AUTH / PROFILE */}
                {!user ? (
                    <div className="flex items-center gap-3">
                        <Link to="/login">
                            <Button
                                className="bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 transition"
                            >
                                Login
                            </Button>
                        </Link>


                        <Link to="/signup">
                            <Button className="relative bg-gradient-to-r from-indigo-600 to-cyan-600 hover:scale-[1.03] transition">
                                Signup
                                <span className="absolute inset-0 blur-xl bg-indigo-500/40 -z-10" />
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer border border-white/20 hover:scale-105 transition">
                                <AvatarImage
                                    src={user?.profile?.profilePhoto}
                                    alt="profile"
                                />
                            </Avatar>
                        </PopoverTrigger>

                        <PopoverContent className="w-80 bg-[#0F1524]/95 backdrop-blur-xl border border-white/10 text-white rounded-2xl shadow-xl">
                            <div className="space-y-4">
                                {/* USER INFO */}
                                <div className="flex gap-3 items-center">
                                    <Avatar>
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-semibold">{user?.fullname}</h4>
                                        <p className="text-sm text-gray-400">
                                            {user?.profile?.bio || "Career Explorer"}
                                        </p>
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex flex-col gap-3 text-sm">
                                    {user.role === "student" && (
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-2 hover:text-indigo-400 transition"
                                        >
                                            <User2 size={16} />
                                            View Profile
                                        </Link>
                                    )}

                                    {user.role === "recruiter" && (
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Briefcase size={16} />
                                            Recruiter Dashboard
                                        </div>
                                    )}

                                    <button
                                        onClick={logoutHandler}
                                        className="flex items-center gap-2 text-red-400 hover:text-red-500 transition"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </div>

            {/* subtle gradient underline */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
        </motion.nav>
    );
};

export default Navbar;
