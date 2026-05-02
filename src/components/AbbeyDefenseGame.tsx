'use client';

import React, { useState, useEffect, useRef } from 'react';

type EntityType = 'monk' | 'devil';

interface Entity {
  id: string;
  type: EntityType;
  x: number; // 0 to 100 (percentage)
  hp: number;
  maxHp: number;
  attack: number;
  attackCooldown: number;
  lastAttackTime: number;
  speed: number;
}

const MONK_COST = 10;
const BASE_MAX_HP = 500;

export default function AbbeyDefenseGame() {
  const [coins, setCoins] = useState(0);
  const [playerBaseHp, setPlayerBaseHp] = useState(BASE_MAX_HP);
  const [enemyBaseHp, setEnemyBaseHp] = useState(BASE_MAX_HP);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [kills, setKills] = useState(0);
  const [deaths, setDeaths] = useState(0);

  // We use refs for entities so the animation loop can mutate them without triggering re-renders every frame
  // We'll trigger a re-render manually or sync state at 60fps for UI, but the source of truth is the ref to avoid state closure hell.
  const entitiesRef = useRef<Entity[]>([]);
  const lastTimeRef = useRef<number>(Date.now());
  const enemySpawnTimerRef = useRef<number>(0);
  const nextEnemySpawnTimeRef = useRef<number>(3);
  const coinTimerRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const [, setRenderTrigger] = useState(0); // Force re-render

  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = () => {
      const now = Date.now();
      const dt = (now - lastTimeRef.current) / 1000; // delta time in seconds
      lastTimeRef.current = now;

      // 1. Generate Coins
      coinTimerRef.current += dt;
      if (coinTimerRef.current >= 1) { // 1 coin per second
        setCoins(c => c + 1);
        coinTimerRef.current = 0;
      }

      // 2. Enemy Spawning
      enemySpawnTimerRef.current += dt;
      if (enemySpawnTimerRef.current >= nextEnemySpawnTimeRef.current) { 
        enemySpawnTimerRef.current = 0;
        nextEnemySpawnTimeRef.current = Math.random() * 3.5 + 1.0; // Random interval between 1.0 and 4.5 seconds
        entitiesRef.current.push({
          id: Math.random().toString(36).substring(7),
          type: 'devil',
          x: 95,
          hp: 20,
          maxHp: 20,
          attack: 5,
          attackCooldown: 1,
          lastAttackTime: 0,
          speed: -5, // Moves left
        });
      }

      // 3. Entity Logic (Movement and Combat)
      const entities = entitiesRef.current;
      
      // Separate by type for easier targeting
      const monks = entities.filter(e => e.type === 'monk');
      const devils = entities.filter(e => e.type === 'devil');

      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        if (entity.hp <= 0) continue;

        let isMoving = true;

        if (entity.type === 'monk') {
          // Find closest devil within range
          const target = devils.find(d => d.hp > 0 && Math.abs(d.x - entity.x) < 5);
          if (target) {
            isMoving = false; // Stop to fight
            if (now - entity.lastAttackTime >= entity.attackCooldown * 1000) {
              target.hp -= entity.attack;
              entity.lastAttackTime = now;
            }
          } else if (entity.x >= 90) {
            // Reached enemy base
            isMoving = false;
            entity.x = 90; // clamp position
            if (now - entity.lastAttackTime >= entity.attackCooldown * 1000) {
              setEnemyBaseHp(hp => Math.max(0, hp - entity.attack));
              entity.lastAttackTime = now;
            }
          }
        } else {
          // Devil logic
          // Find closest monk within range
          const target = monks.find(m => m.hp > 0 && Math.abs(entity.x - m.x) < 5);
          if (target) {
            isMoving = false;
            if (now - entity.lastAttackTime >= entity.attackCooldown * 1000) {
              target.hp -= entity.attack;
              entity.lastAttackTime = now;
            }
          } else if (entity.x <= 10) {
            // Reached player base
            isMoving = false;
            entity.x = 10; // clamp position
            if (now - entity.lastAttackTime >= entity.attackCooldown * 1000) {
              setPlayerBaseHp(hp => Math.max(0, hp - entity.attack));
              entity.lastAttackTime = now;
            }
          }
        }

        if (isMoving) {
          entity.x += entity.speed * dt;
        }
      }

      // 4. Cleanup dead entities
      const deadMonks = entitiesRef.current.filter(e => e.hp <= 0 && e.type === 'monk').length;
      const deadDevils = entitiesRef.current.filter(e => e.hp <= 0 && e.type === 'devil').length;
      
      if (deadMonks > 0) setDeaths(d => d + deadMonks);
      if (deadDevils > 0) setKills(k => k + deadDevils);

      entitiesRef.current = entitiesRef.current.filter(e => e.hp > 0);

      // 5. Check win/loss
      setEnemyBaseHp(hp => {
        if (hp <= 0) setGameState('won');
        return hp;
      });
      setPlayerBaseHp(hp => {
        if (hp <= 0) setGameState('lost');
        return hp;
      });

      // Force render to update UI
      setRenderTrigger(prev => prev + 1);

      if (gameState === 'playing') {
        frameRef.current = requestAnimationFrame(gameLoop);
      }
    };

    lastTimeRef.current = Date.now();
    frameRef.current = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(frameRef.current);
  }, [gameState]);

  const spawnMonk = () => {
    if (coins >= MONK_COST) {
      setCoins(c => c - MONK_COST);
      entitiesRef.current.push({
        id: Math.random().toString(36).substring(7),
        type: 'monk',
        x: 10,
        hp: 21,
        maxHp: 21,
        attack: 10,
        attackCooldown: 1,
        lastAttackTime: 0,
        speed: 5, // Moves right
      });
    }
  };

  const restart = () => {
    setCoins(0);
    setPlayerBaseHp(BASE_MAX_HP);
    setEnemyBaseHp(BASE_MAX_HP);
    setKills(0);
    setDeaths(0);
    entitiesRef.current = [];
    setGameState('playing');
  };

  return (
    <div className="w-full aspect-video bg-gray-900 flex flex-col border border-gray-800 rounded relative overflow-hidden select-none">
      
      {/* Top UI Bar */}
      <div className="absolute top-0 left-0 w-full p-2 flex justify-between items-start z-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        
        {/* Player Stats */}
        <div className="pointer-events-auto">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <div className="text-yellow-400 font-bold bg-black/50 px-2 py-1 rounded w-fit border border-yellow-700 flex items-center">
                🪙 {coins}
              </div>
              <div className="text-gray-300 font-bold bg-black/50 px-2 py-1 rounded w-fit border border-gray-700 text-xs flex items-center gap-2">
                <span className="text-green-400">K: {kills}</span>
                <span className="text-red-400">D: {deaths}</span>
              </div>
            </div>
            <button 
              onClick={spawnMonk}
              disabled={coins < MONK_COST || gameState !== 'playing'}
              className="bg-[#f90] text-black font-bold px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition border border-orange-800"
            >
              Spawn Monk ({MONK_COST} 🪙)
            </button>
          </div>
        </div>

        {/* Game State Overlay */}
        {gameState !== 'playing' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 p-6 rounded-lg border-2 border-[#f90] text-center pointer-events-auto flex flex-col items-center shadow-[0_0_20px_#f90]">
            <h2 className="text-4xl font-bold mb-2">
              {gameState === 'won' ? 'DEUS VULT!' : 'PURGATORY AWAITS'}
            </h2>
            <p className="text-gray-400 mb-4">
              {gameState === 'won' ? 'The holy lands have been purged.' : 'The abbey has fallen to the darkness.'}
            </p>
            <button onClick={restart} className="bg-[#f90] text-black font-bold px-6 py-2 rounded hover:bg-orange-600 transition">
              Play Again
            </button>
          </div>
        )}

        {/* Enemy Stats (Passive) */}
        <div>
          <div className="text-red-500 font-bold bg-black/50 px-2 py-1 rounded border border-red-900">
            Wave 1
          </div>
        </div>
      </div>

      {/* Game Field */}
      <div className="relative flex-1 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] bg-gray-900 border-t border-b border-gray-800 my-10 overflow-hidden">
        
        {/* Player Base (Abbey) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-32 flex flex-col items-center justify-center z-10">
          <div className="text-6xl filter drop-shadow-lg mb-2">⛪</div>
          {/* Base Health Bar */}
          <div className="w-16 h-2 bg-red-900 border border-black rounded overflow-hidden">
            <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${(playerBaseHp / BASE_MAX_HP) * 100}%` }}></div>
          </div>
        </div>

        {/* Enemy Base (Hell Portal) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-32 flex flex-col items-center justify-center z-10">
          <div className="text-6xl filter drop-shadow-lg mb-2">🔥</div>
          {/* Base Health Bar */}
          <div className="w-16 h-2 bg-red-900 border border-black rounded overflow-hidden">
            <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${(enemyBaseHp / BASE_MAX_HP) * 100}%` }}></div>
          </div>
        </div>

        {/* Entities */}
        {entitiesRef.current.map(entity => (
          <div 
            key={entity.id}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-center transition-transform duration-75"
            style={{ left: `${entity.x}%` }}
          >
            <div className="text-3xl filter drop-shadow-md mb-1">
              {entity.type === 'monk' ? '🙏' : '👿'}
            </div>
            {/* Entity Health Bar */}
            <div className="w-8 h-1 bg-red-900 rounded overflow-hidden">
              <div className="h-full bg-green-400" style={{ width: `${(entity.hp / entity.maxHp) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="h-10 bg-gray-950 flex items-center justify-center text-xs text-gray-700 font-mono">
        paterhub interactive entertainment system
      </div>
    </div>
  );
}
