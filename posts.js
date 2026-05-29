/* ============================================================
   posts.js  —  YOUR PHOTO FEED
   ------------------------------------------------------------
   This is the ONLY file you need to edit to add a new photo.

   HOW TO ADD A PHOTO + CAPTION
   ----------------------------
   1. Put your image file inside the  assets/images/  folder
      (any size, any orientation — it adjusts automatically).
   2. Copy one block below (everything between the { curly braces },
      including the comma at the end).
   3. Paste it at the TOP of the list so newest photos show first.
   4. Change "image", "caption", "date", and "location".
   5. Save. Done — your new photo is live.

   Tip: keep "caption" short and personal. "date" and "location"
   are optional — leave them as "" (empty quotes) if you don't
   want to show them.
   ============================================================ */

const POSTS = [
  {
    image: "assets/images/photo-1.jpg",
    caption: "Write a short caption about this moment here.",
    date: "May 2026",
    location: "Dhaka, Bangladesh",
  },
  {
    image: "assets/images/photo-2.jpg",
    caption: "Another memory worth keeping. Replace this text.",
    date: "April 2026",
    location: "",
  },
  {
    image: "assets/images/photo-3.jpg",
    caption: "A day to remember. Add your own words.",
    date: "March 2026",
    location: "",
  },
  {
    image: "assets/images/photo-4.jpg",
    caption: "Tell the story behind this picture.",
    date: "February 2026",
    location: "",
  },
  {
    image: "assets/images/photo-5.jpg",
    caption: "Something that made you smile.",
    date: "January 2026",
    location: "",
  },
  {
    image: "assets/images/photo-6.jpg",
    caption: "A favourite view.",
    date: "December 2025",
    location: "",
  },
];

/* Make the list available to the page. Do not edit below. */
if (typeof window !== "undefined") {
  window.POSTS = POSTS;
}
