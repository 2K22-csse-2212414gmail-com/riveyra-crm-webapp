// routes/location.js
const express = require("express");
const fetch = require("node-fetch");
const Location = require("../models/Location");

const router = express.Router();

// POST /api/location/
function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
router.post("/reverse", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (latitude == null || longitude == null) {
      return res
        .status(400)
        .json({ success: false, message: "Coordinates required" });
    }

    const OFFICE_LAT = 26.49827;
    const OFFICE_LNG = 80.27823;
    const distanceKm = haversineKm(latitude, longitude, OFFICE_LAT, OFFICE_LNG);

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("GOOGLE_MAPS_API_KEY is missing");
      return res
        .status(500)
        .json({ success: false, message: "Server configuration error" });
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    const geoRes = await fetch(url);
    const geoData = await geoRes.json();

    if (geoData.status !== "OK" || !geoData.results.length) {
      console.error("Reverse geocode error:", geoData);
      return res.status(400).json({
        success: false,
        message: "Unable to get address from coordinates",
        geocodeStatus: geoData.status,
      });
    }

    const result = geoData.results[0];
    const formattedAddress = result.formatted_address;

    res.json({
      success: true,
      reply: "Location updated successfully.",
      address: formattedAddress,
      distanceKm,
      within10Km: distanceKm <= 10,
      message:
        distanceKm <= 10
          ? `You are ${distanceKm.toFixed(2)} km from the office (within 10 km).`
          : `You are ${distanceKm.toFixed(2)} km from the office.`,
      location: {
        address: formattedAddress,
        latitude,
        longitude,
      },
    });
  } catch (err) {
    console.error("Reverse geocoding error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Optional: office location endpoint
router.get("/office", (req, res) => {
  const OFFICE_LAT = 26.49827;   // example
const OFFICE_LNG = 80.27823; 
  const officeLocation = {
    latitude: OFFICE_LAT,
    longitude: OFFICE_LNG,
  };
  res.json({ success: true, location: officeLocation });
});

module.exports = router;