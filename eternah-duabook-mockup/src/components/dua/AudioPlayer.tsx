import React from 'react';

const AudioPlayer: React.FC<{ src?: string }> = ({ src }) => (
  <div>
    {src ? <audio controls src={src} style={{ width: '100%' }} /> : <small>No audio available</small>}
  </div>
);

export default AudioPlayer;

