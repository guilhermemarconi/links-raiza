'use client';

import posthog from 'posthog-js';
import { useEffect } from 'react';

// Delegated listener: a measured link only needs the data-posthog-destination-* attributes (ADR 0002).
function captureDestinationClick(event) {
  try {
    if (!(event.target instanceof Element)) return;

    const destination = event.target.closest('[data-posthog-destination-kind]');
    if (!destination) return;

    posthog.capture('destination_clicked', {
      kind: destination.dataset.posthogDestinationKind,
      name: destination.dataset.posthogDestinationName,
      position: Number(destination.dataset.posthogDestinationPosition),
    });
  } catch {
    // Measurement must never block navigation.
  }
}

function Analytics() {
  useEffect(() => {
    const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (!projectToken || !host) return;

    try {
      posthog.init(projectToken, {
        api_host: host,
        persistence: 'memory',
        autocapture: false,
        disable_session_recording: true,
      });
    } catch {
      return;
    }

    document.addEventListener('click', captureDestinationClick);
    document.addEventListener('auxclick', captureDestinationClick);
    return () => {
      document.removeEventListener('click', captureDestinationClick);
      document.removeEventListener('auxclick', captureDestinationClick);
    };
  }, []);

  return null;
}

export default Analytics;
