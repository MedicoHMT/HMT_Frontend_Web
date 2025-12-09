// AddDepartmentModal.tsx
import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { createDepartmentApi } from "../../departments/department.api";
import type { DepartmentRequest } from "../../departments/department.type";

type AddDepartmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; 
};

type FormState = {
  code: string;
  name: string;
  description?: string;
};

export default function AddDepartmentModal({
  isOpen,
  onClose,
  onSuccess,
}: AddDepartmentModalProps) {
  const [form, setForm] = useState<FormState>({ code: "", name: "", description: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // focus management: focus first input when opened
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 80);
    } else {
      setForm({ code: "", name: "", description: "" });
      setErrors({});
      setServerError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // basic client-side validation
  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.code || form.code.trim().length < 1) e.code = "Code is required.";
    if (!form.name || form.name.trim().length < 1) e.name = "Name is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload: DepartmentRequest = {
        code: form.code.trim(),
        name: form.name.trim(),
        description: form.description?.trim() || null,
      };

      await createDepartmentApi(payload);

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Department create error:", err);
      setServerError(err?.message || "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="add-dept-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          if (!isSubmitting) onClose();
        }}
      />

      <div className="relative z-10 w-full max-w-xl mx-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden"
        >
            
          <div className="flex items-center justify-between px-4 py-3 border-b dark:border-neutral-700">
            <h3 id="add-dept-title" className="text-lg font-semibold">
              Create Department
            </h3>
            <button
              type="button"
              onClick={() => {
                if (!isSubmitting) onClose();
              }}
              className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {serverError && (
              <div className="alert alert-danger" role="status">
                <strong className="mr-2">Error:</strong>
                <span>{serverError}</span>
              </div>
            )}

            <div>
              <label className="form-label">Code</label>
              <input
                ref={firstInputRef}
                type="text"
                className={`form-control ${errors.code ? "is-invalid" : ""}`}
                value={form.code}
                onChange={(ev) => setForm({ ...form, code: ev.target.value })}
                placeholder="e.g., CARD, ENT"
                disabled={isSubmitting}
              />
              {errors.code && <div className="invalid-feedback">{errors.code}</div>}
            </div>

            <div>
              <label className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={form.name}
                onChange={(ev) => setForm({ ...form, name: ev.target.value })}
                placeholder="e.g., Cardiology"
                disabled={isSubmitting}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div>
              <label className="form-label">Description (optional)</label>
              <textarea
                className="form-control"
                rows={3}
                value={form.description}
                onChange={(ev) => setForm({ ...form, description: ev.target.value })}
                placeholder="Optional department description"
                disabled={isSubmitting}
              />
            </div>
          </div>


          <div className="flex items-center justify-end gap-2 px-4 py-3 border-t dark:border-neutral-700">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                if (!isSubmitting) onClose();
              }}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="spinner-border spinner-border-sm" role="status" />
                  Creating...
                </span>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
