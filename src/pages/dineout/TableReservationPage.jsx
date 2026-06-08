import React, { useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  FiStar, FiMapPin, FiCheck, FiChevronLeft, FiChevronRight,
  FiWifi, FiMonitor, FiMusic, FiDroplet, FiClock, FiPhone,
  FiUser, FiInfo, FiUsers, FiCamera, FiGift, FiList,
  FiChevronDown, FiChevronUp
} from "react-icons/fi";
import { dineOutRestaurants } from "../../data/mockData";

/* ────────────────────────────────────────────────────────────────
   HELPERS
──────────────────────────────────────────────────────────────── */
const PAD = (n) => String(n).padStart(2, "0");

function generateSlots(startH, endH, step = 15) {
  const slots = [];
  for (let h = startH; h <= endH; h++) {
    const maxM = h === endH ? 1 : 60;
    for (let m = 0; m < maxM; m += step) {
      const hh = h > 12 ? h - 12 : h === 0 ? 12 : h;
      const ampm = h < 12 ? "AM" : "PM";
      slots.push({ val: `${PAD(h)}:${PAD(m)}`, label: `${PAD(hh)}:${PAD(m)} ${ampm}` });
    }
  }
  return slots;
}

const SESSIONS = [
  { id: "breakfast", label: "Breakfast", emoji: "🌅", icon: "☀", startH: 8,  endH: 10, hideAfterH: 12 },
  { id: "lunch",     label: "Lunch",     emoji: "☀️", icon: "☀", startH: 12, endH: 15, hideAfterH: 16 },
  { id: "dinner",    label: "Dinner",    emoji: "🌙", icon: "🌙", startH: 18, endH: 23, hideAfterH: 25 },
];

const AMENITIES = [
  { icon: FiWifi,    label: "Free Wi-Fi" },
  { icon: FiMonitor, label: "Live Screening" },
  { icon: FiMusic,   label: "Live Music" },
  { icon: FiDroplet, label: "Full Bar" },
  { icon: FiUsers,   label: "Private Dining" },
  { icon: FiCamera,  label: "Instagrammable" },
];

const MENU_SECTIONS = [
  { name: "Starters", items: [
    { name: "Paneer Tikka", price: 320, veg: true },
    { name: "Chicken 65", price: 380, veg: false },
    { name: "Veg Spring Rolls", price: 260, veg: true },
    { name: "Fish Fingers", price: 420, veg: false },
  ]},
  { name: "Main Course", items: [
    { name: "Dal Makhani", price: 280, veg: true },
    { name: "Butter Chicken", price: 460, veg: false },
    { name: "Palak Paneer", price: 320, veg: true },
    { name: "Mutton Rogan Josh", price: 540, veg: false },
  ]},
  { name: "Desserts", items: [
    { name: "Gulab Jamun", price: 140, veg: true },
    { name: "Chocolate Lava Cake", price: 220, veg: true },
  ]},
];

const OFFERS = [
  { title: "10% DineCash", desc: "Get flat 10% DineCash on your bill payment", color: "#e8f8f0", accent: "#16a34a", badge: "🏷" },
  { title: "Free Dessert", desc: "Complimentary dessert for bookings of 4+", color: "#fff7ed", accent: "#ea580c", badge: "🎁" },
  { title: "Happy Hours", desc: "20% off on drinks between 6–8 PM", color: "#eff6ff", accent: "#2563eb", badge: "🍹" },
];

// Generate next 30 days
function getNext30Days() {
  const days = [];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push({
      date: d.toISOString().split("T")[0],
      day: i === 0 ? "Today" : i === 1 ? "Tomorrow" : dayNames[d.getDay()],
      num: d.getDate(),
      month: monthNames[d.getMonth()],
    });
  }
  return days;
}

const currentYear = new Date().getFullYear();

function formatDateFull(d) {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${day} ${months[+m - 1]}, ${y}`;
}

/* ────────────────────────────────────────────────────────────────
   COMPONENT
──────────────────────────────────────────────────────────────── */
const TableReservationPage = () => {
  const { id } = useParams();
  const restaurant = dineOutRestaurants.find((r) => String(r.id) === String(id));

  const DAYS = useMemo(() => getNext30Days(), []);
  const currentHour = new Date().getHours();

  const [selectedDate, setSelectedDate] = useState(DAYS[0].date);
  const [guests, setGuests] = useState(2);
  const [slot, setSlot] = useState("");
  const [activeSession, setActiveSession] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [activeTab, setActiveTab] = useState("offers");
  const [expandedMenu, setExpandedMenu] = useState("Starters");
  const [showAllSlots, setShowAllSlots] = useState({});
  const [photoIdx, setPhotoIdx] = useState(0);

  const dateScrollRef = useRef(null);
  const isToday = selectedDate === DAYS[0].date;

  // For today: hide past sessions. For future days: show all
  const visibleSessions = SESSIONS.filter((s) =>
    isToday ? currentHour < s.hideAfterH : true
  );

  // Auto-set active session
  const defaultSession = visibleSessions[0]?.id;
  const resolvedSession = activeSession && visibleSessions.find(s => s.id === activeSession)
    ? activeSession : defaultSession;

  const currentSessionData = SESSIONS.find(s => s.id === resolvedSession);
  const allSlots = currentSessionData ? generateSlots(currentSessionData.startH, currentSessionData.endH) : [];
  const displaySlots = showAllSlots[resolvedSession] ? allSlots : allSlots.slice(0, 12);

  const scrollDates = (dir) => {
    if (dateScrollRef.current) {
      dateScrollRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
    }
  };

  const validate = () => {
    const e = {};
    if (!slot) e.slot = "Please select a time slot";
    if (!name.trim()) e.name = "Name is required";
    if (!/^\d{10}$/.test(phone.replace(/\s/g, ""))) e.phone = "Valid 10-digit number required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleConfirm = () => { if (validate()) setConfirmed(true); };
  const reset = () => { setConfirmed(false); setSlot(""); setName(""); setPhone(""); setErrors({}); };

  // Fake restaurant photos
  const photos = [restaurant?.image, restaurant?.image, restaurant?.image, restaurant?.image];

  if (!restaurant) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
      <p style={{ color: "#999" }}>Restaurant not found</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#000", fontFamily: "'DM Sans', sans-serif", paddingTop: 64 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* HERO */
        .hero { position: relative; height: 280px; overflow: hidden; }
        .hero img { width: 100%; height: 100%; object-fit: cover; }
        .hero-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%); }
        .hero-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px 24px; }
        .r-name { font-family: 'Sora', sans-serif; font-size: clamp(1.6rem,4vw,2.2rem); font-weight: 700; color: #fff; letter-spacing: -0.02em; }
        .r-meta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 6px; }
        .r-meta-item { display: flex; align-items: center; gap: 5px; font-size: 13px; color: rgba(255,255,255,0.75); }
        .r-tag { padding: 2px 10px; border-radius: 20px; background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.85); font-size: 11px; border: 1px solid rgba(255,255,255,0.25); }

        /* LAYOUT */
        .page-layout { max-width: 1160px; margin: 0 auto; padding: 24px 20px 60px; display: grid; grid-template-columns: 1fr 380px; gap: 24px; align-items: start; }
        @media (max-width: 900px) { .page-layout { grid-template-columns: 1fr; } }

        /* LEFT PANEL */
        .left-panel { display: flex; flex-direction: column; gap: 16px; }
        .card {background: #141414; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
        .card-pad { padding: 20px; }

        /* TABS */
        .tabs { display: flex; border-bottom: 1px solid #f0f0f0; }
        .tab-btn { flex: 1; padding: 14px 8px; font-size: 13px; font-weight: 600; color: #999; background: none; border: none; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: 'DM Sans', sans-serif; }
        .tab-btn.active { color: #e23744; border-bottom-color: #e23744; }
        .tab-btn:hover:not(.active) { color: #555; }

        /* OFFERS */
        .offer-card { display: flex; align-items: flex-start; gap: 12px; padding: 14px; border-radius: 12px; margin-bottom: 10px; }
        .offer-badge { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .offer-title { font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 2px; }
        .offer-desc { font-size: 12px; color: #6=66; line-height: 1.5; }

        /* MENU */
        .menu-section-header { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid #f5f5f5; cursor: pointer; }
        .menu-section-name { font-size: 14px; font-weight: 600; color: #1a1a1a; }
        .menu-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #fafafa; }
        .menu-item-left { display: flex; align-items: flex-start; gap: 8px; }
        .veg-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid; margin-top: 2px; flex-shrink: 0; }
        .item-name { font-size: 13px; font-weight: 500; color: #333; }
        .item-price { font-size: 13px; font-weight: 600; color: #1a1a1a; }

        /* PHOTOS */
        .photo-main { width: 100%; height: 220px; object-fit: cover; border-radius: 12px; }
        .photo-thumbs { display: flex; gap: 8px; margin-top: 10px; }
        .photo-thumb { width: 64px; height: 64px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s; flex-shrink: 0; }
        .photo-thumb.active { border-color: #e23744; }

        /* AMENITIES */
        .amenity-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .amenity-item { display: flex; flex-direction: column; align-items: center; gap: 7px; padding: 14px 8px; border-radius: 12px; background: #fafafa; border: 1px solid #f0f0f0; }
        .amenity-icon { width: 36px; height: 36px; border-radius: 10px; background: #fff4f5; display: flex; align-items: center; justify-content: center; }
        .amenity-label { font-size: 11px; font-weight: 500; color: #555; text-align: center; }

        /* RIGHT BOOKING CARD */
        .book-card { background: #1a1a1e; border-radius: 20px; overflow: hidden; position: sticky; top: 80px; }
        .book-header { padding: 18px 20px 14px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .book-title { font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 2px; }
        .book-sub { font-size: 11px; color: rgba(255,255,255,0.3); }

        /* GUEST SELECTOR */
        .guest-scroll { display: flex; gap: 8px; padding: 16px 20px; overflow-x: auto; scrollbar-width: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .guest-scroll::-webkit-scrollbar { display: none; }
        .guest-chip { min-width: 44px; height: 44px; border-radius: 10px; background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; font-family: 'DM Sans', sans-serif; flex-shrink: 0; }
        .guest-chip.sel { background: rgba(226,55,68,0.15); border-color: #e23744; color: #e23744; }
        .more-guests { min-width: 64px; font-size: 11px; text-align: center; }

        /* DATE SELECTOR */
        .date-section { padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .section-label { font-size: 10px; font-weight: 600; letter-spacing: 0.07em; color: rgba(255,255,255,0.3); text-transform: uppercase; margin-bottom: 10px; }
        .date-scroll-wrap { position: relative; }
        .date-scroll { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
        .date-scroll::-webkit-scrollbar { display: none; }
        .date-chip { flex-shrink: 0; width: 56px; padding: 8px 4px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.08); cursor: pointer; text-align: center; transition: all 0.15s; }
        .date-chip.sel { background: rgba(226,55,68,0.15); border-color: #e23744; }
        .date-num { font-size: 16px; font-weight: 700; color: rgba(255,255,255,0.85); line-height: 1; margin-bottom: 3px; }
        .date-num.sel-color { color: #e23744; }
        .date-day { font-size: 10px; color: rgba(255,255,255,0.4); font-weight: 500; }
        .date-day.sel-color { color: #e23744; }
        .date-off { margin-top: 4px; font-size: 9px; background: #16a34a; color: #fff; border-radius: 10px; padding: 1px 5px; font-weight: 600; display: inline-block; }
        .date-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.1); border: none; color: rgba(255,255,255,0.6); cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 2; }
        .date-arrow.left { left: -12px; }
        .date-arrow.right { right: -12px; }

        /* SESSION TABS */
        .session-section { padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .session-tabs { display: flex; gap: 6px; }
        .sess-tab { flex: 1; padding: 9px 6px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); font-size: 12px; font-weight: 600; cursor: pointer; text-align: center; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
        .sess-tab.sel { background: #1f2937; border-color: rgba(255,255,255,0.3); color: #fff; }

        /* SLOTS */
        .slots-section { padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .slot-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 7px; }
        .slot-btn { padding: 9px 4px; border-radius: 9px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); color: rgba(255,255,255,0.65); font-size: 12px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; text-align: center; transition: all 0.15s; }
        .slot-btn .off-tag { font-size: 10px; color: #16a34a; display: block; margin-top: 1px; }
        .slot-btn:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.2); color: #fff; }
        .slot-btn.sel { background: #e23744; border-color: #e23744; color: #fff; box-shadow: 0 2px 12px rgba(226,55,68,0.35); }
        .slot-btn.sel .off-tag { color: rgba(255,255,255,0.7); }
        .view-all-btn { width: 100%; margin-top: 8px; padding: 9px; border-radius: 9px; background: none; border: 1px dashed rgba(255,255,255,0.12); color: #e23744; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; gap: 5px; }
        .no-slots-msg { padding: 16px; text-align: center; color: rgba(255,255,255,0.25); font-size: 12px; }

        /* DETAILS FORM */
        .form-section { padding: 14px 20px; }
        .finput { width: 100%; padding: 11px 13px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); color: #fff; font-size: 13px; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s; margin-bottom: 10px; }
        .finput::placeholder { color: rgba(255,255,255,0.22); }
        .finput:focus { border-color: rgba(226,55,68,0.5); background: rgba(255,255,255,0.07); }
        .finput.err { border-color: rgba(239,68,68,0.55); }
        .errmsg { font-size: 11px; color: #f87171; margin-top: -6px; margin-bottom: 8px; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.4); cursor: pointer; }

        /* SUMMARY */
        .sel-summary { margin: 0 20px 14px; padding: 10px 12px; border-radius: 10px; background: rgba(226,55,68,0.08); border: 1px solid rgba(226,55,68,0.2); display: flex; flex-wrap: wrap; gap: 8px; }
        .sum-chip { font-size: 11px; color: #f87171; }

        /* PROCEED BTN */
        .proceed-btn { margin: 0 20px 20px; display: block; width: calc(100% - 40px); padding: 14px; border-radius: 12px; background: linear-gradient(135deg, #e23744 0%, #c0392b 100%); color: #fff; font-size: 14px; font-weight: 700; font-family: 'Sora', sans-serif; border: none; cursor: pointer; letter-spacing: 0.02em; transition: transform 0.2s, box-shadow 0.2s; }
        .proceed-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(226,55,68,0.4); }
        .proceed-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
        .free-note { text-align: center; font-size: 11px; color: rgba(255,255,255,0.2); padding-bottom: 16px; display: flex; align-items: center; justify-content: center; gap: 4px; }

        /* SUCCESS */
        .suc-wrap { padding: 28px 20px; text-align: center; }
        .suc-icon { width: 56px; height: 56px; border-radius: 50%; margin: 0 auto 14px; background: linear-gradient(135deg,#22c55e,#16a34a); display: flex; align-items: center; justify-content: center; }
        .bk-summary { background: rgba(255,255,255,0.04); border-radius: 12px; padding: 14px; margin: 14px 0; text-align: left; }
        .bk-row { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; }
        .bk-row:last-child { border-bottom: none; }
        .bk-k { color: rgba(255,255,255,0.33); }
        .bk-v { color: #fff; font-weight: 500; }
        .reset-link { background: none; border: none; color: rgba(255,255,255,0.3); font-size: 12px; cursor: pointer; text-decoration: underline; font-family: inherit; }
      `}</style>

      {/* HERO */}
      <div className="hero">
        <img src={restaurant.image} alt={restaurant.name} />
        <div className="hero-grad" />
        <div className="hero-info" style={{ maxWidth: 1160, margin: "0 auto", left: 0, right: 0, position: "absolute" }}>
          <div style={{ marginBottom: 6 }}>
            {restaurant.cuisine.split(", ").map((c) => (
              <span key={c} className="r-tag" style={{ marginRight: 6 }}>{c}</span>
            ))}
          </div>
          <div className="r-name">{restaurant.name}</div>
          <div className="r-meta">
            <span className="r-meta-item" style={{ color: "#facc15", fontWeight: 600 }}>
              <FiStar style={{ fill: "#facc15", strokeWidth: 0 }} /> {restaurant.rating}
              <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>&nbsp;· Excellent</span>
            </span>
            <span className="r-meta-item"><FiMapPin size={13} /> {restaurant.location}</span>
          </div>
        </div>
      </div>

      {/* PAGE BODY */}
      <div className="page-layout">

        {/* ── LEFT COLUMN ── */}
        <div className="left-panel">

          {/* TAB NAV */}
          <div className="card">
            <div className="tabs">
              {[
                { id: "offers",    label: "Offers",    Icon: FiGift },
                { id: "menu",      label: "Menu",      Icon: FiList },
                { id: "photos",    label: "Photos",    Icon: FiCamera },
                { id: "amenities", label: "Amenities", Icon: FiInfo },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  className={`tab-btn${activeTab === id ? " active" : ""}`}
                  onClick={() => setActiveTab(id)}
                >
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>

            <div className="card-pad">

            {/* OFFERS */}
{activeTab === "offers" && (
  <div>
    {OFFERS.map((o) => (
      <div
        key={o.title}
        className="offer-card"
        style={{
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: "14px",
          padding: "16px",
          marginBottom: "12px",
        }}
      >
        <div
          className="offer-badge"
          style={{
            background: "rgba(226,55,68,0.15)",
            color: "#e23744",
          }}
        >
          {o.badge}
        </div>

        <div>
          <div
            className="offer-title"
            style={{
              color: "#fff",
              fontWeight: 600,
            }}
          >
            {o.title}
          </div>

          <div
            className="offer-desc"
            style={{
              color: "rgba(255,255,255,0.7)",
              marginTop: "4px",
            }}
          >
            {o.desc}
          </div>
        </div>
      </div>
    ))}
  </div>
)}

              {/* MENU */}
              {activeTab === "menu" && (
  <div
    style={{
      background: "#141414",
      borderRadius: "12px",
      padding: "10px",
    }}
  >
    {MENU_SECTIONS.map((sec) => (
      <div key={sec.name}>
        <div
          className="menu-section-header"
          style={{
            borderBottom: "1px solid #2a2a2a",
          }}
          onClick={() =>
            setExpandedMenu(expandedMenu === sec.name ? null : sec.name)
          }
        >
          <span
            className="menu-section-name"
            style={{
              color: "#fff",
            }}
          >
            {sec.name}{" "}
            <span
              style={{
                color: "rgba(255,255,255,0.6)",
                fontWeight: 400,
              }}
            >
              ({sec.items.length})
            </span>
          </span>

          {expandedMenu === sec.name ? (
            <FiChevronUp size={16} color="#fff" />
          ) : (
            <FiChevronDown size={16} color="#fff" />
          )}
        </div>

        {expandedMenu === sec.name &&
          sec.items.map((item) => (
            <div
              key={item.name}
              className="menu-item"
              style={{
                borderBottom: "1px solid #222",
              }}
            >
              <div className="menu-item-left">
                <div
                  className="veg-dot"
                  style={{
                    borderColor: item.veg ? "#16a34a" : "#dc2626",
                    background: item.veg ? "#16a34a" : "#dc2626",
                  }}
                />
                <span
                  className="item-name"
                  style={{
                    color: "#fff",
                  }}
                >
                  {item.name}
                </span>
              </div>

              <span
                className="item-price"
                style={{
                  color: "#fff",
                }}
              >
                ₹{item.price}
              </span>
            </div>
          ))}
      </div>
    ))}
  </div>
)}

              {/* PHOTOS */}
              {activeTab === "photos" && (
                <div>
                  <img src={photos[photoIdx]} alt="restaurant" className="photo-main" />
                  <div className="photo-thumbs">
                    {photos.map((p, i) => (
                      <img key={i} src={p} alt="" className={`photo-thumb${photoIdx === i ? " active" : ""}`} onClick={() => setPhotoIdx(i)} />
                    ))}
                  </div>
                </div>
              )}

              {/* AMENITIES */}
              {activeTab === "amenities" && (
                <div className="amenity-grid">
                  {AMENITIES.map(({ icon: Icon, label }) => (
                    <div key={label} className="amenity-item">
                      <div className="amenity-icon"><Icon size={16} color="#e23744" /></div>
                      <span className="amenity-label">{label}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* ABOUT */}
          <div className="card card-pad">
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "1rem", fontWeight: 700,color: "#fff", marginBottom: 8 }}>About {restaurant.name}</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
              Experience premium dining at <strong style={{ color: "#fff" }}>{restaurant.name}</strong> — a celebrated destination for {restaurant.cuisine.toLowerCase()} cuisine in {restaurant.location}.
              Whether it's a casual lunch, family dinner, or a special celebration, we promise an unforgettable experience with exceptional food and warm hospitality.
            </p>
          </div>

        </div>

        {/* ── RIGHT BOOKING CARD ── */}
        <div>
          <div className="book-card">

            {confirmed ? (
              <div className="suc-wrap">
                <div className="suc-icon"><FiCheck size={24} color="#fff" strokeWidth={2.5} /></div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>You're all set!</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Confirmed at {restaurant.name}</div>
                <div className="bk-summary">
                  {[
                    ["📅 Date", formatDateFull(selectedDate)],
                    ["🕐 Time", slot],
                    ["👥 Guests", `${guests}`],
                    ["👤 Name", name],
                    ["📞 Phone", phone],
                  ].map(([k, v]) => (
                    <div key={k} className="bk-row">
                      <span className="bk-k">{k}</span>
                      <span className="bk-v">{v}</span>
                    </div>
                  ))}
                </div>
                <button className="reset-link" onClick={reset}>← Book another table</button>
              </div>
            ) : (
              <>
                <div className="book-header">
                  <div className="book-title">Book a Table</div>
                  <div className="book-sub">{restaurant.name} · Free · No payment needed</div>
                </div>

                {/* GUESTS */}
                <div style={{ padding: "12px 20px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="section-label">Number of guests</div>
                  <div className="guest-scroll">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                      <button key={g} className={`guest-chip${guests === g ? " sel" : ""}`} onClick={() => setGuests(g)}>{g}</button>
                    ))}
                    <button className={`guest-chip more-guests${guests > 8 ? " sel" : ""}`} onClick={() => setGuests(10)}>10+</button>
                  </div>
                  <div style={{ height: 12 }} />
                </div>

                {/* DATES */}
                <div className="date-section">
                  <div className="section-label">When are you visiting?</div>
                  <div className="date-scroll-wrap">
                    <div className="date-scroll" ref={dateScrollRef}>
                      {DAYS.map((d) => {
                        const isSel = selectedDate === d.date;
                        return (
                          <div
                            key={d.date}
                            className={`date-chip${isSel ? " sel" : ""}`}
                            onClick={() => { setSelectedDate(d.date); setSlot(""); setActiveSession(null); }}
                          >
                            <div className={`date-num${isSel ? " sel-color" : ""}`}>{PAD(d.num)}</div>
                            <div className={`date-day${isSel ? " sel-color" : ""}`}>{d.day}</div>
                            <span className="date-off">10% off</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* SESSION TABS */}
                {visibleSessions.length > 0 && (
                  <div className="session-section">
                    <div className="section-label">Meal</div>
                    <div className="session-tabs">
                      {visibleSessions.map((s) => (
                        <button
                          key={s.id}
                          className={`sess-tab${resolvedSession === s.id ? " sel" : ""}`}
                          onClick={() => { setActiveSession(s.id); setSlot(""); setShowAllSlots({}); }}
                        >
                          {s.emoji} {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SLOTS */}
                <div className="slots-section">
                  <div className="section-label">
                    Pick a time {errors.slot && <span style={{ color: "#f87171", textTransform: "none" }}>— {errors.slot}</span>}
                  </div>
                  {visibleSessions.length === 0 ? (
                    <div className="no-slots-msg">🌙 No more slots today. Select another date.</div>
                  ) : (
                    <>
                      <div className="slot-grid">
                        {displaySlots.map((s) => (
                          <button
                            key={s.val}
                            className={`slot-btn${slot === s.val ? " sel" : ""}`}
                            onClick={() => { setSlot(s.val); setErrors((e) => ({ ...e, slot: undefined })); }}
                          >
                            {s.label}
                            <span className="off-tag">10% off</span>
                          </button>
                        ))}
                      </div>
                      {allSlots.length > 12 && (
                        <button
                          className="view-all-btn"
                          onClick={() => setShowAllSlots((p) => ({ ...p, [resolvedSession]: !p[resolvedSession] }))}
                        >
                          {showAllSlots[resolvedSession] ? <><FiChevronUp size={13} /> View less</> : <><FiChevronDown size={13} /> View all slots</>}
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* FORM */}
                <div className="form-section">
                  <div className="section-label">Your details</div>
                  <input
                    type="text"
                    className={`finput${errors.name ? " err" : ""}`}
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((er) => ({ ...er, name: undefined })); }}
                  />
                  {errors.name && <div className="errmsg">{errors.name}</div>}
                  <input
                    type="tel"
                    className={`finput${errors.phone ? " err" : ""}`}
                    placeholder="10-digit mobile number"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setErrors((er) => ({ ...er, phone: undefined })); }}
                  />
                  {errors.phone && <div className="errmsg">{errors.phone}</div>}
                </div>

                {/* SUMMARY STRIP */}
                {slot && (
                  <div className="sel-summary">
                    <span className="sum-chip">📅 {formatDateFull(selectedDate)}</span>
                    <span className="sum-chip">🕐 {slot}</span>
                    <span className="sum-chip">👥 {guests} guests</span>
                  </div>
                )}

                {/* PROCEED */}
                <button className="proceed-btn" onClick={handleConfirm}>
                  Proceed
                </button>
                <div className="free-note"><FiInfo size={10} /> No credit card required</div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TableReservationPage;
