import React, { useEffect, useState, useRef } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import {
    Loader2,
    Mail,
    Lock,
    GraduationCap,
    Briefcase,
    Rocket,
    Sparkles,
} from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import ParticlesBackground from "@/components/ui/ParticlesBackground";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formRef = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(formRef, { once: true });

    useEffect(() => {
        if (user) navigate("/");
    }, []);

    useEffect(() => {
        if (isInView) controls.start("visible");
    }, [isInView]);

    const changeEventHandler = (e) =>
        setInput({ ...input, [e.target.name]: e.target.value });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(
                `${USER_API_END_POINT}/login`,
                input,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0B0F1A] via-[#0f172a] to-[#1a1f3a] text-white overflow-hidden relative">
            <ParticlesBackground />
            <Navbar />

            {/* animated glow orbs */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    animate={{ x: [0, 120, 0], y: [0, -60, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -120, 0], y: [0, 60, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
                />
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen container mx-auto px-6">
                {/* LEFT HERO */}
                <div className="hidden lg:flex flex-col justify-center max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="text-cyan-400" />
                            <span className="text-sm font-semibold px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30">
                                CAREER PLATFORM
                            </span>
                        </div>

                        <h1 className="text-5xl font-bold leading-tight">
                            Welcome Back to
                            <span className="block relative mt-3">
                                <span className="relative z-10 text-6xl font-extrabold">
                                    Your Future
                                </span>
                            </span>
                        </h1>

                        <p className="mt-6 text-gray-300 text-lg">
                            Log in to continue applying, tracking, and accelerating your
                            career growth.
                        </p>
                    </motion.div>
                </div>

                {/* RIGHT FORM */}
                <div className="flex items-center justify-center">
                    <motion.div
                        ref={formRef}
                        initial="hidden"
                        animate={controls}
                        variants={{
                            hidden: { opacity: 0, scale: 0.92 },
                            visible: { opacity: 1, scale: 1 },
                        }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-md relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 rounded-3xl blur-xl opacity-30 animate-pulse" />

                        <form
                            onSubmit={submitHandler}
                            className="relative bg-[#0F1524]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
                        >
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                                    <Rocket className="w-8 h-8" />
                                </div>
                                <h2 className="text-3xl font-bold">Welcome Back</h2>
                                <p className="text-gray-400 mt-2">
                                    Continue your career journey
                                </p>
                            </div>

                            {/* inputs */}
                            <div className="space-y-5">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        placeholder="Email Address"
                                        className="pl-12 py-6 bg-black/40 border-gray-700/50 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20"
                                    />
                                </div>

                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="password"
                                        name="password"
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        placeholder="Password"
                                        className="pl-12 py-6 bg-black/40 border-gray-700/50 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20"
                                    />
                                </div>
                            </div>

                            {/* role */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                {[
                                    { value: "student", label: "Job Seeker", icon: GraduationCap },
                                    { value: "recruiter", label: "Recruiter", icon: Briefcase },
                                ].map((role) => (
                                    <motion.button
                                        key={role.value}
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setInput({ ...input, role: role.value })}
                                        className={`p-4 rounded-xl border transition ${input.role === role.value
                                                ? "bg-gradient-to-br from-indigo-500 to-cyan-500 border-transparent"
                                                : "border-gray-700 hover:border-indigo-500"
                                            }`}
                                    >
                                        <role.icon className="mx-auto mb-2" />
                                        <span className="text-sm font-medium">{role.label}</span>
                                    </motion.button>
                                ))}
                            </div>

                            {/* submit */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-8 py-6 text-lg font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:scale-[1.02] transition"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 animate-spin" />
                                        Logging in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>

                            <p className="text-center text-gray-400 mt-6 text-sm">
                                Don’t have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-cyan-400 hover:underline font-medium"
                                >
                                    Create one
                                </Link>
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Login;
