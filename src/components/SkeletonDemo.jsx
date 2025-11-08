import React from 'react';
import { 
  PokemonCardSkeleton, 
  ScoreDisplaySkeleton, 
  GameControlsSkeleton,
  SkeletonImage,
  SkeletonText,
  SkeletonBadge
} from './LoadingSkeletons';

// Demo component to showcase all skeleton loading states
const SkeletonDemo = () => {
  return (
    <div style={{ padding: '20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>
        Loading Skeleton Components Demo
      </h1>
      
      {/* Complete game loading state */}
      <div style={{ marginBottom: '50px' }}>
        <h2 style={{ color: 'white', marginBottom: '20px' }}>Complete Game Loading State</h2>
        <main className="game-container">
          <ScoreDisplaySkeleton />
          
          <div className="pokemon-cards">
            <PokemonCardSkeleton position="left" className="skeleton-fade-in" />
            <div className="vs-section">
              <div className="vs-text pulse-slow">VS</div>
            </div>
            <PokemonCardSkeleton position="right" className="skeleton-fade-in" />
          </div>
          
          <GameControlsSkeleton className="skeleton-fade-in" />
        </main>
      </div>
      
      {/* Individual skeleton components */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'white', marginBottom: '20px' }}>Individual Skeleton Components</h2>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ color: 'white', marginBottom: '10px' }}>Image Skeleton</h3>
            <SkeletonImage width={200} height={200} />
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ color: 'white', marginBottom: '10px' }}>Text Skeletons</h3>
            <SkeletonText width="150px" height="20px" />
            <br />
            <SkeletonText width="100px" height="16px" />
            <br />
            <SkeletonText width="80px" height="14px" />
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ color: 'white', marginBottom: '10px' }}>Badge Skeletons</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <SkeletonBadge width={70} height={28} />
              <SkeletonBadge width={60} height={28} />
              <SkeletonBadge width={80} height={28} />
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', color: 'white', fontSize: '14px', opacity: 0.8 }}>
        🎮 These skeleton components provide smooth loading states while Pokemon data is being fetched!
      </div>
    </div>
  );
};

export default SkeletonDemo;