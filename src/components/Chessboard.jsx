import React from "react";
import { Chessboard } from "react-chessboard";
import useChessStore from "./state/chessStore";

function App() {
    const [chess] = useState(new Chess()); // Chess.js nesnesi
    const fen = useChessStore((state) => state.fen);
    const setFen = useChessStore((state) => state.setFen);

    // Hamle işlemini yönetmek
    const handleMove = (sourceSquare, targetSquare) => {
        const move = chess.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // Piyon terfisi için varsayılan olarak 'queen'
        });

        if (move) {
            setFen(chess.fen()); // Eğer hamle geçerliyse yeni FEN pozisyonunu kaydet
            return true;
        } else {
            return false; // Geçersiz hamleyi iptal et
        }
    };


    // Reset işlemi
    const handleReset = () => {
        setFen("start");
    };

    return (
        <div className="flex flex-col md:flex-row items-start justify-center p-4 gap-8  bg-gray-100">
            {/* Chessboard */}
            <div className="flex justify-center">
                <Chessboard boardWidth={400} />
                </div>


            {/* Info Kart */}
            <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Tahta Kontrolleri</h3>

                {/* Reset Butonu */}
                <button
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-red-600 transition"
                    onClick={handleReset}
                >
                    Tahtayı Sıfırla
                </button>

                {/* Ok Turn Butonu */}
                <button
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 transition"
                    onClick={() => console.log("Ok Turn!")}
                >
                    Sıradaki Hamle
                </button>

                {/* FEN Giriş Alanı */}
                <div className="mb-4">
                    <label className="block font-medium text-gray-700 mb-2">FEN Yapıştır:</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="FEN kodu gir..."
                        onChange={(e) => setFen(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;