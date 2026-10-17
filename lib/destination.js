// Single source of truth for the Destination click contract (ADR 0002).
export const KIND = { product: 'product', social: 'social', extra: 'extra' };

export const ATTR = {
  kind: 'data-posthog-destination-kind',
  name: 'data-posthog-destination-name',
  position: 'data-posthog-destination-position',
};

// Tracking attributes for one rendered link; position is 1-based within its section.
export const destinationProps = (kind, name, position) => ({
  [ATTR.kind]: kind,
  [ATTR.name]: name,
  [ATTR.position]: position,
});
