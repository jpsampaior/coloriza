"use client";

import { createRecord } from "@/actions/database/createRecord";
import { deleteRecord } from "@/actions/database/deleteRecord";
import { fetchRecords } from "@/actions/database/fetchRecord";
import { updateRecord } from "@/actions/database/updateRecord";
import Loading from "@/app/(protected)/painel/loading";
import { Paint } from "@prisma/client";
import { createContext, useContext, useState, useEffect } from "react";

interface PaintContextType {
  paints: Paint[];
  loading: boolean;
  error: string | null;
  addPaint: (
    newPaint: Omit<Paint, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  editPaint: (id: string, data: any) => Promise<void>;
  deletePaint: (id: string) => Promise<void>;
}

const PaintContext = createContext<PaintContextType | undefined>(undefined);

export const PaintProvider = ({ children }: { children: React.ReactNode }) => {
  const [paints, setPaints] = useState<Paint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPaints = async () => {
      setLoading(true);
      try {
        const { data: fetchedPaints } = await fetchRecords("paint");
        setPaints(fetchedPaints);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPaints();
  }, []);

  const addPaint = async (
    newPaint: Omit<Paint, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const { data: createdPaint } = await createRecord("paint", newPaint);
      setPaints((prev) => [...prev, createdPaint]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const editPaint = async (id: string, data: any) => {
    try {
      await updateRecord("paint", id, data);
      setPaints((prev) =>
        prev.map((paint) => (paint.id === id ? { ...paint, ...data } : paint))
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deletePaint = async (id: string) => {
    try {
      await deleteRecord("paint", id);
      setPaints((prev) => prev.filter((paint) => paint.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <PaintContext.Provider
      value={{ paints, loading, error, addPaint, editPaint, deletePaint }}
    >
      {children}
    </PaintContext.Provider>
  );
};

export const usePaints = () => {
  const context = useContext(PaintContext);
  if (!context) {
    throw new Error("usePaints deve ser usado dentro de um PaintProvider");
  }
  return context;
};
