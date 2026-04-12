import React, { useEffect, useState, useRef } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2, Upload, User, Mail, Phone, Lock, Briefcase, GraduationCap, Sparkles, Globe, Target, Zap, Rocket } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import ParticlesBackground from "@/components/ui/ParticlesBackground";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const [activeSection, setActiveSection] = useState(0);
  const [hoveredRole, setHoveredRole] = useState(null);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(formRef, { once: true });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const changeFileHandler = (e) =>
    setInput({ ...input, file: e.target.files?.[0] });

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Floating job icons data
  const floatingIcons = [
    { icon: Briefcase, x: 10, y: 20, delay: 0 },
    { icon: Globe, x: 85, y: 40, delay: 0.5 },
    { icon: Target, x: 20, y: 70, delay: 1 },
    { icon: Zap, x: 75, y: 80, delay: 1.5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F1A] via-[#0f172a] to-[#1a1f3a] text-white overflow-hidden relative">
      {/* Animated background elements */}
      <ParticlesBackground />
      
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Floating job icons */}
      <div className="fixed inset-0 pointer-events-none">
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 3,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
          >
            <item.icon className="w-8 h-8 text-indigo-400/30" />
          </motion.div>
        ))}
      </div>

      <Navbar />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen container mx-auto px-4 lg:px-8 py-12">
        {/* LEFT SIDE - HERO */}
        <div className="hidden lg:flex flex-col justify-center px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center"
              >
                <Rocket className="w-6 h-6" />
              </motion.div>
              <span className="text-sm font-semibold px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30">
                FUTURE OF HIRING
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-transparent"
            >
              Launch Your
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="block text-6xl lg:text-7xl mt-2 text-white"
              >
                Career Journey
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 text-gray-300 text-lg leading-relaxed"
            >
              Join <span className="text-cyan-400 font-semibold">10,000+ professionals</span> who found their dream roles through our AI-powered platform. We match talent with opportunities that truly matter.
            </motion.p>

            {/* Stats */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-10"
            >
              {[
                { number: "24h", label: "Avg. Response Time" },
                { number: "95%", label: "Match Accuracy" },
                { number: "10K+", label: "Active Jobs" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-500/30 transition-all duration-300">
                  <div className="text-2xl font-bold text-cyan-400">{stat.number}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div> */}

            {/* Feature chips */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {["AI Matching", "Instant Apply", "Skill Analytics", "Career Pathing"].map((feature, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20 text-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  {feature}
                </div>
              ))}
            </motion.div> */}
          </motion.div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="flex items-center justify-center relative z-10">
          <motion.div
            ref={formRef}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 }
            }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Form container with glass morphism */}
            <div className="relative">
              {/* Glow effect behind form */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 rounded-3xl blur-xl opacity-30 animate-pulse" />
              
              <motion.form
                onSubmit={submitHandler}
                className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
                style={{
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center relative"
                  >
                    <User className="w-8 h-8" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 blur-xl opacity-50" />
                  </motion.div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    Begin Your Journey
                  </h2>
                  <p className="text-gray-400 mt-2">Create your professional identity in 60 seconds</p>
                </div>

                {/* Form progress indicator */}
                {/* <div className="flex gap-2 mb-8">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                        activeSection >= step - 1
                          ? "bg-gradient-to-r from-indigo-500 to-cyan-500"
                          : "bg-gray-700"
                      }`}
                    />
                  ))}
                </div> */}

                {/* Input Fields */}
                <div className="space-y-5">
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        name="fullname"
                        value={input.fullname}
                        onChange={changeEventHandler}
                        placeholder="Full Name"
                        className="pl-12 py-6 bg-black/40 border-gray-700/50 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        placeholder="Email Address"
                        className="pl-12 py-6 bg-black/40 border-gray-700/50 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        name="phoneNumber"
                        value={input.phoneNumber}
                        onChange={changeEventHandler}
                        placeholder="Phone Number"
                        className="pl-12 py-6 bg-black/40 border-gray-700/50 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        placeholder="Create Password"
                        className="pl-12 py-6 bg-black/40 border-gray-700/50 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                  </motion.div>

                  {/* Role Selection */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="pt-2"
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      I am a...
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "student", label: "Job Seeker", icon: GraduationCap, color: "from-blue-500 to-cyan-500" },
                        { value: "recruiter", label: "Recruiter", icon: Briefcase, color: "from-purple-500 to-pink-500" },
                      ].map((role) => (
                        <motion.button
                          key={role.value}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onMouseEnter={() => setHoveredRole(role.value)}
                          onMouseLeave={() => setHoveredRole(null)}
                          onClick={() => setInput({ ...input, role: role.value })}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                            input.role === role.value
                              ? `border-transparent bg-gradient-to-br ${role.color} text-white`
                              : "border-gray-700/50 bg-gray-900/50 hover:border-gray-600"
                          }`}
                        >
                          <role.icon className={`w-6 h-6 mb-2 ${input.role === role.value ? 'text-white' : 'text-gray-400'}`} />
                          <span className="font-medium">{role.label}</span>
                          {hoveredRole === role.value && input.role !== role.value && (
                            <motion.div
                              layoutId="roleHover"
                              className="absolute inset-0 border-2 border-gray-500/30 rounded-xl"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* File Upload */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pt-2"
                  >
                    <div
                      onClick={handleFileClick}
                      className="relative border-2 border-dashed border-gray-700/50 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-500/50 transition-all group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                      <p className="text-gray-300 group-hover:text-white transition-colors">
                        {input.file ? (
                          <span className="text-cyan-400">{input.file.name}</span>
                        ) : (
                          <>
                            <span className="text-indigo-400">Upload Profile Photo</span>
                            <span className="block text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</span>
                          </>
                        )}
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        onChange={changeFileHandler}
                        accept="image/*"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Submit Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-8"
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 text-lg font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Creating Your Profile...
                        </>
                      ) : (
                        <>
                          <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          Launch My Career
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </motion.div>

                {/* Login Link */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center text-gray-400 mt-6 text-sm"
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline inline-flex items-center gap-1 transition-colors"
                  >
                    Sign In Now
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.p>

                {/* Security note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-2"
                >
                </motion.p>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;