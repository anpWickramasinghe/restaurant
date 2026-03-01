import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 mt-auto">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
                    {/* Company Info */}
                    <div className="lg:col-span-4 flex flex-col items-start pr-4">
                        <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">DineSmart.</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Experience the best dining right at your fingertips. Discover curated restaurants,
                            reserve tables, and order your favorite meals with zero hassle.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all duration-300">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all duration-300">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all duration-300">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all duration-300">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Legal Pages */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Legal</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">Terms & Conditions</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">Cookie Control</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">Modern Slavery Statement</a>
                            </li>
                        </ul>
                    </div>

                    {/* Important Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Explore</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">Get Help</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">Add a Restaurant</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">Deliver with Us</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">Business Account</a>
                            </li>
                        </ul>
                    </div>

                    {/* Subscription Section */}
                    <div className="lg:col-span-4 bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Get Exclusive Deals</h3>
                        <p className="text-gray-600 text-sm mb-6">Subscribe to our newsletter and never miss out on special offers.</p>
                        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 shadow-sm"
                            />
                            <button
                                type="submit"
                                className="w-full bg-primary text-white font-medium px-6 py-3 rounded-xl hover:bg-[#e47a00] transition-colors shadow-sm"
                            >
                                Subscribe Now
                            </button>
                        </form>
                        <p className="text-xs text-gray-500 mt-4 text-center">
                            By subscribing, you agree to our <a href="#" className="text-primary hover:underline">Email Policy</a>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-gray-900 py-6">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} DineSmart.com. All rights reserved.
                    </p>
                    <div className="flex justify-center space-x-6">
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Terms
                        </a>
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Pricing
                        </a>
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Do not sell or share my personal information
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
