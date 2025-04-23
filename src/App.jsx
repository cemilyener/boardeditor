import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import useChessStore from "./state/useChessStore";

function App() {
    const [chess] = useState(new Chess());

    // Zustand'dan durumları al
    const fen = useChessStore((state) => state.fen);
    const setFen = useChessStore((state) => state.setFen);

    const konu = useChessStore((state) => state.konu);
    const zorluk = useChessStore((state) => state.zorluk);
    const puan = useChessStore((state) => state.puan);
    const tasseti = useChessStore((state) => state.tasseti);
    const soruSayisi = useChessStore((state) => state.soruSayisi);

    const setKonu = useChessStore((state) => state.setKonu);
    const setZorluk = useChessStore((state) => state.setZorluk);
    const setPuan = useChessStore((state) => state.setPuan);
    const setTasseti = useChessStore((state) => state.setTasseti);

    const secimTamamlandi = konu && zorluk && puan && tasseti;

    const [inputValue, setInputValue] = useState(fen);

    const handleReset = () => {
        chess.reset();
        const newFen = chess.fen();
        setFen(newFen);
        setInputValue(newFen);
    };

    const handleMove = (sourceSquare, targetSquare) => {
        const move = chess.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
        });

        if (move) {
            setFen(chess.fen());
            return true;
        } else {
            alert("Bu hamle geçersiz!");
            return false;
        }
    };

    const handleFenUpdate = () => {
        if (inputValue.trim() === "") {
            alert("Lütfen bir FEN kodu gir!");
            return;
        }
        try {
            chess.load(inputValue);
            setFen(inputValue);
        } catch (error) {
            console.error("FEN hatası:", error.message);
            alert("FEN kodu yanlış, lütfen kontrol et!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-start p-4 min-h-screen bg-gray-100 gap-4">
            <p className="text-sm text-gray-700">
                <b>{soruSayisi}</b> / 18 soru oluşturuldu.
            </p>

            {/* Info Kart */}
            <div className="w-full max-w-[400px] bg-white shadow-md rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4">Soru Ayarları</h3>

                <label className="block mb-1">Dosya Adı / Konu:</label>
                <input
                    type="text"
                    placeholder="örnek: ka1"
                    className="mb-3 w-full border border-gray-300 rounded px-2 py-1"
                    onChange={(e) => setKonu(e.target.value)}
                />

                <label className="block mb-1">Zorluk (1-6):</label>
                <input
                    type="number"
                    min="1"
                    max="6"
                    className="mb-3 w-full border border-gray-300 rounded px-2 py-1"
                    onChange={(e) => setZorluk(e.target.value)}
                />

                <label className="block mb-1">Puan (1, 3, 5):</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    step="2"
                    className="mb-3 w-full border border-gray-300 rounded px-2 py-1"
                    onChange={(e) => setPuan(e.target.value)}
                />

                <label className="block mb-1">Taş Seti (1-5):</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    className="mb-3 w-full border border-gray-300 rounded px-2 py-1"
                    onChange={(e) => setTasseti(e.target.value)}
                />
            </div>

            {/* Tahta ve Kontroller sadece seçim tamamlanınca görünür */}
            {secimTamamlandi && (
                <div className="flex flex-col md:flex-row items-start justify-center gap-8">
                    {/* Satranç Tahtası */}
                    <div className="flex justify-center w-[400px] max-w-[400px]">
                        <Chessboard position={fen} onPieceDrop={handleMove} boardWidth={400} />
                    </div>

                    {/* Kontroller */}
                    <div className="w-full max-w-[400px] bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Tahta Kontrolleri</h3>

                        <button
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-red-600 transition-colors"
                            onClick={handleReset}
                        >
                            Tahtayı Sıfırla
                        </button>

                        <div className="mb-4">
                            <label className="block font-medium text-gray-700 mb-2">FEN Yapıştır:</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="FEN kodu gir..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button
                                className="mt-2 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                                onClick={handleFenUpdate}
                            >
                                FEN'i Uygula
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
