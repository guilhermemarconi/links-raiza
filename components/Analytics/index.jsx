'use client';

import posthog from 'posthog-js';
import { useEffect } from 'react';

import { ATTR } from '@/lib/destination';

// Delegated listener: a measured link only needs the data-posthog-destination-* attributes (ADR 0002).
function captureDestinationClick(event) {
  try {
    if (!(event.target instanceof Element)) return;

    // Primary click and middle button count; right button (auxclick 2) does not.
    if (event.type === 'auxclick' && event.button !== 1) return;

    const destination = event.target.closest(`[${ATTR.kind}]`);
    if (!destination) return;

    posthog.capture('destination_clicked', {
      kind: destination.getAttribute(ATTR.kind),
      name: destination.getAttribute(ATTR.name),
      position: Number(destination.getAttribute(ATTR.position)),
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
        person_profiles: 'identified_only',
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
