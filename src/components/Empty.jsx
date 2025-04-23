const ChessboardComponent = () => {
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

    return (
        <div className="flex justify-center w-[400px] max-w-[400px]">
            <Chessboard position={fen} onPieceDrop={handleMove} boardWidth={400} />
        </div>
    );
};