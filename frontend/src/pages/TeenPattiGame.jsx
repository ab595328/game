import { useEffect, useState } from "react";
import { ref, onValue, update, set } from "firebase/database";
import { db } from "./firebase";

const gameRef = ref(db, "game");

const SUITS = ["♠", "♥", "♦", "♣"];
const RANKS = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

const drawCard = () => ({
  suit: SUITS[Math.floor(Math.random() * 4)],
  rank: RANKS[Math.floor(Math.random() * 13)],
  open: false
});

export default function Teenpatti() {
  const [game, setGame] = useState(null);


  useEffect(() => {
    console.log("Pinging server to keep connection alive");
  update(gameRef, { __ping: Date.now() });
}, []);

  // 🔁 Firebase listener
  useEffect(() => {
    const unsub = onValue(gameRef, snap => {
      console.log("🔥 Firebase snapshot:", snap.val());
      setGame(snap.val());
    });
    return () => unsub();
  }, []);

  // ⏱️ Timer logic
  useEffect(() => {
    if (!game || game.status !== "BETTING") return;

    if (game.timer === 0) {
      openNextCard();
      return;
    }

    const t = setTimeout(() => {
      update(gameRef, { timer: game.timer - 1 });
    }, 1000);

    return () => clearTimeout(t);
  }, [game?.timer, game?.status]);

  // 🎴 Open next closed card
  const openNextCard = async () => {
    const nextIndex = game.cards.findIndex(c => !c.open);

    if (nextIndex === -1) {
      finishGame();
      return;
    }

    const newCards = [...game.cards];
    newCards[nextIndex].open = true;

    await update(gameRef, {
      cards: newCards,
      timer: 10,
      status: "BETTING",
      bet: { placed: false, player: null, amount: 0 }
    });
  };

  // 🏁 Finish game
  const finishGame = async () => {
    await update(gameRef, {
      status: "RESULT",
      winner: Math.random() > 0.5 ? "PLAYER 1" : "PLAYER 2"
    });

    setTimeout(resetGame, 5000);
  };

  // 🔄 Reset new game
  const resetGame = async () => {
    const newCards = [
      { player:"P1", ...drawCard() },
      { player:"P2", ...drawCard() },
      { player:"P1", ...drawCard() },
      { player:"P2", ...drawCard() },
      { player:"P1", ...drawCard() },
      { player:"P2", ...drawCard() }
    ];

    await set(gameRef, {
      status: "BETTING",
      timer: 10,
      cards: newCards,
      bet: { placed:false, player:null, amount:0 },
      winner: null
    });
  };

  // 💰 Place bet
  const placeBet = async (player, amount) => {
    if (game.bet.placed) return;
    if (game.status !== "BETTING") return;

    await update(gameRef, {
      bet: {
        placed: true,
        player,
        amount
      }
    });
  };

  if (!game) return <div className="text-white">Loading…</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* 🎴 BLACK TABLE */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10">

        {/* PLAYER 1 */}
        <div>
          <div className="text-center mb-2 text-yellow-400">PLAYER 1</div>
          <div className="flex gap-4">
            {game.cards.filter(c => c.player==="P1").map((c,i)=>(
              <Card key={i} card={c} />
            ))}
          </div>
        </div>

        {/* PLAYER 2 */}
        <div>
          <div className="text-center mb-2 text-yellow-400">PLAYER 2</div>
          <div className="flex gap-4">
            {game.cards.filter(c => c.player==="P2").map((c,i)=>(
              <Card key={i} card={c} />
            ))}
          </div>
        </div>
      </div>

      {/* ⏱️ TIMER */}
      {game.status==="BETTING" && (
        <div className="text-center py-2 bg-gray-800">
          Betting Time: {game.timer}s
        </div>
      )}

      {/* 🎯 BETTING PANEL */}
      {game.status==="BETTING" && (
        <div className="bg-white text-black p-4">

          <div className="text-center font-bold mb-2">
            WINNER (Odds 1.97)
          </div>

          <button
            disabled={game.bet.placed}
            onClick={() => placeBet("P1", game.bet.amount || 1000)}
            className="w-full bg-blue-500 text-white py-2 mb-2 rounded disabled:opacity-50"
          >
            Bet on PLAYER 1
          </button>

          <button
            disabled={game.bet.placed}
            onClick={() => placeBet("P2", game.bet.amount || 1000)}
            className="w-full bg-pink-500 text-white py-2 mb-3 rounded disabled:opacity-50"
          >
            Bet on PLAYER 2
          </button>

          {/* COIN BUTTONS */}
          <div className="grid grid-cols-4 gap-2">
            {[1000,5000,10000,25000].map(a=>(
              <button
                key={a}
                disabled={game.bet.placed}
                onClick={() =>
                  update(gameRef, {
                    bet: { ...game.bet, amount: a }
                  })
                }
                className="border py-2 rounded disabled:opacity-50"
              >
                {a}
              </button>
            ))}
          </div>

          {game.bet.placed && (
            <div className="text-center mt-2 text-green-600 font-bold">
              Bet placed on {game.bet.player} (₹{game.bet.amount})
            </div>
          )}
        </div>
      )}

      {/* 🏆 RESULT */}
      {game.status==="RESULT" && (
        <div className="text-center bg-green-600 py-3 text-xl">
          WINNER: {game.winner}
        </div>
      )}
    </div>
  );
}

// 🂠 CARD COMPONENT
function Card({ card }) {
  return (
    <div
      className={`w-20 h-28 rounded flex items-center justify-center text-2xl font-bold
      ${card.open ? "bg-white text-black" : "bg-red-700"}`}
    >
      {card.open ? `${card.rank}${card.suit}` : "🂠"}
    </div>
  );
}
