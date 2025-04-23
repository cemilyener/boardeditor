// src/state/useChessStore.js
import { create } from "zustand";

const useChessStore = create((set) => ({
    // Satranç tahtasının mevcut pozisyonu (FEN)
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    setFen: (newFen) => set(() => ({ fen: newFen })),

    // Soru bilgileri
    konu: "",         // örnek: "ka1"
    zorluk: "",       // 1-6
    puan: "",         // 1, 3, 5
    tasseti: "",      // 1-5
    soruSayisi: 0,    // 0'dan 18'e kadar artar

    // Güncelleyiciler
    setKonu: (konu) => set(() => ({ konu })),
    setZorluk: (zorluk) => set(() => ({ zorluk })),
    setPuan: (puan) => set(() => ({ puan })),
    setTasseti: (tasseti) => set(() => ({ tasseti })),
    artirSoru: () => set((state) => ({ soruSayisi: state.soruSayisi + 1 })),

    // Gerekirse sıfırlama işlemi
    resetBilgiler: () => set(() => ({
        konu: "", zorluk: "", puan: "", tasseti: "", soruSayisi: 0
    })),
}));

export default useChessStore;
