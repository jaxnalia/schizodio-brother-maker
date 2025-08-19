export type SliderEvent = MouseEvent | TouchEvent;

export function getClientX(event: SliderEvent): number {
  if (event instanceof TouchEvent) {
    return event.touches[0].clientX;
  }
  return event.clientX;
}

export function calculateSliderValue(
  clientX: number,
  rect: DOMRect,
  min: number,
  max: number,
  step: number
): number {
  const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  return Math.round((min + (max - min) * percentage) / step) * step;
}