export const bookings = [
  { id: "WS-2841", customer: "Olivia Martin", initials: "OM", service: "Product Strategy Sprint", staff: "Rav Singh", date: "Today, 9:30 AM", duration: "90 min", amount: "$2,400", status: "Confirmed" },
  { id: "WS-2840", customer: "Noah Williams", initials: "NW", service: "AI Workflow Audit", staff: "Maya Chen", date: "Today, 11:30 AM", duration: "60 min", amount: "$1,850", status: "Pending" },
  { id: "WS-2839", customer: "Ava Thompson", initials: "AT", service: "Brand System Review", staff: "Sofia Reed", date: "Today, 1:30 PM", duration: "60 min", amount: "$1,200", status: "Confirmed" },
  { id: "WS-2838", customer: "Ethan Walker", initials: "EW", service: "Technical Advisory", staff: "Daniel Cole", date: "Today, 3:00 PM", duration: "45 min", amount: "$950", status: "Completed" },
  { id: "WS-2837", customer: "Isla Harris", initials: "IH", service: "Digital Experience Workshop", staff: "Rav Singh", date: "Tomorrow, 10:00 AM", duration: "180 min", amount: "$4,800", status: "Confirmed" },
  { id: "WS-2836", customer: "Lucas King", initials: "LK", service: "Conversion Review", staff: "Maya Chen", date: "Tomorrow, 12:30 PM", duration: "60 min", amount: "$1,450", status: "Cancelled" },
];

export const services = [
  { name: "Product Strategy Sprint", category: "Strategy", duration: "90 min", price: "$2,400", bookings: 42, revenue: "$100,800", active: true },
  { name: "AI Automation Sprint", category: "AI & Automation", duration: "2 weeks", price: "$12,500", bookings: 18, revenue: "$225,000", active: true },
  { name: "Digital Experience Workshop", category: "Product Design", duration: "180 min", price: "$4,800", bookings: 26, revenue: "$124,800", active: true },
  { name: "Brand System Review", category: "Brand", duration: "60 min", price: "$1,200", bookings: 31, revenue: "$37,200", active: true },
  { name: "Technical Advisory", category: "Technology", duration: "45 min", price: "$950", bookings: 24, revenue: "$22,800", active: false },
];

export const staff = [
  { name: "Rav Singh", initials: "RS", role: "Founder & Product Director", status: "Strategy session", bookings: 34, rating: 5, revenue: "$128,400", tone: "violet" as const },
  { name: "Maya Chen", initials: "MC", role: "AI Solutions Lead", status: "Available", bookings: 28, rating: 4.9, revenue: "$104,600", tone: "rose" as const },
  { name: "Sofia Reed", initials: "SR", role: "Design Director", status: "Client workshop", bookings: 31, rating: 4.9, revenue: "$92,800", tone: "blue" as const },
  { name: "Daniel Cole", initials: "DC", role: "Technical Director", status: "Available", bookings: 22, rating: 4.9, revenue: "$86,250", tone: "green" as const },
];

export const customers = [
  { name: "Olivia Martin", initials: "OM", email: "olivia@northstarcapital.com", visits: 12, spent: "$84,200", lastVisit: "Today", tag: "Enterprise" },
  { name: "Ava Thompson", initials: "AT", email: "ava@formhouse.co", visits: 8, spent: "$46,800", lastVisit: "Today", tag: "Retainer" },
  { name: "Isla Harris", initials: "IH", email: "isla@lumenhealth.com", visits: 5, spent: "$62,400", lastVisit: "12 Jun", tag: "High value" },
  { name: "Noah Williams", initials: "NW", email: "noah@atlaslogistics.com", visits: 3, spent: "$18,600", lastVisit: "8 Jun", tag: "New" },
  { name: "Ethan Walker", initials: "EW", email: "ethan@aperturegroup.io", visits: 9, spent: "$71,250", lastVisit: "4 Jun", tag: "Retainer" },
];

export const reviews = [
  { customer: "Olivia Martin", initials: "OM", rating: 5, time: "2 hours ago", service: "Product Strategy Sprint", text: "WS Labs turned a complex product challenge into a clear, commercially grounded roadmap. Rav and the team operate at an exceptional level.", replied: false },
  { customer: "Ava Thompson", initials: "AT", rating: 5, time: "Yesterday", service: "Brand System Review", text: "The level of taste, strategic thinking and attention to detail was outstanding. Our new system feels years ahead of where we were.", replied: true },
  { customer: "Grace Mitchell", initials: "GM", rating: 5, time: "3 days ago", service: "AI Automation Sprint", text: "The automation work has already saved our operations team more than twenty hours each week. The impact was immediate.", replied: false },
];

export const messages = [
  { name: "Olivia Martin", initials: "OM", preview: "The roadmap looks excellent. Ready for phase two.", time: "2m", unread: 2, online: true },
  { name: "Isla Harris", initials: "IH", preview: "Could we add our COO to tomorrow’s workshop?", time: "18m", unread: 1, online: true },
  { name: "Noah Williams", initials: "NW", preview: "Thanks for sending the automation brief.", time: "1h", unread: 0, online: false },
  { name: "Ava Thompson", initials: "AT", preview: "The team loves the new design system.", time: "4h", unread: 0, online: false },
];

export const chartData = [38, 46, 43, 57, 54, 68, 72, 79, 76, 91, 96, 112];
