export async function fetchProperties() {
  await new Promise((r) => setTimeout(r, 300));
  try {
    const data = await import("../data/properties.json");
    return { ok: true, data: data.default };
  } catch (err) {
    console.error("Error loading properties:", err);
    return { ok: false, error: "Failed to load properties" };
  }
}

export async function fetchPropertyById(id) {
  await new Promise((r) => setTimeout(r, 200));
  try {
    const data = await import("../data/properties.json");
    const found = data.default.find((p) => String(p.id) === String(id));
    if (!found) return { ok: false, error: "Not found" };
    return { ok: true, data: found };
  } catch (err) {
    console.error("Error loading property:", err);
    return { ok: false, error: "Failed to load property" };
  }
}
