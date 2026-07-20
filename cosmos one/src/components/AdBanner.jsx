import React, { useEffect } from 'react';

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div style={{ marginTop: '1rem', overflow: 'hidden', borderRadius: '8px', minHeight: '50px' }}>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-8605608795686474"
           data-ad-slot="4117306578"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
