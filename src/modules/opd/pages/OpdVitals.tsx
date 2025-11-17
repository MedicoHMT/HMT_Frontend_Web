import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getVitals, saveVitals } from "../opd.api";
import "./css/vitals.css";
import type { OPDVitalsResponse } from "../opd.types";

export default function OpdVitals() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get visitId from URL
  const params = new URLSearchParams(location.search);
  const visitId = params.get("opdid");

  const [loading, setLoading] = useState(false);

  const [vitals, setVitals] = useState({
    temperature: "",
    pulseRate: "",
    respiratoryRate: "",
    spo2: "",
    bloodPressureSys: "",
    bloodPressureDia: "",
    weight: "",
    height: "",
  });

  useEffect(() => {
    loadExistingVitals();
  }, []);

  const loadExistingVitals = async () => {
    try {
      const res = await getVitals(visitId!); 

      const data: OPDVitalsResponse = res.data;

      // EXISTING VITALS FOUND → PREFILL INPUTS
      if (data) {
        const [sys, dia] = data.bp?.split("/") ?? ["", ""];

        setVitals({
          temperature: data.temperature?.toString() ?? "",
          pulseRate: data.pulse?.toString() ?? "",
          respiratoryRate: data.respiration?.toString() ?? "",
          spo2: data.spo2?.toString() ?? "",
          bloodPressureSys: sys,
          bloodPressureDia: dia,
          weight: data.weight?.toString() ?? "",
          height: data.height?.toString() ?? "",
        });
      }
    } catch (err) {
      // If no vitals exist → form stays empty (normal flow)
      console.log("Vitals not found, showing empty form");
    }
  };

  const handleChange = (field: string, value: string) => {
    setVitals((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const bpString = `${vitals.bloodPressureSys}/${vitals.bloodPressureDia}`;

      const payload = {
        opdid: visitId,
        pulse: Number(vitals.pulseRate),
        spo2: Number(vitals.spo2),
        bp: bpString,
        temperature: Number(vitals.temperature),
        respiration: Number(vitals.respiratoryRate),
        weight: Number(vitals.weight),
        height: Number(vitals.height),
      };

      await saveVitals(payload);

      navigate(`/opd/assessment?visitId=${visitId}`);

    } catch (err) {
      console.error(err);
      alert("Failed to save vitals");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vitals-container">
      <h2 className="vitals-title">Patient Vitals</h2>

      <div className="vitals-grid">

        <input
          type="number"
          placeholder="Temperature (°F)"
          value={vitals.temperature}
          onChange={(e) => handleChange("temperature", e.target.value)}
        />

        <input
          type="number"
          placeholder="Pulse Rate (/min)"
          value={vitals.pulseRate}
          onChange={(e) => handleChange("pulseRate", e.target.value)}
        />

        <input
          type="number"
          placeholder="Respiratory Rate (/min)"
          value={vitals.respiratoryRate}
          onChange={(e) => handleChange("respiratoryRate", e.target.value)}
        />

        <input
          type="number"
          placeholder="SPO2 (%)"
          value={vitals.spo2}
          onChange={(e) => handleChange("spo2", e.target.value)}
        />

        <div className="bp-group">
          <input
            type="number"
            placeholder="BP Sys"
            value={vitals.bloodPressureSys}
            onChange={(e) => handleChange("bloodPressureSys", e.target.value)}
          />

          <span>/</span>

          <input
            type="number"
            placeholder="BP Dia"
            value={vitals.bloodPressureDia}
            onChange={(e) => handleChange("bloodPressureDia", e.target.value)}
          />
        </div>

        <input
          type="number"
          placeholder="Weight (kg)"
          value={vitals.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
        />

        <input
          type="number"
          placeholder="Height (cm)"
          value={vitals.height}
          onChange={(e) => handleChange("height", e.target.value)}
        />
      </div>

      <div className="vitals-footer">
        <button className="btn-cancel" onClick={() => navigate(-1)}>Back</button>

        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
