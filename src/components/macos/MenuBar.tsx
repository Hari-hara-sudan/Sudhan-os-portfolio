import React, { useState, useRef, useEffect } from "react";
import appleIcon from "../../assets/icons/apple.png";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Calendar } from "../ui/calendar";
import avatarImg from "../../assets/icons/avatar.jpg";
import Spotlight from "./Spotlight";
import { FaSearch } from "react-icons/fa";
import { useWindowStore } from "@/stores/windowStore";

// Utility to get current date and time as 'Mon Feb 24, 2026 10:30 AM'
function getCurrentDateTime() {
	const now = new Date();
	const date = now.toLocaleDateString(undefined, {
		weekday: "short",
		month: "short",
		day: "2-digit",
		year: "numeric",
	});
	const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	return `${date} ${time}`;
}

const MenuBar: React.FC = () => {
		const { toggleSpotlight } = useWindowStore();
	const [dateTime, setDateTime] = useState(getCurrentDateTime());

	useEffect(() => {
		const interval = setInterval(() => {
			setDateTime(getCurrentDateTime());
		}, 1000 * 30); // update every 30 seconds
		return () => clearInterval(interval);
	}, []);

	const [calendarOpen, setCalendarOpen] = useState(false);
	const calendarPopoverRef = useRef<HTMLDivElement>(null);

	// Close calendar popover on outside click
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (
				calendarPopoverRef.current &&
				!calendarPopoverRef.current.contains(e.target as Node)
			) {
				setCalendarOpen(false);
			}
		}
		if (calendarOpen) {
			document.addEventListener("mousedown", handleClick);
		} else {
			document.removeEventListener("mousedown", handleClick);
		}
		return () => document.removeEventListener("mousedown", handleClick);
	}, [calendarOpen]);

	return (
		<div className="relative flex items-center h-8 px-2 bg-[#23242b]/90 text-white select-none w-full shadow-sm">
			{/* Left: Apple icon */}
			<div className="flex items-center gap-2 z-10">
				<img src={appleIcon} alt="Apple" className="w-5 h-5" />
			</div>

			{/* Center: Date and Time (absolutely centered, clickable) */}
			<div
				className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium tracking-wider whitespace-nowrap select-none cursor-pointer"
				style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', system-ui, sans-serif" }}
				onClick={() => setCalendarOpen((v) => !v)}
			>
				{dateTime}
			</div>

			{/* Top right: Calendar popover only (no button) */}
			{calendarOpen && (
				<div
					ref={calendarPopoverRef}
					className="mac-glass absolute top-10 right-3 z-50 rounded-xl shadow-lg p-3 animate-fade-in"
					style={{ minWidth: 260 }}
				>
					<Calendar />
				</div>
			)}

			{/* Right: Spotlight and Avatar dropdown */}
			<div className="ml-auto z-10 flex items-center gap-2">
				{/* Spotlight trigger */}
				<button
					className="flex items-center justify-center w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 text-white shadow transition-colors"
					style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
					onClick={toggleSpotlight}
					aria-label="Open Spotlight"
				>
					<FaSearch size={15} />
				</button>
			</div>

			{/* Spotlight overlay (renders at root level) */}
			<Spotlight />
		</div>
	);
};


export default MenuBar;
