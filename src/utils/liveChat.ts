// Tawk.to live chat, loaded on demand so the widget script doesn't slow page load.
// Set NEXT_PUBLIC_TAWK_PROPERTY_ID and NEXT_PUBLIC_TAWK_WIDGET_ID in .env.local
// (from Tawk dashboard → Administration → Chat Widget → Direct Chat Link:
//  https://tawk.to/chat/<PROPERTY_ID>/<WIDGET_ID>).

const PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
const FALLBACK_URL = "https://wa.me/918750075080";

type TawkApi = { maximize: () => void; onLoad?: () => void };

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

let loading: Promise<TawkApi> | null = null;

const loadTawk = () => {
  if (loading) return loading;

  loading = new Promise<TawkApi>((resolve, reject) => {
    const api = (window.Tawk_API = window.Tawk_API || ({} as TawkApi));
    window.Tawk_LoadStart = new Date();
    api.onLoad = () => resolve(window.Tawk_API ?? api);

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    script.onerror = () => {
      loading = null;
      reject(new Error("Tawk.to failed to load"));
    };
    document.body.appendChild(script);
  });

  return loading;
};

export const isLiveChatConfigured = Boolean(PROPERTY_ID && WIDGET_ID);

export const openLiveChat = async () => {
  if (!isLiveChatConfigured) {
    window.open(FALLBACK_URL, "_blank", "noopener,noreferrer");
    return;
  }

  try {
    const api = await loadTawk();
    api.maximize();
  } catch {
    window.open(FALLBACK_URL, "_blank", "noopener,noreferrer");
  }
};
