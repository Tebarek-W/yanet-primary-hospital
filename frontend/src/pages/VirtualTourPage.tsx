import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { api } from '../utils/api';

const DEFAULT_EMBED = 'https://tour.panoee.net/iframe/69d5076793f8052809dbec8b';

const VirtualTourPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAmharic = t('nav.home') === 'መነሻ';
  const [loading, setLoading] = useState(true);
  const [embedUrl, setEmbedUrl] = useState(DEFAULT_EMBED);

  useEffect(() => {
    api.pages.get('virtual-tour')
      .then(data => {
        if (data?.vt_embed_url) setEmbedUrl(data.vt_embed_url);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    // Forward device motion to Panoee iframe for mobile VR support
    const handleDeviceMotion = (e: DeviceMotionEvent) => {
      const iframe = document.getElementById('tour-embeded') as HTMLIFrameElement;
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(
          {
            type: 'devicemotion',
            deviceMotionEvent: {
              acceleration: e.acceleration
                ? { x: e.acceleration.x, y: e.acceleration.y, z: e.acceleration.z }
                : null,
              accelerationIncludingGravity: e.accelerationIncludingGravity
                ? {
                    x: e.accelerationIncludingGravity.x,
                    y: e.accelerationIncludingGravity.y,
                    z: e.accelerationIncludingGravity.z,
                  }
                : null,
              rotationRate: e.rotationRate
                ? { alpha: e.rotationRate.alpha, beta: e.rotationRate.beta, gamma: e.rotationRate.gamma }
                : null,
              interval: e.interval,
              timeStamp: e.timeStamp,
            },
          },
          '*'
        );
      }
    };

    window.addEventListener('devicemotion', handleDeviceMotion);

    // Safety timeout — hide loader after 4s even if onLoad hasn't fired
    const fallback = setTimeout(() => setLoading(false), 4000);

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a1a2f] overflow-hidden z-[2000]">

      {/* ── Top bar ── */}
      <div className="absolute top-0 left-0 right-0 pt-4 px-6 flex items-center justify-between z-[9999] pointer-events-none">
        <button
          onClick={() => navigate(-1)}
          className="pointer-events-auto flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-full text-white text-[13px] font-bold hover:bg-primary/80 transition-all active:scale-95 shadow-lg"
        >
          <ChevronLeft size={16} />
          {isAmharic ? 'ወደ ኋላ' : 'Exit Tour'}
        </button>
      </div>

      {/* ── Panoee iframe — eager loading ── */}
      <iframe
        id="tour-embeded"
        title="Yanet Primary Hospital Virtual Tour"
        src={embedUrl}
        width="100%"
        height="100%"
        scrolling="no"
        allow="vr; xr; accelerometer; gyroscope; autoplay; fullscreen"
        allowFullScreen
        loading="eager"
        className="w-full h-full border-0 block"
        style={{ border: 0 }}
        onLoad={() => setLoading(false)}
      />

      {/* ── Loading overlay ── */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-[2100] bg-[#0a1a2f]">
          <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-5" />
          <span className="text-white/70 font-bold tracking-[0.2em] uppercase text-[11px]">
            {isAmharic ? 'እየተጫነ ነው...' : 'Loading Tour...'}
          </span>
        </div>
      )}
    </div>
  );
};

export default VirtualTourPage;
